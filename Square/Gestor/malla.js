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
	this.frames = null;

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

	console.log("Iniciamos dibujado de MallaGestor");	

	gl = utils.getGLContext('canvasMotor');
	console.log("Iniciamos bufferes");	

	//Creamos los buffers
	console.log("Creamos bufferes");	
	squareVertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	
	//El siguiente codigo genera un buffer y lo liga a gl
	console.log("Ligamos buffers");	

	squareIndexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), gl.STATIC_DRAW);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
	//Dibujamos el elemnto de la malla
	gl.bindBuffer(gl.ARRAY_BUFFER, squareVertexBuffer);
	gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(prg.vertexPosition);
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, squareIndexBuffer);
/*	gl.drawElements(gl.TRIANGLES, this.indices.length, gl.UNSIGNED_SHORT,0);
*/
}
MallaGestor.prototype.endDraw = function() {


}
MallaGestor.prototype.drawImprime = function() {
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Vertices<br>" + this.vertices + "<br>";
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Indices<br>" + this.indices + "<br>";


};


