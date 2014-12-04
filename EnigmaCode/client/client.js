
Meteor.startup(function () {
			//$('#menu_principal').hide();
			//$('#container_lateral1').hide();
			//$('#principal').hide();					
});

Meteor.subscribe("userNames");

Meteor.subscribe("gameplays");

Meteor.subscribe("messages");


// Pruebas con Tracker.autorun
//Tracker.autorun(function(){
//	if (Meteor.userId());
//		$('input.joingame').attr('disabled', false);
//});


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
		lim: function(){
			return "3";
		} 
}); 

Template.waitingtemp.helpers({
	
	waiting: function(){
		return Gameplays.findOne({_id:Session.get("partida_actual")}).num_players;
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
						time: Date.now(),
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
				var creator_name = Meteor.user().username;
				var gameplay_name = $('input#partidainput');
				gameplay_list.push(Meteor.user()._id)
				if (gameplay_name.value != '') {
					Gameplays.insert({
						creator_name: creator_name,
						gameplay_name: gameplay_name.val(),
						gameplay_list: gameplay_list,
						num_players: 1,
						time: Date.now(),
						});
				var gameplay_id = Gameplays.findOne({gameplay_name: gameplay_name.val()})._id;
				gameplay_name.val('');
				//Gameplays.update({_id : gameplay_id}, {$inc: {num_players: 1}});
				Session.set("partida_actual", gameplay_id);
				$('#partidas').hide();	
				//$('input#partidainput').attr('disabled', true);
				//$('input.joingame').attr('disabled', true);
				$('#waiting').show();
				//Session.set('')
				}
			}

			
		}
	},

	'click input.joingame': function(event){

		lim = ($(this)[0]).num_players + 1 ;
		console.log(lim);
		if (lim <= 3){
			Gameplays.update({_id : $(this)[0]._id}, {$addToSet: {gameplay_list: Meteor.userId()}, $inc: {num_players: 1}});	
		}
//, 
		Session.set("partida_actual", $(this)[0]._id);
		$('#partidas').hide();	
		//$('input.joingame').attr('disabled', true);
		$('#waiting').show();
		// alert(Gameplays.findOne({gameplay_name: event.target.id})._id);

	}, 
 
	'click input.exitgame': function(event){

		alert("Seguro que quieres salir");
	},
});



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

   
/*  Configuration of signup */
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});
