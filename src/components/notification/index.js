import { reactive } from 'vue'
export const state = reactive({
    showStart: true,
    
    showAlert: false,
    alertMsg: "",
    alertMsgWidth:"250px",
    
    showConfirm: false,
    confirmMsg: "",
    confirmMsgWidth:"450px",
    confirmCallback: () => { return }
})
