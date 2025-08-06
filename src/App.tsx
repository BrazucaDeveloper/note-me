import { Aside } from './components/aside'
import { Editor } from './components/editor'
import { NoteProvider } from './components/note/note-context'
import { SidebarProvider } from './components/ui/sidebar'

export default function App() {
  return (
    <NoteProvider>
      <SidebarProvider>
        <div className="flex h-dvh w-dvw subpixel-antialiased">
          <Aside />
          <Editor />
        </div>
      </SidebarProvider>
    </NoteProvider>
  )
}
