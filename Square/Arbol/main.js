function main () {
	nodPadre = new Nodo();
	//agrego 3 hijos al padre
	nodPadre.addHijo();
	nodPadre.addHijo();

	nodHijo = nodPadre.addHijo().addHijo();

	nodPadre.drawImprime();

}