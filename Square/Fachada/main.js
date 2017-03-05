var canvas = null;
var gl = null; // contexto webgl
var prg = null; //los shaders
var c_width = 0; // Variable to store the width of the canvas
var c_height = 0; // Variable to store the height of the canvas

var mvMatrix = mat4.create(); // la matriz model view
var pMatrix = mat4.create(); // la matriz de proyeccion


function main () {

	canvas = document.getElementById("canvasMotor");
	console.log("Iniciamos el gestor");
	gestor = new Gestor();

	console.log("Iniciamos el recurso");

	gestor.getRecurso("chess.obj");

	console.log("Lo mandamos imprimir en texto");

	gestor.getRecurso("chess.obj").drawImprime();

	console.log("Lo mandamos imprimir en motor");

	gestor.getRecurso("chess.obj").draw();

}