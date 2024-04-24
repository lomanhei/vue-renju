<template>
    <div class="board">
        <div v-for="(e, i) in boardSize*boardSize" v-on:click="play(renju,i)" class="grid" :class="[getField(renju,i), renju.winner || renju.draw ? 'disabled' : '']" >
          <div class="v-line" :class="{left:i%boardSize===0, 
                                      right:(i+1)%boardSize===0}">
          </div>
          <div class="h-line" :class="{top:~~(i/boardSize)%boardSize===0, 
                                      bottom:(~~(i/boardSize)+1)%boardSize===0}">
          </div>
          <div :class="{star : (~~(i/boardSize)+1)%4===0 && (i%boardSize+1)%4===0 && ((~~(i/boardSize)+i%boardSize+2)/4)%2===0}"></div>
          <div class="stone"></div>
          <div :class="{lastMove:isLastMove(renju,i)}"> </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, toRaw } from 'vue'
import { play, getField, isLastMove } from '../renju-ext.js'
const props = defineProps({
    renju: Object
})
const renju = reactive(props.renju)
const boardSize = renju.size
</script>

<style scoped>
    .board {
        margin:auto;
        display: grid;
        grid-template-columns: repeat(15, 1fr);
        background-color: #fbb01c;
        border: 3px solid black;
        width:min(95%,calc(95vh - 105px));
        max-width:800px;
        min-height:360px;
        min-width:360px;
        aspect-ratio:1/1;
    }
    .grid {
        color:#eee;
        display:inline-flex;
        position:relative;
        justify-content:center;
        align-items:center;
        transition:all 0.25s;
        border-radius:0;
        cursor:pointer;
    }
    .grid.black, .grid.white, .grid.forbidden, .grid.disabled {
        cursor:not-allowed;
    }  
    .grid:hover{
        background-color:rgba(255,255,255,0.4);
        border-radius:25%;
    }
    .v-line {
        position:absolute;
        background:black;
        height:2px;
        width:100%;
        left:0;
    }  
    .v-line.left{
        height:2px;
        width:50%;
        left:50%;  
    }  
    .v-line.right{
        height:2px;
        width:50%;
        left:0;  
    }

    .h-line {
        position:absolute;
        background:black;
        width:2px;
        height:100%;
        top:0;
    }
    .h-line.top{
        width:2px;
        height:50%;
        top:50%;  
    }  
    .h-line.bottom{
        width:2px;
        height:50%;
        top:0;  
    }   
    .star {
        position:absolute;
        background:black;
        width:25%;
        height:25%;
        border-radius:100%
    }
    .stone {
        position:absolute;
        border-radius:100%;
        width:70%;
        height:70%;
    }
    .black .stone {
        background:black;  
    }
    .white .stone {
        background:white;  
    }
    .forbidden .stone {
        border-radius:0;
        background:red;  
        width:50%;
        height:50%;
    }
    .lastMove {
        position:absolute;
        background:red;
        width:20%;
        height:20%;
        border-radius:100%;
    }
  
</style>
