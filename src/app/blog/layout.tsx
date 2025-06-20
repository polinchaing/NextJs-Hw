
import { Suspense } from "react"
import "../globals.css"
import Loading from "./loading"
import StyledComponentsRegistry from "@/lib/registry"

export default function BlogLayout(
    {children}:{children: React.ReactNode}
){
    return(
        <div className="flex justify-center items-center">
              <StyledComponentsRegistry>
                <Suspense fallback={<Loading/>}>
                    {children}
                </Suspense>
        </StyledComponentsRegistry>
        </div>
    )
}