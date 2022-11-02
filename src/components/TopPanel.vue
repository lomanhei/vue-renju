<script setup>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { faUndo, faSync, faFile, faCircle} from '@fortawesome/free-solid-svg-icons'
    import { ref, reactive } from 'vue'
    import { newGame, start, undo, reset } from '../renju-ext.js'
    import { state } from './notification/'
    import StartModal from './notification/StartModal.vue'
    import AlertModal from './notification/AlertModal.vue'
    import ConfirmModal from './notification/ConfirmModal.vue'
    library.add(faUndo,faSync,faFile,faCircle)
    const props = defineProps({
        renju: Object
    })
    const renju = reactive(props.renju)
    const notificationState = reactive(state)
</script>

<template>
    <div class="top-panel">
        <button id="show-modal" type="button" class="btn btn-success" @click="newGame(renju)">
            <font-awesome-icon icon="fas fa-file" /> New Game
        </button>
        <button type="button" class="btn btn-success" :class="{disabled:renju.winner!==null}" @click="undo(renju)">
            <font-awesome-icon icon="fa fa-undo" /> Undo
        </button>
        <button type="button" class="btn btn-success" :class="{disabled:renju.winner!==null}" @click="reset(renju)">
            <font-awesome-icon icon="fas fa-sync" /> Reset
        </button>
        <div class="current-turn">
            Turn : <span class="stone" :class="{black:renju.plays==='B',white:renju.plays==='W'}"><font-awesome-icon icon="fa fa-circle" /></span>
        </div>
        <Teleport to="body">
            <StartModal @playBlack="start(renju,true)"
                        @playWhite="start(renju,false)" >
            </StartModal>
        </Teleport>
        <Teleport to="body"><AlertModal /></Teleport>
        <Teleport to="body"><ConfirmModal /> </Teleport>
    </div>
</template>

<style scoped>
    .top-panel {
        margin:auto;
        text-align:center;
        line-height:40px;
        padding-bottom:5px;
    }
    .top-panel .desc {
        font-weight:700;
    }
    .top-panel button {
        margin: 0 3px;
        font-weight: 600;
    }
    .top-panel .current-turn {
        display: inline-block;
        margin: 0 5px;
        background: #ddd;
        vertical-align: middle;
        border-radius: 0.375rem;
        padding: 0.375rem 0.75rem;
        line-height:26px;
        font-weight: 700;
    }
    
    .stone.black {
        color: black;
    }
    .stone.white {
        color: white;
        text-shadow: #000 0px 0px 10px;
    }
</style>
