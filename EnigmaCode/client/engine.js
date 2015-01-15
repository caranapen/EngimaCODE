Game = new function() {                                                                  

    
    this.initialize = function(canvasElementId,sprite_data,callback) {
	this.canvas = document.getElementById(canvasElementId);
	this.width = this.canvas.width;
	this.height= this.canvas.height;

	this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
	if(!this.ctx){ 
		return alert("Please upgrade your browser to play"); 
    	}


    this.setupInput();
    this.loop(); 

    SpriteSheet.load (sprite_data,"sprites/tablero.png",callback);

    };
    
    
    
    var KEY_CODES = { 13 :'enter' , 32 :'space', 37:'left', 39:'right', 38:'up', 40:'down',49:'1',50:'2',51:'3',52:'4',53:'5',54:'6',55:'7',56:'8',57:'9',};
    this.keys = {};

    this.setupInput = function() {
	$(window).keydown(function(event){
	    if (KEY_CODES[event.which]) {
		Game.keys[KEY_CODES[event.which]] = true;
		return false;
	    }
	});
	
	$(window).keyup(function(event){
	    if (KEY_CODES[event.which]) {
		Game.keys[KEY_CODES[event.which]] = false;
		return false;
	    }
	});
	
    }
    
   
    this.boards = [];
	that = this;
    this.loop = function() { 
		

	// segundos transcurridos

	var dt = 50 / 1000;
	
	for(var i=0,len = that.boards.length;i<len;i++) {
	    if(that.boards[i]) { 
			that.boards[i].step();
			that.boards[i].draw(Game.ctx);
		}
	}

	setTimeout(Game.loop,30);
    };
    
    
    this.setBoard = function(num,board){ 
	this.boards[num] = board; 
    };

};




SpriteSheet = new function() {


 this.map = { };


 this.load = function(spriteData,src,callback) {
    this.map = spriteData;
    this.image = new Image();
    this.image.onload = callback;
    this.image.src = src;
 };


 	this.draw = function(ctx,sprite,x,y,grades,bool) {
	 	var img = this.map[sprite];
	 	if(!img.frames) img.frames = 0;
	 	ctx.save();
		if(grades){ 
			ctx.translate(x,y);
			ctx.translate(img.w/2,img.h/2);
			ctx.rotate(grades*Math.PI/180);
			x=-45;y=-45;
		}
		if(bool==true){
			ina = 30;
		}else{
			ina = img.w;
		}
		ctx.drawImage(this.image,  img.sx + img.frames * img.w,   img.sy,img.w, img.h,Math.floor(x), Math.floor(y),  ina, ina);
		ctx.restore();
    };
}



TextScreen = function TextScreen(text,x,y,callback) {
    
    var up = false;
	var cont = 0;
	
    this.step = function() {
		if(!Game.keys['enter']){ 
			up = true;
		}
		if(up && Game.keys['enter'] && callback && (cont < 2)){
			cont++;
			callback();
		}
    };


    this.draw = function(ctx) {
		if(cont == 0){
			ctx.fillStyle="white";
			ctx.fillRect(0,0,1000,630);
			ctx.fillStyle = "#000000";
			ctx.font = "65px Verdana";
			ctx.fillText(text,x,y);
		}else if(cont == 1){
			ctx.fillStyle="white";
			ctx.fillRect(0,0,1200,630);
		}
    };
};



