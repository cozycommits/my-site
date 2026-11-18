# My Site

Next.js + Supabase 로그인이 연결된 반응형 사이트입니다. 폰 브라우저만으로 배포·운영할 수 있게 구성했습니다.

## 기능

- 메인 페이지
- 이메일/비밀번호 회원가입, 로그인, 로그아웃
- 로그인한 사람만 볼 수 있는 `내 정보` 페이지 (내 커피챗 신청 현황 포함)
- **방명록** (`/guestbook`): 누구나 읽기, 로그인한 사람만 쓰기, 본인 글만 삭제
- **커피챗 신청** (`/coffee-chat`): 누구나 신청 가능, 신청 내용은 비공개

## 배포 (폰 브라우저로 가능)

1. Vercel에서 **Add New → Project → 이 저장소 Import → Deploy**
2. 프로젝트 **Storage** 탭 → **Supabase** 생성 후 이 프로젝트에 연결
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`가 자동 설정됩니다.
3. **Deployments → 최신 배포 ⋯ → Redeploy**
4. Supabase 대시보드 **Authentication → URL Configuration**
   - **Site URL**: `https://<내-프로젝트>.vercel.app`
   - **Redirect URLs**: `https://<내-프로젝트>.vercel.app/**`

5. Supabase 대시보드 **SQL Editor → New query**에 [`supabase/schema.sql`](supabase/schema.sql) 전체를 붙여넣고 **Run**
   - 방명록·커피챗 표와 보안 규칙(RLS)이 만들어집니다. 여러 번 실행해도 안전합니다.

## 커피챗 신청 확인하기

Supabase 대시보드 **Table Editor → `coffee_chats`**에서 전체 신청을 볼 수 있습니다.
`status` 칸을 `확정` 또는 `거절`로 바꾸면 신청자의 `내 정보` 화면에 반영됩니다(로그인 상태로 신청한 경우).

Supabase를 연결하기 전에도 사이트는 열리며, 로그인 화면에 연결 안내가 표시됩니다.

## 로컬 실행 (선택)

```bash
cp .env.example .env.local   # 값 채우기
npm install
npm run dev
```
