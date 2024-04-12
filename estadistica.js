class Estadistica {
    constructor(contenedorId) {
      this.tiempoTotalEspera = 0; // Tiempo total de espera en milisegundos
      this.numVehiculos = {}; // Objeto para almacenar el número de vehículos por calle
      this.tiempoEsperaPorCalle = {}; // Objeto para almacenar el tiempo de espera por calle
      this.contenedor = document.getElementById(contenedorId);
    }
  
    registrarEspera(calle, tiempoEspera) {
      // Registrar el tiempo de espera para una calle específica
      if (!this.numVehiculos[calle]) {
        this.numVehiculos[calle] = 0;
        this.tiempoEsperaPorCalle[calle] = 0;
      }
      this.numVehiculos[calle]++;
      this.tiempoEsperaPorCalle[calle] += tiempoEspera;
      this.tiempoTotalEspera += tiempoEspera;
      this.actualizarEstadisticas();
    }
  
    actualizarEstadisticas() {
      // Actualizar el contenido del contenedor con las estadísticas
      let estadisticasHTML = `<h2>Estadísticas de tráfico</h2>`;
      estadisticasHTML += `<p>Tiempo total de espera: ${this.tiempoTotalEspera} milisegundos</p>`;
      estadisticasHTML += `<ul>`;
      for (let calle in this.numVehiculos) {
        const numVehiculos = this.numVehiculos[calle];
        const tiempoEspera = this.tiempoEsperaPorCalle[calle];
        const esperaPromedio = tiempoEspera / numVehiculos;
        estadisticasHTML += `<li>Calle ${calle}: ${numVehiculos} vehículos, Tiempo de espera promedio: ${esperaPromedio} milisegundos</li>`;
      }
      estadisticasHTML += `</ul>`;
      this.contenedor.innerHTML = estadisticasHTML;
    }
  }
  