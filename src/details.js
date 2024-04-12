import { useState,useEffect } from "react"
import { useSearchParams } from "react-router-dom"

function Details(){
    let [x,setX] = useSearchParams()
    let [data,setData] = useState(null)
    console.log(x)
    useEffect(()=>{
        var imf = async()=>{
            var res = await fetch(`https://tictactoebc.onrender.com/details?id=${x.get("id")}`)
            var resData = await res.json()
            console.log(resData)
            setData(resData)
        }
        imf()
    },[x])
    function start(){
        window.location.assign(`game?id=${data._id}`)
    }

    function copyToClipBoard(){
        navigator.clipboard.writeText(data._id)
    }
    return (
        <div className="flex justify-center mt-80">
            <div>
            <h1 className="font-mono mb-2 underline">Room Details</h1>
            {data === null ? 'Loading.......':
            <div className="font-mono">
                <p>Room Id - <input className="border-2 w-60 pl-1 rounded-md" value={data._id} disabled/><button onClick={copyToClipBoard} className="ml-2 border rounded w-18 bg-gray-300 active:bg-green-500 p-1 text-sm">Copy!</button></p>
                <p>Player1 - {data.player1}</p>
                <p>Player2 - {data.player2}</p>
                <button className="border w-1/4 bg-green-400
            rounded text-slate-900 font-mono text-xs h-7 mt-4
            hover:border-green-900
            " onClick={()=>{start()}}>Tap to start</button>    
            </div>}
            </div>
        </div>
    )
}


export default Details
