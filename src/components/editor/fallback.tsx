import { Apple, Github, Import, Sprout } from 'lucide-react'
import { NewNote } from '../note/new-note'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export function Fallback() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 size-full">
      <div className="opacity-80">
        <div className="flex flex-col items-center">
          <Sprout className="size-32 stroke-1" />
          <h1>Note.me</h1>
        </div>
        <p className="opacity-85 text-center">
          A place to sprout, grow and share your knowledge.
          <br />
          <strong>Continue with local sync</strong> creating a new note.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 w-full">
        <div className="space-x-4">
          <NewNote withTitle={true} variant="default" size="lg" />

          <Button variant="outline" size="lg">
            <Import /> Import from device
          </Button>
        </div>

        <div className="flex items-center justify-center w-24 mt-3 mb-1">
          <Separator className="bg-foreground/70" />
          <span className="px-2 text-nowrap">Or continue with cloud sync</span>
          <Separator className="bg-foreground/70" />
        </div>

        <div className="flex items-center gap-4">
          <Button size="lg" variant="outline">
            <span className="font-bold text-lg">G</span> Google
          </Button>
          <Button size="lg" variant="outline">
            <Github /> Github
          </Button>
          <Button size="lg" variant="outline">
            <Apple /> Apple
          </Button>
        </div>
      </div>
    </div>
  )
}
