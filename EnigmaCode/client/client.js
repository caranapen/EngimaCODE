Meteor.subscribe("userNames");

Meteor.subscribe("gameplays");

Meteor.subscribe("messages");

//Para tener acceso a Stats
Meteor.subscribe("all_stats");

//En realidad esto aun no vale
Tracker.autorun(function(){
    var current_Stat = Session.get("current_Stat");
});

// Pruebas con Tracker.autorun
Tracker.autorun(function(){
	current_game = Session.get('partida_actual');
	game = Gameplays.findOne({_id: current_game});
	console.log(game);	
	if (game === undefined){
		changeView('partidas');
	}	
	
	//		$('input.joingame').attr('disabled', false);
});

Meteor.startup(function () {
			//$('#menu_principal').hide();
			//$('#container_lateral1').hide();
			//$('#principal').hide();
    //Esto de max_players me parece bastante guarro, una variable global seria bastante mejor
	Session.set('max_players', 8);
	Session.set('tab', null);
	Session.set("current_Stat", "Otros");				    	
});

/*
Template.tabs.events({
	'click #partidaslink': function () {
		$('#partidas').show();
		$('#usuarios').hide();
		$('#waiting').hide();
	},
	'click #registrolink': function () {
		$('#usuarios').show();
		$('#partidas').hide();
		$('#waiting').hide();
	}
*/	

//Funciones del programa
function changeView(view) {
	Session.set('tab', view);
}

//Función general. Si has creado una partida has entrado en una partida creada estás en espera
function estaenespera() {
    var esta = false;
    var gameplays = Gameplays.find({});
    var idusuario = Meteor.userId();
    gameplays.forEach(function (gameplay) {
        if (gameplay.gameplay_list.indexOf(idusuario) != -1) {
            esta = true;
        }   
    });
    return esta;
}

//Funcion especifica
function hacreadopartida() {
    var escreador = false;
    var gameplays = Gameplays.find({});
    var idusuario = Meteor.userId();
    gameplays.forEach(function (gameplay) {
        if (gameplay.creator_id == idusuario) {
            escreador = true;
        }   
    });
    return escreador;
}

/*
function partida_rapida() {
    var partida = Gameplays.find({}, {limit :1, sort: {'num_players': -1}});
//($(this[0]). se refiere a una coleccion, concretamente al gameplay actual, no me gusta, pendiente de cambiar
	num_players = partida.num_players + 1 ;
	max_players = Session.get('max_players');
		//El segundo campo del if es otra guarrada, directamente cuando estas en una partida no deberías poder hacer otra cosa, en vez de comprobarsi estas en (LA partida y no en TODAS las partidas, por eso tb es bastante guarro) y de alguna forma has podido crear o acceder a otra. Quitar si o si! Lo de la lista de jugadores en la partida esta bien
		if (((num_players <= max_players) && ($(this)[0]).gameplay_list.indexOf(Meteor.userId()) === -1)){
			Gameplays.update({_id : $(this)[0]._id}, {$addToSet: {gameplay_list: Meteor.userId()}, $inc: {num_players: 1}});	
		}
		Session.set("partida_actual", $(this)[0]._id);
		changeView('waiting');
	}	
    Session.set('tab', 'waiting');
}*/

//Manejadores de eventos
Template.userlist.helpers({
	users: function(){
		return Meteor.users.find({},{sort:{username:1}});
	}
});
 
Template.chatemp.helpers({
	messages: function(){
		return Messages.find({},{limit: 12, sort:{time: -1}});
	} 
}); 

Template.chatemp.events({
	'keydown input#chatinput': function (event) {
		if (event.which == 13) {
			if (Meteor.userId()){
				var user_id = Meteor.user()._id;
				var name = Meteor.user().username;
				var message = $('input#chatinput');
				if (message.value != '') {
					Messages.insert({
						user_id: user_id,
						name: name,
						message: message.val(),
						time: Date.now()
					});
 		 			message.val('')	
				}
			}
		}  
	}	
}); 

Template.crear_partida.helpers({
    gameplays: function(){
		return Gameplays.find({});
	},
	max_players: function(){
		return Session.get('max_players');
	} 
});

