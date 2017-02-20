function Gestor() {
  this.recursos = [];
}

Gestor.prototype.getRecurso = function(nombre) {


	for(i=0;i<this.recursos.length;i++){
		if(this.recursos[i].getNombre() == nombre){
			recurso = this.recursos[i];
			break;
		}
	}

	if(recurso == null){
		recurso = new Recurso();
		recurso.cargarFichero(nombre);
		this.recursos.push(recurso);
	}
	return recurso;
};
