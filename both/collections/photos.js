Photos = new Mongo.Collection('photos');

Photos.helpers({
  owner: function() {
    return Users.findOne({_id: this.ownerId});
  },

  timeAgo: function() {
    return moment(this.createdAt).fromNow(true);
  },

  likeCount: function() {
    var count = this.likes.length;
    var out = "No likes yet";
    if (count > 0) {
      out = count + " likes";
    }
    return out;
  }
});

Photos.before.insert(function(userId, doc){
  doc.createdAt = new Date()
});

// METHODS
if (Meteor.isServer) {
  Meteor.methods({
    'Photos.like': function(photoId, userId) {
      Photos.update({_id: photoId}, {
        $addToSet: { likes: userId }
      });
    },

    'Photos.upload': function(base64, fields) {
      if (!this.userId) {
        throw new Meteor.Error(403, 'Forbidden');
      }
      var Future = Npm.require('fibers/future');
      var future = new Future;
      var bytes = new Buffer(base64, 'base64');


      var photo = Photos.insert({
        ownerId: this.userId,
        description: 'Not Implemented Yet',
        likes: []
      });

      var writeStream = PhotoData.upsertStream(fields, function(err, file) {
        Photos.update({_id: photo}, {
          $set: {
            url: Meteor.absoluteUrl() + "photodata/" + file.md5
          }
        });

        future.return();
      });

      writeStream.on('error', function() {
        console.log(arguments);
        throw new Meteor.Error(403, 'Forbidden');
      });

      writeStream.end(bytes);

      future.wait();

    }

  });
}
