
export default async function FetchCar(skip:number, limit:number){
    const res = await fetch(`${process.env.CAR_BASE_URL}/cars?skip=${skip}&limit=${limit}`);

    const data = await res.json();
    return data;
}