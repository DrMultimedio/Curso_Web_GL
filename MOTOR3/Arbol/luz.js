
function Luz(){
	this.position = [0.0,0.0,0.0];
	this.ambient = [0.0,0.0,0.0,0.0];
	this.diffuse = [0.0,0.0,0.0,0.0];
	this.specular = [0.0,0.0,0.0,0.0];
}

Luz.prototype.setPosition = function(p){
	this.position = p.slice(0);
}
Luz.prototype.setDiffuse = function (d){
	this.diffuse = d.slice(0);
}

Luz.prototype.setAmbient = function(a){
	this.ambient = a.slice(0);
}

Luz.prototype.setSpecular = function(s){
	this.specular = s.slice(0);
}

Luz.prototype.setProperty = function(pName, pValue){
	if(typeof pName == 'string'){
		if (pValue instanceof Array){
			this[pName] = pValue.slice(0);
		}
		else {
			this[pName] = pValue;
		}
	}
	else{
		throw 'The property name must be a string';
	}
}
Luz.prototype.beginDraw = function() {

};
Luz.prototype.endDraw = function() {

};
var Luces = {
	list : [],
	add : function(luz){
		if (!(luz instanceof Luz)){
			alert('the parameter is not a Luz');
			return;
		}
		this.list.push(luz);
	},
	
	getArray: function(type){
		var a = [];
		for(var i = 0, max = this.list.length; i < max; i+=1){
			a = a.concat(this.list[i][type]);
		}
		return a;
	},

	get: function(idx){
		if ((typeof idx == 'number') && idx >= 0 && idx < this.list.length){
			return this.list[idx];
		}
		else if (typeof idx == 'string'){
			for(var i=0, max = this.list.length; i < max; i+=1){
				if (this.list[i].id == idx) return this.list[i];
			}
			throw 'Luz ' + idx + ' does not exist';
		}
		else {
			throw 'Unknown parameter';
		}
	}
}