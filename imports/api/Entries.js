import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';


export const Entries = new Mongo.Collection('entries');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('entries', function entriesPublication() {
    return Entries.find();
  });
  Meteor.publish('users', function usersPublication() {
    return Meteor.users.find();
  });
  Meteor.publish("userData", function () {
    if (this.userId) {
      return Meteor.users.find({_id: this.userId},
                               {fields: {'other': 1, 'things': 1}});
    } else {
      this.ready();
    }
  });

}

Meteor.methods({
  'entries.insert'(name, text, area, mainContent) {
    check(name, String);
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Entries.insert({
      name,
      text,
      createdAt: new Date(),
      area,
      mainContent,
      owner: this.userId,
    });
  }
});
