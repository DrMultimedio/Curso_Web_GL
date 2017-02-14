function Nodo (){
	this.entidad = null;
	this.hijos = [];
	this.padre = null;
}
Nodo.prototype.setEntidad = function(ent) {
	this.entidad = ent;
};
Nodo.prototype.getEntidad = function() {
	return this.entidad;	
};
Nodo.prototype.getPadre = function() {
	return this.padre;
};
Nodo.prototype.addHijo = function() {

	var hijo = new Nodo();
	hijo.padre = this;
	this.hijos.push(hijo);
	return hijo; 

};

Nodo.prototype.getHijos = function() {
	return this.hijos;
};
Nodo.prototype.remHijo = function(hijo) {
	pad = hijo.padre;
	hijos = pad.getHijos;
	//lineas adaptadas de StackOverflow por el usuario Tom Wadley en la pregunta https://goo.gl/lfpbXR
	index = array.indexOf(hijo);
	if (index > -1) {
    	array.splice(index, 1);
    //fin de lineas de StackOverflow por Tom Wadley
    	return true;
	}
	else{
		return false;
	}
};
Nodo.prototype.draw = function() {

	if(this.entidad != null){
		this.entidad.beginDraw();

	}
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Me imprimo <br>";
	if(this.hijos.length>0){
			alert(this.hijos.length);

			document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "<h3>Mando imprimir a mis hijos</h3><br>";
		for(i = 0; i<this.hijos.length ; i++){
			this.hijos[i].draw();
		}
		document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + 	"<h3>Mis hijos han terminado</h3> <br>";
	}
		document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "He terminado de imprimirme <br>";

	if(this.entidad != null){

		this.entidad.endDraw();
	}
};


