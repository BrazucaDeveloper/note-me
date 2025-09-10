import { useDebounce } from '@/hooks/use-debounce'
import { useNote } from '@/hooks/use-note'
import {
  CloudOffIcon,
  Download,
  Paperclip,
  PenBoxIcon,
  Pin,
  Save,
  X,
} from 'lucide-react'
import { lazy, type ChangeEvent } from 'react'
import { getNoteContext } from '../note/note-context'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Show } from '../utils/show'
import { Fallback } from './fallback'

const HALF_MINUTE = 500
const TipTap = lazy(() => import('./tip-tap'))

export function Editor() {
  const { selectedNote, handleNoteSelect } = getNoteContext()
  const { updateNote } = useNote()

  const handleTitleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    await updateNote({
      id: selectedNote?.id!,
      title: e.target.value,
    })
  }

  const handleTitleChangeDebounced = useDebounce(handleTitleChange, HALF_MINUTE)
  const closeNote = () => handleNoteSelect(null)

  return (
    <main className="flex-grow bg-background content-center">
      <Card className="h-full w-full rounded-none">
        <Show condition={!!selectedNote?.id} fallback={<Fallback />}>
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3">
              <Button size="sm" variant="destructive" onClick={closeNote}>
                <X />
              </Button>

              <input
                type="text"
                defaultValue={selectedNote?.title}
                onChange={handleTitleChangeDebounced}
                className="text-xl border-none outline-0"
                placeholder="Give a title to your note :p"
              />
            </CardTitle>

            <div className="space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Pin />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="font-semibold text-sm">
                  Pin your note
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <PenBoxIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="font-semibold text-sm">
                  Edit mode
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Paperclip />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="font-semibold text-sm">
                  Add a media
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Download />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="font-semibold text-sm">
                  Download it!
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="icon" className="ml-4">
                    <Save />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="font-semibold text-sm">
                  Can't save on your device :/
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="secondary" size="icon">
                    <CloudOffIcon />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="font-semibold text-sm">
                  Can't sync within cloud :/
                </TooltipContent>
              </Tooltip>
            </div>
          </CardHeader>

          <CardContent>
            <TipTap />
          </CardContent>
        </Show>
      </Card>
    </main>
  )
}
