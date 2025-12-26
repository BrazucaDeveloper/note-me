import { useLocalTag } from './use-local-tag'
import { useRemoteTag } from './use-remote-tag'

export function useTag() {
	const {} = useLocalTag()
	const {} = useRemoteTag()

	const create = async () => {}

	const update = async () => {}

	const remove = async () => {}

	const toggleNoteTag = async () => {}

	return {
		toggleNoteTag,
		createTag: create,
		updateTag: update,
		removeTag: remove,
	}
}
