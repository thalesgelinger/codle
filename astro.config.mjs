import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/static";

// https://astro.build/config
export default defineConfig({
    integrations: [react(), tailwind({
        applyBaseStyles: false
    })],
    server: {
        headers: {
            'Cross-Origin-Embedder-Policy': 'require-corp',
            'Cross-Origin-Opener-Policy': 'same-origin'
        }
    },
    adapter: vercel()
});
