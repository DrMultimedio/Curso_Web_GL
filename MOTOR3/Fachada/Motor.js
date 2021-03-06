function Motor(){
	this.escena = null;
	this.gestorRecursos = null;
	//en luces guardo las entidades luces, y en luces activas si están encendidas o apagadas (0 o 1)
	this.luces = [];
	this.lucesActivas = [];
	this.matricesLuces = [];
	this.lucesArray = [];
	//en camaras guardo las entidades camaras, y en camaras activas la camara encendida, el resto estara a 0
	this.cams = [];
	this.camActiva = null;
	this.viewport = [];
	this.viewportActivos = [];
	this.drawSceneHook= undefined;
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
	cam = new Camera(); 
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
	// console.log("Crear malla de motor");
	nodo = new Nodo();
	malla = new Malla(); 
	malla.cargarMalla(nombre);
	// console.log("CREANDO MALLA EN MOTOR");
	// console.log(malla);
	nodo.setEntidad(malla);
	return nodo;
};
Motor.prototype.agregaLuz = function(l) {
	// console.log("luces antes vale:");
	// console.log(this.luces);
	// console.log("Inserto la luz:");
	// console.log(l);
	this.luces.push(l);
	this.lucesActivas.push(0);
	this.matricesLuces.push(null);
	// console.log("luces despues vale:");
	// console.log(this.luces);
	// console.log("Y el array mide:");
	// console.log(this.luces.length);
};
Motor.prototype.setLuzActiva = function(cam) {
	// console.log("lucesActiva.lenght activas antes vale:");
	// console.log(this.lucesActivas.length);
	// console.log("luces.lenght antes vale:");
	// console.log(this.luces.length);
	this.lucesActivas[cam] = 1;
	// console.log("luces activas despues vale:");
	// console.log(this.lucesActivas);
	// console.log("luces despues vale:");
	// console.log(this.luces);
};
Motor.prototype.agregaCam = function(l) {
	this.cams.push(l);
	return this.cams.length;
};
Motor.prototype.setCamActiva = function(cam) {
	camActiva=cam;
};
var camera = null,
interactor = null,
transforms = null;
Motor.prototype.drawInitProgram = function() {
    gl.clearColor(0.3,0.3,0.3, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    
    //Creates and sets up the camera location
    camera = new Camera(CAMERA_ORBITING_TYPE);
    camera.goHome([0,5,30]);
    camera.setFocus([0.0,0.0,0.0]);
	camera.setAzimuth(-47);
	camera.setElevation(-3);

	var aux=this.escena;
    camera.hookRenderer = function(){
		aux.draw();
	};
    
    //Creates and sets up the mouse and keyboard interactor
    interactor = new CameraInteractor(camera, document.getElementById('canvas-element-id'));
    
    //Scene Transforms
    transforms = new SceneTransforms(camera);
   
    //init transforms
    transforms.init();
	
	//init Program
	var attributeList = ["aVertexPosition",
					"aVertexNormal",
					"aVertexColor"];

	var uniformList = [	"uPMatrix", 
					"uMVMatrix", 
					"uNMatrix",
					"uMaterialDiffuse",
					"uMaterialAmbient",
					"uLightAmbient",
					"uLightDiffuse",
					"uLightPosition",
					"uWireframe",
					"uLightSource",
					"uCutOff"
					];
				
	
	
	Program.load(attributeList, uniformList);	
	gl.uniform4fv(Program.uLightAmbient ,  [1.0,1.0,1.0,1.0]);
	console.log(Luces.getArray('position'));
	gl.uniform3fv(Program.uLightPosition, Luces.getArray('position'));
	gl.uniform4fv(Program.uLightDiffuse,  Luces.getArray('diffuse'));
	gl.uniform1f(Program.uCutOff, 0.4);
}
Motor.prototype.initViewMatrix = function() {

	// console.log("init view matrix");
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
	// console.log("Voy a recorrer el array y multiplicar sus matrices");
	for(var p=0; p<recorridocamara.length; p++){
		// console.log("Interaccion numero:");
		// console.log(p);
		// console.log(recorridocamara[p].getEntidad());
		matriz = recorridocamara[p].getEntidad().getMatriz();
		// console.log("El valor de matriz es :");
		// console.log(matriz);
		mat4.multiply(maux, matriz);
		// console.log("El valor de maux en este momento es :");
		// console.log(maux);
	}
	mat4.inverse(maux, transforms.mvMatrix );

	console.log(transforms.mvMatrix);
};

Motor.prototype.initLights = function() {
		// console.log("Recorro el array de luces activas para ver cual esta activa");
		// console.log(this.lucesActivas);
		for(var i=0; i<this.lucesActivas.length; i++){
		// console.log("En la iteraccion "+i);
		if(this.lucesActivas[i]==1){
			// console.log("Luz activa");
			var recorrido = [];
			var luz = this.luces[i];
			// console.log("luz vale: ");
			// console.log(luz);
			while(luz.getPadre()!=null){
				// console.log("Asciendo al padre y guardo el nodo en recorrido")
				// console.log(luz.getPadre());
				luz = luz.getPadre();
				recorrido.push(luz);
			}
			recorrido.pop();
			recorrido.reverse();
			var aux =  mat4.create();
		  	mat4.identity(aux);
	  		var matriz = mat4.create();
  			mat4.identity(matriz);
			// console.log("Recorro el array de tranformaciones");
  			for(var j=0; j<recorrido.length; j++){
				// console.log("tranformacion numero:"+j);
				// console.log(recorrido[j].getEntidad());
				matriz = recorrido[j].getEntidad().getMatriz();
				// console.log("Multiplico "+matriz+" por "+aux);
				mat4.multiply(aux, matriz);
				// console.log("matriz vale: ");
				// console.log(matriz);
				// console.log("aux vale: ");
				// console.log(aux);
			  }
			this.matricesLuces[i]=matriz;
			console.log()
			this.luces[i].getEntidad().setPosition([matriz[12],matriz[13],matriz[14]]);
			this.luces[i].getEntidad().setDiffuse([1.0,1.0,1.0,1.0]);
			Luces.add(this.luces[i].getEntidad());
			}else{
				// console.log("Luz apagada");
			}
	}
	console.log(this.matricesLuces);
};
Motor.prototype.draw = function() {
	//pasos para crear el motor
	// console.log("entro a init light");
	this.initLights();
	// console.log("SAlgo de init gight");
	//paso 1 cargar librería gráfica
	this.drawInitProgram();
	//paso 4 inicializar la camara
	//calcular la matriz de view
	// console.log(mvMatrix);
	// this.initViewMatrix();
	// console.log(mvMatrix);
	//paso2 incializar las luces
	//paso 3 incializar el viewport
	//paso 5 > DRAW
	var aux=this.escena;
	this.drawSceneHook  = function(){
        aux.draw();
 	}
	WEBGLAPP_RENDER = this.drawSceneHook;
   
	renderLoop();
	//mandamos el arbol a dibujar
};