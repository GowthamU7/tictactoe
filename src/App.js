import { useState } from "react"
import Game from "./game"
import "./App.css"
function App(){
  let [names,setNames] = useState({player1:'',player2:''})
  let [show,setShow] = useState(false)
  function setPlayerName(e){
    if(e.target.id === 'player1'){
      setNames({player1:e.target.value,player2:names.player2})
    }else{
      setNames({player1:names.player1,player2:e.target.value})
    }
  }
  function send(){
    if(names.player1!=='' && names.player2!=='') setShow(!show)
    else alert('Please provide player names')
  }
  return (
    <div>
      {!show?
      <div className="home">
      <div className="home-header">
        <h1>Welcome to Tic-tac-toe online</h1>
      </div>
      <div className="home-body">
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
            <button type="submit" onClick={()=>send()}>Enter Game</button>
        </form>
      </div>
    </div>:<div><Game props = {names}/></div>}
    </div>
  )
}


export default App