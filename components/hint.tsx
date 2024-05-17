import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface HintProps {
    children : React.ReactNode;
    description: string;
    side?: "left" | "right" | "top" | "bottom";
    sideOffset?: number
}


const Hint = ({
    children,
    description,
    side = "bottom",
    sideOffset
} : HintProps) => {
  return (
    <TooltipProvider>
        <Tooltip delayDuration={0} >
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent
            sideOffset={sideOffset}
            side={side}
            className='text-xs max-w-[200px] break-words bg-slate-50 p-1 rounded-sm'
            >{description}</TooltipContent>
        </Tooltip>
    </TooltipProvider>
  )
}

export default Hint