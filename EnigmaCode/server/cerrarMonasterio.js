
cerrarMonasterio = function (pieza, final, tablero) {

		var puntos = 0;
		var monje;
		var seguidoresEncontrados = [];
		var piezasTotales = 0;
		var piezaAux;
		this.sumar = function () {
		    var sumados = [];
		    seguidoresEncontrados.forEach(function (seguidor) {
		        jugador = tablero.listaJugadores.find(function (jug) { jug == seguidor.jugador; });
		       if(jugador == undefined){
				//En las pruebas no estoy usando jugadores reales en el listado de jugadores por tanto necesito este if
				console.log("Esto es para las pruebas");
			}else{
               
               
                if (jugador.indexOf(sumados) >= 0) {
		            jugador.puntuacion += puntos;
		            sumados.push(jugador);
		        }
		        jugador.seguidores++;
		        }
		    });
		};
        
		var cerrarMon = function (pieza) {
		    var TenemosMonje = false;
		    var piezasCercanas = 0;
		    var piezaAux;
		    pieza.seguidores.forEach(function(seguidor){
		        if(seguidor.tipo=='Monje'){
		            monje = seguidor;
		            seguidoresEncontrados.push(seguidor);
		            TenemosMonje = true;
		            piezasCercanas++;
		        }  
		    });
		    if (TenemosMonje) {
		        piezaAux = tablero.piezaenposiciones(pieza.x + 1, pieza.y);
		        if (piezaAux != undefined) { piezasCercanas++; }
		        piezaAux = tablero.piezaenposiciones(pieza.x - 1, pieza.y);
		        if (piezaAux != undefined) { piezasCercanas++; }
		        piezaAux = tablero.piezaenposiciones(pieza.x, pieza.y + 1);
                if (piezaAux != undefined) { piezasCercanas++; }
		        piezaAux = tablero.piezaenposiciones(pieza.x, pieza.y - 1);
                if (piezaAux != undefined) { piezasCercanas++; }
		        piezaAux = tablero.piezaenposiciones(pieza.x + 1, pieza.y + 1);
                if (piezaAux != undefined) { piezasCercanas++; }
		        piezaAux = tablero.piezaenposiciones(pieza.x + 1, pieza.y - 1);
                if (piezaAux != undefined) { piezasCercanas++; }
		        piezaAux = tablero.piezaenposiciones(pieza.x - 1, pieza.y + 1);
                if (piezaAux != undefined) { piezasCercanas++; }
		        piezaAux = tablero.piezaenposiciones(pieza.x - 1, pieza.y - 1);
                if (piezaAux != undefined) { piezasCercanas++; }
		        if (piezasCercanas == 9 &&           final == false)
		        {
		            puntos = piezasCercanas;
		            sumar();
		            console.log("Sumamos Por Cerrar Entero el Monasterio");
		        }
		        else if (final == true)
		        {
		            puntos = piezasCercanas;
		            sumar();
		            console.log("Sumamos Al ser Final de Partida");
		        }
		    }
		};

		if (final == false) {
		    if ((pieza.tipo == "MonCamino") || (pieza.tipo == "MonGranja"))
		    { cerrarMon(pieza); }
		    piezaAux = tablero.piezaenposiciones(pieza.x + 1, pieza.y);
		    if (piezaAux != undefined){if ((piezaAux.tipo == "MonCamino") || (piezaAux.tipo == "MonGranja"))
            {cerrarMon(piezaAux);}}
		    piezaAux = tablero.piezaenposiciones(pieza.x - 1, pieza.y);
		    if (piezaAux != undefined){if ((piezaAux.tipo == "MonCamino") || (piezaAux.tipo == "MonGranja"))
            {cerrarMon(piezaAux);}}
		    piezaAux = tablero.piezaenposiciones(pieza.x, pieza.y + 1);
		    if (piezaAux != undefined){if ((piezaAux.tipo == "MonCamino") || (piezaAux.tipo == "MonGranja"))
            {cerrarMon(piezaAux);}}
		    piezaAux = tablero.piezaenposiciones(pieza.x, pieza.y - 1);
		    if (piezaAux != undefined){if ((piezaAux.tipo == "MonCamino") || (piezaAux.tipo == "MonGranja"))
            {cerrarMon(piezaAux);}}
		    piezaAux = tablero.piezaenposiciones(pieza.x + 1, pieza.y + 1);
		    if (piezaAux != undefined){if ((piezaAux.tipo == "MonCamino") || (piezaAux.tipo == "MonGranja"))
            {cerrarMon(piezaAux);}}
		    piezaAux = tablero.piezaenposiciones(pieza.x + 1, pieza.y - 1);
		    if (piezaAux != undefined){if ((piezaAux.tipo == "MonCamino") || (piezaAux.tipo == "MonGranja"))
            {cerrarMon(piezaAux);}}
		    piezaAux = tablero.piezaenposiciones(pieza.x - 1, pieza.y + 1);
		    if (piezaAux != undefined){if ((piezaAux.tipo == "MonCamino") || (piezaAux.tipo == "MonGranja"))
            {cerrarMon(piezaAux);}}
		    piezaAux = tablero.piezaenposiciones(pieza.x - 1, pieza.y - 1);
		    if (piezaAux != undefined){if ((piezaAux.tipo == "MonCamino") || (piezaAux.tipo == "MonGranja"))
            {cerrarMon(piezaAux);}}
		}
		else {
		    if ((pieza.tipo == "MonCamino") || (pieza.tipo == "MonGranja"))
		    { cerrarMon(pieza); }
		}
        return [puntos, seguidoresEncontrados];
}
