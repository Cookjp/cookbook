import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "vite-plugin-fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const define = {};
  if (mode === "development") {
    const env = loadEnv(mode, process.cwd(), "");
    define["process.env"] = env;
  }

  return {
    define,
    plugins: [
      react({
        include: "**/*.tsx",
      }),
      fs(),
    ],
    publicDir: "./public",
  };
});
