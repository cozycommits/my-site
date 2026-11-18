import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient, getCurrentUser } from "@/lib/supabase/server";
import { logout } from "../login/actions";

type CoffeeChat = { id: number; topic: string; status: string; created_at: string };

// 로그인한 사람만 볼 수 있는 페이지
export default async function MyPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const supabase = await createClient();
  const { data } = await supabase
    .from("coffee_chats")
    .select("id, topic, status, created_at")
    .order("created_at", { ascending: false });
  const chats = (data ?? []) as CoffeeChat[];

  const joined = new Date(user.created_at).toLocaleDateString("ko-KR");

  return (
    <section className="stack">
      <div className="card wide">
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
      </div>

      <div className="card wide">
        <h2>내 커피챗 신청</h2>
        {chats.length === 0 ? (
          <p className="muted">
            아직 신청이 없어요. <Link href="/coffee-chat">커피챗 신청하기</Link>
          </p>
        ) : (
          <ul className="list">
            {chats.map((c) => (
              <li key={c.id} className="entry">
                <div className="entry-head">
                  <strong>{c.topic}</strong>
                  <span className={`badge badge-${c.status}`}>{c.status}</span>
                </div>
                <time className="muted">{new Date(c.created_at).toLocaleDateString("ko-KR")} 신청</time>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
