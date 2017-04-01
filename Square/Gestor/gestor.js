function Gestor() {
  this.recursos = [];
  this.animaciones = [];
}

Gestor.prototype.getRecurso = function(nombre) {
	console.log("Entro a get recurso y voy a comprobar el nombre:"+nombre);
	recurso = null; 
	var aux=false;
	console.log("Miro si hay recursos:"+this.recursos.length);
	if(this.recursos.length!=0)
	aux=true;
	for(i=0;i<this.recursos.length;i++){
		console.log("Si que hay compruebo con este nombre:"+this.recursos[i].getNombre());
		if(this.recursos[i].getNombre() == nombre){
			console.log("Encontrado y lo devuelvo");
			recurso = this.recursos[i];
			break;
		}
	}
	if(recurso == null){
		if(!aux)
		console.log("No hay objetos");
		recurso = new MallaGestor();
		console.log("Creo un recurso con el nombre: "+nombre);
		recurso.cargarFichero(nombre);
		console.log("Cargo la malla");
		console.log("El array de recursos esta vacio:(a partir de aqui no debe salir nada)"+this.recursos);
		this.recursos.push(recurso);
		console.log("La meto en el array de recuros y lo vuelvo a mostrar el array:"+this.recursos);
	}
	return recurso;
};
Gestor.prototype.getAnimacion = function(nombre) {
	a = null; 
	for(i=0;i<this.animaciones.length;i++){
		console.log("Si que hay compruebo con este nombre:"+this.animaciones[i].getNombre());
		if(this.animaciones[i].getNombre() == nombre){
			console.log("Encontrado y lo devuelvo");
			a = this.animaciones[i];
			break;
		}
	}
	return a;

};

Gestor.prototype.pushAnimacion = function(nombre, frame) {
	console.log("Entro a get recurso y voy a comprobar el nombre:"+nombre);
	a = null; 
	console.log("Creo una nueva animacion y le añado el primer frame")
	for(i=0;i<this.animaciones.length;i++){
		console.log("Si hay compruebo con este nombre:"+this.animaciones[i].getNombre());
		if(this.animaciones[i].getNombre() == nombre){
			console.log("Encontrado y lo devuelvo");
			a = this.animaciones[i];
			break;
		}
	}
	if(a == null){
		a = new Animacion();
		a.pushMalla(frame);
		console.log("Meto la animacion creada en el array de animaciones del gestor")
		this.animaciones.push(a);
	}
	else{
		a.pushMalla('frame');
	}
	return a;
};
