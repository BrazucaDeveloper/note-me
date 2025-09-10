import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react'
import { Cloud } from 'lucide-react'
import { Logo } from './logo'
import { MyNotes } from './note'
import { NoteSearch } from './note/note-search'
import { ToggleTheme } from './toggle-theme'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from './ui/sidebar'
import { Card } from './ui/card'

export function Aside() {
  return (
    <Sidebar className="p-2 *:bg-background bg-background">
      <SidebarHeader>
        <div className="flex items-center justify-between p-3 bg-card rounded-md ring ring-foreground/15">
          <Logo />
          <ToggleTheme />
        </div>
        <NoteSearch />
      </SidebarHeader>

      <SidebarContent>
        <MyNotes />
      </SidebarContent>

      <SidebarFooter>
        <SignedOut>
          <SignInButton mode="modal">
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition w-full justify-center"
            >
              <Cloud className="w-5 h-5" />
              <span>Sincronize suas notas na nuvem</span>
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            showName
            appearance={{
              elements: {
                userButtonBox: 'px-4 py-3 rounded-lg bg-secondary/70 *:text-primary *:font-medium hover:bg-primary hover:*:text-primary-foreground transition-colors w-full border border-border', 
              },
            }}
         />
        </SignedIn>
      </SidebarFooter>
    </Sidebar>
  )
}
