function Transformacion(){
	mat = mat4.create();
	mat4.identity(mat);
	this.matriz = mat;
	this.pila[] = null;
}
Transformacion.prototype.identidad = function() {

	mat4.identity(this.matriz);

};
Transformacion.prototype.cargar = function(mat) {

	this.matriz = mat; 

};
Transformacion.prototype.transponer = function() {

	mat4.transpose(this.matriz);

};

Transformacion.prototype.trasladar = function(x,y,z) {

	mat4.translate(this.matriz, [x, y, z]);

};

Transformacion.prototype.rotar = function(angulo, x,y,z) {

	mat4.rotate(this.matriz, angulo[x, y, z]);
	
};

Transformacion.prototype.escalar = function(x,y,z) {

	mat4.scale(this.matriz, [x, y, z]);

};

Transformacion.prototype.beginDraw = function() {
	aux = mat4.create();
	mat4.set(Matriz, aux);
	this.pila[].push(aux);
	mat4.multiply(Matriz, this.matriz);
};
Transformacion.prototype.endDraw = function() {
  	matriz = this.pila.pop();
};