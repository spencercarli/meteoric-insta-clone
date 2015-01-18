Router.route('/', {
  name: 'home',
  subscriptions: function() {
    return [
      Meteor.subscribe('users'),
      Meteor.subscribe('photos')
    ];
  },
  data: function() {
    return {
      user: Users.find(),
      photo: Photos.find({}, {sort: { createdAt: -1 }})
    };
  }
});

Router.route('/explore', {
  name: 'explore'
});

Router.route('/activity', {
  name: 'activity'
});

Router.route('/profile', {
  name: 'profile'
});
