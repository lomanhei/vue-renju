<template>
  <Transition name="modal">
    <div v-if="notificationState.showAlert" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"><h4>{{notificationState.alertMsg}}</h4></slot>
          </div>
          <div class="modal-footer">
            <slot name="footer">
              <button
                class="btn btn-dark" 
                @click="close"
              >Close</button>
            </slot>
          </div>
            
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
    import { reactive } from 'vue'
    import { state } from './'
    const notificationState = reactive(state)
    function close(){
        notificationState.showAlert=false
    }
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: v-bind(notificationState.alertMsgWidth);
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h4 {
  margin-top: 0;
}
.modal-footer {
    margin-top: 5px;
}
    
.modal-footer button {
  font-weight: 600;
  margin: 5px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>