class CuadroConfiguracion {
  constructor(semaforo, carretera, carretera2) {
    this.semaforo = semaforo;
    this.carretera = carretera;
    this.carretera2 =carretera2;

    // Crear las cajas de texto para la frecuencia de aparición
    this.frecuenciaInput = createInput();
    this.frecuenciaInput.position(1020, 260);
    this.frecuenciaInput2 = createInput();
    this.frecuenciaInput2.position(1020, 300);
    // Crear las cajas de texto para el tiempo del semáforo
    this.tiempoVerdeInput = createInput();
    this.tiempoVerdeInput.position(1020, 210);
    this.tiempoRojoInput = createInput();
    this.tiempoRojoInput.position(1300, 210);

    this.boton = createButton("Actualizar");
    this.boton.style('width', '150px'); 
    this.boton.style('height', '30px'); 
    this.boton.position(1310, 260);
    this.boton.mousePressed(() => this.actualizarConfiguracion()); // Asociar función al botón
  }

  actualizarConfiguracion() {
    // Obtener valores de las cajas de texto
    let tiempoVerdeSegundos = this.tiempoVerdeInput.value() !== '' ? parseFloat(this.tiempoVerdeInput.value()) * 1000 : 1000;
    let tiempoRojoSegundos = this.tiempoRojoInput.value() !== '' ? parseFloat(this.tiempoRojoInput.value()) * 1000 : 1000;
    let frecuenciaSegundos = this.frecuenciaInput.value() !== '' ? parseFloat(this.frecuenciaInput.value()) * 1000 : 1000;
    let frecuenciaSegundos2 = this.frecuenciaInput2.value() !== '' ? parseFloat(this.frecuenciaInput2.value()) * 1000 : 1000;

    this.semaforo.setTiempoVerde(tiempoVerdeSegundos);
    this.semaforo.setTiempoRojo(tiempoRojoSegundos);
    this.carretera2.setIntervalosCarro(frecuenciaSegundos2);
    this.carretera.setIntervalosCarro(frecuenciaSegundos);
  }


  mostrarConfiguraciones() {
    text("Configuraciones semáforo: ", 780, 62);
    text("S", 1200, 62);
    text("S", 1480, 62);

    text("Tiempo Verde", 1120, 35);
    text("Tiempo Rojo", 1315, 35);
    text("Tiempo de aparición vehículos: ", 780, 110);
  }
}
