import { useLiveQuery } from 'dexie-react-hooks'
import { IndexDB } from '@/db'

export function useTag() {
  const create = async (title: string) => {
    return await IndexDB.tag.put({
      title,
    })
  }

  const tags = useLiveQuery(async () => {
    return await IndexDB.tag.toArray()
  })

  const update = async (id: number, title: string) => {
    return await IndexDB.tag.update(id, {
      title,
    })
  }

  const remove = async (id: number) => {
    return await IndexDB.transaction('rw', ['tag', 'noteTag'], async () => {
      await IndexDB.noteTag.where('tag').equals(id).delete()
      await IndexDB.tag.delete(id)
    })
  }

  return {
    tags,
    createTag: create,
    updateTag: update,
    removeTag: remove,
  }
}
