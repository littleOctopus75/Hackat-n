class Semaforo {
    constructor(timerVerde, timerRojo) {
      this.estado = 'rojo';
      this.timerVerde = timerVerde;
      this.timerRojo = timerRojo;
    }
    cambioColor(estado) {
      this.estado = estado;
    }
  
  }
  
  let semaforo;
  let tiempoUltimoCambio = 0;
  
  // function setup() {
  //   createCanvas(200, 400);
  //   semaforo = new Semaforo(2000, 1000); // Ejemplo: verde 2 segundos, rojo 1 segundo
  // }
  
  // function draw() {
  //   background(255);
  
  //   // Dibuja el semáforo
  //   stroke(0);
  //   fill(255);
  //   rect(75, 50, 50, 150);
  
  //   fill(semaforo.estado === 'verde' ?  color(0, 255, 0):color(255, 255, 255) );
  //   ellipse(100, 100, 50, 50);
  
  //   fill(semaforo.estado === 'rojo' ? color(255, 0, 0) : color(255,255,255));
  //   ellipse(100, 200, 50, 50);
  
  //   // Cambia el color del semáforo si ha pasado el tiempo
  //   if (millis() - tiempoUltimoCambio >= (semaforo.estado === 'rojo' ? semaforo.timerRojo : semaforo.timerVerde)) {
  //     cambiarColor();
  //     tiempoUltimoCambio = millis();
  //   }
  // }
  
  function cambiarColor() {
    if (semaforo.estado === 'rojo') {
      semaforo.cambioColor('verde');
    } else if (semaforo.estado === 'verde') {
      semaforo.cambioColor('rojo');
    }
  }
  