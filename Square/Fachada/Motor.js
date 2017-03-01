function Motor(){
	this.escena = null;
	this.gestorRecursos = null;

}
Motor.prototype.crearEscena = function(padre) {
	//Se crea un nodo escena
	nodo = padre.addHijo();
	escena = nodo; 
	return nodo; 
};

Motor.prototype.crearNodo = function(padre, entidad) {
	//añade un hijo al padre que nos pasan y se le añade la entidad si la tuviera. Devuelve el nodo.
	nodo = padre.addHijo();
	if(entidad != null){
		nodo.setEntidad(entidad);
	}
	return nodo; 
};
Motor.prototype.agregaNodo = function(padre, entidad, hijo) {
	//añade un hijo al padre que nos pasan y se le añade la entidad si la tuviera. Devuelve el nodo.
	nodo = padre.addHijoCreado(hijo);
	if(entidad != null){
		nodo.setEntidad(entidad);
	}
	return nodo; 
};
Motor.prototype.crearTransposicion = function() {
	//crea un nodo y le añade una entidad transformacion, de tipo transponer. Devuelve el nodo.
	nodo = new Nodo();
	trans = new Transformacion(); 
	trans.transponer();
	nodo.setEntidad(trans);
	return nodo;
};
Motor.prototype.crearTranslacion = function(x,y,z) {
	//crea un nodo y le añade una entidad transformacion, de tipo transponer. Devuelve el nodo.
	nodo = new Nodo();
	trans = new Transformacion(); 
	trans.trasladar(x,y,z);
	nodo.setEntidad(trans);
	return nodo;
};

Motor.prototype.crearTranslacion = function(angulo, x,y,z) {
	//crea un nodo y le añade una entidad transformacion, de tipo transponer. Devuelve el nodo.
	nodo = new Nodo();
	trans = new Transformacion(); 
	trans.rotar(angulo,x,y,z);
	nodo.setEntidad(trans);
	return nodo;
};

Motor.prototype.crearEscalado = function(x,y,z) {
	//crea un nodo y le añade una entidad transformacion, de tipo transponer. Devuelve el nodo.
	nodo = new Nodo();
	trans = new Transformacion(); 
	trans.escalar(x,y,z);
	nodo.setEntidad(trans);
	return nodo;
};

Motor.prototype.crearCamara = function() {
	//crea un nodo y le añade una entidad camara. Devuelve el nodo.
	nodo = new Nodo();
	cam = new Camara(); 
	nodo.setEntidad(cam);
	return nodo;
};
Motor.prototype.crearLuz = function(amb, dif, esp) {
	//crea un nodo y le añade una entidad luz. Devuelve el nodo.
	nodo = new Nodo();
	luz = new Luz(); 
	nodo.setEntidad(luz);
	return nodo;
};
Motor.prototype.crearMalla = function(nombre) {
	//crea un nodo y le añade una entidad malla. Devuelve el nodo.
	nodo = new Nodo();
	malla = new Malla(); 
	malla.cargarMalla();

	nodo.setEntidad(malla);
	return nodo;
};
Motor.prototype.draw = function() {
	escena.draw();
};