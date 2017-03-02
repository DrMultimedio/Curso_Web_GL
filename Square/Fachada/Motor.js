function Motor(){
	this.escena = null;
	this.gestorRecursos = null;
	//en luces guardo las entidades luces, y en luces activas si están encendidas o apagadas (0 o 1)
	this.luces = [];
	this.lucesActivas = [];

	//en camaras guardo las entidades camaras, y en camaras activas la camara encendida, el resto estara a 0
	this.cams = [];
	this.camActivas = [];
	this.viewport = [];
	this.viewportActivos = [];

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
Motor.prototype.agregaLuz = function(l) {
	this.luces.push(l);
	return luces.length();
};
Motor.prototype.setLuzActiva = function(cam) {

	this.lucesActivas.length = this.luces.length;
	this.lucesActivas[cam] = 1;
};
Motor.prototype.agregaCam = function(l) {
	this.cams.push(l);
	return cams.length();
};
Motor.prototype.setCamActiva = function(cam) {

	this.camsActivas.length = this.cams.length;
	for(i=0; i< this.camsActivas.length ; i++){
		this.camsActivas[i] = 0;
	}
	this.camsActivas[cam] = 1;
};
Motor.prototype.draw = function() {
	//pasos para crear el motor
	//paso 1 cargar librería gráfica

	//paso2 incializar las luces

	//paso 3 incializar el viewport

	//paso 4 inicializar la camara

	//paso 5 > DRAW

	escena.draw();
};