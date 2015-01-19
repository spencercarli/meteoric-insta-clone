Router.route('/', {
  name: 'home',
  waitOn: function() {
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
  name: 'explore',
  waitOn: function() {
    return [
      Meteor.subscribe('users'),
      Meteor.subscribe('photos')
    ];
  },
  data: function() {
    return {
      photo: Photos.find({}, {sort: { createdAt: -1 }})
    };
  }
});

Router.route('/activity', {
  name: 'activity'
});

Router.route('/profile', {
  name: 'profile'
});
