import { useState } from 'react'
import './game.css'
function Game({props}){
    let name1 = props.player1
    let name2 = props.player2
    let [grid,setGrid] = useState([['','',''],['','',''],['','','']])
    let [filled,setFilled] = useState(0)
    let [decision,setDecision] = useState({declared:false,msg:''})
    let [tmp,setTmp] = useState('')
    function pressed(e){
        if(filled<9 && !decision.declared){
            plot(parseInt(e.target.id.split("_")[0]),parseInt(e.target.id.split("_")[1]))
            checWinner()
        }
        else{
            if(filled == 9){
                setDecision({declared:true,msg:"Its a draw"})
                alert(decision.msg)
            }
        }
    }
    function plot(r,c){
        var tmp_gd = grid
        if(tmp === ''){
            tmp_gd[r][c]='X'
            setTmp('X')
        }else{
            tmp_gd[r][c] = 'O'
            setTmp('')
        }
        setGrid(tmp_gd)
        filled++
        setFilled(filled)
    }
    function checWinner(){
        let tmp_dec = {declared:false,msg:''}
        for(let i=0;i<3;i++){
            if((grid[i][0]+grid[i][1]+grid[i][2]) === 'XXX' || (grid[i][0]+grid[i][1]+grid[i][2]) === 'OOO' ){
                tmp_dec.declared=true
                tmp_dec.msg = `${grid[i][0] === 'X'?name1:name2} is the winner.`
                break
            }
        }
        for(let j=0;j<3;j++){
            if((grid[0][j]+grid[1][j]+grid[2][j]) === 'XXX' || (grid[0][j]+grid[1][j]+grid[2][j]) === 'OOO' ){
                tmp_dec.declared=true
                tmp_dec.msg = `${grid[0][j] === 'X'?name1:name2} is the winner.`
                break
            }
        }
        if(grid[0][0]+grid[1][1]+grid[2][2] === 'XXX' || grid[0][0]+grid[1][1]+grid[2][2] === 'OOO'){
            tmp_dec.declared=true
            tmp_dec.msg = `${grid[0][0] === 'X'?name1:name2} is the winner.`
        }
        if(grid[0][2]+grid[1][1]+grid[2][0] === 'XXX' || grid[0][2]+grid[1][1]+grid[2][0] === 'OOO'){
            tmp_dec.declared=true
            console.log('0 2')
            tmp_dec.msg = `${grid[0][2] === 'X'?name1:name2} is the winner.`
        }
        if(filled >= 9){
            tmp_dec.declared=true
            tmp_dec.msg = `Its a draw.`
        }
        setDecision(tmp_dec)
    }
    function reserGrid(){
        setGrid([['','',''],['','',''],['','','']])
        setDecision({declared:false,msg:''})
        setTmp('')
        setFilled(0)
    }
    return(
        <div>
            <div className='header'>
                <h1>Tic Tac Toe</h1>
            </div>
            <div className="grid">
             <div className='names'>
             <p>{name1} (X) </p>  <p>{name2} (O)</p>
             </div>
            <p>{decision.msg === '' && filled>1?'You still have chance':decision.msg}</p>
            <div className="row1">
                <div id="0_0"
                onClick={(e)=>pressed(e)}>{grid[0][0]}</div>
                <div id="0_1"
                onClick={(e)=>pressed(e)}>{grid[0][1]}</div>
                <div id="0_2"
                onClick={(e)=>pressed(e)}>{grid[0][2]}</div>
            </div>
            <div className="row2">
                <div id="1_0"
                onClick={(e)=>pressed(e)}>{grid[1][0]}</div>
                <div id="1_1"
                onClick={(e)=>pressed(e)}>{grid[1][1]}</div>
                <div id="1_2"
                onClick={(e)=>pressed(e)}>{grid[1][2]}</div>
            </div>
            <div className="row3">
                <div id="2_0"
                onClick={(e)=>pressed(e)}>{grid[2][0]}</div>
                <div id="2_1"
               onClick={(e)=>pressed(e)}>{grid[2][1]}</div>
                <div id="2_2"
                onClick={(e)=>pressed(e)}>{grid[2][2]}</div>
            </div>
            <button onClick={()=>reserGrid()}>reset grid</button>
            </div>
        </div>
    )
}

export default Game