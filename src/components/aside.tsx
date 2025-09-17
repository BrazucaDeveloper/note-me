import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react'
import User from 'lucide-react/dist/esm/icons/user'
import { Logo } from './logo'
import { MyNotes } from './note'
import { NoteSearch } from './note/note-search'
import { Button } from './ui/button'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from './ui/sidebar'

export function Aside() {
  return (
    <Sidebar className="p-2 *:bg-background bg-background">
      <SidebarHeader>
        <div className="flex items-center justify-between p-3 bg-card rounded-md ring ring-foreground/15">
          <Logo />
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant='secondary' size="icon">
                <User />
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              showName
              appearance={{
                elements: {
                  userButtonBox:
                    'px-4 py-3 rounded-lg bg-secondary/70 *:text-primary *:font-medium hover:bg-primary hover:*:text-primary-foreground transition-colors w-full border border-border',
                },
              }}
            />
          </SignedIn>
        </div>
        <NoteSearch />
      </SidebarHeader>

      <SidebarContent>
        <MyNotes />
      </SidebarContent>
    </Sidebar>
  )
}
