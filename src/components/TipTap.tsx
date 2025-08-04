import { useEditor, EditorContent } from "@tiptap/react";
import { FloatingMenu, BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Bold, Italic, Underline } from "lucide-react";

const Tiptap = () => {
	const editor = useEditor({
		extensions: [StarterKit], // define your extension array
		content:
			"<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet vel quibusdam quod sunt vero officia magni, earum ut ab odio fuga molestiae in rerum doloribus molestias esse nesciunt placeat omnis.</p>", // initial content
		editorProps: {
			attributes: {
				class: "outline-none",
			},
		},
	});

	return (
		<>
			<EditorContent editor={editor} />

			<FloatingMenu
				editor={editor}
				className="bg-background shadow-xl rounded-lg border border-foreground/30"
			>
				This is the floating menu
			</FloatingMenu>

			<BubbleMenu editor={editor} className="bg-background">
				<ToggleGroup variant="outline" type="multiple">
					<ToggleGroupItem value="bold" aria-label="Toggle bold">
						<Bold className="h-4 w-4" />
					</ToggleGroupItem>
					<ToggleGroupItem value="italic" aria-label="Toggle italic">
						<Italic className="h-4 w-4" />
					</ToggleGroupItem>
					<ToggleGroupItem
						value="strikethrough"
						aria-label="Toggle strikethrough"
					>
						<Underline className="h-4 w-4" />
					</ToggleGroupItem>
				</ToggleGroup>
			</BubbleMenu>
		</>
	);
};

export default Tiptap;
