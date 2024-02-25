import { Card, CardHeader, CardFooter, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

import React from "react";

const SkeletonCard: React.FC = () => {
  return (
    <div className="w-72 p-4 rounded-3xl">
      <Card className="flex flex-col justify-between ">
        {" "}
        <CardHeader className="flex-row gap-4 items-center">
          <Skeleton className="w-3/4 h-40  border border-gray-900" />{" "}
        </CardHeader>{" "}
        <CardContent>
          <Skeleton className="h-4 w-1/2 flex-grow mt-2" />
          <Skeleton className="h-4 w-3/4 flex-grow mt-2" />
          <Skeleton className="h-4 w-3/4 flex-grow mt-2" />
          <Skeleton className="h-4 w-3/4 flex-grow mt-2" />
          <Skeleton className="h-4 w-3/4 flex-grow mt-2" />{" "}
        </CardContent>
      </Card>
    </div>
  );
};

export default SkeletonCard;
