if (Meteor.isClient) {

   /* Session.setDefault("counter1", 0);
    Session.setDefault("counter2", 0);
    
    Template.login.helpers({
        counter: function () {
            return Session.get("counter1");
        }
    });

    Template.login.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set("counter1", Session.get("counter1") + 1);
        }
    });
    
    Template.register.helpers({
        counter: function () {
            return Session.get("counter2");
        }
    });

    Template.register.events({
        'click button': function () {
            // increment the counter when button is clicked
            Session.set("counter2", Session.get("counter2") + 1);
        }
    });*/
    Accounts.ui.config({
  	    passwordSignupFields: "USERNAME_AND_OPTIONAL_EMAIL"
	});

}


if (Meteor.isServer) {
    Meteor.startup(function () {
    // code to run on server at startup
    });
}


