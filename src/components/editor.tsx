import { PenBoxIcon, Paperclip, Download, CloudOffIcon } from "lucide-react";
import Tiptap from "./TipTap";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";

export function Editor() {
	return (
		<main className="flex-grow bg-background content-center">
			<Card className="h-full w-full rounded-none">
				<CardHeader className="flex items-center justify-between">
					<CardTitle
						contentEditable
						className="flex items-center gap-2 text-2xl"
					>
						Give a title to your note :p
					</CardTitle>

					<div className="space-x-2">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon">
									<PenBoxIcon />
								</Button>
							</TooltipTrigger>
							<TooltipContent className="font-semibold text-sm">
								Edit mode
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon">
									<Paperclip />
								</Button>
							</TooltipTrigger>
							<TooltipContent className="font-semibold text-sm">
								Add a media
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="outline" size="icon">
									<Download />
								</Button>
							</TooltipTrigger>
							<TooltipContent className="font-semibold text-sm">
								Download it!
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button variant="secondary" size="icon" className="ml-2">
									<CloudOffIcon />
								</Button>
							</TooltipTrigger>
							<TooltipContent className="font-semibold text-sm">
								Can't sync within cloud :/
							</TooltipContent>
						</Tooltip>
					</div>
				</CardHeader>

				<CardContent>
					<Tiptap />
				</CardContent>
			</Card>
		</main>
	);
}
