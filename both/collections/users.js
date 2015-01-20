Users = Meteor.users;

Users.helpers({
  isMe: function() {
    var isMe = false;
    if (this._id === Meteor.userId()) {
      isMe = true;
    }
    return isMe;
  },

  currentlyFollowing: function() {
    var following = false;
    var user = Meteor.user();
    if (user && _.contains(user.following, this._id)) {
      following = true;
    }
    return following;
  },

  photos: function() {
    return Photos.find({});
  }
});

Users.before.insert(function(userId, doc){
  doc.profile = {
    isNew : true,
    avatarUrl: '/images/default.png'
  };
  doc.following = [];
  doc.followers = [];
  doc.createdAt = new Date();
});

// METHODS
if (Meteor.isServer) {
  Meteor.methods({
    'Users.follow': function(userId) {
      Users.update({_id: this.userId}, {
        $addToSet: { following: userId }
      });

      Users.update({_id: userId}, {
        $addToSet: { followers: this.userId }
      });
    },

    'Users.unfollow': function(userId) {
      Users.update({_id: this.userId}, {
        $pull: { following: userId }
      });

      Users.update({_id: userId}, {
        $pull: { followers: this.userId }
      });
    }

  });
}