Template.crear_partida.events({
	'keydown input#partidainput': function(event){
		if (event.which == 13) {
		    //Solo puede intentar crear una partida si está logueado
			if (Meteor.userId()){
			    if (estaenespera() == false) {
				    var gameplay_name = $('input#partidainput');
				    var existente = Gameplays.findOne({gameplay_name: gameplay_name.val()});
				    //Si el nombre de la partida ya esta registrado le avisamos y le devolvemos a creacion de partidas
				    if (existente != undefined){
					    alert("Ya existe una partida con ese nombre, pon un nombre distinto");
					    changeView('partidas');
				    }
				    //Si no, procedemos a crear la partida
				    else {
				        //Si el nombre no es nulo, le dejamos el nombre que ha elegido
				        //Si es nulo, le ponemos un nombre por defecto
				        gameplay_name = gameplay_name.val()
				        if (gameplay_name == '') {
					        gameplay_name = "Partida de "+ Meteor.user().username + " " + Meteor.userId().slice(1,5);
					    }
					    //Creamos la partida
					    Meteor.call('addGameplay', gameplay_name, function(error, gameplay_id){
						    Gameplays.update({_id : gameplay_id}, {$push: {gameplay_list: Meteor.userId()}});
						    Session.set("partida_actual", gameplay_id);
						    changeView('waiting');	
					    });
					}
				}
				else {
				    //Si ha creado ya una partida le avisamos y le devolvemos a su sala de espera
				    if (hacreadopartida()) {
				        alert("Ya has creado una partida");
				        changeView('waiting');
				    }
				    //Si está ya en una lista de espera le avisamos y le devolvemos a la sala de espera
				    else {
				        alert("Ya estás en una sala de espera");
				        changeView('waiting');
				    }
				}
					
			}
			else {
			    alert("Debes estar logueado para poder crear una partida");
			}	
		}
	}
});

function partida_rapida() {
    //Solo puede intentar crear una partida si está logueado
	if (Meteor.userId()){
        if (estaenespera() == false) {
            //Comprobamos que haya partidas en la lista de espera
            var bestgameplay = Gameplays.find({});
            if (Gameplays.find().count() === 0) {
                alert("No hay partidas en espera. Crea tú una nueva si quieres.");
            }
            else {
		        var max_players = Session.get('max_players');
                for (var i=0; i<bestgameplay.count(); i++) {
                    var num_players = bestgameplay[i].num_players;
                    //Esto habría que cambiarlo por gameplays.status
                    if (num_players < max_players) {
	    	            var num_players = bestgameplay.num_players + 1 ;
			            Gameplays.update({_id : bestgameplay._id}, {$addToSet: {gameplay_list: Meteor.userId()}, $inc: {num_players: 1}});	
		                Session.set("partida_actual", bestgameplay._id);
		                changeView('waiting');
		                i = bestgameplay.count();
		            }
                    //Establecer un else que cuando no haya los requisitos pedidos avise
                    //OTra vez tiene que ver con el gameplays.status
		        }
            }
		}
		else {
		    //Si ha creado ya una partida le avisamos y le devolvemos a su sala de espera
		    if (hacreadopartida()) {
		        alert("Ya has creado una partida");
		        changeView('waiting');
		    }
		    //Si ya está en una lista de espera le avisamos y le devolvemos a la sala de espera
		    else {
		        alert("Ya estás en una sala de espera");
		        changeView('waiting');
		    }
		}
	}
	else {
	    alert("Debes estar logueado para poder acceder una partida");
	}
}

Template.salas_de_espera.helpers({
		gameplays: function(){
			return Gameplays.find({});
		},
		max_players: function(){
			return Session.get('max_players');
		} 
}); 

