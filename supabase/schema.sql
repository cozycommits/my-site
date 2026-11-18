-- Supabase 대시보드 → SQL Editor → New query 에 전체를 붙여넣고 Run 하세요.
-- 여러 번 실행해도 안전합니다.

-- ───────── 방명록 ─────────
-- 누구나 읽을 수 있고, 로그인한 사람만 쓸 수 있으며, 자기 글만 지울 수 있다.
create table if not exists public.guestbook (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 30),
  message text not null check (char_length(message) between 1 and 500),
  created_at timestamptz not null default now()
);

alter table public.guestbook enable row level security;

drop policy if exists "guestbook_read_all" on public.guestbook;
create policy "guestbook_read_all" on public.guestbook
  for select to anon, authenticated using (true);

drop policy if exists "guestbook_insert_own" on public.guestbook;
create policy "guestbook_insert_own" on public.guestbook
  for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "guestbook_delete_own" on public.guestbook;
create policy "guestbook_delete_own" on public.guestbook
  for delete to authenticated using (user_id = auth.uid());

-- ───────── 커피챗 신청 ─────────
-- 누구나 신청할 수 있다. 신청 내용은 공개되지 않고,
-- 로그인 상태로 신청한 사람만 자기 신청을 볼 수 있다.
-- 사이트 주인은 Supabase 대시보드 Table Editor 에서 전체 신청을 확인한다.
create table if not exists public.coffee_chats (
  id bigint generated always as identity primary key,
  user_id uuid default auth.uid() references auth.users (id) on delete set null,
  name text not null check (char_length(name) between 1 and 30),
  email text not null check (char_length(email) between 3 and 200),
  topic text not null check (char_length(topic) between 1 and 100),
  preferred_time text check (char_length(preferred_time) <= 100),
  message text check (char_length(message) <= 1000),
  status text not null default '대기' check (status in ('대기', '확정', '거절')),
  created_at timestamptz not null default now()
);

alter table public.coffee_chats enable row level security;

drop policy if exists "coffee_chats_insert_anyone" on public.coffee_chats;
create policy "coffee_chats_insert_anyone" on public.coffee_chats
  for insert to anon, authenticated
  with check (user_id is null or user_id = auth.uid());

drop policy if exists "coffee_chats_read_own" on public.coffee_chats;
create policy "coffee_chats_read_own" on public.coffee_chats
  for select to authenticated using (user_id = auth.uid());
