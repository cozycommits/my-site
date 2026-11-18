"use server";

import { redirect } from "next/navigation";
import { isMissingTable, TABLE_MISSING, text, withMessage } from "@/lib/form";
import { createClient } from "@/lib/supabase/server";

export async function addEntry(formData: FormData) {
  const name = text(formData, "name", 30);
  const message = text(formData, "message", 500);
  if (!name || !message) redirect(withMessage("/guestbook", "error", "이름과 내용을 모두 적어 주세요."));

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect(withMessage("/login", "error", "방명록은 로그인 후 쓸 수 있어요."));

  const { error } = await supabase.from("guestbook").insert({ name, message });
  if (error) {
    redirect(withMessage("/guestbook", "error", isMissingTable(error) ? TABLE_MISSING : "저장하지 못했어요. 다시 시도해 주세요."));
  }
  redirect(withMessage("/guestbook", "message", "방명록을 남겼어요. 고마워요! 🙌"));
}

export async function deleteEntry(formData: FormData) {
  const id = Number(formData.get("id"));
  const supabase = await createClient();
  // RLS 정책 때문에 본인 글만 실제로 지워진다.
  await supabase.from("guestbook").delete().eq("id", id);
  redirect("/guestbook");
}
