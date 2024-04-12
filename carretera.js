let carretera; // Variable para la instancia de la carretera
let semaforo;

function setup() {
  createCanvas(1460, 200); // Lienzo de píxeles
  carretera = new Carretera(1450, 10); // Crear una nueva instancia de Carretera con ancho y divisores
  semaforo = new Semaforo(1000, 500); // Ejemplo: verde 2 segundos, rojo 1 segundo
  // miCarro = new Carro(50, 100, 30);
  // miCarro2 = new Carro(20, 150, 30);
}

function draw() {
  background(200); // Fondo blanco
  carretera.mostrar(); // Mostrar la carretera y sus líneas divisorias
  semaforo.mostrarsemaforo();

  //   miCarro.dibujar();
  // miCarro2.dibujar();
  
  // // Actualiza la posición del carro
  // miCarro.avanzar();
}

class Carretera {
  constructor(ancho, numDivisores) {
    this.ancho = ancho;
    this.numDivisores = numDivisores;
    this.espacioEntreDivisores = this.ancho / this.numDivisores;
    this.carros = []; // Array para almacenar los carros
    this.intervaloCarros = 2000; // Intervalo en milisegundos para generar carros
    this.tamañoCarro = 30; // Tamaño de los carros
    this.tiempoUltimoCarro = 0; // Tiempo en milisegundos del último carro generado
  }

  mostrar() {
    // Dibujar la carretera (rectángulo gris)
    fill(150);
    noStroke();
    rect(0, height / 2 - 30, width, 60);

    // Dibujar líneas divisorias (líneas blancas)
    stroke(255);
    strokeWeight(2);
    for (let i = 1; i < this.numDivisores; i++) {
      line(i * this.espacioEntreDivisores, height / 2 - 15, i * this.espacioEntreDivisores, height / 2 + 15);
    }

    // Dibujar y actualizar posición de cada carro
    for (let carro of this.carros) {
      carro.dibujar();
      carro.avanzar();
    }
  }
   

  actualizar() {
    // Generar carros aleatorios
    if (millis() - this.tiempoUltimoCarro > this.intervaloCarros) {
      let x = random(0, width);
      let y = height / 2;
      let nuevoCarro = new Carro(x, y, this.tamañoCarro);
      this.verificarSobreposicion(nuevoCarro);
      this.tiempoUltimoCarro = millis();
    }
  }

  verificarSobreposicion(nuevoCarro) {
    // Verificar que el nuevo carro no se sobreponga con otros carros existentes
    let seSobreponen = false;
    for (let carro of this.carros) {
      if (abs(nuevoCarro.x - carro.x) < nuevoCarro.tamaño * 3) {
        seSobreponen = true;
        break;
      }
    }

    if (!seSobreponen) {
      this.carros.push(nuevoCarro);
    }
  }
}
