function Malla(){
	this.vertices = null;
	this.normales = null;
	this.texturas = null;
	this.indices = null;

	this.vertTriangulo = null;
	this.normTriangulo = null;
	this.textTriangulo = null;

	this.nTriangulos = null;
}

Malla.prototype.cargaFichero = function(fich) {
//codigo adaptado de stackoverflow por el usuario Edward Z. Yang

	var peticion = new XMLHttpRequest();
	peticion.open('GET', fich);
	var mesh= null;
	var vertices;
	var indices;
	peticion.onreadystatechange = function() {

		mesh = new OBJ.Mesh(peticion.responseText);
		vertices = mesh.vertices;
		indices = mesh.indices;
		alert(vertices);
}

	this.vertices = vertices;
	this.indices = indices;

peticion.send();
//fin de codigo adaptado
return peticion.responseText;
};


Malla.prototype.draw = function() {
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "verts<br>" + this.vertices;
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "index<br>" + this.indices;


};