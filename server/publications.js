Meteor.publish('users', function() {
  return Users.find()
});

Meteor.publish('photos', function() {
  return Photos.find()
});
