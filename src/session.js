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
    window.location.assign(`game?id=${roomId}`)
  }
  return (
    <div>
      <div className="home">
      <div className="home-header">
        <h1>Welcome to Tic-tac-toe online</h1>
      </div>
      <div className="home-body">
          {showjoinRoom?<div>
            <form>
              <label htmlFor="roomid">RoomId</label>
              <input value={roomId} onChange={(e)=>{updateId(e)}}/>
              <button type="button" onClick={()=>{joinRoom()}}>Join</button>
            </form>
          </div>:<div>
              <form>
              <label htmlFor="player1">Name of player1</label>
            <input 
            type="text" 
            name="player1" 
            value={names.player1}
            id="player1"
            onChange={(e)=>setPlayerName(e)}
            required={true}/><br/>
            <label htmlFor="player2">Name of player2</label>
            <input 
            type="text" 
            name="player2" 
            value={names.player2}
            id="player2"
            onChange={(e)=>setPlayerName(e)}
            required={true}
            /><br/>
            <button
            type="button"
            onClick={()=>{send()}}
            >
              create room
            </button>
            <button 
            type="button"
            onClick={()=>{updateShowJoinRoom(!showjoinRoom)}}>Join Room</button>
        </form>
            </div>}
      </div>
    </div>
    </div>
  )
}

export default Session
