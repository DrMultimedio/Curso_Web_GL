MatrizView = mat4.create();
mat4.identity(MatrizView);
prg = null;
gl = null;
function Motor(){
	this.escena = null;
	this.gestorRecursos = null;
	//en luces guardo las entidades luces, y en luces activas si están encendidas o apagadas (0 o 1)
	this.luces = [];
	this.lucesActivas = [];
	this.matricesLuces = [];
	//en camaras guardo las entidades camaras, y en camaras activas la camara encendida, el resto estara a 0
	this.cams = [];
	this.camActiva = null;
	this.viewport = [];
	this.viewportActivos = [];
}
Motor.prototype.crearEscena = function() {
	//Se crea un nodo escena
	var nodo=new Nodo();
	this.escena=nodo;
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
Motor.prototype.agregaNodo = function(padre, hijo) {
	//añade un hijo al padre que nos pasan y se le añade la entidad si la tuviera. Devuelve el nodo.
	nodo = padre.addHijoCreado(hijo);
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
Motor.prototype.crearRotacion = function(angulo, x,y,z) {
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
Motor.prototype.crearLuz = function() {
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
	malla.cargarMalla(nombre);

	nodo.setEntidad(malla);
	return nodo;
};
Motor.prototype.agregaLuz = function(l) {
	console.log("luces antes vale:");
	console.log(this.luces);
	console.log("Inserto la luz:");
	console.log(l);
	this.luces.push(l);
	this.lucesActivas.push(0);
	this.matricesLuces.push(null);
	console.log("luces despues vale:");
	console.log(this.luces);
	console.log("Y el array mide:");
	console.log(this.luces.length);
};
Motor.prototype.setLuzActiva = function(cam) {
	console.log("lucesActiva.lenght activas antes vale:");
	console.log(this.lucesActivas.length);
	console.log("luces.lenght antes vale:");
	console.log(this.luces.length);
	this.lucesActivas[cam] = 1;
	console.log("luces activas despues vale:");
	console.log(this.lucesActivas);
	console.log("luces despues vale:");
	console.log(this.luces);
};
Motor.prototype.agregaCam = function(l) {
	this.cams.push(l);
	return this.cams.length;
};
Motor.prototype.setCamActiva = function(cam) {
	camActiva=cam;
};
Motor.prototype.drawInitProgram = function() {
	console.log("Inicializamos GL");
	gl = utils.getGLContext('canvas-element-id');
	fgShader = utils.getShader(gl, "shader-fs");
	vxShader = utils.getShader(gl, "shader-vs");

	prg = gl.createProgram();
	gl.attachShader(prg, vxShader);
	gl.attachShader(prg, fgShader);
	gl.linkProgram(prg);

	if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
		alert("No se han podido inicializar los shaders");
	}

	gl.useProgram(prg);
	prg.vertexPosition = gl.getAttribLocation(prg, "aVertexPosition");
}

Motor.prototype.draw = function() {
	//pasos para crear el motor

	//paso 1 cargar librería gráfica
	this.drawInitProgram();
	//paso 4 inicializar la camara
	//calcular la matriz de view
		var camara = this.cams[camActiva];
		var recorridocamara = [];
		while(camara.getPadre()!=null){
			camara = camara.getPadre();
			recorridocamara.push(camara);
		}
		recorridocamara.pop();
		recorridocamara.reverse();
		var maux =  mat4.create();
		mat4.identity(maux);
		var matriz = mat4.create();
		mat4.identity(matriz);
		console.log("Voy a recorrer el array y multiplicar sus matrices");
		for(var p=0; p<recorridocamara.length; p++){
			console.log("Interaccion numero:");
			console.log(p);
			console.log(recorridocamara[p].getEntidad());
			matriz = recorridocamara[p].getEntidad().getMatriz();
			console.log("El valor de matriz es :");
			console.log(matriz);
			mat4.multiply(maux, matriz);
			console.log("El valor de maux en este momento es :");
			console.log(maux);
		}
		mat4.inverse(maux, MatrizView );
		console.log(MatrizView);
	//paso2 incializar las luces
		console.log("Recorro el array de luces activas para ver cual esta activa");
		console.log(this.lucesActivas);
		for(var i=0; i<this.lucesActivas.length; i++){
		console.log("En la iteraccion "+i);
		if(this.lucesActivas[i]==1){
			console.log("Luz activa");
			var recorrido = [];
			var luz = this.luces[i];
			console.log("luz vale: ");
			console.log(luz);
			while(luz.getPadre()!=null){
				console.log("Asciendo al padre y guardo el nodo en recorrido")
				console.log(luz.getPadre());
				luz = luz.getPadre();
				recorrido.push(luz);
			}
			recorrido.pop();
			recorrido.reverse();
			var aux =  mat4.create();
		  	mat4.identity(aux);
	  		var matriz = mat4.create();
  			mat4.identity(matriz);
			console.log("Recorro el array de tranformaciones");
  			for(var j=0; j<recorrido.length; j++){
				console.log("tranformacion numero:"+j);
				console.log(recorrido[j].getEntidad());
				matriz = recorrido[j].getEntidad().getMatriz();
				console.log("Multiplico "+matriz+" por "+aux);
				mat4.multiply(aux, matriz);
				console.log("matriz vale: ");
				console.log(matriz);
				console.log("aux vale: ");
				console.log(aux);
			  }
			this.matricesLuces[i]=matriz;
			}else{
				console.log("Luz apagada");
			}
	}
	console.log(this.matricesLuces);
	//paso 3 incializar el viewport

	//paso 5 > DRAW
	console.log(this.escena);
	this.escena.draw();

};