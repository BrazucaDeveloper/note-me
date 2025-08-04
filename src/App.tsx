import { Aside } from "./components/aside";
import { Editor } from "./components/editor";
import { SidebarProvider } from "./components/ui/sidebar";

export default function App() {
	return (
		<SidebarProvider>
			<div className="flex h-dvh w-dvw">
				<Aside />
				<Editor />
			</div>
		</SidebarProvider>
	);
}
