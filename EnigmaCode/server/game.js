
// Lós metodos van dentro de Meteor.methods ya que utilizamos Meteor para desarrollar el juego

var ArrPartidas = {} // En esta coleccion guardamos las id de todas las partidas


Meteor.methods({
	//Crea una nueva partida, devuelve true si se consiguio false si no
	nuevaPartida: function(id_game){
		if(ArrPartidas[id_game]== undefined){
			Partida = new Tablero(id_game);
			Partida.iniciar();
			ArrPartidas[id_game]= Partida;
			Jugadores_ID= Partidas.findOne({_id: id_game}).jugadores;
	
			for(i=0;i<Jugadores_ID.length;i++){
			
			if (Jugadores_ID[i].user_id.slice(0,10) == "Jugador_IA"){
					Partida.listaJugadores.push(new Jugador(Jugadores_ID[i],Jugadores_ID[i].user_id));
					console.log("TENEMOS UNA IA");
			}else{
				var player =resolverUser(Jugadores_ID[i]);
				Partida.listaJugadores.push(new Jugador(Jugadores_ID[i],player.nombre));
			}
		}
			
			
			console.log("Tenemos los jugadores");
			ArrPartidas[id_game] =  Partida;
			return Partida.listaJugadores;
		}else{
			console.log("Esa id ya pertenece a una partida creada");
			Partida=ArrPartidas[id_game];
			return Partida.listaJugadores;
		}
	},

	//Los jugadores se añaden de uno en 1 y solo se podran meter en partidas ya creadas devuelve true si se consiguio, false si no
	
	/*Se comprueba que la partida tiene menos de 5 jugadores entre las IAS y los jugadores reales, se devuelve false si
	  el numero excede el maximo. Se devuelve la lista de jugadores si es correcto. Ademas elige aleatoriamente quien
	  comienza el juego */
	comenzar: function(id_game,jugadores,nIAs){
		if(ArrPartidas[id_game]){
			Partida= ArrPartidas[id_game];
			if(jugadores.length+nIAs<=5)
			{
			    for (i = 0; i < jugadores.length; i++)
			    {
					Partida.listaJugadores.push(new Jugador(jugadores[i][0],jugadores[i][1])); //El 0 es la id el 1 es el nombre
				}
				for(i=1;i<=nIAs;i++){
					Partida.listaJugadores.push(new Jugador(-i,"IA"+i)); 
					Partida.listaJugadores[Partida.listaJugadores.length + i].IA = true;//Añado el Nuevo ID DE LA IA, para ello agregamos el .IA a true en los ultimos que hemos añadido
				}
				Partida.turno = Math.floor(Math.random()*(Partida.listaJugadores.length-1));
				return Partida.listaJugadores;
			}
			else{
				console.log("Excede el numero maximo de jugadores");
				return false;
			}
		}
	},


	//Roba una ficha, si id = id_game es un juego existente, devuelve la ficha
	// y las posicones donde se pueden colocar, si no devuelve false, si no quedan piezas que extraer devuelve undefined
	robarFicha: function(id_game){
		if(ArrPartidas[id_game]){
			Partida = ArrPartidas[id_game];
			var ficharobada = Partida.saca_pieza();
			var ficha = new Pieza(ficharobada,0,0)
			console.log("ROBAMOS!!");
			lugares = Partida.posiblelugar(ficha);
			var resultado = [ficha,lugares];
			ArrPartidas[id_game] =  Partida;
			return resultado;
		}else{
			return false;
		}
	},
	

	//Devuelve el turno en el que se encuentra la partida con id = id_game, si no existe devuelve undefined
	turnoActual: function(id_game){
		if(ArrPartidas[id_game]){
			return ArrPartidas[id_game].turno
		}else{
			return undefined;
		}
	},
	
	//Pasa al siguiente turno de la partida id = id_game, devuelve el turno siguiente y si no existe esa partida devuelve undefined
	cambiarTurno: function(id_game){
		if(ArrPartidas[id_game]){
			Partida = ArrPartidas[id_game];
			if(Partida.turno===Partida.listaJugadores.length-1){
				Partida.turno=0;
			}else{
				Partida.turno++;
			}
			return Partida.turno;
		}else{
			return undefined;
		}
	},

	//Coloca una ficha en una posición, devuelve la lista de posiciones donde se puede colocar un seguidor si se ha conseguido, 0 en caso de que no se pueda
	colocarFicha: function (id_game, pieza, posicion, giros, id_jugador) {
	    if (ArrPartidas[id_game]) {
	        var encaja = false;
			Partida = ArrPartidas[id_game];
			//giro la pieza
			for(i=0;i<giros;i++){
				pieza= pieza.girar();
			}
			//El if comprueba que la posicion este dentro de las posibles posicones donde podemos colocar
			if(Partida.posiblelugar(pieza).indexof(posicion)<=0){
				encaja = Partida.coloco(pieza);
			}
			if (encaja == false) { return 0 }
			var seguidores = [];
			var jugador = _.find(Partida.listaJugadores, function (obj) { return (obj.id.user_id == id_jugador) })
			if (jugador.seguidores != 0) {
			    var seguidores = Partida.posibleseguidor(pieza);
			}
			ArrPartidas[id_game] = Partida;
			return seguidores;

		}else{
			return undefined;
		}
	},
	
	finalizarPartida: function (id_game)
	{
	    if (ArrPartidas[id_game]) {
	        var puntuacion = [];
            Partida= ArrPartidas[id_game];
            for(var i =0; i< Partida.posiciones.length; i++)
            {
                pieza = Partida.posiciones[i];
                	if (pieza.seguidores.length != 0){
					 		
						if (_.find(pieza.seguidores,function(obj){return (obj.tipo=="Granjero")})){cerrarGranja(pieza,Partida);}
                        if (_.find(pieza.seguidores,function(obj){return (obj.tipo=="Ladron")})){cerrarCamino(pieza,true,Partida);}
						if (_.find(pieza.seguidores,function(obj){return (obj.tipo=="Monje")})){cerrarMonasterio(pieza,true,Partida);}
                        if (_.find(pieza.seguidores,function(obj){return (obj.tipo=="Caballero")})){cerrarCiudad(pieza,true,Partida);}
                        }
            }
    	for (i=0; i< Tablero.listaJugadores.length; i++){
    	    puntuacion.push({ user_id: Partida.listaJugadores[i].id.user_id, puntos: Partida.listaJugadores[i].puntos });
            
		}

	    } else {
	        return undefined;
	    }


	},

	colocarSeguidor: function (id_game, id_jugador, posicion, seguidor) {
	    if (ArrPartidas[id_game]) {
	        Partida = ArrPartidas[id_game];
	        var pieza = Partida.piezaenposiciones(posicion.x, posicion.y);
	        if (seguidor > 0)
	        {
	           var colocado = Partida.colocarseguidor(pieza, seguidor);
	        }
	        cerrarMonasterio(pieza,false,Partida); //Metodo que llama para mirar si es cierre Monasterio
	        ArrPartidas[id_game] = Partida;
	        return Partida.listaJugadores;

	    } else {
	        return undefined;
	    }
	},

	eliminarPartida: function(id_game){
		if(ArrPartidas[id_game]){
			delete ArrPartidas[id_game];
		}else{
			console.log("Partida no encontrada");
		}
	},

    JugadorArtificial: function(id_partida,id_jugador){
        Partida = ArrPartidas[id_partida];
        
        var ColocoFicha = false;
        while (ColocoFicha == false)
        { //Bucle en el cual probamos a colocar las fichas, Robamos con la clase JUGADORIA, y la colocamos, no podemos, tendremos que volver a robar otra ficha y realziar el mismo proceso.
            var Jugada = jugadorIA(id_jugador, Partida);
            var Piezanueva = new Pieza(0, 0, 0, x[0]);
            for (var i = 0; i < Jugada[1].giros; i++) {
                Piezanueva = Piezanueva.girar()
            }
            ColocoFicha = Tablero.coloco(Piezanueva, Jugada[1].coorx, Jugada[1].coory);
            console.log("¿Ha sido Colocada?", ColocoFicha);
        }
        var nuevoSeguidor = {tipoSeguidor:undefined, PosEnFicha:undefined, IdJugador:undefined, TipoFicha:undefined}
        var jugador = _.find(Tablero.listaJugadores, function (obj) { return (obj.id.user_id == id_jugador) })
        if (jugador.seguidores > 0)
        {
            if (ColocoFicha.tipo == "MonCamino" || ColocoFicha.tipo == "MonGranja")
            {
                nuevoSeguidor = { tipoSeguidor: "monje", PosEnFicha: 5, IdJugador: jugador.id, TipoFicha: ColocoFicha }
                Tablero.colocarseguidor(ColocoFicha, nuevoSeguidor.PosEnFicha);
            }
            else
            {
                var posiciones = posibleseguidor(ColocoFicha);
                if (posiciones.length > 0)
                {
                    var Pos_Aleatorio = Math.floor(Math.random() * posiciones.length);
                    seguidor = posiciones[Pos_Aleatorio];
                    nuevoSeguidor = { tipoSeguidor: seguidor.tipo, PosEnFicha: seguidor.posicion, IdJugador: jugador.numero, TipoFicha: fichaColocada }
                    Tablero.colocarseguidor(ColocoFicha, nuevoSeguidor.PosEnFicha);
                }
            }
        }
        // CierroCamino(ColocoFicha);
        // CierroMonasterio(colocando);
        // CierroCiudad(ColocoFicha);
        ArrPartidas[id_partida] = Tablero;
        return [Piezanueva.tipo, jugador[1].giros, jugador[1].coorx, jugador[1].coory, Tablero.listaJugadores, nuevoSeguidor.tipoSeguidor, nuevoSeguidor.PosEnFicha]
    }
});
