var sprites = {
    //Sprites juego  
	MonCamino: { sx: 0, sy: 90, w: 90, h: 90, frames: 2}, 
	MonGranja: { sx: 0, sy: 90, w: 90, h: 90, frames: 3}, 
	CiudadC: { sx: 0, sy: 0, w: 90, h: 90, frames: 0}, 
	CiudadD: { sx: 0, sy: 90, w: 90, h: 90, frames: 7},
	CiudadE: { sx: 0, sy: 0, w: 90, h: 90, frames: 9},
	CiudadF: { sx: 0, sy: 0, w: 90, h: 90, frames: 6},
	CiudadG: { sx: 0, sy: 0, w: 90, h: 90, frames: 5}, 
	CiudadH: { sx: 0, sy: 90, w: 90, h: 90, frames: 1}, 
	CiudadI: { sx: 0, sy: 90, w: 90, h: 90, frames: 0}, 
	CiudadJ: { sx: 0, sy: 90, w: 90, h: 90, frames: 4},  
	CiudadK: { sx: 0, sy: 90, w: 90, h: 90, frames: 5},
	CiudadL: { sx: 0, sy: 90, w: 90, h: 90, frames: 6},
	CiudadM: { sx: 0, sy: 0, w: 90, h: 90, frames: 8}, 
	CiudadN: { sx: 0, sy: 0, w: 90, h: 90, frames: 7},
  	CiudadO: { sx: 0, sy: 180, w: 90, h: 90, frames: 3},
	CiudadP: { sx: 0, sy: 180, w: 90, h: 90, frames: 2},
	CiudadQ: { sx: 0, sy: 0, w: 90, h: 90, frames: 2},  
	CiudadR: { sx: 0, sy: 0, w: 90, h: 90, frames: 1},
	CiudadS: { sx: 0, sy: 0, w: 90, h: 90, frames: 4}, 
	CiudadT:{ sx: 0, sy: 0, w: 90, h: 90, frames: 3},
	Recto: { sx: 0, sy: 180, w: 90, h: 90, frames: 0}, 
	Curva: { sx: 0, sy: 180, w: 90, h: 90, frames: 1}, 
	Cruce3: { sx: 0, sy: 90, w: 90, h: 90, frames: 9}, 
	Cruce4: { sx: 0, sy: 90, w: 90, h: 90, frames: 8}, 
	
	//Fondo
	Fondo: { sx: 0, sy: 270, w: 90, h: 90, frames: 0}, 
	BackSide: { sx: 0, sy:180, w: 90, h: 90, frames: 4},
	Rejilla: {sx: 0, sy:450, w: 90, h: 90, frames: 0},

	// Rojos
	AldeanoRojo: {sx:451, sy:181, w:36, h:30, frames : 0},
	CuraRojo: {sx:450.5, sy:181, w:36, h:30, frames : 1},
	CaballeroRojo: {sx:450, sy:181, w:36, h:30, frames : 2},
	GranjeroRojo: {sx:451, sy:181, w:36, h:30, frames : 3},
	LadronRojo: {sx:450, sy:181, w:36, h:30, frames : 4},

	// Azules
	AldeanoAzul:{sx:451, sy:211, w:36, h:30, frames:0},
	CuraAzul: {sx:450.5, sy:211, w:36, h:30, frames : 1},
	CaballeroAzul: {sx:450, sy:211, w:36, h:30, frames : 2},
	GranjeroAzul: {sx:451, sy:211, w:36, h:30, frames : 3},
	LadronAzul: {sx:450, sy:211, w:36, h:30, frames : 4},	


	// Amarillos
	AldeanoAmarillo:{sx:451, sy:241, w:36, h:30, frames:0},
	CuraAmarillo: {sx:450.5, sy:241, w:36, h:30, frames : 1},
	CaballeroAmarillo: {sx:450, sy:241, w:36, h:30, frames : 2},
	GranjeroAmarillo: {sx:451, sy:241, w:36, h:30, frames : 3},
	LadronAmarillo: {sx:450, sy:241, w:36, h:30, frames : 4},

	// Verdes
	AldeanoVerde:{sx:451, sy:271, w:36, h:30, frames:0},
	CuraVerde: {sx:450.5, sy:271, w:36, h:30, frames : 1},
	CaballeroVerde: {sx:450, sy:271, w:36, h:30, frames : 2},
	GranjeroVerde: {sx:451, sy:271, w:36, h:30, frames : 3},
	LadronVerde: {sx:450, sy:271, w:36, h:30, frames : 4},

	// Negros
	AldeanoNegro:{sx:451, sy:301, w:36, h:30, frames:0},
	CuraNegro: {sx:450.5, sy:301, w:36, h:30, frames : 1},
	CaballeroNegro: {sx:450, sy:301, w:36, h:30, frames : 2},
	GranjeroNegro: {sx:451, sy:301, w:36, h:30, frames : 3},
	LadronNegro: {sx:450, sy:301, w:36, h:30, frames : 4},

	// Rosas
	AldeanoRosa:{sx:451, sy:331, w:36, h:30, frames:0},
	CuraRosa: {sx:450.5, sy:331, w:36, h:30, frames : 1},
	CaballeroRosa: {sx:450, sy:331, w:36, h:30, frames : 2},
	GranjeroRosa: {sx:451, sy:331, w:36, h:30, frames : 3},
	LadronRosa: {sx:450, sy:331, w:36, h:30, frames : 4},	


	//Numeros
	num0: { sx: 0, sy: 360, w: 90, h: 90, frames: 0},
	num1: { sx: 0, sy: 360, w: 90, h: 90, frames: 1},
	num2: { sx: 0, sy: 360, w: 90, h: 90, frames: 2},
	num3: { sx: 0, sy: 360, w: 90, h: 90, frames: 3},
	num4: { sx: 0, sy: 360, w: 90, h: 90, frames: 4},
	num5: { sx: 0, sy: 360, w: 90, h: 90, frames: 5},
	num6: { sx: 0, sy: 360, w: 90, h: 90, frames: 6},
	num7: { sx: 0, sy: 360, w: 90, h: 90, frames: 7},
	num8: { sx: 0, sy: 360, w: 90, h: 90, frames: 8},
    num9: { sx: 0, sy: 360, w: 90, h: 90, frames: 9},
};


