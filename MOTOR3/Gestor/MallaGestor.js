function MallaGestor(){
	this.vertices = null;
	this.diffuse = null;
	this.wireframe = null;
	this.ambient = null;
	this.vbo = null;
	this.cbo = null;
	this.ibo = null;
	this.indices = null;
	this.nbo = null;
	this.perVertexColor = null;
	this.alias=null;
	this.remote=null;
}
MallaGestor.prototype.getNombre = function(){
	return this.nombreFich;
}
MallaGestor.prototype.cargarFichero = function(fich) { 
		var peticion = new XMLHttpRequest();
		var alias= null;
		var malla = this;
		peticion.open('GET', fich, false);
		peticion.onload = function() {
			object = new OBJ.Mesh(peticion.responseText);
			console.log("El response tex al cargar el objeto vale:");
			console.log(object);
			if (object.wireframe        === undefined)    {   malla.wireframe        = false;            }
			if (object.diffuse          === undefined)    {   malla.diffuse          = [1.0,1.0,1.0,1.0];}
			if (object.ambient          === undefined)    {   malla.ambient          = [0.1,0.1,0.1,1.0];}
			if (object.specular         === undefined)    {   malla.specular         = [1.0,1.0,1.0,1.0];}
			
			malla.alias = (alias==null)?'none':alias;
			malla.remote = true;
			malla.vertices=object.vertices;
			malla.indices=object.indices;
			malla.colors=object.colors;
			malla.wireframe = object.wireframe;
			malla.perVertexColor = object.perVertexColor;
			var vertexBufferObject = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.vertices), gl.STATIC_DRAW);
			
			var normalBufferObject = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferObject);
			gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Utils.calculateNormals(object.vertices, object.indices)), gl.STATIC_DRAW);
		
			var colorBufferObject;
			if (object.scalars){
				colorBufferObject = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferObject);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.scalars), gl.STATIC_DRAW);
				object.cbo = colorBufferObject;
			}
		
			var indexBufferObject = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.indices), gl.STATIC_DRAW);
			
			malla.vbo = vertexBufferObject;
			malla.ibo = indexBufferObject;
			malla.nbo = normalBufferObject;

			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
			gl.bindBuffer(gl.ARRAY_BUFFER,null);
					
			if (object.remote){
				console.info(object.alias + ' has been added to the scene [Remote]');
			}
			else {
				console.info(object.alias + ' has been added to the scene [Local]');
			}
		}
		peticion.send();
}


MallaGestor.prototype.draw = function() {
	var object = this;
	console.log(object);
	gl.viewport(0, 0, c_width, c_height);
    transforms.updatePerspective(); 
	gl.uniform3fv(Program.uLightPosition, Luces.getArray('position'));            
		
	transforms.calculateModelView();           
	transforms.push();
	
	gl.uniform1i(Program.uLightSource,false);
	
	transforms.setMatrixUniforms();
	transforms.pop();

	//Setting uniforms
	gl.uniform4fv(Program.uMaterialDiffuse, object.diffuse);
	gl.uniform4fv(Program.uMaterialAmbient, object.ambient);
	gl.uniform1i(Program.uWireframe,object.wireframe);
	
	//Setting attributes
	gl.enableVertexAttribArray(Program.aVertexPosition);
	gl.disableVertexAttribArray(Program.aVertexNormal);
	gl.disableVertexAttribArray(Program.aVertexColor);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, object.vbo);
	gl.vertexAttribPointer(Program.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(Program.aVertexPosition);
	
	if(!object.wireframe){
		gl.bindBuffer(gl.ARRAY_BUFFER, object.nbo);
		gl.vertexAttribPointer(Program.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
		gl.enableVertexAttribArray(Program.aVertexNormal);
	}
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.ibo);
	
	if (object.wireframe){
		gl.drawElements(gl.LINES, object.indices.length, gl.UNSIGNED_SHORT,0);
	}
	else{
		gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT,0);
	}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, null);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);    
}



MallaGestor.prototype.endDraw = function() {


}


