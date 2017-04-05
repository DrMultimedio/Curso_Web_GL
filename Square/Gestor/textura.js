function TexturaGestor(){
	this.nombre = null;
	imagen = null;
}

TexturaGestor.prototype.cargarFichero = function(fich) {
	// body...
	this.nombre = fich; 
};
TexturaGestor.prototype.getNombre = function() {
	return  this.nombre;
};
TexturaGestor.prototype.drawImprime = function() {
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "El nombre de la textura es " + this.nombre + "<br>";


};


