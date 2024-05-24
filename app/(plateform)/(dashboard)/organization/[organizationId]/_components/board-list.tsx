import FormPopover from "@/components/form/form-popover"
import Hint from "@/components/hint"
import { Skeleton } from "@/components/ui/skeleton"
import { MAX_FREE_BOARDS } from "@/constants/boards"
import prisma from "@/lib/db"
import { getAvailableCount } from "@/lib/org-limit"
import { auth } from "@clerk/nextjs/server"
import { HelpCircle, User2 } from "lucide-react"
import Link from "next/link";
import { redirect } from "next/navigation"
import BoardOptions from "../../../board/[boardId]/_components/board-options"
import { checkSubscription } from "@/lib/subscription"


const BoardList = async() => {
    const {orgId} = auth()
    const isPro = await checkSubscription()

    if(!orgId){
		return redirect("/select-org");
    }

    const boards = await prisma.board.findMany({
        where:{
            orgId
        },
        orderBy:{
            createdAt:"desc"
        }
    })


    const availableCounts = await getAvailableCount()

  return (
    <div className="space-y-4">
        <div className="flex items-center font-semibold text-lg gap-x-2">
            <User2/>
            Your Boards
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {boards.map((board)=>(
                <div
                    key={board.id}
                    className="group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700 rounded-sm h-full w-full p-2 overflow-hidden"
                    style={{
                        backgroundImage: `url(${board.imageThumbUrl})`
                    }}
                    
                    >  
                    <div className="absolute right-1 top-1 z-10" >
                        <BoardOptions id={board.id}/>
                    </div>
                    <Link
                    href={`/board/${board.id}`}
                    >
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />

                    <p className="relative font-semibold text-white">
                        {board.title}
                    </p>
                    </Link>
                </div>
            ))}
            <FormPopover side="right" sideOffset={10}>
            <div 
                className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition"
                role="button"
                >
                <p className="text-sm">Create new board</p>
                <span className="text-xs">
                {isPro ? "Unlimited" : `${MAX_FREE_BOARDS - availableCounts} remaining`}
                </span>
                <Hint
                description={`Free Workspaces can gave up to 5 open boards. For unlimited workspaces, please upgrade to Pro.`}
                sideOffset={40}
                >
                    <HelpCircle className="absolute bottom-2 right-2 h-[14px]  w-[14px]"/>
                </Hint>
            </div>
            </FormPopover>
        </div>
    </div>
  )
}

BoardList.Skeleton = function boardSkeleton (){
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <Skeleton className="aspect-video h-full w-full p-2" />
            <div className="bg-black/5 rounded-sm aspect-video h-full w-full p-2"/>
            <div className="bg-black/5 rounded-sm aspect-video h-full w-full p-2"/>
            <div className="bg-black/5 rounded-sm aspect-video h-full w-full p-2"/>
            <div className="bg-black/5 rounded-sm aspect-video h-full w-full p-2"/>
        </div>
    )
}

export default BoardList