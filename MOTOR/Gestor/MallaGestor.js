function MallaGestor(){
	this.vertices = null;
	this.diffuse = null;
	this.wireframe = null;
	this.vbo = null;
	this.cbo = null;
	this.ibo = null;
	this.indices = null;
	this.nbo = null;
	this.perVertexColor = null;
	this.alias=null;
	this.remote=null;
	this.textura = null;
	this.texture_coords = null;
}
MallaGestor.prototype.getNombre = function(){
	return this.nombreFich;
}
MallaGestor.prototype.setTextura = function(tex) {
	this.textura = tex;
};
MallaGestor.prototype.getTextura = function() {
	return this.textura; 
};
MallaGestor.prototype.cargarFichero = function(fich) { 
		var peticion = new XMLHttpRequest();
		var alias= "alias";
 		peticion.open('GET', fich, false);
		var formato = fich.split('.').pop();
		var malla = this;

		if(formato = "obj"){
		peticion.onload = function() {
					object = new OBJ.Mesh(peticion.responseText);
					console.log(object);
					malla.alias = (alias==null)?'none':alias;
	                malla.remote = true;
					malla.vertices=object.vertices;
					malla.indices=object.indices;
					malla.colors=object.colors;
					malla.diffuse = object.diffuse;
					malla.wireframe = object.wireframe;
					malla.texture_coords = object.textures
					malla.perVertexColor = object.perVertexColor;
					if (object.perVertexColor   === undefined)    {   malla.perVertexColor   = false;            }
					if (object.wireframe        === undefined)    {   malla.wireframe        = false;            }
					if (object.diffuse          === undefined)    {   malla.diffuse          = [1.0,1.0,1.0,1.0];}
				
					var vertexBufferObject = gl.createBuffer();
					gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.vertices), gl.STATIC_DRAW);
					
					var normalBufferObject = gl.createBuffer();
					gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferObject);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Utils.calculateNormals(object.vertices, object.indices)), gl.STATIC_DRAW);
					
					if(this.textura != null){
						gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.textura.textura);
	       				gl.texImage2D(GL_TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.textura.imagen);

					}
					var colorBufferObject;
				
				if (object.perVertexColor){
						colorBufferObject = gl.createBuffer();
						gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferObject);
						gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.colors), gl.STATIC_DRAW);
						object.cbo = colorBufferObject;
					}
				
					var indexBufferObject = gl.createBuffer();
					gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
					gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.indices), gl.STATIC_DRAW);
					//console.log(object);
					malla.vbo = vertexBufferObject;
					malla.ibo = indexBufferObject;
					malla.nbo = normalBufferObject;
					gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
					gl.bindBuffer(gl.ARRAY_BUFFER,null);

					//console.log(malla);
					if (malla.remote){
						console.info(malla.alias + ' has been added to the scene [Remote]');
					}
					else {
						console.info(malla.alias + ' has been added to the scene [Local]');
					}
			}
		}
		else if(formato = "json"){
		peticion.onload = function() {
					object = new JSON.parse(peticion.responseText);
					malla.alias = (alias==null)?'none':alias;
	                malla.remote = true;
					malla.vertices=object.vertices;
					malla.indices=object.indices;
					malla.colors=object.colors;
					malla.diffuse = object.diffuse;
					malla.wireframe = object.wireframe;
					malla.perVertexColor = object.perVertexColor;
					if (object.perVertexColor   === undefined)    {   malla.perVertexColor   = false;            }
					if (object.wireframe        === undefined)    {   malla.wireframe        = false;            }
					if (object.diffuse          === undefined)    {   malla.diffuse          = [1.0,1.0,1.0,1.0];}
				
					var vertexBufferObject = gl.createBuffer();
					gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.vertices), gl.STATIC_DRAW);
					
					var normalBufferObject = gl.createBuffer();
					gl.bindBuffer(gl.ARRAY_BUFFER, normalBufferObject);
					gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Utils.calculateNormals(object.vertices, object.indices)), gl.STATIC_DRAW);
				
					var colorBufferObject;
				
				if (object.perVertexColor){
						colorBufferObject = gl.createBuffer();
						gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferObject);
						gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(object.colors), gl.STATIC_DRAW);
						object.cbo = colorBufferObject;
					}
				
					var indexBufferObject = gl.createBuffer();
					gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBufferObject);
					gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(object.indices), gl.STATIC_DRAW);

					//console.log(object);
					malla.vbo = vertexBufferObject;
					malla.ibo = indexBufferObject;
					malla.nbo = normalBufferObject;
					gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
					gl.bindBuffer(gl.ARRAY_BUFFER,null);
					gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);


					//console.log(malla);
					if (malla.remote){
						console.info(malla.alias + ' has been added to the scene [Remote]');
					}
					else {
						console.info(malla.alias + ' has been added to the scene [Local]');
					}
			}
		}
		peticion.send();
}
MallaGestor.prototype.getCoordinates = function() {
	return this.texture_coords;
};

