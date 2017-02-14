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

//a implementar en el gestor de recursos
};
Malla.prototype.endDraw = function() {

};