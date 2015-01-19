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
    }
  });
}
