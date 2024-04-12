let carretera; // Variable para la instancia de la carretera

function setup() {
  createCanvas(1460, 200); // Lienzo de píxeles
  carretera = new Carretera(1450, 10); // Crear una nueva instancia de Carretera con ancho y divisores
}

function draw() {
  background(200); // Fondo blanco
  carretera.mostrar(); // Mostrar la carretera y sus líneas divisorias
}

class Carretera {
  constructor(ancho, numDivisores) {
    this.ancho = ancho; // Ancho de la carretera
    this.numDivisores = numDivisores; // Número de líneas divisorias
    this.espacioEntreDivisores = this.ancho / this.numDivisores; // Calcular el espacio entre las líneas divisorias
  }

  mostrar() {
    // Dibujar la carretera (rectángulo gris)
    fill(150);
    noStroke();
    rect(width/2 - this.ancho/2, height/2 - 30, this.ancho, 60);

    // Dibujar líneas divisorias (líneas blancas)
    stroke(255);
    strokeWeight(2);
    for (let i = 1; i < this.numDivisores; i++) {
      line(width/2 - this.ancho/2 + i * this.espacioEntreDivisores, height/2 - 15, width/2 - this.ancho/2 + i * this.espacioEntreDivisores, height/2 + 15);
    }
  }
}
