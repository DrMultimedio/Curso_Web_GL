function Luz(){
	this.emitida = [1.0, 1.0, 1.0, 1.0];
	this.ambiente = [1.0, 1.0, 1.0, 1.0];
	this.especular = [1.0, 1.0, 1.0, 1.0];
	this.difusa = [1.0, 1.0, 1.0, 1.0];

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

Luz.prototype.beginDrawImprime = function() {
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Soy una luz y mi difusa es "+ this.difusa + " <br>";

};
Luz.prototype.endDrawImprime = function() {

		document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Soy una luz y termino de imprimirme <br>";
};