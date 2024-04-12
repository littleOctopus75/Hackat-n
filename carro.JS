let miCarro;

class Carro {
  constructor(x, y, tamaño, semaforo, arregloCarros) {
    this.x = x;
    this.y = y;
    this.tiempoEspera=0;

    //objeto semaforo que servirá para monitorear el cambio de color del semaforo
    semaforo = semaforo;
    //arreglo de carros que se utilizara para controlar la distancia entre ellos
    this.carros = arregloCarros;
    this.tamaño = tamaño;
    this.velocidad = 3;
    //bandera que establecerá si un carro tiene que parar debido a que hay otro carro adelante
    this.banderaParar = false;
  }
  getTiempoEsperaTotal(){
    return this.tiempoEspera/1000000;
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
    for (let i = 0; i < this.carros.length; i++) {
      let carroActual = this.carros[i];
      let carroAtras = this.carros[i + 1];
      if (carroAtras !== undefined) {
        //verificamos que no coincidan los dos carros
        if (carroAtras.x + carroAtras.tamaño * 4 >= carroActual.x) {
          //alert("si entra en colision");
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
        //carroActual.avanzar();
        
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

  moverAdelante() {
    this.x += this.velocidad;
    if (this.x > width) {
      this.x = 0;
    }
  }

  moverAtras() {
    this.x -= this.velocidad;
    if (this.x < 0) {
      this.x = width;
    }
  }
}
