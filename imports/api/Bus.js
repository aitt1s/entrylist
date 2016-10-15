import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Bus = new Mongo.Collection('bus');


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('bus', function busPublication() {
    return Bus.find();
  });
}