Template.salas_de_espera.events({
    'click input.joingame': function(event){
        //($(this[0]). se refiere a una coleccion, concretamente al gameplay actual, no me gusta, pendiente de cambiar
		num_players = ($(this)[0]).num_players + 1 ;
		max_players = Session.get('max_players');
		//El segundo campo del if es otra guarrada, directamente cuando estas en una partida no deberías poder hacer otra cosa, en vez de comprobarsi estas en (LA partida y no en TODAS las partidas, por eso tb es bastante guarro) y de alguna forma has podido crear o acceder a otra. Quitar si o si! Lo de la lista de jugadores en la partida esta bien
		if (((num_players <= max_players) && ($(this)[0]).gameplay_list.indexOf(Meteor.userId()) === -1)){
			Gameplays.update({_id : $(this)[0]._id}, {$addToSet: {gameplay_list: Meteor.userId()}, $inc: {num_players: 1}});	
		}
		Session.set("partida_actual", $(this)[0]._id);
		changeView('waiting');
	}	
});

Template.waiting.helpers({
		waiting: function(){
			return Gameplays.findOne({_id:Session.get("partida_actual")}).num_players;
		},
		players: function(){
		    var playersIds = Gameplays.findOne({_id: Session.get("partida_actual")}).gameplay_list;
		    var player_names = [];
		    for (var i=0; i < playersIds.length; i++) {
		        player_names.push(Meteor.users.findOne({_id: playersIds[i]}));
		    }
		    return player_names;
		},
		max_players: function(){
			return Session.get('max_players');
		},
		emptyplayers: function(){
		    var num_players = Gameplays.findOne({_id: Session.get("partida_actual")}).gameplay_list.length;
		    var max_players = Session.get('max_players');
		    var empty_players = [];
		    for (var i=0; i < (max_players - num_players); i++) {
		        empty_players.push({username: "empty"});
		    }
		    return empty_players;
		}
});

Template.waiting.events ({
	'click input.exitgame': function(event){
		if (confirm ("¿Seguro que quieres abandonar la partida?")){
			var gameplay_id =  Session.get('partida_actual')
			var current_gameplay = Gameplays.findOne({_id: gameplay_id});
				
			if (Meteor.userId() === current_gameplay.creator_id){
				//Gameplays.update({_id : gameplay_id}, {$set: {gameplay_list: [], gameplay_name: undefined}});
				changeView('partidas');
				Gameplays.remove({_id: gameplay_id});
				Session.set('partida_actual', undefined);	

				
			}else{
				gameplay_list = Gameplays.findOne({_id: gameplay_id}).gameplay_list;
				index = gameplay_list.indexOf(Meteor.userId());
				console.log(index);
				if (index !== -1){
					gameplay_list.splice(index,1);
					Gameplays.update({_id : gameplay_id}, {$set: {gameplay_list: gameplay_list}, $inc: {num_players: -1}});
				}
				changeView('partidas');
			}
		}
	}
	
});

Template.views.helpers({
	tab: function() {
		var tab = {};
		tab['usuarios'] = Session.get('tab') === 'usuarios';
		tab['partidas'] = Session.get('tab') === 'partidas';
		tab['salas_de_espera'] = Session.get('tab') === 'salas_de_espera'
		tab['waiting'] = Session.get('tab') === 'waiting';
		return tab;
	}
});

Template.tabs.events({
    'click #liinicio': function () {
        Session.set('max_players', 8);
	    Session.set('tab', null);
	    Session.set("current_Stat", "Otros");
	},
	'click #licrear_partida': function () {
		changeView('partidas');
	},
	'click #lisalas_de_espera': function () {
	    changeView('salas_de_espera');
	},	
	'click #lipartida_rapida': function () {
	    partida_rapida();
	},
	'click #liregistro': function () {
		changeView('usuarios');
	},
	'click  #liPersonales': function () {
	    $('#logintroduccion').hide();
        Session.set("current_Stat", "StatsPersonales");
    },
    'click #liGeneral': function () {
        $('#logintroduccion').hide();
        Session.set("current_Stat", "MejoresGeneral");
    },
    'click  #liCarcassone': function () {
        $('#logintroduccion').hide();
        Session.set("current_Stat", "MejoresCarcassone");
    },
    'click #liOtros': function () {
        $('#logintroduccion').show();
        Session.set("current_Stat", "Otros");
    }
});

