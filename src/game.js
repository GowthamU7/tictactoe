
import { useState } from 'react'
import './game.css'
function Game({props}){
    let [style,setStyle] = useState(0)
    let [grid,updateGrid] = useState([['','',''],['','',''],['','','']])
    let [points,setPoints] = useState({X:0,O:0})
    let [draw,setDraw] = useState([])
    async function updateG(r,c){
        var tmpG = grid
        if(tmpG[r][c] === ''){
            tmpG[r][c] = style === 0?'X':'O'
            updateGrid(tmpG)
            style === 0?setStyle(1):setStyle(0)
            setTimeout(()=>{
                let tmpdraw = draw
                let dec = checkWinner(grid)
                if(dec !== 'D'){
                    alert(`${dec === 'X'?props.player1:props.player2} won!`)
                    let tmpsc = points
                    tmpsc[dec]++
                    setPoints(tmpsc)
                    reset()
                    return;
                }else{
                    tmpdraw.push('D')
                    setDraw(tmpdraw)
                }
                if(draw.length === 9){
                    alert("It was a draw")
                    reset()
                    return
                }
            },200)
        }

    }

    function checkWinner(grid){
        for(let i=0;i<3;i++){
            if(grid[i][0]+grid[i][1]+grid[i][2] === 'XXX' || grid[i][0]+grid[i][1]+grid[i][2] === 'OOO') return grid[i][0]
        }
        for(let i=0;i<3;i++){
            if(grid[0][i]+grid[1][i]+grid[2][i] === 'XXX' || grid[0][i]+grid[1][i]+grid[2][i] === 'OOO') return grid[0][i]
        }
        if(grid[0][0]+grid[1][1]+grid[2][2] === 'XXX' || grid[0][0]+grid[1][1]+grid[2][2] === 'OOO') return grid[0][0]
        if(grid[0][2]+grid[1][1]+grid[2][0] === 'XXX' || grid[0][2]+grid[1][1]+grid[2][0] === 'OOO') return grid[0][2]
        return 'D'
    }

    function reset(){
        setStyle(0)
        updateGrid([['','',''],['','',''],['','','']])
        setDraw([])
    }

    return (<div className='board'>
            <div className='players'>
                <div className='player1'
                style={{textDecoration:style === 0 ?'underline':'none',textDecorationColor:style===0?"darkslategray":'none'}}
                >
                <h3>(X) {props.player1}     wins - {points.X}</h3>
                </div>
                <div className='player2'
                style={{textDecoration:style === 1 ?'underline':'none',textDecorationColor:style===1?"darkslategray":'none'}}
                >
                <h3>(O) {props.player2}     wins - {points.O}</h3>
                </div>
            </div>
            <div className='main'>
                <div className='grid'>
                    <div className='row0'>
                        <div className='zero_zero' onClick={()=>updateG(0,0)} >{grid[0][0]}</div>
                        <div className='zero_one'  onClick={()=>updateG(0,1)} >{grid[0][1]}</div>
                        <div className='zero_two'  onClick={()=>updateG(0,2)} >{grid[0][2]}</div>
                    </div>
                    <div className='row1'>
                        <div className='one_zero'  onClick={()=>updateG(1,0)} >{grid[1][0]}</div>
                        <div className='one_one'   onClick={()=>updateG(1,1)} >{grid[1][1]}</div>
                        <div className='one_two'   onClick={()=>updateG(1,2)} >{grid[1][2]}</div>
                    </div>
                    <div className='row2'>
                        <div className='two_zero'  onClick={()=>updateG(2,0)} >{grid[2][0]}</div>
                        <div className='two_one'   onClick={()=>updateG(2,1)} >{grid[2][1]}</div>
                        <div className='two_two'   onClick={()=>updateG(2,2)} >{grid[2][2]}</div>
                    </div>
                    <button onClick={()=>reset()}>Restart!</button>
                </div>
            </div>
    </div>)
}

export default Game