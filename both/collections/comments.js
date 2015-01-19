Comments = new Mongo.Collection('comments');

Comments.helpers({
  owner: function() {
    return Users.findOne({_id: this.ownerId});
  },
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
        userId: this.userId
      });
    }
  });
}
