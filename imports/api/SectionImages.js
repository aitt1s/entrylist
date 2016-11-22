import { FilesCollection } from 'meteor/ostrio:files';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

var SectionImages;
SectionImages = new FilesCollection({
  storagePath: '/Users/juha/workspace/entrylist/data',
  downloadRoute: '/img',
  collectionName: 'SectionImages',

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
      SectionImages.update(fileObj._id, {$inc: {'meta.downloads': 1}});
    }
    // Must return true to continue download
    return true;
  },
});

if (Meteor.isClient) {
  Meteor.subscribe('sectionimages');
}

if (Meteor.isServer) {
  Meteor.publish('sectionimages', function () {
    return SectionImages.find().cursor;
  });
}

Meteor.methods({
  'RemoveFile'(id) {
    SectionImages.remove(id);
    return true;
  },
  
});

export default SectionImages;