GameBoard = function GameBoard() {

	this.lista_fichas = [];
	this.scrollx = 0;
	this.scrolly = 0;

	

	for(i = 1;i<7;i++){
		for(j = 0;j<9;j++){
			var f = new Ficha(j*90,i*90);
			this.lista_fichas.push(f);
		}
	}

	var up = false;
	this.step = function() {
		if( (!Game.keys['up']) && (!Game.keys['down']) && (!Game.keys['right']) && (!Game.keys['left']) ){
			up = true;
		}

		if(up && Game.keys['down']){
			this.scrolly = this.scrolly + 1;

			for(j = 0;j<9;j++){
				var f = new Ficha(j*90+(this.scrollx*90),540+(this.scrolly*90));
				if(cmp(this.lista_fichas,f)!=1){
					this.lista_fichas.push(f);
				}
			}

			up = false;
		}

		if(up && Game.keys['up']){
			this.scrolly = this.scrolly - 1;

			for(j = 0;j<9;j++){
				var f = new Ficha(j*90+(this.scrollx*90),90+(this.scrolly*90));
				if(cmp(this.lista_fichas,f)!=1){
					this.lista_fichas.push(f);
				}
			}

			up = false;
		}


		
		if(up && Game.keys['right']){
			this.scrollx = this.scrollx + 1;
			
			for(j = 1;j<7;j++){
				var f = new Ficha(720+(this.scrollx*90),j*90+(this.scrolly*90));
				if(cmp(this.lista_fichas,f)!=1){
					this.lista_fichas.push(f);
				}
			}

			up = false;
		}

		
		if(up && Game.keys['left']){
			this.scrollx = this.scrollx - 1;

			for(j = 1;j<7;j++){
				var f = new Ficha(0+(this.scrollx*90),j*90+(this.scrolly*90));
				if(cmp(this.lista_fichas,f)!=1){
					this.lista_fichas.push(f);
				}
			}
	

			up = false;
		}


	};

	this.draw = function() {
		for(i = 0 ; i < this.lista_fichas.length ; i++){
			var f = this.lista_fichas[i];
			if( (f.x >= 0+(this.scrollx*90))&&(f.x <= 720+(this.scrollx*90))&&(f.y >= 90+(this.scrolly*90))&&(f.y <= 540+(this.scrolly*90))){
					f.print(this.scrollx,this.scrolly);
			}
		}
	};


};


Ficha = function Ficha(x,y) {
	this.x = x;
	this.y = y;
	this.grade = 0;
	this.paint = false;
	this.pos = 0;
	this.spritea = "AldeanoRojo";
	this.sprite = "Fondo";
	this.rejilla = false;

	this.print = function(sx,sy) {
			SpriteSheet.draw(Game.ctx,this.sprite,this.x-(sx*90),this.y-(sy*90),this.grade,false);
			if(this.pos != 0){
				Colocar_Aldeano(this.pos,this.spritea,this.x-(sx*90),this.y-(sy*90));
			}
			if(this.rejilla == true){
				SpriteSheet.draw(Game.ctx,"Rejilla",this.x-(sx*90),this.y-(sy*90),0,false);
				this.rejilla = false;
			}
	};

}


function cmp(array,obj){
	for(i = 0;i<array.length;i++){
			if( (array[i].x == obj.x) && (array[i].y == obj.y) ){
				return 1;
			}
	}
	return 0;		
}




carta = function carta(callback) {
    this.x = 850;
	this.y = 530;
	this.callback = callback;
	var up = false;
	
	var that = this;
    this.step = function() {
		window.onmousedown = function(e){
			if(e.which == 1){
				mX = e.pageX;
				mY = e.pageY;

				if( (mX-100>=that.x) && (mX-100<=that.x+90) && (mY-100>=that.y) && (mY-100<=that.y+90) ){
					up = true;
					if(up  && callback) callback();
				}
			}
		}
    };


    
    this.draw = function(ctx) {
		SpriteSheet.draw(Game.ctx,"BackSide",this.x,this.y,0,false);
    };
};



Colocar_Aldeano = function Colocar_Aldeano(pos,tipo_aldeano,x,y){

	switch(pos % 3){
		case 1:
			x = x;   
			break;
		case 2:
		    x = x+30;
		    break;
		case 0:
		    x = x+60;
			break;
	}

	if(pos <= 3)
		y = y;
	else if(pos > 3 && pos <= 6)
		y = y+30;
	else if(pos > 6)
		y = y+60;
	
	

	SpriteSheet.draw(Game.ctx,tipo_aldeano,x,y,0,true);		
}


Num_To_Sprite = function Num_To_Sprite(number,x,y){
	var array = number.toString();
	for(i = 0; i < array.length; i++){
		SpriteSheet.draw(Game.ctx,"num"+array[i],x+(i*30),y,0,true);
	}
}