Template.viewsEstadisticas.events({
    'click #anadeStats': function () {
        var total = Estadisticas.find().count();
        Estadisticas.insert({
            player_name: "Usuario "+total,
            //De momento Carcassone es el unico juego por defecto
            game_name: {game_name: "Carcassone",
                points: 20 + total,
                played_games: total,
                winned_games: total,
                drawed_games: total,
                lossed_games: total
            }
        });
    }
});

Template.viewsEstadisticas.helpers ({
    current_Stat: function() {
	var current_Stat = {};
	current_Stat['StatsPersonales'] = Session.get('current_Stat') === 'StatsPersonales';
	current_Stat['MejoresGeneral'] = Session.get('current_Stat') === 'MejoresGeneral';
	current_Stat['MejoresCarcassone'] = Session.get('current_Stat') === 'MejoresCarcassone';
	current_Stat['Otros'] = Session.get('current_Stat') === 'Otros';
	return current_Stat;
	}
});

//Solo hay que cambiar player_name : nullplayer por _id: Meteor.userId()
Template.StatsPersonales.helpers({
    name: function(){
        var name = Estadisticas.findOne({player_name: "nullplayer"}).player_name;
		return name;
	},
    game_name: function(){
        var game_name = Estadisticas.findOne({player_name: "nullplayer"}).game_name.game_name;
		return game_name;
	},
	points: function(){
	    var points = Estadisticas.findOne({player_name: "nullplayer"}).game_name.points;
		return points;
	},
    played_games: function(){
        var played_games = Estadisticas.findOne({player_name: "nullplayer"}).game_name.played_games;
		return played_games;
	},
	winned_games: function(){
	    var winned_games = Estadisticas.findOne({player_name: "nullplayer"}).game_name.winned_games;
		return winned_games;
	},
    drawed_games: function(){
        var drawed_games = Estadisticas.findOne({player_name: "nullplayer"}).game_name.drawed_games;
		return drawed_games;
	},
	lossed_games: function(){
	    var lossed_games = Estadisticas.findOne({player_name: "nullplayer"}).game_name.lossed_games;
		return lossed_games;
	},
    points_per_game: function(){
        var played_games = Estadisticas.findOne({player_name: "nullplayer"}).game_name.played_games;
        var points = Estadisticas.findOne({player_name: "nullplayer"}).game_name.points;
        var points_per_game = Math.round(points/played_games);
		return points_per_game;
	}
});

Template.MejoresGeneral.helpers({
    topScorers: function(){
		return Estadisticas.find({}, {limit: 10, sort: {'game_name.points': -1}});
	}
});

Template.MejoresCarcassone.helpers({
    Totalplayed_games: function() {
        var Totalplayed_games = 0;
        var stats = Estadisticas.find({});
        stats.forEach(function (stat) {
            Totalplayed_games += stat.game_name.played_games;
        });
        return Totalplayed_games;
    },
    Totalwinned_games: function() {
        var Totalwinned_games = 0;
        var stats = Estadisticas.find({});
        stats.forEach(function (stat) {
            Totalwinned_games += stat.game_name.winned_games;
        });
        return Totalwinned_games;
    },
    Totaldrawed_games: function() {
        var Totaldrawed_games = 0;
        var stats = Estadisticas.find({});
        stats.forEach(function (stat) {
            Totaldrawed_games += stat.game_name.drawed_games;
        });
        return Totaldrawed_games;
    },
    Totallossed_games: function() {
        var Totallossed_games = 0;
        var stats = Estadisticas.find({});
        stats.forEach(function (stat) {
            Totallossed_games += stat.game_name.lossed_games;
        });
        return Totallossed_games;
    },
    Average_point_per_game: function() {
        var averagePoints = 0;
        var Totalpoints = 0;
        var Totalplayed_games = 0;
        var stats = Estadisticas.find({});
        stats.forEach(function (stat) {
            Totalpoints += stat.game_name.points;
            Totalplayed_games += stat.game_name.played_games;
        });
        averagePoints = Math.round(Totalpoints/Totalplayed_games);
        return averagePoints;
    },
    Totalpoints: function() {
        var Totalpoints = 0;
        var stats = Estadisticas.find({});
        stats.forEach(function (stat) {
            Totalpoints += stat.game_name.points;
        });
        return Totalpoints;
    }
});
   
/*  Configuration of signup */
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});
