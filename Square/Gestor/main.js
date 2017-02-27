function main () {
	malla = new Malla();
	setTimeout(malla.cargaFichero("./prueba.obj"), 100000);

	malla.draw();

}