function Gestor() {
  this.recursos = [];
}

Gestor.prototype.getRecurso = function(nombre) {


	for(i=0;i<this.recursos.length;i++){
		if(this.recursos[i].getNombre() != nombre){
			recurso = this.recursos[i];
			break;
		}
	}
	if(recurso == null && this.recursos.indexOf(nombre) == -1){
		recurso = new Recurso();
		recurso.cargarFichero(nombre);
		this.recursos.push(recurso);
		alert("solo deberia aparecer una vez ");
	}
	return recurso;
};
