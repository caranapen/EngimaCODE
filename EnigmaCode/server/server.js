    
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
Meteor.publish("all_stats", function () {
    //Devuelo una funcion que me devuelve los campos de cada tipo de Stat
    return Stats.find();
});

/*
//Inicializamos el StartUp
*/
Gameplays.allow({  
	update: function(userId, doc) {  
	  return !! userId; 
	},
	remove: function(userId, doc) {  
	  return !! userId; 
	}
});

Messages.allow({
	insert: function(userId, doc) {  
	  return !! userId; 
	},
})

Meteor.methods({

    addGameplay: function (gameplay_name) {
		if (Meteor.userId()){
			return Gameplays.insert({
					creator_name: Meteor.user().username,
					creator_id: Meteor.userId(),
					gameplay_name: gameplay_name,
					gameplay_list: [],
					num_players: 1,
					time: Date.now(),
				});		
		}
    },
	
	
});


Meteor.startup(function () {
    if (Stats.find().count() == 0) {
        Stats.insert({name: "StatsPersonales"});
        Stats.insert({name: "MejoresGeneral"});
        Stats.insert({name: "MejoresCarcassone"});
        Stats.insert({name: "Otros"});
    };
});

