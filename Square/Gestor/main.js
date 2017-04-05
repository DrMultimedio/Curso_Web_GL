function main () {

	gestor = new Gestor();

	gestor.getRecurso("prueba.obj");

	gestor.getRecurso("cone.json").drawImprime();
	
	gestor.getRecurso("prueba.obj").drawImprime();

	gestor.getTextura("prueba.jpg").drawImprime();
	gestor.getTextura("prueba.png").drawImprime();
	gestor.getTextura("prueba.jpg").drawImprime();

	gestor.setMaterial("rojo", [1.0, 0.0, 0.0, 1.0]).drawImprime();

	var anim = gestor.pushAnimacion('anim1','prueba.obj');
	anim.pushMalla('bb8.obj');
	anim.pushMalla('cone.json');

	anim.drawImprime();
	anim.drawImprime();
	anim.drawImprime();

/*	malla = new MallaGestor();
	malla.cargaFichero("./prueba.obj", function(){
		malla.draw();
	});

	gestor.getRecurso(malla);

	gestor.getRecurso(malla);
	gestor.getRecurso(malla);
*/	//malla.draw();

/*
	 // Hacemos una promesa: prometemos un contador numérico de esta promesa,
  // empezando por 1 (después de esperar 3s)
  var p1 = new Promise(
    // La función resolvedora es llamada con la
    // habilidad de resolver o rechazar la promesa
    function(resolve, reject) {


		var peticion = new XMLHttpRequest();
		peticion.open('GET', fich, true);
		var mesh= null;
		var vertices;
		var indices;

		peticion.onload = function() {

				mesh = new OBJ.Mesh(peticion.responseText);
				malla.vertices = mesh.vertices;
				malla.indices = mesh.indices;
				resolve(malla);
		}


		peticion.send();
		//fin de codigo adaptado
	    }
  );

  p1.then(
  	function(m){
  		m.draw();
  	}, 
  	function(m){
  		console.log("fallo");
  	}

)
*/

}