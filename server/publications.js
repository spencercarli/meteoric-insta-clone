Meteor.publish('users', function() {
  return Users.find()
});

Meteor.publish('photos', function() {
  return Photos.find()
});

Meteor.publish('myPhotos', function(userId) {
  return Photos.find({ownerId: userId});
});
