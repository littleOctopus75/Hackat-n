class CuadroConfiguracion {
  constructor(semaforo, carretera) {
    this.semaforo = semaforo;
    this.carretera = carretera;

    // Crear las cajas de texto para la frecuencia de aparición
    this.frecuenciaInput = createInput();
    this.frecuenciaInput.position(1020, 260);

    // Crear las cajas de texto para el tiempo del semáforo
    this.tiempoVerdeInput = createInput();
    this.tiempoVerdeInput.position(1020, 210);
    this.tiempoRojoInput = createInput();
    this.tiempoRojoInput.position(1300, 210);

    this.boton = createButton("Actualizar");
    this.boton.position(1300, 260);
    this.boton.mousePressed(() => this.actualizarConfiguracion()); // Asociar función al botón
  }

  actualizarConfiguracion() {
    // Obtener valores de las cajas de texto
    let tiempoVerdeSegundos = this.tiempoVerdeInput.value() !== '' ? parseFloat(this.tiempoVerdeInput.value()) * 1000 : 1000;
    let tiempoRojoSegundos = this.tiempoRojoInput.value() !== '' ? parseFloat(this.tiempoRojoInput.value()) * 1000 : 1000;
    let frecuenciaSegundos = this.frecuenciaInput.value() !== '' ? parseFloat(this.frecuenciaInput.value()) * 1000 : 1000;

    this.semaforo.setTiempoVerde(tiempoVerdeSegundos);
    this.semaforo.setTiempoRojo(tiempoRojoSegundos);
    this.carretera.setIntervalosCarro(frecuenciaSegundos);
}


  mostrarConfiguraciones() {
    text("Configuraciones semáforo: ", 780, 62);
   text("S",1200, 62);
   text("S",1480, 62);

    text("Tiempo Verde", 1120, 35);
    text("Tiempo Rojo", 1315, 35);
    text("Tiempo de aparición vehículos: ", 780, 110);
  }
}
