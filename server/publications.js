Meteor.publish('users', function() {
  return Users.find()
});

Meteor.publish('photos', function() {
  return Photos.find()
});

Meteor.publish('myPhotos', function(userId) {
  return Photos.find({ownerId: userId});
});

Meteor.publish('photo', function(_id) {
  return Photos.find({_id: _id});
});

Meteor.publish('comments', function(photoId) {
  return Comments.find({photoId: photoId});
});
