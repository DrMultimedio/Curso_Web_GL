function Malla(){
	this.malla = null;
}

Malla.prototype.cargarMalla = function(archivo) {
	this.malla = archivo;
};
Malla.prototype.getMalla = function() {
	return this.malla;
};
Malla.prototype.beginDraw = function() {

	this.malla.beginDraw();
};
Malla.prototype.endDraw = function() {
	this.malla.endDraw();

};


Malla.prototype.beginDrawImprime = function() {

	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Soy una malla y me imprimo <br>";


};
Malla.prototype.endDrawImprime = function() {
//a implementar en el gestor de recursos
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Soy una malla y termino de imprimirme <br>";

};