// Supabase 연결 정보. Vercel + Supabase 연동 시 자동으로 들어온다.
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// 아직 Supabase를 연결하지 않았으면 false (사이트는 열리되 로그인만 비활성화)
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
