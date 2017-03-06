var canvas = null;
var gl = null; // contexto webgl
var prg = null; //los shaders
var c_width = 0; // Variable to store the width of the canvas
var c_height = 0; // Variable to store the height of the canvas

var mvMatrix = mat4.create(); // la matriz model view
var pMatrix = mat4.create(); // la matriz de proyeccion
var fgShader;
var vxShader;

function main () {

	/*canvas = document.getElementById("canvasMotor");
	console.log("Iniciamos el gestor");
	gestor = new Gestor();

	console.log("Iniciamos el recurso");

	gestor.getRecurso("./bb8.obj");

/*	console.log("Lo mandamos imprimir en texto");

	gestor.getRecurso("../chess.obj").drawImprime();

*/	console.log("Lo mandamos imprimir en motor");

<<<<<<< HEAD
	gestor.getRecurso("./bb8.obj").draw();

}
=======
	gestor.getRecurso("chess.obj").draw();*/
	console.log("Creo un motor");
	var motor= new Motor();
	console.log("Creo la escena");
	motor.crearEscena();
	var nodo1=motor.crearTranslacion(2,2,2);
	var nodo2=motor.crearEscalado(2,2,2);
	var nodo3=motor.crearEscalado(2,2,2);
	var nodo4=motor.crearTranslacion(2,2,2);
	var nodo5=motor.crearEscalado(2,2,2);
	var nodo6=motor.crearEscalado(2,2,2);
	var nodo7=motor.crearRotacion(90,1,1,1);
	motor.agregaNodo(motor.escena, nodo1);
	motor.agregaNodo(motor.escena, nodo2);
	motor.agregaNodo(motor.escena, nodo3);
	motor.agregaNodo(nodo1, nodo4);
	motor.agregaNodo(nodo2, nodo5);
	motor.agregaNodo(nodo3, nodo6);
	motor.agregaNodo(nodo3, nodo7);
	var camara=motor.crearCamara();
	motor.agregaCam(camara);
	motor.setCamActiva(0);
	var luz1=motor.crearLuz();
	var luz2=motor.crearLuz();
	motor.agregaLuz(luz1);
	motor.agregaLuz(luz2);
	motor.setLuzActiva(0);
	var malla=motor.crearMalla("bb8.obj");
	motor.agregaNodo(nodo4,camara);
	motor.agregaNodo(nodo5,luz1);
	motor.agregaNodo(nodo6,luz2);
	motor.agregaNodo(nodo7,malla);
	motor.draw();
}
>>>>>>> origin/master
