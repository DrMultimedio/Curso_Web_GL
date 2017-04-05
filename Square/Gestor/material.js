function MaterialGestor(){
	this.nombre = null;
	this.color = [1.0,1.0,1.0,1.0];
}

MaterialGestor.prototype.setColor = function(color) {
	// body...
	this.color = color; 
};

MaterialGestor.prototype.getColor = function() {
	// body...
	return this.color; 
};

MaterialGestor.prototype.setNombre = function(fich) {
	// body...
	this.nombre = fich; 
};

MaterialGestor.prototype.getNombre = function() {
	return  this.nombre;
};
MaterialGestor.prototype.drawImprime = function() {
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "El nombre del material es " + this.nombre + "y su color es " + this.color +"<br>";


};


