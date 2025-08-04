import { Logo } from "./logo";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarFooter,
	SidebarGroupLabel,
	SidebarGroupContent,
} from "./ui/sidebar";
import { MyNotes } from "./my-notes";
import { ToggleTheme } from "./toggle-theme";
import { MyAccount } from "./my-account";
import { Input } from "./ui/input";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

export function Aside() {
	return (
		<Sidebar className="p-2 *:bg-background">
			<SidebarHeader>
				<div className="flex items-center justify-between p-4 bg-card rounded-md ring ring-foreground/15">
					<Logo />
					<ToggleTheme />
				</div>
				<div className="flex gap-2 mt-2">
					<Input placeholder="Search your notes...." />

					<Tooltip>
						<TooltipTrigger asChild>
							<Button size="icon" variant="secondary">
								<Plus />
							</Button>
						</TooltipTrigger>
						<TooltipContent className="font-semibold text-sm">
							Create a note
						</TooltipContent>
					</Tooltip>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel className="text-lg">Your notes</SidebarGroupLabel>
					<SidebarGroupContent className="flex-grow">
						<MyNotes />
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<MyAccount />
			</SidebarFooter>
		</Sidebar>
	);
}
