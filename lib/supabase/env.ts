// Supabase 연결 정보.
// 아래 기본값은 브라우저에 공개돼도 되는 값(프로젝트 주소 + publishable key)이다.
// 데이터 보호는 supabase/schema.sql 의 RLS 정책이 맡는다.
// 다른 Supabase 프로젝트를 쓰려면 Vercel 환경 변수로 덮어쓴다.
const DEFAULT_URL = "https://hzybnmcaknayjnydgocj.supabase.co";
const DEFAULT_PUBLISHABLE_KEY = "sb_publishable_em43wuii1bSfBcU9tPhCJQ_VQ_oJae6";

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || DEFAULT_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || DEFAULT_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
