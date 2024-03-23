import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ jsxImportSource: "@emotion/react" })],
  resolve: {
    alias: [
      { find: "@api", replacement: "/src/api" },
      { find: "@assets", replacement: "/src/assets" },
      { find: "@components", replacement: "/src/components" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@state", replacement: "/src/state" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@types", replacement: "/src/types" },
      { find: "@utils", replacement: "/src/utils" },
      { find: "@", replacement: "/src" },
    ],
  },
  server: {
    host: "localhost",
    port: 3000,
  },
});
