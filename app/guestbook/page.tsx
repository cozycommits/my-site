import Link from "next/link";
import { isMissingTable, TABLE_MISSING } from "@/lib/form";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import { addEntry, deleteEntry } from "./actions";

type Props = { searchParams: Promise<{ error?: string; message?: string }> };

type Entry = { id: number; user_id: string; name: string; message: string; created_at: string };

export default async function GuestbookPage({ searchParams }: Props) {
  const { error, message } = await searchParams;

  if (!isSupabaseConfigured) {
    return (
      <section className="card">
        <h1>방명록</h1>
        <p className="muted">Supabase를 연결하면 방명록을 쓸 수 있어요.</p>
      </section>
    );
  }

  const supabase = await createClient();
  const [{ data: auth }, { data, error: loadError }] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from("guestbook").select("*").order("created_at", { ascending: false }).limit(100),
  ]);
  const user = auth.user;
  const entries = (data ?? []) as Entry[];

  return (
    <section className="stack">
      <div className="card wide">
        <h1>방명록 ✍️</h1>
        {error && <p className="alert alert-error">{error}</p>}
        {message && <p className="alert">{message}</p>}
        {loadError && <p className="alert alert-error">{isMissingTable(loadError) ? TABLE_MISSING : "방명록을 불러오지 못했어요."}</p>}

        {user ? (
          <form className="form" action={addEntry}>
            <label>
              이름
              <input name="name" required maxLength={30} placeholder="닉네임" defaultValue={user.email?.split("@")[0]} />
            </label>
            <label>
              남길 말
              <textarea name="message" required maxLength={500} rows={3} placeholder="자유롭게 한마디 남겨 주세요" />
            </label>
            <button className="btn" type="submit">남기기</button>
          </form>
        ) : (
          <p className="muted">
            방명록을 쓰려면 <Link href="/login">로그인</Link>해 주세요. 글은 누구나 볼 수 있어요.
          </p>
        )}
      </div>

      <ul className="list wide">
        {entries.length === 0 && !loadError && <li className="muted empty">첫 번째 방명록을 남겨 보세요!</li>}
        {entries.map((e) => (
          <li key={e.id} className="entry">
            <div className="entry-head">
              <strong>{e.name}</strong>
              <time className="muted">{new Date(e.created_at).toLocaleDateString("ko-KR")}</time>
            </div>
            <p>{e.message}</p>
            {user?.id === e.user_id && (
              <form action={deleteEntry}>
                <input type="hidden" name="id" value={e.id} />
                <button className="link-btn" type="submit">삭제</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
