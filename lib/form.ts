// 폼 값 읽기와 결과 메시지 주소 만들기 헬퍼
export function text(formData: FormData, key: string, max: number) {
  return String(formData.get(key) ?? "").trim().slice(0, max);
}

export function withMessage(path: string, kind: "error" | "message", msg: string) {
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}${kind}=${encodeURIComponent(msg)}`;
}

// 테이블이 아직 없을 때(SQL 미실행) 보여 줄 안내
export const TABLE_MISSING =
  "아직 데이터베이스 표가 없어요. Supabase SQL Editor에서 supabase/schema.sql 을 실행해 주세요.";

export function isMissingTable(error: { code?: string } | null) {
  return error?.code === "42P01" || error?.code === "PGRST205";
}
