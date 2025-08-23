import {
  CloudOffIcon,
  Download,
  Paperclip,
  PenBoxIcon,
  Pin,
  Save,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { getNoteContext } from '../note/note-context'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { Fallback } from './fallback'
import Tiptap from './tip-tap'

export function Editor() {
  const { selectedNote, handleNoteSelect } = getNoteContext()
  const [title, setTitle] = useState(
    selectedNote?.title ?? 'Give a title to your note :p',
  )

  const handleTitleChange = (e: React.FormEvent<HTMLDivElement>) => {
    setTitle(e.currentTarget.textContent || '')
  }

  const closeNote = () => handleNoteSelect(null)

  return (
    <main className="flex-grow bg-background content-center">
      <Card className="h-full w-full rounded-none">
        {selectedNote === null ? (
          <Fallback />
        ) : (
          <>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3">
                <Button size="sm" variant="destructive" onClick={closeNote}>
                  <X />
                </Button>

                <span
                  contentEditable
                  onChange={handleTitleChange}
                  suppressContentEditableWarning
                  className="text-2xl outline-none"
                >
                  {title}
                </span>
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
              <Tiptap />
            </CardContent>
          </>
        )}
      </Card>
    </main>
  )
}
