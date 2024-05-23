
import {format} from 'date-fns'
import { generateLogMessage } from '@/lib/generate-log-message'
import { AuditLog } from '@prisma/client'
import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar';

interface ActivityItemProps  {
   data:AuditLog 
}

const ActivityItem = ({data}: ActivityItemProps) => {
    
    return (
        <li className="flex items-center gap-x-2">
            <Avatar className="h-8 w-8">
                <AvatarImage src={data.userImage} />
            </Avatar>
            <div className="flex flex-col space-y-0.5">
                <p className="text-sm text-muted-foreground">
                    <span className="font-semibold lowercase text-neutral-700">
                        {data.userName}
                    </span>
                    {" " + generateLogMessage(data).toLowerCase()}
                </p>
                <p className="text-sm text-muted-foreground">
                    {format(new Date(data.createdAt), "dd MMM yyyy 'at' H:mm ")}
                </p>
            </div>
        </li>
    );
};

export default ActivityItem