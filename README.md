# My Site

Next.js + Supabase 로그인이 연결된 반응형 사이트입니다. 폰 브라우저만으로 배포·운영할 수 있게 구성했습니다.

## 기능

- 메인 페이지
- 이메일/비밀번호 회원가입, 로그인, 로그아웃
- 로그인한 사람만 볼 수 있는 `내 정보` 페이지 (내 커피챗 신청 현황 포함)
- **방명록** (`/guestbook`): 누구나 읽기, 로그인한 사람만 쓰기, 본인 글만 삭제
- **커피챗 신청** (`/coffee-chat`): 누구나 신청 가능, 신청 내용은 비공개

## 배포 (폰 브라우저로 가능)

Supabase 프로젝트(`my-site`, 서울 리전)와 표·보안 규칙은 이미 만들어져 있고, 공개 연결 정보는 `lib/supabase/env.ts`에 들어 있습니다.

1. Vercel에서 **Add New → Project → 이 저장소 Import → Deploy**
2. 배포 주소를 Supabase 대시보드 **Authentication → URL Configuration → Site URL**에 넣기

- 회원가입은 메일 인증 없이 바로 로그인되도록 설정했습니다(Supabase 기본 메일 발송 한도 회피).
- 표를 처음부터 다시 만들 때는 SQL Editor에서 [`supabase/schema.sql`](supabase/schema.sql)을 실행합니다. 여러 번 실행해도 안전합니다.

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
