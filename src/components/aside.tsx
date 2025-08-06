import { Logo } from './logo'
import { MyAccount } from './my-account'
import { MyNotes } from './note'
import { NewNote } from './note/new-note'
import { ToggleTheme } from './toggle-theme'
import { Input } from './ui/input'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from './ui/sidebar'

export function Aside() {
  return (
    <Sidebar className="p-2 *:bg-background">
      <SidebarHeader>
        <div className="flex items-center justify-between p-3 bg-card rounded-md ring ring-foreground/15">
          <Logo />
          <ToggleTheme />
        </div>
        <div className="flex gap-2 mt-2">
          <Input placeholder="Search your notes...." />
          <NewNote />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <MyNotes />
      </SidebarContent>

      <SidebarFooter>
        <MyAccount />
      </SidebarFooter>
    </Sidebar>
  )
}
