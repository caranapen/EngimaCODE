
/* Collecciones */

Messages = new Meteor.Collection('messages');

Gameplays = new Meteor.Collection('gameplays');

Estadisticas = new Meteor.Collection('estadisticas');

//Comentarios para pheras
//No puedo poner (Meteor.userId()) en el Starup del servidor sabre porque
//Mi error en la coleccion era que usaba la palabra supongo reservada Stats
//Reusar funcione declaradas antes dentro de la misma funcion
