function Gestor() {
  this.recursos = [];
}

Gestor.prototype.getRecurso = function(nombre) {
	console.log("Entro a get recurso y voy a comprobar el nombre:"+nombre);
	recurso = null; 
	console.log("Miro si hay recursos:"+this.recursos.length);
	for(i=0;i<this.recursos.length;i++){
		console.log("Si que hay compruebo con este nombre:"+this.recursos[i].getNombre());
		if(this.recursos[i].getNombre() == nombre){
			console.log("Encontrado y lo devuelvo");
			recurso = this.recursos[i];
			break;
		}
	}
	if(recurso == null){
		console.log("No hay objetos");
		recurso = new MallaGestor();
		console.log("Creo un recurso");
		recurso.cargarFichero(nombre);
		console.log("Cargo la malla");
		console.log("El array de recursos esta vacio:"+this.recursos);
		this.recursos.push(recurso);
		console.log("La meto en el array de recuros y lo vuelvo a mostrar el array:"+this.recursos);
	}
	return recurso;
};
