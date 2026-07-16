import { useEffect,useState } from "react";
import { fetchStats } from "./api";

import {
Chart as ChartJS,
ArcElement,
Tooltip,
Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement,Tooltip,Legend);

export default function AdminStats(){

const [stats,setStats] = useState(null)

useEffect(()=>{

async function load(){

const data = await fetchStats()

setStats(data)

}

load()

},[])

if(!stats) return <p>Loading...</p>

const data = {

labels:["Users","Books","Downloads","Favorites"],

datasets:[{
data:[
stats.users,
stats.books,
stats.downloads,
stats.favorites
]
}]

}

return(

<div className="bg-white p-6 shadow mb-6">

<h2 className="font-bold mb-4">Library Stats</h2>

<Pie data={data}/>

</div>

)

}