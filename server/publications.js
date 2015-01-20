Meteor.publish('users', function() {
  return Users.find();
});

Meteor.publish('photos', function() {
  return Photos.find({}, {
    sort: { createdAt: -1 },
    limit: 15
  });
});

Meteor.publish('userPhotos', function(userId) {
  return Photos.find({ownerId: userId});
});

Meteor.publish('followingPhotos', function(following) {
  following = following || [];
  return Photos.find({ownerId: { $in: following }});
});

Meteor.publish('photo', function(_id) {
  return Photos.find({_id: _id});
});

Meteor.publish('comments', function(photoId) {
  return Comments.find({photoId: photoId});
});
