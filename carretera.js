let carretera; // Variable para la instancia de la carretera
let carretera2;
let semaforo;
let estadisticas;
let cuadroConfiguracion;
let estadisticas2;

function setup() {
  createCanvas(1560, 450); // Lienzo de píxeles
  carretera = new Carretera(2060, 10, 0, 175, "izquierda","Av.Oaxaca"); // Crear una nueva instancia de Carretera con ancho y divisores
  carretera2 = new Carretera(2060, 10, 0, 280, "derecha", "andador");
  carretera.intervaloCarros=1;
  semaforo = new Semaforo(3000, 2000);
  estadisticas = new Estadisticas(10 , 15, carretera);
  estadisticas2 = new Estadisticas(10 , 370, carretera2);
  cuadroConfiguracion = new CuadroConfiguracion(semaforo, carretera);
}

function draw() {
  background(200); // Fondo blanco
  carretera.mostrar();
  carretera2.mostrar();
  carretera.actualizar();
  carretera2.actualizar();
  semaforo.mostrarsemaforo();
  estadisticas.mostrarEstadisticas(carretera.carros);
  estadisticas2.mostrarEstadisticas(carretera2.carros);
  cuadroConfiguracion.mostrarConfiguraciones();
}


class Carretera {
  constructor(ancho, numDivisores, x, y, sentido, nombre) {
    this.ancho = ancho;
    this.sentido = sentido;
    if (this.sentido === "izquierda") {
      this.xCoche = x + this.ancho - 30;
    }
    this.x = x;
    this.y = y;
    this.numDivisores = numDivisores;
    this.espacioEntreDivisores = this.ancho / this.numDivisores;
    this.carros = []; // Array para almacenar los carros
    this.intervaloCarros = 1500; // Intervalo en milisegundos para generar carros
    this.tamañoCarro = 30; // Tamaño de los carros
    this.tiempoUltimoCarro = 0; // Tiempo en milisegundos del último carro generado
    this.maxCarros = 10; // Máximo de carros permitidos
    this.nombre= nombre;
    this.cantidadCarros = 0;
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
      line(
        i * this.espacioEntreDivisores,
        this.y,
        i * this.espacioEntreDivisores,
        this.y + 50
      );
    }

    for (let carro of this.carros) {
      if (carro.x <= 2060) {
        carro.dibujar();
        //carro.avanzar();
      }
    }
  }

  actualizar() {
    // Generar carros aleatorios en posición y tiempo
    if (millis() - this.tiempoUltimoCarro > this.intervaloCarros) {
      if (this.carros.length < this.maxCarros) {

        let nuevoCarro;
        if (this.sentido === "izquierda") {
          nuevoCarro = new Carro(
            this.x + 1400,
            this.y,
            this.tamañoCarro,
            semaforo,
            this.carros,
            this.sentido
          );
        } else {
          nuevoCarro = new Carro(
            this.x,
            this.y,
            this.tamañoCarro,
            semaforo,
            this.carros,
            this.sentido
          );
        }
        this.cantidadCarros++;
        // estadisticas.setTotalCarros(this.carros);

        this.verificarSobreposicion(nuevoCarro);
        // console.log(this.carros.length)
        this.tiempoUltimoCarro = millis() + random(1000, 3000); // Intervalo de tiempo aleatorio entre 2 y 5 segundos para el próximo carro
      }
    }

    if (
      this.carros.length > 0 &&
      (this.carros[0].x > 1400 || this.carros[0].x < 0)
    ) {
      this.carros.shift(); // Eliminar primer carro de la cola
    }
  }

  verificarSobreposicion(nuevoCarro) {
    if (this.sentido === "izquierda") {
      this.nuevoCarro2=nuevoCarro
      // Verificar que el nuevo carro no se sobreponga con el último carro generado
      let ultimoCarro2 = this.carros[this.carros.length - 1];
      if (ultimoCarro2) {
        // Considerar la distancia horizontal y vertical entre los carros
        let distanciaHorizontal = abs(this.nuevoCarro2.x - ultimoCarro2.x);
        console.log(distanciaHorizontal);

        // Si la distancia horizontal es menor que el ancho combinado de los carros
        // y la distancia vertical es menor que el alto combinado de los carros,
        // entonces se sobreponen
        if (distanciaHorizontal < this.nuevoCarro2.tamaño + ultimoCarro2.tamaño) {
          console.log("Se sobreponen");
          return;
        }
      }
    } else {
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
    }
    // Si no se sobreponen, agregar el nuevo carro
    this.carros.push(nuevoCarro);
  }
  
}
