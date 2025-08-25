import { useNote } from '@/hooks/use-note'
import { Input } from '../ui/input'
import { getNoteContext } from './note-context'

export function NoteSearch() {
  const { notes } = useNote()
  const { setQuery } = getNoteContext()

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  return (
    <Input
      type="search" 
      disabled={!notes}
      className="w-full"
      onChange={search}
      placeholder="Find your notes by title..."
    />
  )
}
