/// <reference types="vite/client" />

interface ImportMetaEnv {
	// Database
	readonly VITE_CLERK_PUBLISHABLE_KEY: string
	// Auth
	readonly VITE_TURSO_AUTH_TOKEN: string
	readonly VITE_TURSO_DATABASE_URL: string
	// Config
	readonly VITE_NOTE_LOCAL_AUTOSAVE_DELAY: number
	readonly VITE_NOTE_CLOUD_AUTOSAVE_DELAY: number
	readonly VITE_RECENT_TIME_UPDATE_AT: number
	readonly VITE_TRANSITION_DURATION: number
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
