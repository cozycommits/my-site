import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// 회원가입 인증 메일의 링크를 눌렀을 때 도착하는 곳
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const supabase = await createClient();
  let ok = false;

  if (code) {
    ok = !(await supabase.auth.exchangeCodeForSession(code)).error;
  } else if (tokenHash && type) {
    ok = !(await supabase.auth.verifyOtp({ type, token_hash: tokenHash })).error;
  }

  if (ok) return NextResponse.redirect(`${origin}/mypage`);
  const msg = encodeURIComponent("인증 링크가 만료됐거나 잘못됐어요. 다시 로그인해 보세요.");
  return NextResponse.redirect(`${origin}/login?error=${msg}`);
}
