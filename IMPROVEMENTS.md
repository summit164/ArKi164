# Improvements Backlog (Living)

This file is a **living backlog** of required improvements for the StudyFlow Telegram Mini App (TMA).  
It is meant to be updated **every time we implement / discover** relevant changes.

## Context (what exists today)

- **Frontend**: React + TypeScript + Redux Toolkit, feature-sliced structure.
- **Platform**: Telegram WebApp via `@twa-dev/sdk`.
- **Backend**: Supabase Edge Functions (called via `fetch` from the client).
- **Core flows already implemented**:
  - Browse helpers → send order to a chosen helper
  - “Quick order” broadcast → send order to all helpers
  - “Become a helper” application (with document photos)
  - Tasks list + task detail (with external link to submit)
  - Support chat link

## Legend

### Priorities
- **P0**: Security / data integrity / must-fix production issues.
- **P1**: Core UX/reliability, prevents drop-off and support load.
- **P2**: Tech debt / cleanup / non-blocking improvements.

### Owner
- **FE**: frontend (this repo)
- **BE**: backend / Supabase edge functions (outside this repo)
- **PM**: product decision required

### Status
- `planned`: accepted into backlog, not started
- `in_progress`: actively being implemented
- `done`: implemented and verified
- `blocked`: requires external decision or backend change

## Backlog (overview)

| ID | Prio | Owner | Area | Status | Summary |
|---:|:---:|:-----:|:-----|:------:|:--------|
| IMP-001 | P0 | BE+FE | Security | in_progress | Verify Telegram WebApp identity for all edge-function calls |
| IMP-002 | P0 | FE | Config/Infra | in_progress | Remove hardcoded Supabase functions URL; centralize API client |
| IMP-003 | P1 | PM+FE | Auth/Product | planned | Decide and implement auth model (or remove dead auth code) |
| IMP-004 | P1 | FE | UX/Reliability | planned | Replace `alert()` with Toaster; show inline errors for failed network loads |
| IMP-005 | P1 | FE | State/Navigation | planned | Persist “chosen helper” across refresh / deep-link safely |
| IMP-006 | P2 | FE | Bug | planned | Fix helper sorting (`sortHelpers`) logic and rating typing |
| IMP-007 | P2 | FE | Tech/Types | planned | Align router/types versions and tighten TS where safe |
| IMP-008 | P2 | FE | Cleanup | planned | Remove or wire unused utilities/components (Toaster usage, `isMobileUser`, `WindowLayout`, etc.) |
| IMP-009 | P0 | BE+FE | Backend | done | Add Supabase schema + Edge Functions for helpers/tasks/orders + moderation |

## Items (details)

### IMP-001 — Verify Telegram WebApp identity for all edge-function calls
- **Why**: client can call edge-functions directly; without Telegram signature verification this is spoofable.
- **Acceptance criteria**:
  - All requests to edge-functions include Telegram WebApp init data (or a derived token).
  - Backend verifies Telegram signature server-side for every sensitive endpoint.
  - If verification fails: backend rejects; frontend shows a friendly error state.
- **Pointers**:
  - `src/features/Order/Order.tsx` (send order)
  - `src/features/OrderWithHelper/OrderWithHelper.tsx` (send order with helper id)
  - `src/features/Helper/Helper.tsx` (add helper)
  - `src/features/Main/model/MainAsyncThunk.ts` (get helpers)
  - `src/features/Tasks/model/TasksAsyncThunks.ts` (all tasks)
  - `src/features/TaskDetail/model/TaskDetailAsyncThunk.ts` (task by id)
  - `src/shared/hooks/useIdentify/useIdentify.ts` (identify)
- **Notes**:
  - This likely needs changes **outside this repo** (Supabase edge functions).
- **Implementation notes (repo)**:
  - Added Telegram initData verification utility for Edge Functions: `supabase/functions/_shared/telegram.ts`
  - Frontend now sends `x-telegram-init-data: WebApp.initData` on Supabase function calls (see touched files below)
  - Requires configuring `TELEGRAM_BOT_TOKEN` and deploying Edge Functions (see `supabase/README.md`)
- **Touched files (repo)**:
  - `supabase/functions/_shared/telegram.ts`
  - `src/shared/hooks/useIdentify/useIdentify.ts`
  - `src/features/Order/Order.tsx`
  - `src/features/OrderWithHelper/OrderWithHelper.tsx`
  - `src/features/Helper/Helper.tsx`
  - `src/features/Main/model/MainAsyncThunk.ts`
  - `src/features/Tasks/model/TasksAsyncThunks.ts`
  - `src/features/TaskDetail/model/TaskDetailAsyncThunk.ts`

### IMP-002 — Remove hardcoded Supabase functions URL; centralize API client
- **Why**: URL is duplicated across files; hard to change env/stage; no shared error handling.
- **Acceptance criteria**:
  - Introduce a single `API_BASE_URL` (e.g., `REACT_APP_SUPABASE_FUNCTIONS_URL`) and use it everywhere.
  - Provide a small client helper: `apiGet`, `apiPostFormData`, `apiPostJson` with consistent error mapping.
  - No raw `https://...supabase.co/functions/v1/...` strings remain in `src/`.
- **Pointers**:
  - Same as IMP-001 (all fetch sites)
  - `src/shared/utils/initSupabase.ts` (env patterns)
