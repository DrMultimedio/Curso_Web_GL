function main () {
	nodPadre = new Nodo();
	//agrego 3 hijos al padre
	nodPadre.addHijo();
	nodPadre.addHijo();

	nodHijo = nodPadre.addHijo().addHijo();

	/*
	var nodHijo = new Nodo();
	nodHijo.addHijo();
	nodPadre.addHijoCreado(nodHijo);
	*/
	nodPadre.drawImprime();

}