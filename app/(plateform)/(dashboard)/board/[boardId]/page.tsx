
interface Params {
  params : Record<string, string>
} 

const BoardIdPage = ({params} : Params) => {
  return (
    <div className="text-xl text-white bg-black/10 w-fit ml-4 h-20 flex items-center justify-center">
        {params.boardId}
    </div>
  )
}

export default BoardIdPage