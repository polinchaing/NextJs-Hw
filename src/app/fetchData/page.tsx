import prisma from '@/lib/prisma';
import React from 'react'
interface type{
    id: number;
    name: string;
    description: string;
}
async function page() {
    // const res =  await fetch("https://nham-ey.istad.co/food-items?sort_by=relevance")
    // const data:type[] = await res.json();
    // console.log(data)
    // fetching with database by using prisma
    const data = await prisma.food_item.findMany();
  return (
   <>
    {
        data.map((post:type)=>(
            <li key={post.id}>
                <h1>{post.name}</h1>
                <h1>{post.description}</h1>
            </li>
        ))
    }
   </>
  )
}

export default page
