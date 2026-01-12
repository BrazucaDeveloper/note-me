import { IndexDB } from './db.client'

export const SyncService = {
	// Salvar o timestamp de forma tipada
	async setLastSync(timestamp: number): Promise<void> {
		await IndexDB.settings.put({ key: 'last_sync_at', value: timestamp })
	},

	// Recuperar o timestamp garantindo que é um number
	async getLastSync(): Promise<number> {
		const config = await IndexDB.settings.get('last_sync_at')
		return (config?.value as number) ?? 0
	},

	// Verifica se o último sync foi a mais de meia hora atrás
	async isSyncNeeded(): Promise<boolean> {
		const lastSync = await SyncService.getLastSync()
		const now = Date.now()
		return now - lastSync > 1_800_000 // meia hora em milissegundos
	},
}
