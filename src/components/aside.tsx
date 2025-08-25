import { AlertOctagon, Apple, Github } from 'lucide-react'
import { Logo } from './logo'
import { MyNotes } from './note'
import { NewNote } from './note/new-note'
import { ToggleTheme } from './toggle-theme'
import { Alert, AlertDescription, AlertTitle } from './ui/alert'
import { Button } from './ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from './ui/sidebar'
import { NoteSearch } from './note/note-search'

export function Aside() {
  return (
    <Sidebar className="p-2 *:bg-background bg-background">
      <SidebarHeader>
        <div className="flex items-center justify-between p-3 bg-card rounded-md ring ring-foreground/15">
          <Logo />
          <ToggleTheme />
        </div>
        <div className="flex gap-2 mt-2">
          <NoteSearch />
          <NewNote />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <MyNotes />
      </SidebarContent>

      <SidebarFooter>
        <Alert>
          <AlertOctagon />
          <AlertTitle>
            Connect your account to sync your notes with cloud.
          </AlertTitle>

          <AlertDescription>
            <p>You can connect your account to sync your note with...</p>
            <ul className="mt-2 flex items-center gap-3 text-sm">
              <li>
                <Button size="sm" variant="outline">
                  <span className="font-bold text-lg">G</span> Google
                </Button>
              </li>
              <li>
                <Button size="sm" variant="outline">
                  <Github /> Github
                </Button>
              </li>
              <li>
                <Button size="sm" variant="outline">
                  <Apple /> Apple
                </Button>
              </li>
            </ul>
          </AlertDescription>
        </Alert>
      </SidebarFooter>
    </Sidebar>
  )
}