MallaGestor.prototype.draw = function() {
	var useVertexColors = false;
	var object = this;
	//console.log(object);
	gl.viewport(0, 0, c_width, c_height);

        updateTransforms();   
        setMatrixUniforms(); 
/*        gl.uniform3fv(prg.uLightPosition, [0, 7, 3, 2.5, 3, 3, -2.5, 3, 3, 0, 10, 2]);
*///luces
			//mat4.translate(mvMatrix,0.0,0.0,0.0); 
			//fin luces

        
	        gl.uniform1i(prg.uUpdateLight,updateLightPosition);  
			gl.uniform1i(prg.uUpdateLight2,updateLightPosition2);            
            
            //Setting uniforms
            gl.uniform4fv(prg.uMaterialDiffuse, object.diffuse);
            //gl.uniform4fv(prg.uMaterialAmbient, object.ambient);
            gl.uniform1i(prg.uWireframe,object.wireframe);
			
            
            //Setting attributes
            console.log("setting attributes");

            gl.enableVertexAttribArray(prg.aVertexPosition);
            gl.disableVertexAttribArray(prg.aVertexNormal);
            //gl.disableVertexAttribArray(prg.aVertexColor);
            
            gl.bindBuffer(gl.ARRAY_BUFFER, object.vbo);
            gl.vertexAttribPointer(prg.aVertexPosition, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(prg.aVertexPosition);
			
			
			
			if (object.texture_coords){
				console.log("Texutre_Coords");
				cubeVerticesTextureCoordBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticesTextureCoordBuffer);

				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoordinates),
	              gl.STATIC_DRAW);

				gl.enableVertexAttribArray(prg.aVertexTextureCoords);
				gl.bindBuffer(gl.ARRAY_BUFFER, object.tbo);
				gl.vertexAttribPointer(prg.aVertexTextureCoords, 2, gl.FLOAT, false, 0, 0);
				gl.activeTexture(gl.TEXTURE0);
				gl.bindTexture(gl.TEXTURE_2D, this.textura.textura);
//				gl.uniform1i(prg.uSampler, 0);
				gl.uniform1i(gl.getUniformLocation(prg, 'uSampler'), 0);

			}
			
            
			if(!object.wireframe){
				gl.bindBuffer(gl.ARRAY_BUFFER, object.nbo);
				gl.vertexAttribPointer(prg.aVertexNormal, 3, gl.FLOAT, false, 0, 0);
				gl.enableVertexAttribArray(prg.aVertexNormal);
            }
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.ibo);
			
			if (object.wireframe){
                gl.drawElements(gl.LINES, object.indices.length, gl.UNSIGNED_SHORT,0);
            }
            else{
                gl.enable(gl.CULL_FACE);
				gl.cullFace(gl.FRONT);
                gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT,0);
				gl.cullFace(gl.BACK);
                gl.drawElements(gl.TRIANGLES, object.indices.length, gl.UNSIGNED_SHORT,0);
 				gl.disable(gl.CULL_FACE);
            }
			
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            
        };
MallaGestor.prototype.endDraw = function() {


}


