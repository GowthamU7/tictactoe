import { useState } from "react"
import Game from "./game"
import "./App.css"
function Session(){
  let [names,setNames] = useState({player1:'',player2:''})
  let [showjoinRoom,updateShowJoinRoom] = useState(false)
  let [roomId,setRoomId] = useState('')
  function setPlayerName(e){
    if(e.target.id === 'player1'){
      setNames({player1:e.target.value,player2:names.player2})
    }else{
      setNames({player1:names.player1,player2:e.target.value})
    }
  }
  function send(){
    if(names.player1!=='' && names.player2!==''){
      fetch('https://tictactoebc.onrender.com/create/',
      {body:JSON.stringify({player1:names.player1,player2:names.player2}),method:"POST"}).then((res)=>{
        res.json().then((data)=>{
            setTimeout(()=>{
                window.location.assign(`details?id=${data.gameId}`)
            },300)
        })
      })
    }
    else alert('Please provide player names')
  }
  function updateId(e){
    let vl = e.target.value
    setRoomId(vl)
  }
  function joinRoom(){
    if(roomId === "") return alert('Missing roomId')
    window.location.assign(`game?id=${roomId}`)
  }
  return (
    <div className="flex justify-center mt-80">
      <div className="font-sans">
      <div className="home-header m-5 font-mono">
        <h1 className="text-xl m-7">Tictactoe Multiplayer</h1>
      </div>
      <div className="home-body m-5">
          {showjoinRoom?<div>
            <form>
              <label htmlFor="roomid" className="font-serif text-xs"></label>
              <input className="border ml-8 border-sky-300 border-rounded rounded-md pl-3
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              placeholder:italic
            placeholder:text-sm
            "
            placeholder="Room-Id"
            value={roomId} onChange={(e)=>{updateId(e)}}/>
              <div className="flex jusity-center">
                <button className="ml-28 mt-5 border bg-green-400 w-1/4 rounded text-slate-900 font-mono text-sm h-8" type="button" onClick={()=>{joinRoom()}}>Join</button>
            
              </div>
              </form>
          </div>:<div className="m-5">
              <form>
              <label htmlFor="player1" className="font-mono text-sm"></label>
            <input 
            type="text" 
            name="player1" 
            value={names.player1}
            id="player1"
            onChange={(e)=>setPlayerName(e)}
            required={true}
            className="border m-2 border-sky-300 border-rounded rounded-md pl-3
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            placeholder:italic
            placeholder:text-sm
            "
            placeholder="Name of player1"
            /><br/>
            <label htmlFor="player2" className="font-serif text-xs"></label>
            <input 
            type="text" 
            name="player2" 
            value={names.player2}
            id="player2"
            onChange={(e)=>setPlayerName(e)}
            required={true}
            className="border m-2 border-sky-300 border-rounded rounded-md pl-3
            focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
            placeholder:italic
            placeholder:text-sm
            "
            placeholder="Name of player2"
            /><br/>
            <div className="flex  h-7 justify-evenly mt-3">
            <button
            type="button"
            onClick={()=>{send()}}
            className="border w-1/3 bg-green-400
            rounded text-slate-900 font-mono text-xs
            hover:border-green-900
            "
            >
              create
            </button>
            <button 
            className="border w-1/3 bg-green-400
            rounded text-slate-900 font-mono text-xs
            hover:border-green-900
            "
            type="button"
            onClick={()=>{updateShowJoinRoom(!showjoinRoom)}}>Join</button>
            </div>
        </form>
            </div>}
      </div>
    </div>
    </div>
  )
}

export default Session
