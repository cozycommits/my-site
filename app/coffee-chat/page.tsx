import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getCurrentUser } from "@/lib/supabase/server";
import { requestCoffeeChat } from "./actions";

type Props = { searchParams: Promise<{ error?: string; done?: string }> };

export default async function CoffeeChatPage({ searchParams }: Props) {
  const { error, done } = await searchParams;

  if (!isSupabaseConfigured) {
    return (
      <section className="card">
        <h1>커피챗 신청</h1>
        <p className="muted">Supabase를 연결하면 커피챗 신청을 받을 수 있어요.</p>
      </section>
    );
  }

  if (done) {
    return (
      <section className="card">
        <h1>신청 완료 ☕</h1>
        <p>커피챗 신청이 접수됐어요. 적어 주신 이메일로 연락드릴게요!</p>
        <Link href="/" className="btn">메인으로</Link>
      </section>
    );
  }

  const user = await getCurrentUser();

  return (
    <section className="card">
      <h1>커피챗 신청 ☕</h1>
      <p className="muted">편하게 이야기 나눠요. 신청 내용은 저만 볼 수 있어요.</p>
      {error && <p className="alert alert-error">{error}</p>}

      <form className="form" action={requestCoffeeChat}>
        <label>
          이름 *
          <input name="name" required maxLength={30} />
        </label>
        <label>
          연락받을 이메일 *
          <input name="email" type="email" required maxLength={200} autoComplete="email" defaultValue={user?.email ?? ""} />
        </label>
        <label>
          이야기할 주제 *
          <input name="topic" required maxLength={100} placeholder="예: 커리어 고민, 프로젝트 협업" />
        </label>
        <label>
          가능한 시간
          <input name="preferred_time" maxLength={100} placeholder="예: 평일 저녁, 주말 오후" />
        </label>
        <label>
          하고 싶은 말
          <textarea name="message" maxLength={1000} rows={4} />
        </label>
        <button className="btn" type="submit">신청하기</button>
      </form>
    </section>
  );
}
