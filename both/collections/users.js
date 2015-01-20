Users = Meteor.users;

Users.helpers({

});

Users.before.insert(function(userId, doc){
  doc.profile = {
    isNew : true,
    avatarUrl: '/images/default.png'
  };
  doc.createdAt = new Date();
});
