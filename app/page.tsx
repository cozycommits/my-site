import Link from "next/link";
import { getCurrentUser } from "@/lib/supabase/server";

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <section className="hero">
      <p className="eyebrow">환영합니다 👋</p>
      <h1>나의 첫 번째 사이트</h1>
      <p className="lead">
        폰에서도, PC에서도 보기 좋은 사이트입니다. 회원가입하고 로그인해 보세요.
      </p>
      {user ? (
        <Link href="/mypage" className="btn">
          {user.email} 님, 내 정보 보기
        </Link>
      ) : (
        <div className="actions">
          <Link href="/login?mode=signup" className="btn">
            회원가입
          </Link>
          <Link href="/login" className="btn btn-outline">
            로그인
          </Link>
        </div>
      )}
    </section>
  );
}
