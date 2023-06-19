export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
      PORT: number;
      QUOTES_API_KEY: string;
      IPINFO_API_KEY: string;
      ALLOWED_DOMAIN: string;
    }
  }
}