var startGame = function() {
    Game.setBoard(0,new TextScreen("ERRE GAME(PULSE ENTER)",50,315,playGame));
  	
}


var playGame = function() {
 	
	var gb = new GameBoard();
	var p1 = new points(125,"ALBERTO",830,300,"AldeanoRojo",5);
	var p2 = new points(300, "JONA",830,350,"AldeanoNegro",5);
	var p3 = new points(997, "MORATA",830,400,"AldeanoAzul",5);
	
	Game.setBoard(1,gb);
	Game.setBoard(2,p1);
	Game.setBoard(3,p2);
	Game.setBoard(4,p3);
	Game.setBoard(5,new carta(card));
}


var card = function(){
	Game.setBoard(6,new NewCard());
}


var NewCard = function (){


	var ran = Math.floor((Math.random() * 23) + 1);
	var sp;
	var cont = 0;
	var gb = Game.boards[1];
	var grade = 0;
	var entro = false;

	
	for (key in sprites) {
		if(cont == ran){
			sp = key;
			break;
		}
		cont++;
	}
	

	this.x = 850;
	this.y = 530;

    this.draw = function(ctx) {
		SpriteSheet.draw(Game.ctx,sp,this.x,this.y,grade);
    };

   this.step = function() {
	    var that = this;	

		window.onmousedown = function(e){
			if(e.which == 1){
				mX = e.pageX;
				mY = e.pageY;

				cX = Math.floor((mX-100)/90);
				cY = Math.floor((mY-100)/90);
	
				if((mX > 100) && (mX < 910) && (mY > 190) && (mY < 730) && (entro == false)){

					for(i = 0 ; i < gb.lista_fichas.length ; i++){
						var f = gb.lista_fichas[i];
						if( (f.x == cX*90+gb.scrollx*90) && (f.y == cY*90+gb.scrolly*90) && (f.paint == false)){
							f.paint = true;
							f.sprite = sp;
							f.grade = grade;
							entro = true;

							Game.setBoard(6,new Colocar(f));
						}
					}
						
				}
			}else{
				grade = grade + 90;
			}
		}
    };									

}
	

var points = function(number,name,x,y,sprite,num_alde){
	
	var num = number;
	var cont = 0;

	this.step = function() {
			cont++;
			if(cont == 100){
				num += 1;
				cont = 0;
			}
	};

//array = number.toString();
	this.draw = function(ctx) {
		ctx.fillStyle = "white";
		ctx.fillRect(x-2,y-20,350,50);
		ctx.fillStyle = "#000000";
		ctx.font = "20px Verdana";
		ctx.fillText(name + ": " ,x,y);
		Num_To_Sprite(num,x+120,y-20);

		ctx.fillStyle = "#000000";
		ctx.font = "20px Verdana";
		ctx.fillText(num_alde,x+280,y);
		SpriteSheet.draw(Game.ctx,sprite,x+300,y-20,0,true);
    };

}



var Colocar = function Colocar(obj){
	var f = obj;
	var up = false;

	this.step = function() {
		if(!Game.keys['uno'] && !Game.keys['dos'] && !Game.keys['tres'] && !Game.keys['cuatro'] && !Game.keys['cinco'] && !Game.keys['seis']
		&& !Game.keys['siete'] && !Game.keys['ocho'] && !Game.keys['nueve']){
				up = true;
		}

		
		for(i = 1 ; i < 10; i++){
			if(up &&  Game.keys[""+ i]){
				f.pos = i;
				Game.setBoard(6,new carta(card));
				up = false;
			}	
		}

		

	};

	this.draw = function(ctx) {
			f.rejilla = true;
	};

}




$(function() {
	document.oncontextmenu=new Function("return false");
    Game.initialize("game",sprites,startGame);
});





