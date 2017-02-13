function Luz(){
	this.emitida = null;
	this.ambiente = null;
	this.especular = null;
	this.difusa = null;

}
Luz.prototype.setEmitida = function(emit) {
	this.emitida = emit;
};
Luz.prototype.getEmitida = function() {
	return this.emitida;
};
Luz.prototype.setAmbiente = function(ambient) {
	this.ambiente = ambient;
};
Luz.prototype.getAmbiente = function() {
	return this.ambiente;
};
Luz.prototype.setEspecular = function(espec) {
	this.especular = espec;
};
Luz.prototype.getEspecular = function() {
	return this.especular;
};
Luz.prototype.setDifusa = function(dif) {
	this.difusa = dif;
};
Luz.prototype.getDifusa = function() {
	return this.difusa;
};

Luz.prototype.beginDraw = function() {

};
Luz.prototype.endDraw = function() {
};