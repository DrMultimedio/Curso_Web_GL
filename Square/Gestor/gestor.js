function Gestor() {
  this.recursos = [];
}

Gestor.prototype.getRecurso = function(nombre) {

	recurso = null; 
	for(i=0;i<this.recursos.length;i++){
		if(this.recursos[i].getNombre() == nombre){
			recurso = this.recursos[i];
			break;
		}
	}

	if(recurso == null){
		recurso = new MallaGestor();
		recurso.cargarFichero(nombre);
		this.recursos.push(recurso);
	}
	return recurso;
};
