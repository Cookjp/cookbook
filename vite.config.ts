import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from "vite-plugin-fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {  
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env
    },
    plugins: [
      react({
      include: "**/*.tsx",
      }),
      fs(),
    ],
    publicDir: "./public",
  }
});
