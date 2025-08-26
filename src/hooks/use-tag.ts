import { IndexDB } from "@/db"

export function useTag() {
  const create = async (title: string) => {
    return await IndexDB.tag.add({
      title,
    })
  }

  const update = async (id: number, title: string) => {
    return await IndexDB.tag.update(id, {
      title,
    })
  }

  const remove = async (id: number) => {
    return await IndexDB.tag.delete(id)
  }

  return {
    createTag: create,
    updateTag: update
  }
}