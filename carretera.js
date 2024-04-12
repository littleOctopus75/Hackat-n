let carretera; // Variable para la instancia de la carretera
let semaforo;
let estadisticas;
let cuadroConfiguracion;
function setup() {
  createCanvas(2060, 400); // Lienzo de píxeles
  carretera = new Carretera(2060, 10); // Crear una nueva instancia de Carretera con ancho y divisores
  semaforo = new Semaforo(3000, 2000);
  estadisticas = new Estadisticas(semaforo);
  cuadroConfiguracion = new CuadroConfiguracion(semaforo, carretera);
}

function draw() {
  background(200); // Fondo blanco
  carretera.mostrar();
  carretera.actualizar();
  semaforo.mostrarsemaforo();
  estadisticas.mostrarEstadisticas();
  cuadroConfiguracion.mostrarConfiguraciones();
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
    this.maxCarros = 10; // Máximo de carros permitidos
  }
  setIntervalosCarro(valor) {
    this.intervaloCarros = valor;
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
      line(
        i * this.espacioEntreDivisores,
        height / 2 - 15,
        i * this.espacioEntreDivisores,
        height / 2 + 15
      );
    }

    for (let carro of this.carros) {
      if (carro.x <= width) {
        carro.dibujar();
        //carro.avanzar();
      }
    }
  }

  actualizar() {
    // Generar carros aleatorios en posición y tiempo
    if (millis() - this.tiempoUltimoCarro > this.intervaloCarros) {
      if (this.carros.length < this.maxCarros) {
        let nuevoCarro = new Carro(
          0,
          180,
          this.tamañoCarro,
          semaforo,
          this.carros
        ); // Posición X fija en 0
        estadisticas.setTotalCarros(this.carros);
        this.verificarSobreposicion(nuevoCarro);
        this.tiempoUltimoCarro = millis() + random(2000, 4000); // Intervalo de tiempo aleatorio entre 2 y 5 segundos para el próximo carro
      }
    }

    if (this.carros.length > 0 && this.carros[0].x > 1400) {
      this.carros.shift(); // Eliminar primer carro de la cola
    }
  }

  verificarSobreposicion(nuevoCarro) {
    // Verificar que el nuevo carro no se sobreponga con el último carro generado
    let ultimoCarro = this.carros[this.carros.length - 1];
    if (ultimoCarro) {
      // Considerar la distancia horizontal y vertical entre los carros
      let distanciaHorizontal = abs(nuevoCarro.x - ultimoCarro.x);
      console.log(distanciaHorizontal);

      // Si la distancia horizontal es menor que el ancho combinado de los carros
      // y la distancia vertical es menor que el alto combinado de los carros,
      // entonces se sobreponen
      if (distanciaHorizontal < nuevoCarro.tamaño + ultimoCarro.tamaño) {
        console.log("Se sobreponen");
        return;
      }
    }

    // Si no se sobreponen, agregar el nuevo carro
    this.carros.push(nuevoCarro);
  }
}
