import { useNote } from './use-note'
import { SyncService } from '@/data/helper'

export function useSyncData() {
	const { syncNotesProcedure } = useNote()

	const syncProcedure = async () => {
		const [isRemoteSynced, isLocalSynced] = await syncNotesProcedure()
		console.log(
			`>! [Sync log] - Remote: ${isRemoteSynced}, Local: ${isLocalSynced}`
		)
	}

	return async () => {
		if (!(await SyncService.isSyncNeeded())) return

		return syncProcedure()
			.then(() => SyncService.setLastSync(Date.now()))
			.catch(console.error)
	}
}
