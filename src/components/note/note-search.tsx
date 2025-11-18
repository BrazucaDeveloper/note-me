import { useNote } from '@/hooks/use-note'
import { Input } from '../ui/input'
import { getNoteContext } from '../../context/note-context'
import Search from 'lucide-react/dist/esm/icons/search'

export function NoteSearch() {
    const { notes } = useNote()
    const { handleQueryChange } = getNoteContext()

    return (
        <div className='relative'>
            <Input
                type='search'
                disabled={!notes || notes.length === 0}
                placeholder='Find your notes by title...'
                className='w-full mt-2 h-10.5 pr-11 text-lg'
                onChange={e => handleQueryChange(e.target.value)}
            />
            <Search className='pointer-events-none size-4.5 absolute top-1/2 -translate-y-1/2 right-4 mt-1' />
        </div>
    )
}
