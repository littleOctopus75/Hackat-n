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
  mostrarsemaforo(){
    //Para controlar las posiciones del semaforo}
    
    var posicionesX=190;
    var posicionesY=5;
    // background(255);
    // Dibuja el semáforo
    stroke(0);
    fill(255);
    rect(posicionesX, posicionesY, 50, 150);
    line(posicionesX+25, posicionesY+150, posicionesX+25, 300);
    
    fill(semaforo.estado === 'verde' ?  color(0, 255, 0):color(255, 255, 255) );
    ellipse(posicionesX+25, posicionesY+30, 50, 50);
    
    fill(semaforo.estado === 'rojo' ? color(255, 0, 0) : color(255,255,255));
    ellipse(posicionesX+25, posicionesY+110, 50, 50);
    this.verificar();
    
    }
    verificar(){
      // Cambia el color del semáforo si ha pasado el tiempo
    if (millis() - this.tiempoUltimoCambio >= (semaforo.estado === 'rojo' ? semaforo.timerRojo : semaforo.timerVerde)) {
      semaforo.cambiarColor();
      this.tiempoUltimoCambio = millis();
    }
    }

}
 
