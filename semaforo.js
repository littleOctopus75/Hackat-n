class Semaforo {
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

}

let semaforo;
let tiempoUltimoCambio = 0;

function setup() {
  createCanvas(400, 600);
  semaforo = new Semaforo(1000, 500); // Ejemplo: verde 2 segundos, rojo 1 segundo
}

function draw() {
  mostrarSemaforo();
}

function mostrarSemaforo(){
//Para controlar las posiciones del semaforo
var posicionesX=190;
var posicionesY=5;
background(255);
// Dibuja el semáforo
stroke(0);
fill(255);
rect(posicionesX, posicionesY, 50, 150);
line(posicionesX+25, posicionesY+150, posicionesX+25, 300);

fill(semaforo.estado === 'verde' ?  color(0, 255, 0):color(255, 255, 255) );
ellipse(posicionesX+25, posicionesY+30, 50, 50);

fill(semaforo.estado === 'rojo' ? color(255, 0, 0) : color(255,255,255));
ellipse(posicionesX+25, posicionesY+110, 50, 50);

// Cambia el color del semáforo si ha pasado el tiempo
if (millis() - tiempoUltimoCambio >= (semaforo.estado === 'rojo' ? semaforo.timerRojo : semaforo.timerVerde)) {
  semaforo.cambiarColor();
  tiempoUltimoCambio = millis();
}
}
