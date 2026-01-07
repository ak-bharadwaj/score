const defaultOrigins = ["http://localhost:3000", "http://localhost:3001"];
const extraOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map(s => s.trim())
  .filter(Boolean);

export const CorsConfig = {
  origin: [...defaultOrigins, ...extraOrigins],
};
