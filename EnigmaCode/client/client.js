
Meteor.subscribe("userNames");

Meteor.subscribe("gameplays");

Meteor.subscribe("messages");

//Para tener acceso a Stats
Meteor.subscribe("all_stats");


function changeView(view) {
	Session.set('tab', view);
}

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
	Session.set('max_players', 8);
	Session.set('tab', null);
	Session.set("current_Stat", "Otros");				    	
});

Template.userlist.helpers({

		users: function(){
			return Meteor.users.find({},{sort:{username:1}});
		},

});
 
Template.chatemp.helpers({
		messages: function(){
			return Messages.find({},{limit: 12, sort:{time: -1}});
		} 
}); 


Template.partidastemp.helpers({
		gameplays: function(){
			return Gameplays.find({});
		},
		max_players: function(){
			return Session.get('max_players');
		} 
}); 

Template.waitingtemp.helpers({
	
		waiting: function(){
			return Gameplays.findOne({_id:Session.get("partida_actual")}).num_players;
		},
		max_players: function(){
			return Session.get('max_players');
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

var gameplay_list = [];
Template.partidastemp.events({
	'keydown input#partidainput': function(event){

		if (event.which == 13) {
			if (Meteor.userId()){

				var gameplay_name = $('input#partidainput');
	//			alert(gameplay_name.val());
				var existente = Gameplays.findOne({gameplay_name: gameplay_name.val()});
			//	console.log(existente);

				if (existente !== undefined){

					alert("Ya existe una partida con ese nombre, pon un nombre distinto");
					changeView('partidas');
				}

				if (gameplay_name.value != '' && (existente === undefined)) {
					
					Meteor.call('addGameplay', gameplay_name.val(), function(error, gameplay_id){
						Gameplays.update({_id : gameplay_id}, {$push: {gameplay_list: Meteor.userId()}});
						Session.set("partida_actual", gameplay_id);
						changeView('waiting');	
					});
					gameplay_name.val('');

				//	
					//$('input#partidainput').attr('disabled', true);
					//$('input.joingame').attr('disabled', true);
		
				}			
			}	
		}
	},

	'click input.joingame': function(event){

		lim = ($(this)[0]).num_players + 1 ;
		console.log(lim);
		max_players = Session.get('max_players');
		if (((lim <= max_players) && ($(this)[0]).gameplay_list.indexOf(Meteor.userId()) === -1)){
			Gameplays.update({_id : $(this)[0]._id}, {$addToSet: {gameplay_list: Meteor.userId()}, $inc: {num_players: 1}});	
		}
//, 
		Session.set("partida_actual", $(this)[0]._id);
		changeView('waiting');
		//$('input.joingame').attr('disabled', true);
		// alert(Gameplays.findOne({gameplay_name: event.target.id})._id);

	}	
});

Template.waitingtemp.events ({

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
                points: 20+total,
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

Template.salas_de_Espera.helpers({
    
});
   
/*  Configuration of signup */
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});
