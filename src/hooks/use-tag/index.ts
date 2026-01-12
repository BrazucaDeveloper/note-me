import type { Tag } from '@/data/interfaces'
import { useLocalTag } from './use-local-tag'
import { useRemoteTag } from './use-remote-tag'

export function useTag() {
	const {} = useLocalTag()
	const {} = useRemoteTag()

	const create = async (title: string) => {
		console.log(title)
	}

	const update = async (tag: Partial<Tag> & { id: string }) => {
		console.log(tag)
	}

	const remove = async () => {}

	const toggleNoteTag = async () => {}

	return {
		toggleNoteTag,
		createTag: create,
		updateTag: update,
		removeTag: remove,
	}
}
