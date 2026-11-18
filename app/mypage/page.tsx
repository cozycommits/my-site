import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/server";
import { logout } from "../login/actions";

// 로그인한 사람만 볼 수 있는 페이지
export default async function MyPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const joined = new Date(user.created_at).toLocaleDateString("ko-KR");

  return (
    <section className="card">
      <h1>내 정보</h1>
      <dl className="info">
        <dt>이메일</dt>
        <dd>{user.email}</dd>
        <dt>가입일</dt>
        <dd>{joined}</dd>
      </dl>
      <form action={logout}>
        <button className="btn btn-outline" type="submit">
          로그아웃
        </button>
      </form>
    </section>
  );
}
