import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useNote } from "@/hooks/useNote";
import { useTransition } from "react";

export function NewNote() {
  const [isPending, startTransition] = useTransition();
  const { createNote } = useNote();

  const handleClick = () => {
    
    startTransition(async () => {
      await createNote();
    });    
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          disabled={isPending}
          onClick={handleClick}
          className="disabled:cursor-not-allowed"
        >
          <Plus />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="font-semibold text-sm">
        Create a note
      </TooltipContent>
    </Tooltip>
  );
}