function MallaGestor(){
	this.vertices = null;
	this.normales = null;
	this.texturas = null;
	this.indices = null;

	this.vertTriangulo = null;
	this.normTriangulo = null;
	this.textTriangulo = null;

	this.nTriangulos = null;
	this.nombreFich = null;
}
MallaGestor.prototype.getNombre = function(){
	return this.nombreFich;
}
MallaGestor.prototype.cargarFichero = function(fich) { 
		var malla = this;
		var peticion = new XMLHttpRequest();
		peticion.open('GET', fich, false);
		var mesh= null;
		peticion.onload = function() {
				mesh = new OBJ.Mesh(peticion.responseText);
				malla.vertices = mesh.vertices;
				malla.nombreFich = fich;
				malla.indices = mesh.indices;
		}
		peticion.send();
};
MallaGestor.prototype.draw = function() {

//codigo apoyado en el ejemplo square de WebGL Beginners Guide
	//iniciamos GL
    try {
        gl = canvas.getContext("webg2");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    //inicializamos program
    	
    	//Inicializamos el fragment shader y el vertex shader
		var fgShader = utils.getShader(gl, "shader-fs");
		var vxShader = utils.getShader(gl, "shader-vs");

		//guardamos el programa y le pasamos los shaders
		prg = gl.createProgram();
		gl.attachShader(prg, vxShader);
		gl.attachShader(prg, fgShader);
		gl.linkProgram(prg);

		if (!gl.getProgramParameter(prg, gl.LINK_STATUS)) {
			alert("No se han podido inicializar los shaders");
		}

		gl.useProgram(prg);

		//The following lines allow us obtaining a reference to the uniforms and attributes defined in the shaders.
		//This is a necessary step as the shaders are NOT written in JavaScript but in a 
		//specialized language called GLSL. More about this on chapter 3.
		prg.vertexPosition = gl.getAttribLocation(prg, "aVertexPosition");


	//cargamos los buffers

		//El siguiente codigo crea un buffer de vertices y los enlaza con los de la malla
		squareVertexBuffer = gl.createBuffer();
		//preguntar que hacen exactamente estas lineas de codigo
		gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		
		//El siguiente codigo crea un buffer de vertices y los enlaza con los indices
		squareIndexBuffer = gl.createBuffer();
		//preguntar que hacen exactamente estas lineas de codigo
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

	//Render Loop

		utils.requestAnimFrame(renderLoop);//preguntar que hace exactamente esta linea de codigo

	//dibujamos la escena
	
		gl.clearColor(0.5, 0.5, 0.5, 1.0);
		gl.enable(gl.DEPTH_TEST);
	
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.viewport(0,0,c_width, c_height);
		
	    mat4.perspective(45, c_width / c_height, 0.1, 10000.0, pMatrix); //linea default
	    //fieldOfViewYInRadians, aspect, zNear, zFar, dst
	    mat4.identity(mvMatrix);
	    mat4.translate(mvMatrix, [0.0, 0.0, -5]);

		gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
		gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(prg.vertexPosition);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);






    }
    catch (e) {
    	alert("algo se ha ido de madre xd");
    }
    if (!gl) {
		document.getElementById("resultado").innerHTML = "Tu navegador no soporta WebGL o el código se me ha liado xd. So sorry ):";
    }

};

MallaGestor.prototype.drawImprime = function() {
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Vertices<br>" + this.vertices + "<br>";
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Indices<br>" + this.indices + "<br>";


};


