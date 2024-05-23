import ActivityItem from '@/components/activity-item'
import { Skeleton } from '@/components/ui/skeleton'
import { AuditLog } from '@prisma/client'
import { ActivityIcon } from 'lucide-react'
import React from 'react'

interface ActivityProps {
    data: AuditLog[]
}

const Activity = ({data}: ActivityProps) => {
  return (
    <div className='flex items-start gap-x-3 w-full'>
        <ActivityIcon className='w-4 h-4 mt-0.5 text-neutral-700 '/>
        <div className='w-full'>
        Activity
        <p
        className='font-semibold text-neutral-700 mb-2'
        >
            <ol className='mt-2 space-y-4'>
            { data.map((item, index)=>(
                <ActivityItem
                key={item.id}
                data={item}
                />
            ))

            }
            </ol>
        </p>
        </div>
    </div>
  )
}


Activity.Skeleton = function ActivitySkeleton (){

    return(
        <div className="flex items-start gap-x-3 w-full">
        <Skeleton className="bg-neutral-200 h-6 w-6" />
        <div className="w-full ">
            <Skeleton className="bg-neutral-200 mb-2 h-6 w-24" />
            <Skeleton className="bg-neutral-200 h-10 w-full" />
        </div>
    </div>
    )
}

export default Activity