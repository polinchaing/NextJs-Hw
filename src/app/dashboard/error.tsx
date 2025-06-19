'use client'

import { useEffect } from "react";

// import { Divide } from "lucide-react"

// const ErrorHandler = (
//     {
//         error, 
//         reset
//     }:({
//         error:Error,
//         reset: ()=>void
//     })
// )=>(
//     <main>
//         <h1>{error?.message}</h1>
//         <button onClick={reset}>Reset</button>
//     </main>
// )

// export default ErrorHandler;


export default function Error({
    error,
    reset
}:(
    {error:Error,
    reset: ()=>void;}
)){

    useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
     return(
        <div>
            <h1>Something went wrong</h1>
            <button onClick={reset}>Try again</button>
        </div>
     )
}