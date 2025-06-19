
import "../globals.css"
export default function BlogLayout(
    {children}:{children: React.ReactNode}
){
    return(
        <div>
            <h1 className="bg-red-500">This is blog Layout</h1>
            {children}
        </div>
    )
}