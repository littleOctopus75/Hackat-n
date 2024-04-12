let miCarro;

class Carro {
  constructor(x, y, tamaño, semaforo, arregloCarros, sentido) {
    this.x = x;
    this.y = y;
    this.sentido = sentido;
    this.tiempoEspera = 0;

    //objeto semaforo que servirá para monitorear el cambio de color del semaforo
    semaforo = semaforo;
    //arreglo de carros que se utilizara para controlar la distancia entre ellos
    this.carros = arregloCarros;
    this.tamaño = tamaño;
    this.velocidad = 3;
    if (this.sentido === "izquierda") {
      this.velocidad *= -1;
    }
    //bandera que establecerá si un carro tiene que parar debido a que hay otro carro adelante
    this.banderaParar = false;
  }
  getTiempoEsperaTotal() {
    return this.tiempoEspera / 1000000;
  }

  dibujar() {
    // Cuerpo del carro
    fill(255, 0, 0); // Color rojo
    rect(this.x, this.y - this.tamaño / 2, this.tamaño * 3, this.tamaño);

    // Ruedas
    fill(0); // Color negro
    ellipse(
      this.x + this.tamaño,
      this.y + this.tamaño / 2,
      this.tamaño,
      this.tamaño
    );
    ellipse(
      this.x + this.tamaño * 2,
      this.y + this.tamaño / 2,
      this.tamaño,
      this.tamaño
    );
    this.validar();
  }

  validar() {
    //para todos los coches creados, se evaluan desde el primero hasta el ultimo, siendo que el primero siempre va a tener el paso libre, a no ser que el semaforo esté en rojo, mientras que los demás carros se verán limitados por el semaforo y por los carros de adelante

    if (this.sentido === "izquierda") {
      for (let i = 0; i < this.carros.length; i++) {
        let carroActual2 = this.carros[i];
        let carroAtras2 = this.carros[i + 1];
        if (carroAtras2 !== undefined) {
          if (carroAtras2.x - carroAtras2.tamaño * 4 <= carroActual2.x) {
            carroAtras2.banderaParar = true;
          } else {
            if (carroAtras2.x - carroAtras2.tamaño * 4 > carroActual2.x) {
              carroAtras2.banderaParar = false;
            }
          }
        }

        if (
          (carroActual2.x - 100 >= 650 &&
            semaforo.getEstado() === "rojo" &&
            carroActual2.banderaParar === false) ||
          (semaforo.getEstado() === "verde" &&
            carroActual2.banderaParar === false) ||
          carroActual2.x < 650
        ) {
          carroActual2.x += carroActual2.velocidad;

          carroActual2.tiempoEspera = 0;
        } else {
          carroActual2.tiempoEspera = millis();
        }
      }
    } else {
      for (let i = 0; i < this.carros.length; i++) {
        let carroActual = this.carros[i];
        let carroAtras = this.carros[i + 1];
        if (carroAtras !== undefined) {
          if (carroAtras.x + carroAtras.tamaño * 4 >= carroActual.x) {
            carroAtras.banderaParar = true;
          } else {
            if (carroAtras.x + carroAtras.tamaño * 4 < carroActual.x) {
              carroAtras.banderaParar = false;
            }
          }
        }

        if (
          (carroActual.x + 100 <= 650 &&
            semaforo.getEstado() === "rojo" &&
            carroActual.banderaParar === false) ||
          (semaforo.getEstado() === "verde" &&
            carroActual.banderaParar === false) ||
          carroActual.x > 650
        ) {
          carroActual.x += carroActual.velocidad;

        
          // if (carroActual.x > width) {
          //   carroActual.x = 0;
          // }
          carroActual.tiempoEspera=0;
          // console.log(carroActual.x);
      } else {
        carroActual.tiempoEspera=millis();

      }
    }
    }
  }
}