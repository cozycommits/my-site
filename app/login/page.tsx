import Link from "next/link";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { getCurrentUser } from "@/lib/supabase/server";
import { login, signup } from "./actions";

type Props = {
  searchParams: Promise<{ mode?: string; error?: string; message?: string }>;
};

export default async function LoginPage({ searchParams }: Props) {
  const { mode, error, message } = await searchParams;
  const isSignup = mode === "signup";

  if (!isSupabaseConfigured) {
    return (
      <section className="card">
        <h1>로그인 준비 중</h1>
        <p className="muted">
          아직 Supabase가 연결되지 않았어요. Vercel 프로젝트의 Storage 탭에서 Supabase를 연결한 뒤
          다시 배포(Redeploy)해 주세요.
        </p>
      </section>
    );
  }

  if (await getCurrentUser()) redirect("/mypage");

  return (
    <section className="card">
      <h1>{isSignup ? "회원가입" : "로그인"}</h1>

      {error && <p className="alert alert-error">{error}</p>}
      {message && <p className="alert">{message}</p>}

      <form className="form" action={isSignup ? signup : login}>
        <label>
          이메일
          <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
        </label>
        <label>
          비밀번호
          <input
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete={isSignup ? "new-password" : "current-password"}
            placeholder="6자 이상"
          />
        </label>
        <button className="btn" type="submit">
          {isSignup ? "가입하기" : "로그인"}
        </button>
      </form>

      <p className="muted switch">
        {isSignup ? (
          <>
            이미 계정이 있나요? <Link href="/login">로그인</Link>
          </>
        ) : (
          <>
            처음이신가요? <Link href="/login?mode=signup">회원가입</Link>
          </>
        )}
      </p>
    </section>
  );
}
