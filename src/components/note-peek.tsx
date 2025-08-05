import type { Note } from "@/db";
import { Ellipsis, Pin, Trash } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuGroup } from "./ui/dropdown-menu";
import { useNote } from "@/hooks/useNote";

interface NotePeekProps {
  note: Note
}

const TWO_MINUTES = 120000;

export function NotePeek({ note }: NotePeekProps) {
  const { deleteNote } = useNote();

  const createdAt = new Date(Number(note.createdAt));
  const timeDiff = Date.now() - createdAt.getTime();
  const shouldShowBadge = timeDiff <= TWO_MINUTES;
  
  const [isNear, setIsNear] = useState<boolean>(shouldShowBadge);

  // Debug log
  console.log(`NotePeek - Note ID: ${note.id}, Created: ${createdAt.toLocaleString()}, TimeDiff: ${Math.floor(timeDiff/1000)}s, ShowBadge: ${shouldShowBadge}`);

  useEffect(() => {
    const currentTimeDiff = Date.now() - createdAt.getTime();
    const timeRemaining = TWO_MINUTES - currentTimeDiff;
    
    console.log(`useEffect - Note ID: ${note.id}, TimeRemaining: ${Math.floor(timeRemaining/1000)}s`);
    
    if (timeRemaining > 0) {
      const timerId = setTimeout(() => {
        console.log(`Timeout executed - Note ID: ${note.id} - Setting badge to false`);
        setIsNear(false);
      }, timeRemaining);

      return () => clearTimeout(timerId);
    } else {
      // Se a nota já passou de 2 minutos, garante que isNear seja false
      setIsNear(false);
    }
  }, [note.id, createdAt.getTime()]);

  return (
    <div className="flex flex-col items-start h-fit p-4 border border-border bg-card rounded-lg">
      <header className="flex justify-between w-full">
        <div className="space-x-1.5 font-semibold text-lg line-clamp-1">
          {note.isPined && <Pin className="size-4.5 inline" />}
          <span>{note.title}</span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="h-7 w-7 rounded-sm">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Pin /> Pin
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deleteNote(note.id)}>
                <Trash /> Trash
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <span className="line-clamp-2 my-2">
        {note.content}
      </span>

      <footer className="flex items-center justify-between w-full mt-1">
        <div className="flex gap-2">
          {isNear && (
            <Badge>New note</Badge>
          )}
        </div>

        <span className="text-xs opacity-80">
          {createdAt.toDateString()}
        </span>
      </footer>
    </div>
  );
}