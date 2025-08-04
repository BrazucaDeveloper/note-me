import { Contrast } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

export function ToggleTheme() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary" size="icon">
          <Contrast />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="font-semibold text-sm">
        Toggle theme
      </TooltipContent>
    </Tooltip>
  );
}