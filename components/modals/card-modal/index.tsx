import { Dialog,DialogTrigger,DialogContent } from "@/components/ui/dialog"
import { useCardModal } from "@/hooks/use-card-model"



const CardModal = () => {
  const id = useCardModal((state)=>state.id)
  const isOpen = useCardModal((state)=>state.isOpen)
  const onClose = useCardModal((state)=>state.onClose)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            I am a model
        </DialogContent>
    </Dialog>
  )
}

export default CardModal