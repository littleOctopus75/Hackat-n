let carretera; // Variable para la instancia de la carretera
let carretera2;
let semaforo;
let estadisticas;
let cuadroConfiguracion;

function setup() {
  createCanvas(1560, 400); // Lienzo de píxeles
  carretera = new Carretera(2060, 10,0,175); // Crear una nueva instancia de Carretera con ancho y divisores
  carretera2 = new Carretera(2060, 10,0,280);
  semaforo = new Semaforo(3000, 2000);
  estadisticas = new Estadisticas(semaforo);
  cuadroConfiguracion = new CuadroConfiguracion(semaforo, carretera);
}

function draw() {
  background(200); // Fondo blanco
  carretera.mostrar();
  carretera2.mostrar();
  carretera.actualizar();
  carretera2.actualizar();
  semaforo.mostrarsemaforo();
  estadisticas.mostrarEstadisticas();
  cuadroConfiguracion.mostrarConfiguraciones();
}


class Carretera {
  constructor(ancho, numDivisores,x,y) {
    this.ancho = ancho;
    this.x=x;
    this.y=y;
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
    rect(this.x, this.y, width, 60);

    // Dibujar líneas divisorias (líneas blancas)
    stroke(255);
    strokeWeight(2);
    for (let i = 1; i < this.numDivisores; i++) {
        line(i * this.espacioEntreDivisores,this.y,i * this.espacioEntreDivisores, this.y+50);
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
          this.x,
          this.y,
          this.tamañoCarro,
          semaforo,
          this.carros
        ); 
        estadisticas.setTotalCarros(nuevoCarro);
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
