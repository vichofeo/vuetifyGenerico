export default class MensajeriaUtils {
  #obj
  #mensaje  
  #optionsToast 
  constructor(obj, mensaje="") {
    this.#obj =  obj    
    this.#mensaje =  mensaje
    this.#optionsToast =  {
      position: "bottom-right",
      timeout: 5000,
      closeOnClick: true,
      pauseOnFocusLoss: true,
      pauseOnHover: true,
      draggable: true,
      draggablePercent: 1.05,
      showCloseButtonOnHover: false,
      hideProgressBar: true,
      closeButton: "button",
      icon: true,
      rtl: false
    }
  }
  
  advertencia() {
    this.#obj.warning(this.#mensaje, this.#optionsToast)
  }
  
  informacion() {
    this.#obj.info(this.#mensaje, this.#optionsToast)
  }
  error() {
    this.#obj.error(this.#mensaje, this.#optionsToast)
  }
  exito(){  
    this.#obj.success(this.#mensaje, this.#optionsToast)
  }
  
  setMensaje(mensaje){
    this.#mensaje =  mensaje
  }
  
}
