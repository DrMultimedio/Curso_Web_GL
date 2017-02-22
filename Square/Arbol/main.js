function main () {

	pila = [];
	Matriz = mat4.create();
	mat4.identity(Matriz);

	nodPadre = new Nodo();
	//agrego 3 hijos al padre
	nodPadre.addHijo();
	malla1 = new Malla();
	trans1 = new Transformacion();
	trans2 = new Transformacion();
	trans2.rotar(-75, 2, 2 ,1);
	trans1.trasladar(5,5,6);
	nodPadre.addHijo().setEntidad(malla1);
	nodTrans1 = nodPadre.addHijo()
	nodTrans1.setEntidad(trans1);
	nodTrans2 = nodPadre.addHijo()
	nodTrans2.setEntidad(trans2);
	nodTrans2.addHijo().setEntidad(malla1);
	nodTrans2.addHijo().setEntidad(malla1);

	nodPadre.drawImprime();

}