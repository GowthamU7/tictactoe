class tictactoe{
    grid = ''
    constructor(player1,player2){
        this.pl1 = 'X'
        this.pl2 = 'O'
        this.name1 = player1
        this.name2 = player2
        this.tmp = ''
        this.filled = 0
        this.decision = {declared:false,msg:''}
    }
    plot(r,c){
        if(this.tmp === ''){
            this.grid[r][c]=this.pl1
            this.tmp = this.pl1
        }else{
            this.grid[r][c] = this.pl2
            this.tmp = ''
        }
        this.filled++
    }
    display(){
        console.log(this.grid)
    }
    checWinner(){
            for(let i=0;i<3;i++){
                if((this.grid[i][0]+this.grid[i][1]+this.grid[i][2]) === 'XXX' || (this.grid[i][0]+this.grid[i][1]+this.grid[i][2]) === 'OOO' ){
                    this.decision.declared=true
                    this.decision.msg = `Winner is ${this.grid[i][0] === 'X'?this.name1:this.name2}.`
                    break
                }
            }
            for(let j=0;j<3;j++){
                if((this.grid[0][j]+this.grid[1][j]+this.grid[2][j]) === 'XXX' || (this.grid[0][j]+this.grid[1][j]+this.grid[2][j]) === 'OOO' ){
                    this.decision.declared=true
                    console.log('0 j')
                    this.decision.msg = `Winner is ${this.grid[0][j] === 'X'?this.name1:this.name2}.`
                    break
                }
            }
            if(this.grid[0][0]+this.grid[1][1]+this.grid[2][2] === 'XXX' || this.grid[0][0]+this.grid[1][1]+this.grid[2][2] === 'OOO'){
                this.decision.declared=true
                this.decision.msg = `Winner is ${this.grid[0][0] === 'X'?this.name1:this.name2}.`
                return
            }
            if(this.grid[0][2]+this.grid[1][1]+this.grid[2][0] === 'XXX' || this.grid[0][2]+this.grid[1][1]+this.grid[2][0] === 'OOO'){
                this.decision.declared=true
                console.log('0 2')
                this.decision.msg = `Winner is ${this.grid[0][2] === 'X'?this.name1:this.name2}.`
                return
            }
            if(this.filled == 9){
                this.decision.declared=true
                this.decision.msg = `Its a draw.`
                return
            }
        }
}

export default tictactoe