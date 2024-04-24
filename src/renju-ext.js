import Worker from 'web-worker';
import { reactive } from 'vue'
import { state } from './components/notification/'
const notificationState = reactive( state )

export function newGame(renju){
    if (  renju.winner !== null || renju.history.length < 2 ){
        notificationState.showStart = true
        return
    }
    notificationState.confirmMsg = "Start a new game will lose the current progress."
    notificationState.confirmMsgWidth = "400px"
    notificationState.showConfirm = true
    notificationState.confirmCallback = () => {
        notificationState.showStart = true
    }
}

export function start(renju,playerFirst,playerOnly=false){
    renju.set("playerOnly",playerOnly)
    renju.reset(playerFirst ? "B" : "W")
    if(!playerFirst){
        renju.play(7,7)
    }
}
export function undo(renju){
    if ( renju.winner !== null || renju.plays !== renju.player || renju.history.length < 2 ){
        //console.log("Nothing to reset.")
        return
    }
    if ( !renju.playerOnly ){
        renju.undo()
    }
    renju.undo()
}
export function reset(renju){
    if (  renju.winner !== null || renju.plays !== renju.player || renju.history.length < 2 ){
        //console.log("Nothing to reset.")
        return
    }
    notificationState.confirmMsg = "Confirm to reset."
    notificationState.confirmMsgWidth = "300px"
    notificationState.showConfirm = true
    notificationState.confirmCallback = () => {
        renju.reset(renju.player)
        if(renju.player!=="B"){
            renju.play(7,7)
        }
    }
}
export function play(renju,x){
    if (( !renju.playerOnly && renju.plays !== renju.player) || renju.winner !== null){
        return
    }
    const boardSize = renju.size
    const i = ~~(x/boardSize)
    const j = x%boardSize
    if (renju.getBoard()[i][j] !== "." || isForbidden(renju,i,j) ){
        return
    }
    renju.play(i,j)
    if (renju.winner !== null){
        notificationState.alertMsg = !renju.playerOnly ? "Player wins." : renju.plays === "B" ?  "White wins." : "Black wins." 
        notificationState.alertMsgWidth = "250px"
        notificationState.showAlert = true
        return
    }
    if (renju.draw) {
        notificationState.alertMsg = "Draw."
        notificationState.alertMsgWidth = "250px"
        notificationState.showAlert = true
        return
    }
    if(!renju.playerOnly){
        getNextMove(renju)
    }    
}
export function getField(renju,x){
    const boardSize = renju.size
    const i = ~~(x/boardSize)
    const j = x%boardSize
    const field = renju.getBoard()[i][j]
    if (field === "B"){
        return "black"
    }
    if (field === "W"){
        return "white"
    }    
    if ( (renju.playerOnly || renju.plays === renju.player) && isForbidden(renju,i,j) ){
        return "forbidden"
    }
    return "" 
}

export function isLastMove(renju, x){
    const boardSize = renju.size
    const i = ~~(x/boardSize)
    const j = x%boardSize
    const lastMoveCoord = {... renju.history[renju.history.length-1]}
    return lastMoveCoord[0] === i && lastMoveCoord[1] === j
}


function getNextMove(renju){
    const url = new URL("./renju-worker.js", import.meta.url);
    var engine = new Worker(url);
    engine.onmessage = function(e) {
        let foundNext = false
        //console.log(e.data.firstMoves)
        for(let x in e.data.firstMoves){
            let i = e.data.firstMoves[x]['i'],
                j = e.data.firstMoves[x]['j'],
                score = e.data.firstMoves[x]['score'],
                y = parseInt(x) + 1
            if( !isForbidden(renju,i,j) /*&& ( x == e.data.firstMoves.length || Math.random() <  score*score / (  e.data.firstMoves[y]['score']* e.data.firstMoves[y]['score']+score*score )+0.3 )*/ ){
                renju.play(i,j)
                renju.showLog()
                console.log(`Score: ${score}`)
                foundNext = true
                break
            }
        }
        if (renju.winner !== null) {
            notificationState.alertMsg = "Computer wins."
            notificationState.alertMsgWidth = "250px"
            notificationState.showAlert = true
            return
        }
        if (renju.draw) {
            notificationState.alertMsg = "Draw."
            notificationState.alertMsgWidth = "250px"
            notificationState.showAlert = true
            return
        }
        if (!foundNext) {
            renju.winner = renju.player
            notificationState.alertMsg = "Computer abstains. Player wins."
            notificationState.alertMsgWidth = "400px"
            notificationState.showAlert = true
            return
        }
    }
    engine.postMessage([getParsedBoard(renju.getBoard()),1,1200]);
}

function getParsedBoard(board){
    return Array(15).fill(0).map(
        (_,i) => {
          return Array(15).fill(0).map(
                 (_,j) => {
                     if (board[i][j] === "B") return -1
                     if (board[i][j] === "W") return 1
                     return 0
                 }
            );
        }
    );
}

function isForbidden(renju, i, j){
    let forbiddenMoves = renju.getForbidden()
    for(let x in forbiddenMoves){
        if(forbiddenMoves[x][0]===i && forbiddenMoves[x][1]===j){
            return true
        }
    }
}
