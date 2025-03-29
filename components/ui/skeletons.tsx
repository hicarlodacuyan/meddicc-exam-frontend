import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "@heroicons/react/24/outline";

export function TasksListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card key={index} className="bg-white shadow-sm">
          <CardHeader className="flex justify-between items-start">
            <CardTitle className="text-xl font-semibold">
              <Skeleton className="h-6 w-3/4 rounded-md" />
            </CardTitle>
            <div className="space-x-2 flex gap-1">
              <Button type="button" size="icon" variant="secondary" disabled>
                <PencilIcon className="w-5" />
              </Button>
              <Button type="button" size="icon" variant="destructive" disabled>
                <span className="sr-only">Delete</span>
                <Skeleton className="h-5 w-5 rounded-full" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-2/3 rounded-md" />
              <Skeleton className="h-3 w-1/2 rounded-md" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
