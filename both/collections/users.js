Users = Meteor.users;

Users.helpers({

});

Users.before.insert(function(userId, doc){
  doc.createdAt = new Date()
});
