function Nodo (){
	this.entidad = null;
	this.hijos[] = null;
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

	hijo = new Nodo();
	hijo.padre = this;
	return hijo; 

};
Nodo.prototype.getHijos = function() {
	return this.hijos;
};
Nodo.prototype.remHijo = function(hijo) {
	pad = hijo.padre;
	hijos = pad.getHijos;
	//lineas adaptadas de StackOverflow por el usuario Tom Wadley en la pregunta https://goo.gl/lfpbXR
	index = array.indexOf(5);
	if (index > -1) {
    	array.splice(index, 1);
    //fin de lineas de StackOverflow por Tom Wadley
    	return true;
	}
	else{
		return false;
	}
Nodo.prototype.draw = function() {

	if(this.entidad != null){
		this.entidad.beginDraw();
	}
	for(i = 0; i<this.hijos.length; i++){
		this.hijos[i].beginDraw();
	}
	if(this.entidad != null){
		this.entidad.endDraw();
	}
};


