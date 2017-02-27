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

	var peticion = new XMLHttpRequest();
	peticion.open('GET', fich);
	var mesh= null;
	var vertices;
	var indices;
	var yo = this;

	peticion.onreadystatechange = function() {
        if (peticion.readyState == 4) {

			mesh = new OBJ.Mesh(peticion.responseText);
			yo.vertices = mesh.vertices;
			yo.indices = mesh.indices;
			alert(yo.vertices);

		}
	}

	peticion.send();
	//fin de codigo adaptado
	return peticion.responseText;
};


Malla.prototype.draw = function() {
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "verts<br>" + this.vertices;
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "index<br>" + this.indices;


};


