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
MallaGestor.prototype.cargarFichero = function(fich, callback) {

	this.nombreFich = fich; 
/*	var peticion = new XMLHttpRequest();
	peticion.open('GET', fich, async);
	var mesh= null;
	var vertices;
	var indices;
	var yo = this;

	peticion.onload = function() {

			mesh = new OBJ.Mesh(peticion.responseText);
			yo.vertices = mesh.vertices;
			yo.indices = mesh.indices;

	}

	peticion.send();
	//fin de codigo adaptado
	return peticion.responseText;*/

	 // Hacemos una promesa: prometemos un contador numérico de esta promesa,
  // empezando por 1 (después de esperar 3s)

  //Codigo sacado de mozilla dev
  var malla = this;
  var p1 = new Promise(
    // La función resolvedora es llamada con la
    // habilidad de resolver o rechazar la promesa
    function(resolve, reject) {


		var peticion = new XMLHttpRequest();
		peticion.open('GET', fich, true);
		var mesh= null;
		peticion.onload = function() {

				mesh = new OBJ.Mesh(peticion.responseText);
				malla.vertices = mesh.vertices;
				malla.indices = mesh.indices;
				console.log(malla.vertices);
				resolve(malla);
		}


		peticion.send();
		  		console.log("enga va");

		//fin de codigo adaptado
	    }
  );

  p1.then(
  	function(m){
  		callback();

  	})
  	.catch (
  	function(m){
  		console.log("fallo");
  	}

)

};


MallaGestor.prototype.draw = function() {
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Vertices<br>" + this.vertices + "<br>";
	document.getElementById("resultado").innerHTML = document.getElementById("resultado").innerHTML + "Indices<br>" + this.indices + "<br>";


};


