import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Entries = new Mongo.Collection('entries');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('entries', function entriesPublication() {
    return Entries.find();
  });

  Meteor.publish('entryName', function () {
    return Entries.find({}, {fields: {'name': 1}});
  });

  Meteor.publish('entries.published', function entriesPublication() {
    return Entries.find({'published':true});
  });

  Meteor.publish('users', function usersPublication() {
    return Meteor.users.find();
  });

  Meteor.publish('entries.events', function entriesPublication() {
    return Entries.find();
  });

  Meteor.publish('userData', function () {
    return Meteor.users.find({}, {fields: {'emails.address': 1}});
  });
}

Meteor.methods({
  'entries.insert'(name, text, bus, area, mainContent) {
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
      bus,
      mainContent,
      owner: [this.userId],
      published: false,
      checked: true
    });
  },

  'entries.insert.event'(entryId, eventData) {
    check(entryId, String);
    check(eventData, Object);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Entries.update(entryId, {
      $addToSet: { events: eventData },
    });
  },

  'entries.update.event'(entryId, eventId, event) {
    Entries.update(
        { "_id": entryId, "events._id": eventId },
        {
            "$set": {
                'events.$': event
            }
        }
    )
  },

  'event.remove'(entryId, eventId) {
    check(entryId, String);
    Entries.update(entryId, {
      $pull: {
        events: { _id: eventId }
      }
    });
    return true;
  },

  'entries.remove'(entryId) {
    check(entryId, String);
    Entries.remove(entryId);

    return true;
  },

  'section.remove'(entryId, sectionId) {
    check(entryId, String);
    Entries.update(entryId, {
      $pull: {
        sections: { _id: sectionId }
      }
    });
    return true;
  },

  'entries.updatePublication'(entryId, published) {
    Entries.update(entryId, {
      $set: { published: published },
    });
  },

  'entries.setChecked'(entryId, setChecked) {
    check(entryId, String);
    check(setChecked, Boolean);

    Entries.update(entryId, { $set: { checked: setChecked } });
  },

  'entries.addSection'(entryId, section) {
    Entries.update(entryId, {
      $addToSet: { sections: section },
    });
  },

  'entries.updateSection'(entryId, sectionId, section) {
    Entries.update(
        { "_id": entryId, "sections._id": sectionId },
        {
            "$set": {
                'sections.$.content': section
            }
        }
    )
  },

  'userName'(owner) {
    if(owner !== undefined) {
      let email = Meteor.users.findOne({'_id': owner}).emails[0].address;
      return email;
    }
  },

  'addOwner'(entryId, email) {
    const emailUser = Meteor.users.findOne({ "emails.address" : email });

    if(emailUser === undefined) {
      return "No users found, invite?";
    }

    Entries.update(entryId, {
      $addToSet: { owner: emailUser._id},
    });

    return true;
  },

  'removeOwner'(entryId, ownerId) {
    check(entryId, String);
    Entries.update(entryId, {
      $pull: {
        owner: ownerId
      }
    });
    return true;
  },

  'entries.update'(entryId, name, text, bus, area, mainContent) {
    check(entryId, String);
    check(name, String);
    check(text, String);
    check(mainContent, Object);

    if(Object.keys(mainContent).length === 0 && mainContent.constructor === Object) {
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      Entries.update(entryId, {
        $set: {
          "name": name,
          "text": text,
          "bus": bus,
          "area": area,
          "editedAt": new Date(),
        }
      });
    }
    else {
      if (! this.userId) {
        throw new Meteor.Error('not-authorized');
      }

      Entries.update(entryId, {
        $set: {
          "name": name,
          "text": text,
          "bus": bus,
          "area": area,
          "mainContent": mainContent,
          "editedAt": new Date(),
        }
      });
    }
  }

});
