import Plus from "lucide-react/dist/esm/icons/plus";
import { Button } from "../ui/button";
import { useTag } from "@/hooks/use-tag";
import { ScrollArea } from "../ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { useDebounce } from "@/hooks/use-debounce";
import { useRef } from "react";
import { getNoteContext } from "../../context/note-context";
import { Hash, Trash } from "lucide-react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "../ui/context-menu";

export function MyTags() {
    const inputRef = useRef<HTMLInputElement>(null);
    const { handleTagsSelected, selectedTags } = getNoteContext();
    const { tags, createTag, updateTag, removeTag } = useTag();

    const handleTagDoubleClick = () => {
        if (!inputRef.current) return;
        inputRef.current.disabled = false;
        inputRef.current.focus();
    };

    const handleValueChange = (value: string[]) => {
        const isNoneFirstAndOnlyTagSelected =
            value.length === 1 && value[0] === "none";
        const isNoneLastTagSelected =
            value.length > 1 && value[value.length - 1] === "none";

        if (isNoneFirstAndOnlyTagSelected || isNoneLastTagSelected) {
            handleTagsSelected(["none"]);
        } else {
            const indexOfNoneTag = value.indexOf("none");
            if (indexOfNoneTag !== -1) value.splice(indexOfNoneTag, 1);
            handleTagsSelected(value);
        }
    };

    const updateTitle = async () => {
        if (!inputRef.current) return;
        await updateTag(Number(inputRef.current.name), inputRef.current.value);
        inputRef.current.disabled = true;
        inputRef.current.blur();
    };

    const updateTitleDebounced = useDebounce(updateTitle, 2000);

    return (
        <div className="flex gap-2.5 items-center">
            <Button
                size="sm"
                variant="outline"
                className="h-6.25 mr-1"
                onClick={() => createTag("example")}
            >
                <Plus />
            </Button>

            <ScrollArea>
                <ul className="flex items-center gap-2">
                    <ToggleGroup
                        size="sm"
                        spacing={2}
                        type="multiple"
                        variant="outline"
                        className="*:rounded-full *:h-7 *:px-4"
                        onValueChange={handleValueChange}
                        value={selectedTags || undefined}
                    >
                        <ToggleGroupItem value="none">#none</ToggleGroupItem>
                        {tags?.map((tag) => (
                            <ToggleGroupItem
                                key={tag.cid}
                                value={tag.title}
                                onDoubleClick={handleTagDoubleClick}
                                // data-state={
                                //     selectedTags?.includes(tag.title)
                                //         ? "on"
                                //         : "off"
                                // }
                            >
                                <ContextMenu>
                                    <ContextMenuTrigger>
                                        <Hash className="inline" />
                                        <input
                                            disabled
                                            type="text"
                                            ref={inputRef}
                                            aria-label="tag-name"
                                            defaultValue={tag.title}
                                            name={tag.cid.toString()}
                                            onChange={updateTitleDebounced}
                                            className="-ml-0.5 italic max-w-18 pointer-events-none outline-none focus:outline-none"
                                        />
                                    </ContextMenuTrigger>
                                    <ContextMenuContent>
                                        <ContextMenuItem
                                            variant="destructive"
                                            onClick={() => removeTag(tag.cid)}
                                        >
                                            <Trash /> Trash
                                        </ContextMenuItem>
                                    </ContextMenuContent>
                                </ContextMenu>
                            </ToggleGroupItem>
                        ))}
                    </ToggleGroup>
                </ul>
            </ScrollArea>
        </div>
    );
}
