
let miCarro;


class Carro {
  constructor(x, y, tamaño) {
    this.x = x;
    this.y = y;
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
  }

  avanzar() {
    this.x += this.velocidad;
    if (this.x > width) {
      this.x = 0;
    }
  }
}

