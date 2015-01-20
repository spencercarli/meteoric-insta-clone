Comments = new Mongo.Collection('comments');

Comments.helpers({
  owner: function() {
    return Users.findOne({_id: this.ownerId});
  },

  timeAgo: function() {
    return moment(this.createdAt).fromNow(true);
  }
});

Comments.before.insert(function(userId, doc){
  doc.createdAt = new Date()
});

// METHODS
if (Meteor.isServer) {
  Meteor.methods({
    'Comments.create': function(comment, photoId) {
      Comments.insert({
        comment: comment,
        photoId: photoId,
        ownerId: this.userId
      });
    }
  });
}
