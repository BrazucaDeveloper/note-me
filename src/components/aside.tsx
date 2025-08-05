import { Logo } from "./logo";
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarFooter
} from "./ui/sidebar";
import { MyNotes } from "./my-notes";
import { ToggleTheme } from "./toggle-theme";
import { MyAccount } from "./my-account";
import { Input } from "./ui/input";
import { NewNote } from "./new-note";

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
	);
}
