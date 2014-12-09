    
    
Meteor.startup(function () {
    // code to run on server at startup
});

Meteor.publish("userNames", function() {
    return Meteor.users.find ({}, {fields: {username:1}});
});

Meteor.publish("messages", function() {
	return Messages.find();
});

Meteor.publish("gameplays", function() {
	return Gameplays.find();
});

Meteor.publish("estadisticas", function () {
    // Publica datos guardados de cada jugador
    return Stats.find();
});
