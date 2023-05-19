import { useState,useEffect } from "react"
import { useSearchParams } from "react-router-dom"

function Details(){
    let [x,setX] = useSearchParams()
    let [data,setData] = useState(null)
    console.log(x)
    useEffect(()=>{
        var imf = async()=>{
            var res = await fetch(`https://tictactoemultimp.onrender.com/details?id=${x.get("id")}`)
            var resData = await res.json()
            console.log(resData)
            setData(resData)
        }
        imf()
    },[x])
    function start(){
        window.location.assign(`game?id=${data._id}`)
    }
    return (
        <div>
            <h1>Welcome a room has been created .</h1>
            {data === null ? 'Loading.......':
            <div>
                <p>Room Id - <input value={data._id} disabled/></p>
                <p>Player1 - {data.player1}</p>
                <p>Player2 - {data.player2}</p>
                <button onClick={()=>{start()}}>Tap to start</button>    
            </div>}
        </div>
    )
}


export default Details