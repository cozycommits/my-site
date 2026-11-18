"use server";

import { redirect } from "next/navigation";
import { isMissingTable, TABLE_MISSING, text, withMessage } from "@/lib/form";
import { createClient } from "@/lib/supabase/server";

export async function requestCoffeeChat(formData: FormData) {
  const row = {
    name: text(formData, "name", 30),
    email: text(formData, "email", 200),
    topic: text(formData, "topic", 100),
    preferred_time: text(formData, "preferred_time", 100) || null,
    message: text(formData, "message", 1000) || null,
  };
  if (!row.name || !row.email || !row.topic) {
    redirect(withMessage("/coffee-chat", "error", "이름, 이메일, 이야기할 주제는 꼭 적어 주세요."));
  }

  const supabase = await createClient();
  // 신청 내용은 공개되지 않으므로 insert 후 다시 읽지 않는다.
  const { error } = await supabase.from("coffee_chats").insert(row);
  if (error) {
    redirect(withMessage("/coffee-chat", "error", isMissingTable(error) ? TABLE_MISSING : "신청하지 못했어요. 다시 시도해 주세요."));
  }
  redirect("/coffee-chat?done=1");
}
