import { Action, FieldErrors } from './../lib/create-safe-actions';
import { useCallback, useState } from "react";



interface UseActionOptions<TOutput> {
    onSuccess: (data:TOutput)=>void
    onError: (error:string)=>void
    onComplete: ()=>void
}  


export const useAction = <TInput, TOutput>(
    action: Action<TInput, TOutput>,
    options: UseActionOptions<TOutput>
) =>{

    const [error, setError] = useState<string | undefined>(undefined)
    const [data, setData] = useState<TOutput | undefined> (undefined)
    const [isLoading, setIsLoading] = useState<boolean> (false)
    const [fieldErrors, setFieldErrors] = useState<FieldErrors<TInput | undefined>>(undefined)

    const execute = useCallback(async (input : TInput) =>{
        setIsLoading(true)
        try {
            
            const result = await action(input)

            if(!result){
                return
            }

            setFieldErrors(result.fieldErrors)

            if(result.error){
                setError(result.error)
                options?.onError?.(result.error)
            }
            
            if(result.data){
                setData(result.data)
                options?.onSuccess?.(result.data)
            }


        } finally {
            
            setIsLoading(false)
            options?.onComplete?.()

        }
    },[options, action]
)

return {
    fieldErrors,
    error,
    data,
    isLoading,
    execute,
};
}