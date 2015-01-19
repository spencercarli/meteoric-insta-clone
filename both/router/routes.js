// CONTROLLERS

InController = RouteController.extend({
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
  },
  onBeforeAction: function() {
    if (Meteor.loggingIn()) {
      return;
    }
    Tracker.autorun(function() {
      if (!Meteor.user()) {
        return Router.go('account');
      }
      if (Meteor.user().profile.isNew) {
        return Router.go('onboarding');
      }
    });
    return this.next();
  }
});

OutController = RouteController.extend({
  onBeforeAction: function() {
    if (Meteor.loggingIn()) {
      return;
    }
    Tracker.autorun(function() {
      if (Meteor.user()) {
        return Router.go('home');
      }
    });
    return this.next();
  }
});

// ROUTES

Router.route('/', {
  name: 'home',
  controller: 'InController'
});

Router.route('/explore', {
  name: 'explore',
  controller: 'InController'
});

Router.route('/activity', {
  name: 'activity',
  controller: 'InController'
});

Router.route('/profile', {
  name: 'profile',
  controller: 'InController'
});

Router.route('/account', {
  name: 'account',
  controller: 'OutController',
  layoutTemplate: 'publicLayout'
});

Router.route('/onboarding', {
  name: 'onboarding',
  controller: 'InController',
  layoutTemplate: 'publicLayout'
});

Router.route('/sign-out', {
  onBeforeAction: function() {
    Meteor.logout();
    Router.go('account')
    this.next();
  }
})
