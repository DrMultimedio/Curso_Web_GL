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


MallaGestor.prototype.drawInitProgram = function() {
	console.log("Inicializamos GL");
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

MallaGestor.prototype.drawInitBuffers = function() {
	console.log("Iniciamos bufferes");	

	squareVertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	//The following code snippet creates a vertex buffer and binds the indices to it
	squareIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}

MallaGestor.prototype.draw = function() {

	console.log("Iniciamos");	

	gl = utils.getGLContext('canvasMotor');
	console.log("Iniciamos bufferes");	

	//Creamos los buffers
	squareVertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	//The following code snippet creates a vertex buffer and binds the indices to it
	squareIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	//Dibujamos el elemnto de la malla
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
	gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(prg.vertexPosition);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
	gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT,0);


}

/*MallaGestor.prototype.drawScene = function() {
	console.log("Le dibujo");	
		gl.clearColor(0.5, 0.5, 0.5, 1.0);
		gl.enable(gl.DEPTH_TEST);
	
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		gl.viewport(0,0,c_width, c_height);
		

	};*/

MallaGestor.prototype.drawImprime = function() {
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Vertices<br>" + this.vertices + "<br>";
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Indices<br>" + this.indices + "<br>";


};


