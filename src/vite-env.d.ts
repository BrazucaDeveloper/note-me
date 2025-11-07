/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv & {
        readonly VITE_CLERK_PUBLISHABLE_KEY: string
        readonly VITE_TURSO_AUTH_TOKEN: string
        readonly VITE_TURSO_DATABASE_URL: string
        readonly VITE_NOTE_LOCAL_AUTOSAVE_DELAY: number
        readonly VITE_NOTE_CLOUD_AUTOSAVE_DELAY: number
        readonly VITE_RECENT_TIME_UPDATEAT: number
    }
}
