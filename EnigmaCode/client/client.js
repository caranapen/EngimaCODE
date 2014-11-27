
Meteor.startup(function () {
			//$('#menu_principal').hide();
			//$('#container_lateral1').hide();
			//$('#principal').hide();					
});

Template.userlist.users = function(){
	return Meteor.users.find({},{sort:{username:1}});
}
 
    
/*  Configuration of signup */
Accounts.ui.config({
	passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
});
