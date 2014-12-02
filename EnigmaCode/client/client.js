
Meteor.startup(function () {
			//$('#menu_principal').hide();
			//$('#container_lateral1').hide();
			//$('#principal').hide();					
});

Template.userlist.helpers({

		users: function(){
			return Meteor.users.find({},{sort:{username:1}});
		}
});
 
Template.chatemp.helpers({
		messages: function(){
			return Messages.find({},{sort:{time: -1}});
		} 
}); 

Template.chatemp.events({
	'keydown input': function (event) {
		if (event.which == 13) {
			if (Meteor.userId()){
				var user_id = Meteor.user()._id;
				var name = Meteor.user().username;
				var message = $('input');
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


   
/*  Configuration of signup */
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});
