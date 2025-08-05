import { Label } from "./ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import { Input } from "./ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "./ui/button";

export function MyAccount() {
  return (
    <Popover>
      <div className="border border-border flex items-center justify-between p-3 rounded-md mt-3 bg-card">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-9 w-9 rounded-lg ring ring-card-foreground">
            <AvatarImage
              className="object-cover"
              src="https://images.pexels.com/photos/4349862/pexels-photo-4349862.jpeg"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="text-left -space-y-2">
            <h5 className="font-semibold">Username</h5>
            <span className="text-sm">email@example.com</span>
          </div>
        </div>
        <PopoverTrigger asChild>
          <Button size="icon" variant="secondary">
            <ChevronsUpDown className="stroke-[1.5px] size-5" />
          </Button>
        </PopoverTrigger>
      </div>

      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Dimensions</h4>
            <p className="text-muted-foreground text-sm">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Width</Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}