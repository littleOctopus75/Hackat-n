class CuadroConfiguracion {
  constructor(semaforo, carretera) {
    this.semaforo=semaforo;
    this.carretera=carretera;

    // Crear las cajas de texto para la frecuencia de aparición
    this.frecuenciaInput = createInput();
    this.frecuenciaInput.position(1000, 260);

    // Crear las cajas de texto para el tiempo del semáforo
    this.tiempoVerdeInput = createInput();
    this.tiempoVerdeInput.position(1000, 210);
    this.tiempoRojoInput = createInput();
    this.tiempoRojoInput.position(1300, 210);

    this.boton = createButton("Actualizar");
    this.boton.position(1350, 260);
    this.boton.mousePressed(() => this.actualizarConfiguracion()); // Asociar función al botón
}

actualizarConfiguracion() {
  // Obtener valores de las cajas de texto
  //this.frecuenciaInput.value();
  this.semaforo.setTiempoVerde( this.tiempoVerdeInput.value());
  this.semaforo.setTiempoRojo(this.tiempoRojoInput.value());
  this.carretera.setIntervalosCarro(this.frecuenciaInput.value());

}
  mostrarConfiguraciones() {
    text("Configuraciones semaforo: ", 780, 35);
    text("Tiempo Verde", 1015, 35);
    text("Tiempo Rojo", 1315, 35);
    text("Tiempo de aparicion vehiculos: ", 750, 110);
  }
}
