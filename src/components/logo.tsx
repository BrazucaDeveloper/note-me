import { Sprout } from "lucide-react";

export function Logo() {
	return (
		<div className="flex items-center gap-2">
			<Sprout className="box-content bg-foreground p-0.5 rounded text-background stroke-[1.5px]" />
			<h4 className="">Note.me</h4>
		</div>
	);
}
