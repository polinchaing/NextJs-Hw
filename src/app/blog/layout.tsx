
import { Suspense } from "react"
import "../globals.css"
import Loading from "./loading"

export default function BlogLayout(
    {children}:{children: React.ReactNode}
){
    return(
        <div className="flex justify-center items-center">
            <Suspense fallback={<Loading/>}>
                {children}
            </Suspense>
            
        </div>
    )
}