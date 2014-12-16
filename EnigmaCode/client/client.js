
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
//	Session.set("current_Stat", "Otros");				
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
		tab['waiting'] = Session.get('tab') === 'waiting';
		return tab;
	}
});

Template.tabs.events({
	'click #partidaslink': function () {
		changeView('partidas');
	},
	'click #registrolink': function () {
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

Template.StatsPersonales.helpers({
    name: function(){
		return "none";
	},
    game_name: function(){
		return "none";
	},
	points: function(){
		return "none";
	},
    played_games: function(){
		return "none";
	},
	winned_games: function(){
		return "none";
	},
    drawed_games: function(){
		return "none";
	},
	lossed_games: function(){
		return "none";
	},
    points_per_game: function(){
		return "none";
	}
});
/*
Template.StatsGenerales.helpers({
    name: function(){
		return "none";
	},
	Totalpoints: function(){
		return "none";
	}
});
*/
/*
Template.StatsCarcassone.helpers({
    Totalplayed_games: function(){
		return "none";
	},
	Totalwinned_games: function(){
		return "none";
	},
    Totaldrawed_games: function(){
		return "none";
	},
	Totallossed_games: function(){
		return "none";
	},
    Totalpoints_per_game: function(){
		return "none";
	},
	Totalpoints: function(){
		return "none";
	}
});
*/
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
});
*/
   
/*  Configuration of signup */
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});
