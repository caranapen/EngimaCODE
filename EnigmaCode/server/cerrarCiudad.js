cerrarCiudad = function(pieza,final,tablero){
	var finalesCiudad = ["CiudadD", "CiudadE", "CiudadH", "CiudadI", "CiudadJ", "CiudadK", "CiudadL"];
	var seguidoresEncontrados = [];
	var puntos;
	if(final){
		puntos = 1;
	}else{
		puntos = 2;
	}
	var cerrado = 0;
	var piezasRecorridas = [];


	this.sumar = function(){
		var sumados = [];
		seguidoresEncontrados.forEach(function(seguidor){

		jugador = tablero.listaJugadores.find(function(jug){jug == seguidor.jugador;});
			if(jugador == undefined){
				console.log("PRUEBA");
			}else{
				if(jugador.indexOf(sumados)>=0){
					jugador.puntos += puntos;
					sumados.push(jugador);
				}
				jugador.seguidores++;
			}
		});
		
	};
	
	this.piezaArriba = function(pieza,vengode){
		//Pieza de arriba
		if(pieza.Arriba == 'Ciudad' && tablero.piezaenposiciones(pieza.x,pieza.y+1) && tablero.piezaenposiciones(pieza.x,pieza.y+1).Abajo=='Ciudad' && vengode!='Arriba'){
			//Primero compruebo que en esa pieza no hay caballeros
			var aux =tablero.piezaenposiciones(pieza.x,pieza.y+1);
			if(aux.ciudadCerrada){
				return false;
			}
			aux.seguidores.forEach(function(seguidor){
				if(seguidor.tipo=='caballero'){
					seguidoresEncontrados.push(seguidor);
					//FALLO AQUI
					//i = aux.seguidores.indexOf(seguidor);
					//aux.seguidores.splice(i,1);
				}
			});
			if(finalesCiudad.indexOf(aux.tipo)<0){
				//NO ES UN FINAL -- hay recursividad -- ojo escudo -- ojo final
				if(final){
					if(aux.Escudo == 1){
						puntos = puntos + 2;
					}else{
						puntos = puntos + 1;
					}
				}else{
					if(aux.Escudo == 1){
						puntos = puntos + 4;
					}else{
						puntos = puntos + 2;
					}
				}		
				//llamada recursiva para seguir comprobando la ciudad (igual que camino)
				return cerrarCiudadRecur(aux,'Abajo');
			}else{
				if(final){
					puntos = puntos + 1;
					cerrado++;
					piezasRecorridas.push(aux);
					return true;
				}else{
					puntos = puntos + 2;
					cerrado++;
					piezasRecorridas.push(aux);
					console.log("ARRIBAAAAAAAA");
					console.log(puntos);
					return true;					
				}	
				/*	
				if(piezasRecorridas.length == 1){
					puntos = 2;
					cerrado++;
					piezasRecorridas.push(aux);
					console.log("ARRIBA");
					return true;
				}else{
					puntos = puntos + 2;
					cerrado++;
					return true;
					//En caso de que sea un final de ciudad no recursividad
				}
				*/
				//final de pieza = no recur
			}
		}
	};
	
	this.piezaAbajo = function(pieza,vengode){
		//Pieza de arriba
		if(pieza.Abajo == 'Ciudad' && tablero.piezaenposiciones(pieza.x,pieza.y-1) && tablero.piezaenposiciones(pieza.x,pieza.y-1).Arriba=='Ciudad' && vengode!='Abajo'){
			//Primero compruebo que en esa pieza no hay caballeros
			var aux =tablero.piezaenposiciones(pieza.x,pieza.y-1);
			if(aux.ciudadCerrada){
				return false;
			}
			aux.seguidores.forEach(function(seguidor){
				if(seguidor.tipo=='caballero'){
					seguidoresEncontrados.push(seguidor);
					//FALLO AQUI
					//i = aux.seguidores.indexOf(seguidor);
					//aux.seguidores.splice(i,1);
				}
			});
			if(finalesCiudad.indexOf(aux.tipo)<0){
				//NO ES UN FINAL -- hay recursividad -- ojo escudo -- ojo final
				if(final){
					if(aux.Escudo == 1){
						puntos = puntos + 2;
					}else{
						puntos = puntos + 1;
					}
				}else{
					if(aux.Escudo == 1){
						puntos = puntos + 4;
					}else{
						puntos = puntos + 2;
					}
				}		
				//llamada recursiva para seguir comprobando la ciudad (igual que camino)
				return cerrarCiudadRecur(aux,'Arriba');
			}else{
				if(final){
					puntos = puntos + 1;
					cerrado++;
					piezasRecorridas.push(aux);
					return true;
				}else{
					puntos = puntos + 2;
					cerrado++;
					piezasRecorridas.push(aux);
					return true;					
				}	
			}
		}
	};
	
	this.piezaDerecha = function(pieza,vengode){
		//Pieza de arriba
		if(pieza.Derecha == 'Ciudad' && tablero.piezaenposiciones(pieza.x+1,pieza.y) && tablero.piezaenposiciones(pieza.x+1,pieza.y).Izquierda=='Ciudad' && vengode!='Derecha'){
			//Primero compruebo que en esa pieza no hay caballeros
			var aux =tablero.piezaenposiciones(pieza.x+1,pieza.y);
			if(aux.ciudadCerrada){
				return false;
			}
			aux.seguidores.forEach(function(seguidor){
				if(seguidor.tipo=='caballero'){
					seguidoresEncontrados.push(seguidor);
					//FALLO AQUI
					//i = aux.seguidores.indexOf(seguidor);
					//aux.seguidores.splice(i,1);
				}
			});
			if(finalesCiudad.indexOf(aux.tipo)<0){
				//NO ES UN FINAL -- hay recursividad -- ojo escudo -- ojo final
				if(final){
					if(aux.Escudo == 1){
						puntos = puntos + 2;
					}else{
						puntos = puntos + 1;
					}
				}else{
					if(aux.Escudo == 1){
						puntos = puntos + 4;
					}else{
						puntos = puntos + 2;
					}
				}		
				//llamada recursiva para seguir comprobando la ciudad (igual que camino)
				return cerrarCiudadRecur(aux,'Izquierda');
			}else{
				if(final){
					puntos = puntos + 1;
					cerrado++;
					piezasRecorridas.push(aux);
					return true;
				}else{
					puntos = puntos + 2;
					cerrado++;
					piezasRecorridas.push(aux);
					return true;					
				}	
			}
		}
	};
	
	this.piezaIzquierda = function(pieza,vengode){
		//Pieza de arriba
		if(pieza.Izquierda == 'Ciudad' && tablero.piezaenposiciones(pieza.x-1,pieza.y) && tablero.piezaenposiciones(pieza.x-1,pieza.y).Derecha=='Ciudad' && vengode!='Izquierda'){
			//Primero compruebo que en esa pieza no hay caballeros
			var aux =tablero.piezaenposiciones(pieza.x-1,pieza.y);
			if(aux.ciudadCerrada){
				return false;
			}
			aux.seguidores.forEach(function(seguidor){
				if(seguidor.tipo=='caballero'){
					seguidoresEncontrados.push(seguidor);
					//FALLO AQUI
					//i = aux.seguidores.indexOf(seguidor);
					//aux.seguidores.splice(i,1);
				}
			});
			if(finalesCiudad.indexOf(aux.tipo)<0){
				//NO ES UN FINAL -- hay recursividad -- ojo escudo -- ojo final
				if(final){
					if(aux.Escudo == 1){
						puntos = puntos + 2;
					}else{
						puntos = puntos + 1;
					}
				}else{
					if(aux.Escudo == 1){
						puntos = puntos + 4;
					}else{
						puntos = puntos + 2;
					}
				}		
				//llamada recursiva para seguir comprobando la ciudad (igual que camino)
				return cerrarCiudadRecur(aux,'Derecha');
			}else{
				if(final){
					puntos = puntos + 1;
					cerrado++;
					piezasRecorridas.push(aux);
					return true;
				}else{
					puntos = puntos + 2;
					cerrado++;
					piezasRecorridas.push(aux);
					return true;					
				}	
			}
		}
	};				
	
	
	this.cerrarCiudadRecur = function(pieza,vengode){
		var ok = new Array(4);
		piezasRecorridas.push(pieza);
		ok[0] = this.piezaAbajo(pieza,vengode);

		ok[1] = this.piezaArriba(pieza,vengode);

		ok[2] = this.piezaDerecha(pieza,vengode);

		ok[3] = this.piezaIzquierda(pieza,vengode);
		if(ok[0] || ok[1] || ok[2] || ok[3]){return true;}
	};
	
	if(finalesCiudad.indexOf(pieza.tipo)<0){
	//esto significa que la pieza no es un final de ciudad por lo tanto tendrá que cerrarse por varios lados (minimo 2 lados)
		cerrarCiudadRecur(pieza);
		if(cerrado >= 2 || final){
			this.sumar();
			piezasRecorridas.forEach(function(pieza){
				pieza.ciudadCerrada = true;
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
	}else{
	//es un final de ciudad por lo tanto tiene que haber como mínimo otro final de ciudad
		cerrarCiudadRecur(pieza);
		if(cerrado >= 1 || final){
			this.sumar();
			piezasRecorridas.forEach(function(pieza){
				pieza.ciudadCerrada = true;
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
	///CASO ESPECIAL DE CIUDAD CON SOLO DOS TROZOS CERRADOS//
	if(!final && piezasRecorridas.length == 2){
		puntos = 2;
	}
	return [puntos, seguidoresEncontrados];
}
