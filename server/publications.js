Meteor.publish('users', function() {
  return Users.find()
});

Meteor.publish('photos', function() {
  return Photos.find()
});

Meteor.publish('myPhotos', function(userId) {
  return Photos.find({ownerId: userId});
});

Meteor.publish('comments', function(photoId) {
  return Comments.find({photoId: photoId});
});
