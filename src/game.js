import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './game.css'

function Game(){
    let [props,setProps] = useState({player1:'',player2:''})
    let [style,setStyle] = useState('X')
    let [grid,updateGrid] = useState([['','',''],['','',''],['','','']])
    let [points,setPoints] = useState({X:0,O:0})
    let [id,setX] = useSearchParams('id')
    let [done,setDone] = useState(false)
    let [decision,setDecision] = useState('')


    useEffect(()=>{
        let imf = async()=>{
            let res = await fetch(`https://tictactoemultimp.onrender.com/details?id=${id.get("id")}`)
            let resData = await res.json()
            console.log(resData)
            updateGrid(resData.game)
            setProps({player1:resData.player1,player2:resData.player2})
            setPoints({X:resData.player1Score,O:resData.player2Score})
            setStyle(resData.turn)
            setDone(resData.dec.decided)
            setDecision(resData.dec.msg)
        }
        imf()
    })

    async function updateG(r,c){
        let apiData = {row:r,column:c,player:style}
        fetch(`https://tictactoemultimp.onrender.com/updateGrid?id=${id.get("id")}`,
        {body:JSON.stringify(apiData),method:"PUT"})
    }

    async function reset(){
        setStyle('X')
        fetch(`https://tictactoemultimp.onrender.com/reset?id=${id.get("id")}`,{method:"PUT"})
        updateGrid([['','',''],['','',''],['','','']])
    }

    return (<div className='board'>
            <div className='players'>
                <div className='player1'
                style={{textDecoration:style === 'X' ?'underline':'none',textDecorationColor:style==='X'?"rgb(241, 137, 18)":'none'}}
                >
                <h3>(X) {props.player1}     wins - {points.X}</h3>
                </div>
                <div className='player2'
                style={{textDecoration:style === 'O' ?'underline':'none',textDecorationColor:style==='O'?"rgb(241, 137, 18)":'none'}}
                >
                <h3>(O) {props.player2}     wins - {points.O}</h3>
                </div>
            </div>
            <div className='main'>
                <div className='grid'>
                    <div className='row0'>
                        <div className='zero_zero' onClick={()=>updateG(0,0)} >
                            <div id="zero_zero"></div><p>{grid[0][0]}</p>
                        </div>
                        <div className='zero_one'  onClick={()=>updateG(0,1)} >
                            <div id="zero_one"></div><p>{grid[0][1]}</p>
                        </div>
                        <div className='zero_two'  onClick={()=>updateG(0,2)} >
                            <div id="zero_two"></div><p>{grid[0][2]}</p>
                        </div>
                    </div>
                    <div className='row1'>
                        <div className='one_zero'  onClick={()=>updateG(1,0)} >
                            <div id="one_zero"></div><p>{grid[1][0]}</p>
                        </div>
                        <div className='one_one'   onClick={()=>updateG(1,1)} >
                            <div id="one_one"></div><p>{grid[1][1]}</p>
                        </div>
                        <div className='one_two'   onClick={()=>updateG(1,2)} >
                            <div id="one_two"></div><p>{grid[1][2]}</p>
                        </div>
                    </div>
                    <div className='row2'>
                        <div className='two_zero'  onClick={()=>updateG(2,0)} >
                            <div id="two_zero"></div><p>{grid[2][0]}</p>
                        </div>
                        <div className='two_one'   onClick={()=>updateG(2,1)} >
                            <div id="two_one"></div><p>{grid[2][1]}</p>
                        </div>
                        <div className='two_two'   onClick={()=>updateG(2,2)} >
                            <div id="two_two"></div><p>{grid[2][2]}</p>
                        </div>
                    </div>
                    <button onClick={()=>reset()}>Restart!</button><br/>
                    <div style={{textAlign:"center"}}>
                    {done?decision:""}
                </div>
                </div>
            </div>
    </div>)
}

export default Game