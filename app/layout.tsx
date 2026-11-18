import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/supabase/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Site",
  description: "Supabase 로그인이 연결된 나의 사이트",
};

// 로그인 상태가 페이지마다 달라지므로 항상 요청 시점에 렌더링한다.
export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <html lang="ko">
      <body>
        <header className="header">
          <Link href="/" className="logo">
            My Site
          </Link>
          <nav className="nav">
            <Link href="/guestbook">방명록</Link>
            <Link href="/coffee-chat">커피챗</Link>
            {user ? (
              <Link href="/mypage" className="btn btn-small">
                내 정보
              </Link>
            ) : (
              <Link href="/login" className="btn btn-small">
                로그인
              </Link>
            )}
          </nav>
        </header>
        <main className="main">{children}</main>
        <footer className="footer">© {new Date().getFullYear()} My Site</footer>
      </body>
    </html>
  );
}