- **Implementation notes (repo)**:
  - Centralized Supabase Functions base URL + Telegram header helper in `src/shared/utils/supabaseFunctions.ts`
  - Removed direct hardcoded `https://...supabase.co/functions/v1/...` strings from `src/` (kept as fallback default)

### IMP-009 — Add Supabase schema + Edge Functions for helpers/tasks/orders + moderation
- **Why**: core flows currently depend on remote edge functions; backend should be versioned alongside the app.
- **Acceptance criteria**:
  - DB schema exists as migrations (tables + relations + RLS default-deny)
  - Edge functions exist for current frontend endpoints
  - Helpers require manual moderation before appearing in the helpers list
  - Attachments stored in Supabase Storage with metadata in DB
- **Pointers**:
  - `supabase/migrations/20260101121500_init.sql`
  - `supabase/functions/*`
  - `supabase/README.md`

### IMP-003 — Decide and implement auth model (or remove dead auth code)
- **Why**: auth wrappers exist but `/login` route is not present; current `notAuthOnly` usage is inconsistent.
- **Acceptance criteria (choose one path)**:
  - **Path A**: implement `/login` (token acquisition + storage), mark routes properly `authOnly/notAuthOnly`.
  - **Path B**: remove auth wrappers + token logic if not needed for TMA.
- **Pointers**:
  - `src/providers/AppRouter/RouteAuthOnly.tsx`
  - `src/providers/AppRouter/RouteNotAuthOnly.tsx`
  - `src/providers/AppRouter/routes.tsx`
  - `src/shared/utils/getTokens.ts`

### IMP-004 — Replace `alert()` with Toaster; show inline errors for failed loads
- **Why**: `alert()` is jarring in TMA; many network failures silently fail (just stops pending).
- **Acceptance criteria**:
  - File picker validation uses Toaster (or inline error) instead of `alert`.
  - Fetch failures show meaningful UI: “retry” action or at least an error message.
  - Toaster has at least one real usage path (success/error/loading).
- **Pointers**:
  - `src/shared/ui/Files/Files.tsx` (`alert()` usage)
  - `src/features/Toaster/*` (already implemented)
  - `src/features/Main/model/MainSlice.ts` (rejected)
  - `src/features/Tasks/model/TasksSlice.ts` (rejected)
  - `src/features/TaskDetail/model/TaskDetailSlice.ts` (rejected)

### IMP-005 — Persist “chosen helper” across refresh / deep-link safely
- **Why**: `/order-with-helper` relies on Redux state; refresh loses selected helper → redirects to `/`.
- **Acceptance criteria**:
  - Chosen helper reference persists (e.g., `sessionStorage` or URL param with helper id).
  - On `/order-with-helper`, app can restore helper data (refetch by id or reuse cached helpers list).
  - Back button behavior remains correct in Telegram (`WebApp.BackButton`).
- **Pointers**:
  - `src/features/OrderWithHelper/OrderWithHelper.tsx`
  - `src/features/OrderWithHelper/model/OrderWithHelperSlice.ts`
  - `src/features/Main/model/MainSlice.ts` (helpers cache)

### IMP-006 — Fix helper sorting logic and rating typing
- **Why**: current `sortHelpers` compares against the wrong array and `rating` is typed as `string`.
- **Acceptance criteria**:
  - Sorting uses correct comparison and stable numeric rating.
  - Add tests or at least a small deterministic sort (e.g., `Array.sort`) with safe parsing.
- **Pointers**:
  - `src/features/Main/model/utils/sortHelpers.ts`
  - `src/features/Main/model/types.ts` (`rating: string`)

### IMP-007 — Align router/types versions and tighten TS where safe
- **Why**: `react-router-dom@7` with `@types/react-router-dom@5` is a mismatch; `skipLibCheck` hides issues.
- **Acceptance criteria**:
  - Remove obsolete `@types/react-router-dom` (v7 is typed) or align dependencies properly.
  - Reduce reliance on `any` where low-effort (e.g., `Input`, `Textarea`, `useAppearance`).
- **Pointers**:
  - `package.json`
  - `tsconfig.json`
  - `src/shared/ui/Input/Input.tsx`
  - `src/shared/ui/Textarea/Textarea.tsx`
  - `src/shared/hooks/useAppearance.ts`

### IMP-008 — Remove or wire unused utilities/components
- **Why**: unused code increases maintenance and confuses contributors.
- **Acceptance criteria**:
  - Either delete unused exports or integrate them with a clear purpose.
  - Ensure `Toaster` is actually used (ties into IMP-004).
- **Pointers**:
  - `src/shared/utils/isMobileUser.ts` (unused)
  - `src/shared/ui/WindowLayout/WindowLayout.tsx` (unused)
  - `src/shared/ui/Checkbox/Checkbox.tsx` (unused)
  - `src/index.tsx` exports `supabase` client but never used
  - `src/app/model/constants.ts` (`IS_TELEGRAM_USER` unused)

## Update process (how we keep this file current)

When starting work on an item:
- set its **Status** to `in_progress`
- add a short “Implementation notes” line under the item

When finishing work:
- set **Status** to `done`
- list the touched files
- add quick verification notes (manual steps / screenshots if relevant)

When discovering new work:
- add a new `IMP-XXX` row to the table
- add a detail section with acceptance criteria and pointers


