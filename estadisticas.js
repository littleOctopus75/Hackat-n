class Estadisticas {
  constructor(semaforo) {
    this.carros=[];
    this.semaforo=semaforo;
    this.tiempoTotalEspera = 0;
    this.esperaPromedio = 0;
    this.vehiculosCalle1 = 0;
    this.vehiculosCalle2 = 0;
  }

  setTotalCarros(carros){
   this.carros=carros; // Agrega un carro al arreglo carros
  }

  mostrarEstadisticas() {
    for (let carro of this.carros) {
            this.tiempoTotalEspera+=carro.getTiempoEsperaTotal();
      }
      this.tiempoTotalEspera = round(this.tiempoTotalEspera * 100) / 100; // Redondear a dos decimales
      this.esperaPromedio=this.tiempoTotalEspera/this.carros.length;
    //this.tiempoTotalEspera=this.semaforo.getTimerRojo();
    fill(0);
    textSize(16);
    text("Calle 1",10, 15);
    text("Tiempo total de espera: " + this.tiempoTotalEspera + " segundos", 10, 35);
    text("Espera promedio: " + this.esperaPromedio + " segundos", 10, 55);
    text("Vehículos en Calle 1: " + this.carros.length, 10, 75);
  }
 
}
