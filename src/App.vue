<template>
    <header>
        <p class="title"><img alt="Vue logo" class="logo" src="./assets/logo.svg" width="40" height="40" />Vue-Renju</p>
        <a class="info" href="https://en.wikipedia.org/wiki/Renju#Rules" target="_blank"><font-awesome-icon icon="fa fa-book" /> Rules</a>
    </header>

    <main>
        <TopPanel :renju="renju"
        />
        <Board :renju="renju" />
    </main>
</template>

<script setup>
    import { library } from '@fortawesome/fontawesome-svg-core'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import { faBook } from '@fortawesome/free-solid-svg-icons'
    import { ref, reactive, toRaw } from 'vue'
    import Board from './components/Board.vue'
    import TopPanel from './components/TopPanel.vue'
    import { Renju } from './renju.js'
    import 'bootstrap/dist/css/bootstrap.css'
    library.add(faBook)
    const renju = reactive(new Renju());
    
</script>

<style scoped>
    header {
        padding:10px;
        line-height: 40px;
        vertical-align: center;
        display: flex;  
        justify-content: space-between;
    }
    header .title {
        font-size:1.35em;
        font-weight:800;
        margin-bottom:0;
    }
    header .logo {
        margin-right:10px;
    }
    header .info {
        float:right;
        font-size:1.3em;
        font-weight:600;
        margin-bottom:0;
        margin-right:15px;
        text-decoration:none;
    }
</style>
