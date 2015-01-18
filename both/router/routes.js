Router.route('/', {
  name: 'home',
  subscriptions: function() {
    return [
      Meteor.subscribe('users')
    ];
  },
  data: function() {
    return {
      user: Users.find()
    };
  }
});

Router.route('/dashboard');
