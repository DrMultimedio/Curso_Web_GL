function Malla(){
	this.vertices = null;
	this.normales = null;
	this.texturas = null;

	this.vertTriangulo = null;
	this.normTriangulo = null;
	this.textTriangulo = null;

	this.nTriangulos = null;
}
Malla.prototype.cargaFicheroImprime = function(fich) {
//codigo adaptado de stackoverflow por el usuario Edward Z. Yang

var peticion = new XMLHttpRequest();
peticion.open('GET', fich);
peticion.onreadystatechange = function() {
document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + peticion.responseText;


}
peticion.send();
//fin de codigo adaptado


};
Malla.prototype.cargaFichero = function(fich) {
//codigo adaptado de stackoverflow por el usuario Edward Z. Yang

var peticion = new XMLHttpRequest();
peticion.open('GET', fich);
peticion.onreadystatechange = function() {

//pendiente de hacer

}
peticion.send();
//fin de codigo adaptado


};
Malla.prototype.draw = function() {
	// a implementar
};