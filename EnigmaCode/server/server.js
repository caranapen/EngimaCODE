    
Meteor.publish("userNames", function() {
    return Meteor.users.find ({}, {fields: {username:1}});
});

Meteor.publish("messages", function() {
	return Messages.find();
});

Meteor.publish("gameplays", function() {
	return Gameplays.find();
});

//Publico estadisticas, que tiene acceso a todos los campos de cada tipo de estadistica
Meteor.publish("all_stats", function() {
    //Devuelo una funcion que me devuelve los campos de cada tipo de Stat
    return Estadisticas.find();
});

//Funciones basicas que actualizan Stats al finalizar cada partida
Meteor.methods({
    //**Esto depende de la IA
    gameEnd: function (game_name, points) {
    //En realidad no nos hace falta (de momento), pues si no esta logueado, no ha podido empezar una partida y nunca se llamara a esta funcion, a no ser que implementemos invitados.
        if (this.userId) {
            Stats.insert ({
                player_name: this.userID,
                //De momento Carcassone es el unico juego por defecto
                game_name: {name: "Carcassone",
                    points: points,
                    played_games: played_games + 1,
                    winned_games: winned_games + victory,
                    drawed_games: drawed_games + draw,
                    lossed_games: lossed_games + defeat
                }
            });
        }
    },
    //Metemos datos falsos para el usuario actual. En un futuro no deberian estar y solo se crearan cuando se acaben juegos
    datosIniciales: function () {
        if (Meteor.userId()) {
            Estadisticas.insert({
                player_name: Meteor.user().username,
                //De momento Carcassone es el unico juego por defecto
                game_name: {game_name: "Carcassone",
                    points: 100,
                    played_games: 10,
                    winned_games: 10,
                    drawed_games: 10,
                    lossed_games: 10
                }
            });
        };
    }
});

//Inicializamos el startup
Meteor.startup(function () {
    //Usuario por defecto, para tener algo en la base de datos si no hay ningun cliente iniciado
    if (Estadisticas.find().count() == 0) {
       Estadisticas.insert({
            player_name: "nullplayer",
            //De momento Carcassone es el unico juego por defecto
            game_name: {game_name: "Carcassone",
                points: 0,
                played_games: 0,
                winned_games: 0,
                drawed_games: 0,
                lossed_games: 0
            }
        });
    };
});

