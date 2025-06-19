export default function DashbaordLayout({
    children
}:(
    {
        children: React.ReactNode
    }

)){
    return (
        <div>
              {/* <Error error={undefined} reset={new Error)}> */}
                {children}
              {/* </Error> */}
        </div>
    )
}