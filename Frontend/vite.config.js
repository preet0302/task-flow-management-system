import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  server: {
    proxy: {
      "/api": {
        target: "https://task-backend-yagh.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> dd48ba2 (fix: auth cookie issue, added proxy and CORS fix)
