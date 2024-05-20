import prisma from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import ListContainer from "./_components/list-container"

interface Params {
  params : {
    boardId: string
  }
} 

const BoardIdPage = async({params} : Params) => {
  const {orgId} = auth()

  if(!orgId){
    redirect("/select-org")
  }

  const lists = await prisma.list.findMany({
    where:{
      boardId:params.boardId,
      board:{
        orgId,
      },
    },
    include:{
      cards:{
        orderBy:{
          order:"asc"
        }
      }
    },
    orderBy:{
      order:"asc"
    }
  })
  return (
    <div className="p-4 h-full overflow-x-auto scrollbar-thin ">
        <ListContainer
        boardId={params.boardId}
        data={lists}
        />
    </div>
  )
}

export default BoardIdPage