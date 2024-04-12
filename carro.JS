
let miCarro;


class Carro {
  constructor(x, y, tamaño, colorSemaforo) {
    this.x = x;
    this.y = y;
    this.colorSemaforo=colorSemaforo;
    this.tamaño = tamaño;
    this.velocidad = 1;
  }

  dibujar() {
    // Cuerpo del carro
    fill(255, 0, 0); // Color rojo
    rect(this.x, this.y - this.tamaño / 2, this.tamaño * 3, this.tamaño);

    // Ruedas
    fill(0); // Color negro
    ellipse(this.x + this.tamaño, this.y + this.tamaño / 2, this.tamaño, this.tamaño);
    ellipse(this.x + this.tamaño * 2, this.y + this.tamaño / 2, this.tamaño, this.tamaño);
    this.validar();
  }

  validar(){
    console.log(this.x)
      console.log(this.colorSemaforo)  
    if(this.x+100 >= 500 && this.colorSemaforo==='rojo'){
      
      this.parar();
    }
  }

  avanzar() {
    this.x += this.velocidad;
    if (this.x > width) {
      this.x = 0;
    }
  }
  parar(){
    this.x = 0;
  }
}

