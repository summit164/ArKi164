## Supabase backend for StudyFlow TMA

This repo contains a React frontend and a Supabase-based backend implemented via:
- **Postgres schema migrations** (`supabase/migrations/`)
- **Supabase Edge Functions** (`supabase/functions/`)

The backend is designed for a Telegram Mini App:
- The client must send `x-telegram-init-data: WebApp.initData` on requests that require authentication.
- Edge functions verify Telegram signature using `TELEGRAM_BOT_TOKEN`.

### Data model (high level)

- **profiles**: Telegram identity (one row per Telegram user)
- **students**: 1:1 role extension of `profiles`
- **helpers**: approved helpers only (visible to users)
- **helper_applications**: helper applications (`pending/approved/rejected`) with moderation fields
- **helper_application_documents**: application files (stored in Storage bucket `helper-documents`)
- **orders**: help requests (broadcast or direct)
- **order_files**: order attachments (stored in Storage bucket `order-files`)
- **tasks**: tasks for students/helpers (used by `/all-tasks` and `/task-by-id`)
- **moderators**: allowlist of Telegram numeric IDs
- **events**: lightweight audit/events (used by `identify`)

All tables have **RLS enabled** with **default-deny** (no policies). Access is intended via Edge Functions using the **service role** key.

### Edge Functions (endpoints)

The frontend currently calls these (must exist in Supabase):
- `identify` (POST JSON)
- `get-helpers` (GET)
- `add-helper` (POST multipart/form-data)
- `send-message-in-telegram-group` (POST multipart/form-data)
- `all-tasks` (GET)
- `task-by-id` (GET `?id=...`)

Additionally for moderation/admin:
- `list-helper-applications` (GET, moderator-only)
- `moderate-helper-application` (POST, moderator-only)

### Required environment variables (Edge Functions)

Set these via Supabase secrets:
- **SUPABASE_URL**
- **SUPABASE_SERVICE_ROLE_KEY**
- **TELEGRAM_BOT_TOKEN**: bot token used to verify WebApp initData and (optionally) send messages

Optional but recommended:
- **REQUIRE_TELEGRAM_AUTH**: `true|false` (default: `true`)
- **TELEGRAM_INITDATA_MAX_AGE_SECONDS**: default `86400`
- **TELEGRAM_HELPERS_GROUP_CHAT_ID**: numeric chat id (e.g. `-100123...`) used by `send-message-in-telegram-group`
- **ALLOW_ORDER_STORE_ONLY**: `true|false` (default: `false`). If `true`, orders are stored even if Telegram is not configured.
- **ORDER_FILE_SIGNED_URL_TTL_SECONDS**: default `604800` (7 days)

Dev-only escape hatch:
- If `REQUIRE_TELEGRAM_AUTH=false`, you can pass `x-dev-telegram-user` header (JSON) to simulate Telegram user in local testing.

### Frontend configuration

Add env var for the frontend (CRA):
- **REACT_APP_SUPABASE_FUNCTIONS_URL**: base URL like `https://<project>.supabase.co/functions/v1`

The frontend sends `x-telegram-init-data` on all calls via `WebApp.initData`.

### Setup / deployment (typical)

1) Create a Supabase project
2) Apply migrations:
- `supabase db push`
3) Deploy edge functions:
- `supabase functions deploy identify`
- `supabase functions deploy get-helpers`
- `supabase functions deploy add-helper`
- `supabase functions deploy send-message-in-telegram-group`
- `supabase functions deploy all-tasks`
- `supabase functions deploy task-by-id`
- `supabase functions deploy list-helper-applications`
- `supabase functions deploy moderate-helper-application`
4) Configure secrets:
- `supabase secrets set TELEGRAM_BOT_TOKEN=...`
- `supabase secrets set TELEGRAM_HELPERS_GROUP_CHAT_ID=...`
- `supabase secrets set REQUIRE_TELEGRAM_AUTH=true`

### Moderation workflow (helpers)

1) User submits application via frontend → Edge Function `add-helper`
2) Row appears in `helper_applications` with `status='pending'`
3) Moderator approves/rejects:
- Call `moderate-helper-application` with `{ applicationId, action }`
  - `approve` creates/updates a row in `helpers` (approved helpers list)
  - `reject` keeps the application but marks it rejected

Bootstrap moderators:
- Insert Telegram numeric ids into `public.moderators`
