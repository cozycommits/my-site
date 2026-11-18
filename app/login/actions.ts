"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function readForm(formData: FormData) {
  return {
    email: String(formData.get("email") ?? "").trim(),
    password: String(formData.get("password") ?? ""),
  };
}

export async function login(formData: FormData) {
  const { email, password } = readForm(formData);
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent("이메일 또는 비밀번호가 맞지 않거나, 메일 인증이 아직 안 됐어요.")}`);
  }
  redirect("/mypage");
}

export async function signup(formData: FormData) {
  const { email, password } = readForm(formData);
  if (password.length < 6) {
    redirect(`/login?mode=signup&error=${encodeURIComponent("비밀번호는 6자 이상이어야 해요.")}`);
  }

  // 인증 메일의 링크가 지금 접속한 사이트 주소로 돌아오게 한다.
  const h = await headers();
  const origin = h.get("origin") ?? `https://${h.get("host")}`;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: `${origin}/auth/confirm` },
  });

  if (error) {
    redirect(`/login?mode=signup&error=${encodeURIComponent(error.message)}`);
  }
  // 메일 인증을 꺼 두었다면 바로 로그인된다.
  if (data.session) redirect("/mypage");
  redirect(`/login?message=${encodeURIComponent("인증 메일을 보냈어요. 메일의 링크를 누른 뒤 로그인해 주세요.")}`);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
