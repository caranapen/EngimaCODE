cerrarCamino = function(pieza,final,tablero){
	var finalesCamino = ['Cruce3','Cruce4','MonCamino','CiudadL','CiudadS','CiudadT'];
	var seguidoresEncontrados = [];
	var puntos = 1;
	var cerrado = 0;
	var piezasRecorridas = [];
	this.sumar = function(){
		var sumados = [];
		seguidoresEncontrados.forEach(function(seguidor){

			jugador = tablero.listaJugadores.find(function(jug){jug == seguidor.jugador;});
			if(jugador == undefined){
				//En las pruebas no estoy usando jugadores reales en el listado de jugadores por tanto necesito este if
				console.log("Esto es para las pruebas");
			}else{
				if(jugador.indexOf(sumados)>=0){
					jugador.puntuacion += puntos;
					sumados.push(jugador);
				}
				jugador.seguidores++;
			}
		});
		
	};
	this.piezaArriba = function(pieza,vengode){
		//Pieza de arriba
		if(pieza.Arriba == 'Camino' && tablero.piezaenposiciones(pieza.x,pieza.y+1) && tablero.piezaenposiciones(pieza.x,pieza.y+1).Abajo=='Camino' && vengode!='Arriba'){
			//Primero compruebo que en esa pieza no hay ladrones
			var aux =tablero.piezaenposiciones(pieza.x,pieza.y+1);
			if(aux.caminoCerrado){
				return false;
			}
			aux.seguidores.forEach(function(seguidor){
				if(seguidor.tipo=='ladron'){
					seguidoresEncontrados.push(seguidor);
				}
			});
			if(finalesCamino.indexOf(aux.tipo)<0){
				puntos++;
				//llamada recursiva para seguir comprobando el camino
				return cerrarCaminoRecur(aux,'Abajo');
			}else{
				puntos++;
				cerrado++;
				return true;
				//En caso de que sea uno de los cruces o el monasterio no hay recursividad ya
			}
		}
	};

	this.piezaAbajo = function(pieza,vengode){
		//Pieza de abajo
		if(pieza.Abajo == 'Camino' && tablero.piezaenposiciones(pieza.x,pieza.y-1) && tablero.piezaenposiciones(pieza.x,pieza.y-1).Arriba=='Camino' && vengode!='Abajo'){
			//Primero compruebo que en esa pieza no hay ladrones
			
			var aux =tablero.piezaenposiciones(pieza.x,pieza.y-1);
			
			if(aux.caminoCerrado){
				return false;
			}
			aux.seguidores.forEach(function(seguidor){
				if(seguidor.tipo=='ladron'){
					seguidoresEncontrados.push(seguidor);
				}
			});
			if(finalesCamino.indexOf(aux.tipo)<0){
				puntos++;
				//llamada recursiva para seguir comprobando el camino
				return cerrarCaminoRecur(aux,'Arriba');
			}else{
				puntos++;
				cerrado++;
				return true;
				//En caso de que sea uno de los cruces o el monasterio no hay recursividad ya
			}
		}
	};

	this.piezaDerecha = function(pieza,vengode){
		if(pieza.Derecha == 'Camino' && tablero.piezaenposiciones(pieza.x+1,pieza.y) && tablero.piezaenposiciones(pieza.x+1,pieza.y).Izquierda=='Camino' && vengode!='Derecha'){
			//Primero compruebo que en esa pieza no hay ladrones
			
			var aux =tablero.piezaenposiciones(pieza.x+1,pieza.y);
			
			if(aux.caminoCerrado){
				return false;
			}
			aux.seguidores.forEach(function(seguidor){
				if(seguidor.tipo=='ladron'){
					seguidoresEncontrados.push(seguidor);
				}
			});
			if(finalesCamino.indexOf(aux.tipo)<0){
				puntos++;
				//llamada recursiva para seguir comprobando el camino
				return cerrarCaminoRecur(aux,'Izquierda');
			}else{
				puntos++;
				cerrado++;
				return true;
				//En caso de que sea uno de los cruces o el monasterio no hay recursividad ya
			}
		}
	};

	this.piezaIzquierda = function(pieza,vengode){
		
		if(pieza.Izquierda == 'Camino' && tablero.piezaenposiciones(pieza.x-1,pieza.y) && tablero.piezaenposiciones(pieza.x-1,pieza.y).Derecha=='Camino' && vengode!='Izquierda'){
			//Primero compruebo que en esa pieza no hay ladrones
			var aux =tablero.piezaenposiciones(pieza.x-1,pieza.y);
			if(aux.caminoCerrado){
				return false;
			}
			aux.seguidores.forEach(function(seguidor){
				if(seguidor.tipo=='ladron'){
					seguidoresEncontrados.push(seguidor);
					/*i = aux.seguidores.indexOf(seguidor);
					aux.seguidores.splice(i,1);*/
				}
			});
			if(finalesCamino.indexOf(aux.tipo)<0){
				puntos++;
				//llamada recursiva para seguir comprobando el camino
				return cerrarCaminoRecur(aux,'Derecha');
			}else{
				puntos++;
				cerrado++;
				return true;
				//En caso de que sea uno de los cruces o el monasterio no hay recursividad ya
			}
		}
	};

	this.cerrarCaminoRecur = function(pieza,vengode){
		var ok = new Array(4);
		piezasRecorridas.push(pieza);
		ok[0] = this.piezaAbajo(pieza,vengode);

		ok[1] = this.piezaArriba(pieza,vengode);

		ok[2] = this.piezaDerecha(pieza,vengode);

		ok[3] = this.piezaIzquierda(pieza,vengode);
		if(ok[0] || ok[1] || ok[2] || ok[3]){return true;}
	};

	pieza.seguidores.forEach(function(seguidor){
		if(seguidor.tipo=='ladron'){
			seguidoresEncontrados.push(seguidor);
		}
	});

	if(finalesCamino.indexOf(pieza.tipo)<0){
		
		cerrarCaminoRecur(pieza);
		if(cerrado>=2 || final){
			this.sumar();
			piezasRecorridas.forEach(function(pieza){
				pieza.caminoCerrado = true;
				for(i=0;i<seguidoresEncontrados.length;i++){
					for(j=0;j<pieza.seguidores.length;j++){
						if(seguidoresEncontrados[i]==pieza.seguidores[j]){
							pieza.seguidores.splice(j,1);
						}
					}
				}
			});

			
		}else{
			puntuacion=0;
			seguidoresEncontrados = [];
		}
	}else{
		cerrarCaminoRecur(pieza);
		if(cerrado>=1 || final){
			this.sumar();
			piezasRecorridas.forEach(function(pieza){
				pieza.caminoCerrado = true;
				for(i=0;i<seguidoresEncontrados.length;i++){
					for(j=0;j<pieza.seguidores.length;j++){
						if(seguidoresEncontrados[i]==pieza.seguidores[j]){
							pieza.seguidores.splice(j,1);
						}
					}
				}
			});
			
		}else{
			puntos=0;
			seguidoresEncontrados = [];
		}
	}
	console.log(tablero.posiciones);
	return [puntos,seguidoresEncontrados];
}



