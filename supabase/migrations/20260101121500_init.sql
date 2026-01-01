-- StudyFlow (Telegram Mini App) - initial schema
-- This migration is designed for Supabase Postgres + Edge Functions usage.

-- Extensions
create extension if not exists "pgcrypto";

-- Enums
do $$ begin
  create type public.helper_application_status as enum ('pending', 'approved', 'rejected', 'cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  -- Matches frontend TAB_TASKS values: 'users' | 'helpers'
  create type public.task_role as enum ('users', 'helpers');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.order_kind as enum ('broadcast', 'direct');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.order_status as enum ('new', 'sent', 'cancelled', 'closed');
exception when duplicate_object then null; end $$;

-- Shared helpers
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Base profile (Telegram user identity)
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  telegram_id bigint not null unique,
  telegram_username text,
  telegram_first_name text,
  telegram_last_name text,
  telegram_photo_url text,
  telegram_user_json jsonb,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint profiles_telegram_id_positive check (telegram_id > 0)
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Student "role" (1:1 extension from profiles)
create table public.students (
  profile_id uuid primary key references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger students_set_updated_at
before update on public.students
for each row execute function public.set_updated_at();

-- Moderators allowlist (bootstrap-friendly via Telegram numeric id)
create table public.moderators (
  telegram_id bigint primary key,
  created_at timestamptz not null default now(),
  constraint moderators_telegram_id_positive check (telegram_id > 0)
);

-- Approved helpers (only approved helpers live here)
create table public.helpers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  name text not null,
  second_name text not null,
  facult text not null,
  direction text not null,
  course text not null,
  main_subjects text not null,
  rating numeric(4,2) not null default 0,
  rating_count integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint helpers_rating_non_negative check (rating >= 0),
  constraint helpers_rating_count_non_negative check (rating_count >= 0)
);

create index helpers_is_active_idx on public.helpers(is_active);

create trigger helpers_set_updated_at
before update on public.helpers
for each row execute function public.set_updated_at();

-- Helper applications (require manual moderation)
create table public.helper_applications (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  second_name text not null,
  facult text not null,
  direction text not null,
  course text not null,
  main_subjects text not null,
  status public.helper_application_status not null default 'pending',
  submitted_at timestamptz not null default now(),
  moderated_at timestamptz,
  moderated_by_telegram_id bigint,
  rejection_reason text,
  approved_helper_id uuid references public.helpers(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index helper_applications_profile_id_idx on public.helper_applications(profile_id);
create index helper_applications_status_idx on public.helper_applications(status);

-- One pending application per profile (partial unique index)
create unique index helper_applications_one_pending_per_profile_idx
on public.helper_applications(profile_id)
where status = 'pending';

create trigger helper_applications_set_updated_at
before update on public.helper_applications
for each row execute function public.set_updated_at();

-- Helper application documents (stored in Supabase Storage)
create table public.helper_application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.helper_applications(id) on delete cascade,
  storage_bucket text not null,
  storage_path text not null,
  original_filename text not null,
  content_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create index helper_application_documents_application_id_idx
on public.helper_application_documents(application_id);

-- Tasks (public list, fetched via edge functions)
create table public.tasks (
  id bigserial primary key,
  role public.task_role not null,
  name text not null,
  description text not null,
  award text not null default '',
  google_form_link text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index tasks_role_idx on public.tasks(role);
create index tasks_is_active_idx on public.tasks(is_active);

create trigger tasks_set_updated_at
before update on public.tasks
for each row execute function public.set_updated_at();

-- Orders (help requests)
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  created_by_profile_id uuid not null references public.profiles(id) on delete restrict,
  kind public.order_kind not null,
  target_helper_id uuid references public.helpers(id) on delete set null,
  status public.order_status not null default 'new',
  facult text not null,
  direction text not null,
  course text not null,
  subject text not null,
  service text not null,
  condition text not null,
  budget text not null,
  comment text,
  telegram_message_chat_id bigint,
  telegram_message_id integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index orders_created_by_profile_id_idx on public.orders(created_by_profile_id);
create index orders_target_helper_id_idx on public.orders(target_helper_id);
create index orders_status_idx on public.orders(status);

create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

-- Order attachments (stored in Supabase Storage)
create table public.order_files (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  storage_bucket text not null,
  storage_path text not null,
  original_filename text not null,
  content_type text,
  size_bytes bigint,
  created_at timestamptz not null default now()
);

create index order_files_order_id_idx on public.order_files(order_id);

-- Lightweight audit/event log (optional)
create table public.events (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index events_profile_id_idx on public.events(profile_id);
create index events_event_type_idx on public.events(event_type);

-- Storage buckets (private). Edge Functions (service role) can upload and generate signed URLs.
insert into storage.buckets (id, name, public)
values
  ('order-files', 'order-files', false),
  ('helper-documents', 'helper-documents', false)
on conflict (id) do nothing;

-- RLS: default-deny (access via Edge Functions using service role)
alter table public.profiles enable row level security;
alter table public.students enable row level security;
alter table public.moderators enable row level security;
alter table public.helpers enable row level security;
alter table public.helper_applications enable row level security;
alter table public.helper_application_documents enable row level security;
alter table public.tasks enable row level security;
alter table public.orders enable row level security;
alter table public.order_files enable row level security;
alter table public.events enable row level security;


