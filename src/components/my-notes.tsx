import { EllipsisVertical } from "lucide-react";
import { Button } from "./ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

export function MyNotes() {
	return (
		<ScrollArea className="h-96">
			<div className="pr-4 space-y-4">
				{Array.from({ length: 25 }).map((_, index) => (
					<Card className="gap-2" key={index}>
						<CardHeader className="flex items-center justify-between mb-1">
							<CardTitle className="text-xl">Title of note</CardTitle>
							<Button variant="secondary" size="icon">
								<EllipsisVertical />
							</Button>
						</CardHeader>

						<CardContent>
							<p className="opacity-75 line-clamp-2 text-ellipsis max-w-full overflow-hidden">
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
								modi rerum minus, quas est necessitatibus in, ab, fugiat earum rem
								beatae libero doloribus repellat placeat nobis expedita deserunt
								illo deleniti.
							</p>
						</CardContent>

						<CardFooter>
							<Badge>Mark</Badge>
						</CardFooter>
					</Card>
				))}
			</div>
		</ScrollArea>
	);
}
