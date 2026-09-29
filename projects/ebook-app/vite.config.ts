import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const repoRoot = resolve(import.meta.dirname, "../..");

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    allowedHosts: [".e2b.app", "localhost", "127.0.0.1"],
    fs: {
      allow: [
        resolve(repoRoot, "chapters"),
        resolve(repoRoot, "companion"),
        resolve(repoRoot, "projects/01-first-app"),
        resolve(repoRoot, "projects/taskflow-react/src"),
        resolve(repoRoot, "projects/taskflow-react/supabase/migrations"),
      ],
    },
  },
});
