function main () {
	var nodPadre = new Nodo();
	//agrego 3 hijos al padre
	nodPadre.addHijo();
	nodPadre.addHijo();
	nodHijo = nodPadre.addHijo();
	//agrego un nieto
	//nodHijo.addHijo();
	//alert(nodHijo.getHijos[0].length);
	nodHijo.getPadre().draw();


}