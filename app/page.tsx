import Link from "next/link";
import { getCurrentUser } from "@/lib/supabase/server";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <section className="hero">
      <p className="eyebrow">환영합니다 👋</p>
      <h1>나의 첫 번째 사이트</h1>
      <p className="lead">
        방명록에 한마디 남겨 주시고, 이야기 나누고 싶다면 커피챗을 신청해 주세요.
      </p>
      <div className="actions">
        <Link href="/coffee-chat" className="btn">
          ☕ 커피챗 신청
        </Link>
        <Link href="/guestbook" className="btn btn-outline">
          ✍️ 방명록 쓰기
        </Link>
      </div>
      {!user && (
        <p className="muted switch">
          처음이신가요? <Link href="/login?mode=signup">회원가입</Link>
        </p>
      )}
    </section>
  );
}
