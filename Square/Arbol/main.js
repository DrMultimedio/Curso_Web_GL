function main () {
	nodPadre = new Nodo();
	//agrego 3 hijos al padre
	nodPadre.addHijo();
	malla1 = new Malla();
	trans1 = new Transformacion();

	nodPadre.addHijo().setEntidad(malla1);
	nodTrans1 = nodPadre.addHijo()
	nodTrans1.setEntidad(trans1);
	nodTrans2 = nodPadre.addHijo()
	nodTrans2.setEntidad(trans1);
	nodTrans1.addHijo().setEntidad(malla1);

	nodPadre.drawImprime();

}