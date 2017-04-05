function AnimacionArbol(){
/*	this.animacion = new Animacion();
*/			
	this.animacion = null;
	this.nombre = null;
	this.frames = 0;
}
AnimacionArbol.prototype.setFrame = function(nombre, frame) {
/*	gestor.getAnimacion(nombre, frame);
*/	
		if(this.nombre == null){
			this.nombre = nombre;
		}
		this.frames++;
};
AnimacionArbol.prototype.getAnimacion = function() {
	return this.animacion	;
};

AnimacionArbol.prototype.beginDraw = function() {

};
AnimacionArbol.prototype.endDraw = function() {
};

AnimacionArbol.prototype.beginDrawImprime = function() {
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Soy una animacion y mi nombre es "+ this.nombre + " y tengo "+ this.frames+" frames <br>";

};
AnimacionArbol.prototype.endDrawImprime = function() {

	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Soy una animacion y termino de imprimirme <br>";
};