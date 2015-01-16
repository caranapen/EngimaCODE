jugadorIA=function(id_jugador){

    this.robar = function () {
		
        var robado = Tablero.saca_pieza();
        this.nuevaficha = new Pieza(robado, 0, 0);
        var posicion = Tablero.posiblelugar(this.nuevaficha);
        if (this.posicion.length == 0 && Tablero.totalFichas != 71) { this.robar() }
    };

    this.robar();

    var TipoJugada = { puntos: 0, coorx: 0, coory: 0, giros: 0, }
    var ProbarColocarFicha = function (ngiros) {
        TableroAux = new ObjTablero(10000000);
        TableroAux.iniciar();
        for (i in Tablero.posicion) {
             TableroAux.posicion[i] = Tablero.posicion[i] 
        }
        listaPuntos = []
        for (i in Tablero.listaJugadores) {
            listaPuntos.push(Tablero.listaJugadores[i].puntos);
        }

        var colocando = Tablero.coloco(nuevaficha, this.nuevaficha.encajaCon[coordenadas].x, this.nuevaficha.encajaCon[coordenadas].y);
        if (colocando)
        {
            //Aqui Comparo Que es la Mejor Jugada, Por ahora vamos a decidir que si que es la mejor jugada, sin añadir seguidores.

           //Comprobamos cuando los tengamos hechos si cerramos algun camino, Ciudad o convento
            // CierroCamino(colocando);
            // CierroMonasterio(colocando);
            // CierroCiudad(colocando);

            var jugador = _.find(Tablero.listaJugadores, function (obj) { return (obj.id.user_id == nJugador) });
            TipoJugada = { puntos: jugador.puntos, coorx: this.nuevaficha.EncajaCon[coordenadas].x, coory: this.nuevaficha.EncajaCon[coordenadas].y, giros: ngiros, }
            for (i in Tablero.listaJugadores) {
                Tablero.listaJugadores[i].puntos = listaPuntos[i];
            }
        }
    }

    for (coordenadas in this.nuevaficha.EncajaCon) { //Esto nos sirve para ver con que piezas nos encaja la nuestra
        ProbarColocarFicha(0);
        this.nuevaficha = this.nuevaficha.girar();
        ProbarColocarFicha(1);
        this.nuevaficha = this.nuevaficha.girar();
        this.nuevaficha = this.nuevaficha.girar();
        colocarFicha(2);
        this.nuevaficha = this.nuevaficha.girar();
        this.nuevaficha = this.nuevaficha.girar();
        this.nuevaficha = this.nuevaficha.girar();
        colocarFicha(3);
    }

    return [this.nuevaFicha.Tipo, TipoJugada];


}
