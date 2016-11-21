import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('messages', function messagesPublication() {
    return Messages.find();
  });

  Meteor.publish('messagesUnreaded', function messagesPublication() {
    return Messages.find({'readed': false});
  });

}

Meteor.methods({
  'messages.insert'(from, to, subject, message) {
    check(from, String);
    check(to, String);
    check(subject, String);
    check(message, String);

    Messages.insert({
      from,
      to,
      subject,
      createdAt: new Date(),
      message,
      readed: false
    });
  },

  'markAsReaded'(messageId, marked) {
    Messages.update(messageId, {
      $set: { readed: marked },
    });
  },

  'messages.remove'(messageId) {
    check(messageId, String);
    Messages.remove(messageId);
    return true;
  },
})
