import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Areas = new Mongo.Collection('areas');
export const Provs = new Mongo.Collection('provs');


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('areas', function areasPublication() {
    return Areas.find();
  });
  Meteor.publish('provs', function provsPublication() {
    return Provs.find();
  });
}
