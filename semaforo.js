class Semaforo {
  tiempoUltimoCambio = 0;
  constructor(timerVerde, timerRojo) {
    this.estado = 'rojo';
    this.timerVerde = timerVerde;
    this.timerRojo = timerRojo;
  }
  cambioColor(estado) {
    this.estado = estado;
  }
  cambiarColor() {
    if (this.estado === 'rojo') {
      this.cambioColor('verde');
    } else if (this.estado === 'verde') {
      this.cambioColor('rojo');
    }
  } 
  setTiempoVerde(valor){
    this.timerVerde=valor;
  }
  setTiempoRojo(valor){
    this.timerRojo=valor;
  }
  mostrarsemaforo(){
    //Para controlar las posiciones del semaforo}
    
    var posicionesX=650;
    var posicionesY=5;
    var ancho=40;
    var largo=120;
    // background(255);
    // Dibuja el semáforo
    stroke(0);
    fill(255);
    rect(posicionesX, posicionesY, ancho, largo);
    line(posicionesX+22, posicionesY+120, posicionesX+22, 170);
    
    fill(this.estado === 'verde' ?  color(0, 255, 0):color(255, 255, 255) );
    ellipse(posicionesX+20, posicionesY+30, ancho, ancho);
    
    fill(this.estado === 'rojo' ? color(255, 0, 0) : color(255,255,255));
    ellipse(posicionesX+20, posicionesY+90, ancho, ancho);
    this.verificar();
    
    }
    verificar(){
      // Cambia el color del semáforo si ha pasado el tiempo
    if (millis() - this.tiempoUltimoCambio >= (this.estado === 'rojo' ? this.timerRojo : this.timerVerde)) {
      this.cambiarColor();
      this.tiempoUltimoCambio = millis();
    }
    }
    
    getEstado(){
      return this.estado;
    }
}

