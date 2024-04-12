class Estadisticas {

  constructor(x, y, carretera) {
    this.tiempoTotalEspera = 0;
    this.esperaPromedio = 0;
    this.posicionX = x;
    this.posicionY = y;
    this.carretera = carretera
  }

  mostrarEstadisticas(CarCarros) {
    for (let carro of CarCarros) {
      this.tiempoTotalEspera += carro.getTiempoEsperaTotal();
    }
    this.tiempoTotalEspera = round(this.tiempoTotalEspera * 100) / 100; // Redondear a dos decimales
    this.esperaPromedio = this.tiempoTotalEspera / this.carretera.cantidadCarros;

    fill(0);
    textSize(16);
    text("Calle " + this.carretera.nombre, this.posicionX, this.posicionY);
    text("Tiempo total de espera: " + this.tiempoTotalEspera + " segundos", this.posicionX, this.posicionY + 20);
    text("Espera promedio: " + this.esperaPromedio + " segundos", this.posicionX, this.posicionY + 40);
    text("Vehículos en Calle "+ this.carretera.nombre + ": " + this.carretera.cantidadCarros, this.posicionX, this.posicionY + 60);
  }
}

