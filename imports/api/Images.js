import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

var Images;
Images = new FilesCollection({
  storagePath: '/Users/juha/workspace/entrylist/data',
  downloadRoute: '/img',
  collectionName: 'Images',

  onbeforeunloadMessage: function () {
    return 'Upload is still in progress! Upload will be aborted if you leave this page!';
  },
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    } else {
      return 'Please upload image, with size equal or less than 10MB';
    }
  },
  downloadCallback: function (fileObj) {
    if (this.params.query.download == 'true') {
      // Increment downloads counter
      Images.update(fileObj._id, {$inc: {'meta.downloads': 1}});
    }
    // Must return true to continue download
    return true;
  },
});

if (Meteor.isClient) {
  Meteor.subscribe('images');
}

if (Meteor.isServer) {
  Meteor.publish('images', function () {
    return Images.find().cursor;
  });
}

export default Images;
