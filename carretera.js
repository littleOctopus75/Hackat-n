let carretera; // Variable para la instancia de la carretera
let semaforo;

function setup() {
  createCanvas(1460, 200); // Lienzo de píxeles
  carretera = new Carretera(1450, 10); // Crear una nueva instancia de Carretera con ancho y divisores
  semaforo = new Semaforo(1000, 500); // Ejemplo: verde 2 segundos, rojo 1 segundo
}

function draw() {
  background(200); // Fondo blanco
  carretera.mostrar();
  carretera.actualizar();
  semaforo.mostrarsemaforo();
}

class Carretera {
  constructor(ancho, numDivisores) {
    this.ancho = ancho;
    this.numDivisores = numDivisores;
    this.espacioEntreDivisores = this.ancho / this.numDivisores;
    this.carros = []; // Array para almacenar los carros
    this.intervaloCarros = 1000; // Intervalo en milisegundos para generar carros
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
    // Generar carros aleatorios en posición y tiempo
    if (millis() - this.tiempoUltimoCarro + 1000 > this.intervaloCarros) {
      let nuevoCarro = new Carro(0, 80, this.tamañoCarro); // Posición X fija en 0
      this.verificarSobreposicion(nuevoCarro);
      this.tiempoUltimoCarro = millis() + random(1000, 6000); // Intervalo de tiempo aleatorio para el próximo carro
    }
  }
  
  verificarSobreposicion(nuevoCarro) {
    // Verificar que el nuevo carro no se sobreponga con otros carros existentes
    let seSobreponen = false;
    for (let carro of this.carros) {
      // Considerar la distancia horizontal y vertical entre los carros
      let distanciaHorizontal = abs(nuevoCarro.x - carro.x);
  
      // Si la distancia horizontal es menor que el ancho combinado de los carros
      // y la distancia vertical es menor que el alto combinado de los carros,
      // entonces se sobreponen
      if (distanciaHorizontal < (nuevoCarro.tamaño + carro.tamaño)) {
        seSobreponen = true;
        break;
      }
    }
  
    if (!seSobreponen) {
      this.carros.push(nuevoCarro);
    }
  }
}
