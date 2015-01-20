Template.followButton.events({
  'click [data-action=unfollow]': function(e, tmp) {
    Meteor.call('Users.unfollow', this._id);
  },

  'click [data-action=follow]': function(e, tmp) {
        Meteor.call('Users.follow', this._id);
  }

});
