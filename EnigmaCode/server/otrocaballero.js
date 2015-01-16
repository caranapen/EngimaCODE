var otro = false;

otrocaballero= function(tablero,pieza,posSeg,vengode){
	
	this.piezaAbajo = function(tablero,pieza,posSeg,otro,vengode){
		//Pieza de abajo
		if(pieza.Abajo == 'Ciudad' && tablero.piezaenposiciones(pieza.x,pieza.y-1)!= undefined && tablero.piezaenposiciones(pieza.x,pieza.y-1).Arriba=='Ciudad' && vengode !='Abajo'){
			var aux =tablero.piezaenposiciones(pieza.x,pieza.y-1);

			if(aux.tipo == 'CiudadG' || aux.tipo =='CiudadF'){
				//Ciudades conectadas arriba y abajo only
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero'){return true}
				}
				//llamada recursiva para seguir comprobando la ciudad (en este caso abajo == 8)
				return otrocaballero(tablero,aux,8,'Arriba');
			}else if(aux.tipo == 'CiudadQ' || aux.tipo == 'CiudadR' || aux.tipo == 'CiudadS' || aux.tipo == 'CiudadT' || aux.tipo == 'CiudadC'){
				//Ciudades con 3 trozos de ciudad y la de 4 cachos de ciudad
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero'){return true}
				}
				//no hay caballeros pues recursividad
				var ok = new Array(3);
				ok[0] = otrocaballero(tablero,aux,4,'Derecha'); //Izquierda
				ok[1]= otrocaballero(tablero,aux,6,'Izquierda'); //Derecha
				ok[2] = otrocaballero(tablero,aux,8,'Arriba'); //Abajo (puede estar girada) o la de todos los trozos
				if(ok[0] || ok[1] || ok[2]){return true;}
			 
			}else if(aux.tipo == 'CiudadM' || aux.tipo=='CiudadN' || aux.tipo=='CiudadO' || aux.tipo=='CiudadP'){
				//Ciudades con dos trozos de ciudad en modo "curva"
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero'){return true}
				}
				
				if(aux.Derecha == 'Ciudad'){
					return otrocaballero(tablero,aux,6,'Izquierda');
				}else{
					return otrocaballero(tablero,aux,4,'Derecha');
				}
			}else{

				//El resto de ciudades que ya cierran conexiones con otras ciudades
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero' && aux.seguidores[i].posicion == 2){return true}
				}
				//Aqui no hay mas conexiones, por lo tanto no hay recursividad
			}
		}
		return false;
	}	
	
	
	
	this.piezaArriba = function(tablero,pieza,posSeg,otro,vengode){
		//Pieza de arriba
		if(pieza.Arriba == 'Ciudad' && tablero.piezaenposiciones(pieza.x,pieza.y+1)!=undefined && tablero.piezaenposiciones(pieza.x,pieza.y+1).Abajo=='Ciudad' && vengode !='Arriba'){
			var aux =tablero.piezaenposiciones(pieza.x,pieza.y+1);

			if(aux.tipo == 'CiudadG' || aux.tipo =='CiudadF'){
				//Ciudades conectadas arriba y abajo only
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero'){return true}
				}
				//llamada recursiva para seguir comprobando la ciudad (en este caso arriba == 2)
				return otrocaballero(tablero,aux,2,'Abajo');
			}else if(aux.tipo == 'CiudadQ' || aux.tipo == 'CiudadR' || aux.tipo == 'CiudadS' || aux.tipo == 'CiudadT' || aux.tipo == 'CiudadC'){
				//Ciudades con 3 trozos de ciudad y la de 4 cachos de ciudad
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero'){return true}
				}
				//no hay caballeros pues recursividad
				var ok = new Array(3);
				ok[0] = otrocaballero(tablero,aux,4,'Derecha'); //Izquierda
				ok[1]= otrocaballero(tablero,aux,6,'Izquierda'); //Derecha
				ok[2]= otrocaballero(tablero,aux,2,'Abajo'); //Arriba (puede estar girada) o la de todos los trozos
				console.log(ok);
				if(ok[0] || ok[1] || ok[2]){return true;}
			 
			}else if(aux.tipo == 'CiudadM' || aux.tipo=='CiudadN' || aux.tipo=='CiudadO' || aux.tipo=='CiudadP'){
				//Ciudades con dos trozos de ciudad en modo "curva"
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero'){return true}
				}
				
				if(aux.Derecha == 'Ciudad'){
					return otrocaballero(tablero,aux,6,'Izquierda'); //Derecha
				}else{
					//console.log("por narices tengo que entrar aqui");
					return otrocaballero(tablero,aux,4,'Derecha'); //Izquierda
					console.log(otro);
					//console.log("--------");
				}
			}else{
				//El resto de ciudades que ya cierran conexiones con otras ciudades
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero' && aux.seguidores[i].posicion == 8){return true}
				}
				//Aqui no hay mas conexiones, por lo tanto no hay recursividad
			}
		}
		return false;
	}	
	
	
	
	this.piezaDerecha = function(tablero,pieza,posSeg,otro,vengode){
		//Pieza de derecha
		if(pieza.Derecha == 'Ciudad' && tablero.piezaenposiciones(pieza.x+1,pieza.y) != undefined && tablero.piezaenposiciones(pieza.x+1,pieza.y).Izquierda=='Ciudad' && vengode !='Derecha'){
			var aux =tablero.piezaenposiciones(pieza.x+1,pieza.y);

			if(aux.tipo == 'CiudadG' || aux.tipo =='CiudadF'){
				//Ciudades conectadas Izquierda y Derecha only
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero'){return true}
				}
				//llamada recursiva para seguir comprobando la ciudad (en este caso derecha == 6)
				return otrocaballero(tablero,aux,6,'Izquierda');
			}else if(aux.tipo == 'CiudadQ' || aux.tipo == 'CiudadR' || aux.tipo == 'CiudadS' || aux.tipo == 'CiudadT' || aux.tipo == 'CiudadC'){
				//Ciudades con 3 trozos de ciudad y la de 4 cachos de ciudad
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero'){return true}
				}
				//no hay caballeros pues recursividad
				var ok = new Array(3);
				ok[0] = otrocaballero(tablero,aux,8,'Arriba'); //Abajo
				ok[1] = otrocaballero(tablero,aux,6,'Izquierda'); //Derecha
				ok[2]= otrocaballero(tablero,aux,2,'Abajo'); //Arriba (puede estar girada) o la de todos los trozos
				if(ok[0] || ok[1] || ok[2]){return true;}
			 
			}else if(aux.tipo == 'CiudadM' || aux.tipo=='CiudadN' || aux.tipo=='CiudadO' || aux.tipo=='CiudadP'){
				//Ciudades con dos trozos de ciudad en modo "curva"
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero'){return true}
				}
				
				if(aux.Derecha == 'Ciudad'){
					return otrocaballero(tablero,aux,2,'Abajo'); //Arriba
				}else{
					return otrocaballero(tablero,aux,8,'Arriba'); //Abajo
				}
			}else{
				//El resto de ciudades que ya cierran conexiones con otras ciudades
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero' && aux.seguidores[i].posicion == 4){return true}
				}
				//Aqui no hay mas conexiones, por lo tanto no hay recursividad
			}
		}
		return false;
	}
	
	
	
	this.piezaIzquierda = function(tablero,pieza,posSeg,otro,vengode){
		//Pieza de izquierda
		if(pieza.Izquierda == 'Ciudad' && tablero.piezaenposiciones(pieza.x-1,pieza.y)!= undefined && tablero.piezaenposiciones(pieza.x-1,pieza.y).Derecha=='Ciudad' && vengode !='Izquierda'){
			var aux =tablero.piezaenposiciones(pieza.x-1,pieza.y);

			if(aux.tipo == 'CiudadG' || aux.tipo =='CiudadF'){
				//Ciudades conectadas Izquierda y Derecha only
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero'){return true}
				}
				//llamada recursiva para seguir comprobando la ciudad (en este caso derecha == 6)
				return otrocaballero(tablero,aux,4,'Derecha');
			}else if(aux.tipo == 'CiudadQ' || aux.tipo == 'CiudadR' || aux.tipo == 'CiudadS' || aux.tipo == 'CiudadT' || aux.tipo == 'CiudadC'){
				//Ciudades con 3 trozos de ciudad y la de 4 cachos de ciudad
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero'){return true}
				}
				//no hay caballeros pues recursividad
				var ok = new Array(3);
				ok[0] = otrocaballero(tablero,aux,8,'Arriba'); //Abajo
				ok[1] = otrocaballero(tablero,aux,4,'Derecha'); //Izquierda
				ok[2] = otrocaballero(tablero,aux,2,'Abajo'); //Arriba (puede estar girada) o la de todos los trozos
				if(ok[0] || ok[1] || ok[2]){return true;}
			 
			}else if(aux.tipo == 'CiudadM' || aux.tipo=='CiudadN' || aux.tipo=='CiudadO' || aux.tipo=='CiudadP'){
				//Ciudades con dos trozos de ciudad en modo "curva"
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero'){return true}
				}
				
				if(aux.Derecha == 'Ciudad'){
					return otrocaballero(tablero,aux,2,'Abajo'); //Arriba
				}else{
					return otrocaballero(tablero,aux,8,'Arriba'); //Abajo
				}
			}else{
				//console.log("-----pieza final----");
				//El resto de ciudades que ya cierran conexiones con otras ciudades
				for(i=0;i<aux.seguidores.length;i++){
					if(aux.seguidores[i].tipo== 'caballero' && aux.seguidores[i].posicion == 6){return true}
				}
				//Aqui no hay mas conexiones, por lo tanto no hay recursividad
			}
		}
		return false;
	}
	
	
	
	console.log("HOLA LLAMAMOS A OTROCABALLERO");
	if(pieza.tipo == 'CiudadH' || pieza.tipo== 'CiudadI'){
		if(posSeg==2){
			//Pieza de arriba
			console.log("ENTRAMOS PIEZA ARRIBA");
			return piezaArriba(tablero,tablero,pieza,posSeg,otro,vengode);
		}else if(posSeg==4){
			//Pieza de la izquierda
			console.log("ENTRAMOS PIEZA IZQUIERDA");
			return piezaIzquierda(tablero,pieza,posSeg,otro,vengode);
		}else if(posSeg==6){
			//Pieza de la derecha
			console.log("ENTRAMOS PIEZA DERECHA");
			return piezaDerecha(tablero,pieza,posSeg,otro,vengode);
		}else if(posSeg==8){
			//Pieza de abajo
			console.log("ENTRAMOS PIEZA ABAJO");
			return piezaAbajo(tablero,pieza,posSeg,otro,vengode);
		}
	}else{
		var ok = new Array(4);
		//Pieza de arriba
		ok[0] = piezaArriba(tablero,pieza,posSeg,otro,vengode);
		//console.log("ARRIBA")
		//console.log(ok[0])


		//Pieza de abajo
		ok[1] = piezaAbajo(tablero,pieza,posSeg,otro,vengode);
		//console.log("ABAJO")
		//console.log(ok[1])

		//Pieza de la derecha
		ok[2] = piezaDerecha(tablero,pieza,posSeg,otro,vengode);
		//console.log("DERECHA")
		//console.log(ok[2])

		//Pieza de la izquierda
		ok[3] = piezaIzquierda(tablero,pieza,posSeg,otro,vengode);
		//console.log("IZQUIERDA")
		//console.log(ok[3])
		console.log(ok);
		if(ok[0] || ok[1] || ok[2] || ok[3]){return true;}
	}
	
	return false;
	











}
