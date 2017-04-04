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
		var formato = fich.split('.').pop();
		console.log("El formato es " + formato);
		if(formato == "obj"){

			peticion.onload = function() {
					mesh = new OBJ.Mesh(peticion.responseText);
					malla.vertices = mesh.vertices;
					malla.nombreFich = fich;
					malla.indices = mesh.indices;
			}

		peticion.send();
		}
		else if(formato == "3ds"){
			peticion.onload = function() {
					mesh = new Lib3ds(document.getElementById("dbg"), true);
					mesh.readFile(peticion.responseText);

					//aqui leo indices, vertices y esa vaina


					console.log(fich);
					console.log(mesh);
			}

			console.log(mesh);

			peticion.send();
		}

		else if(formato == "json"){
			peticion.onload = function() {
					mesh = JSON.parse(peticion.responseText);
					malla.nombreFich = fich;

					//aqui leo indices, vertices y esa vaina
					malla.vertices = mesh.vertices;
					malla.nombreFich = fich;
					malla.indices = mesh.indices;

					console.log(fich);
					console.log(mesh);
			}

			console.log(mesh);

			peticion.send();
		}
		else{
			console.log("Formato no reconocido");
		}

/*
var req = new XMLHttpRequest();

if(req.overrideMimeType) {
  req.overrideMimeType("text/plain; charset=x-user-defined");
}

req.onreadystatechange = function() {

  if(req.readyState == 4) {
    if(req.status == 0 || req.status == 200) {
      // Note that turning on debugging makes reading the file much slower.
      var mesh = new Lib3ds(document.getElementById("dbg"), true);
      mesh.readFile(req.responseText);
      console.log(mesh);
    }
  }
}
console.log(mesh);
req.open("GET", true);
req.send(null);*/

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
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "El nombre de la malla es " + this.nombreFich + "<br>";
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Vertices<br>" + this.vertices + "<br>";
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Indices<br>" + this.indices + "<br>";


};


