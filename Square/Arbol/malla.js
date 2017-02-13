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


};
Malla.prototype.endDraw = function() {

};