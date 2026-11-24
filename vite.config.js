import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { execSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { seoPages } from './scripts/seoPages.mjs'

function commitSha() {
  if (process.env.VERCEL_GIT_COMMIT_SHA) return process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7)
  try {
    return execSync('git rev-parse --short HEAD').toString().trim()
  } catch {
    return 'dev'
  }
}

// Screenshots that actually exist, so rows without one can drop the image slot
function projectShots() {
  try {
    return readdirSync('public/projects').map((file) => `/projects/${file}`)
  } catch {
    return []
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoPages()],
  define: {
    __COMMIT_SHA__: JSON.stringify(commitSha()),
    __PROJECT_SHOTS__: JSON.stringify(projectShots()),
    // Toronto date (en-CA formats as YYYY-MM-DD), so an evening build isn't stamped tomorrow
    __BUILD_DATE__: JSON.stringify(new Date().toLocaleDateString('en-CA', { timeZone: 'America/Toronto' })),
  },
})
