Users = Meteor.users;

Users.helpers({

});

Users.before.insert(function(userId, doc){
  doc.profile.isNew = true;
  doc.createdAt = new Date();
});
