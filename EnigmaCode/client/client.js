
Meteor.startup(function () {
			//$('#menu_principal').hide();
			//$('#container_lateral1').hide();
			//$('#principal').hide();					
});

Meteor.subscribe("userNames");

Meteor.subscribe("gameplays");

Meteor.subscribe("messages");



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

<<<<<<< HEAD
Template.tabs.events ({
=======
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
						time: Date.now(),
						});
			//	var gameplay_id = Gameplays.findOne({gameplay_name: gameplay_name.val()})._id;
			
				}
			}
		}
	},
	'click input.joingame': function(event){
		console.log($(this)[0]);
		// alert(Gameplays.findOne({gameplay_name: event.target.id})._id);

	}
});

Template.tabs.events({
>>>>>>> rama1
	'click #partidaslink': function () {
		$('#partidas').show();
		$('#usuarios').hide();
	},
	'click #MejoresGeneral': function () {
		$('#usuarios').show();
		$('#partidas').hide();
	},
	'click #registrolink': function () {
		$('#usuarios').show();
		$('#partidas').hide();
	}
});

   
/*  Configuration of signup */
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});

