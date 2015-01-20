// CONTROLLERS

InController = RouteController.extend({
  waitOn: function() {
    return Meteor.subscribe('users');
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
  controller: 'InController',
  waitOn: function() {
    return [
      Meteor.subscribe('photos')
    ];
  },
  data: function() {
    return {
      user: Users.find(),
      photo: Photos.find({}, {sort: { createdAt: -1 }})
    };
  },
});

Router.route('/explore', {
  name: 'explore',
  controller: 'InController',
  waitOn: function() {
    return [
      Meteor.subscribe('photos')
    ];
  },
  data: function() {
    return {
      user: Users.find(),
      photo: Photos.find({}, {sort: { createdAt: -1 }})
    };
  },
});

Router.route('/activity', {
  name: 'activity',
  controller: 'InController'
});

Router.route('/profile', {
  name: 'myProfile',
  template: 'profile',
  controller: 'InController',
  waitOn: function() {
    return [
      Meteor.subscribe('userPhotos', Meteor.userId())
    ];
  },
  data: function() {
    return {
      user: Meteor.user(),
      photo: Photos.find({}, {sort: { createdAt: -1 }})
    }
  }
});

Router.route('/profile/:_id', {
  name: 'profile',
  template: 'profile',
  controller: 'InController',
  waitOn: function() {
    return [
      Meteor.subscribe('userPhotos', this.params._id)
    ];
  },
  data: function() {
    return {
      user: Users.findOne({_id: this.params._id}),
      photo: Photos.find({}, {sort: { createdAt: -1 }})
    }
  }
});

Router.route('/comments/:_id', {
  name: 'comments',
  controller: 'InController',
  waitOn: function() {
    return [
      Meteor.subscribe('comments', this.params._id),
      Meteor.subscribe('photo', this.params._id)
    ];
  },
  data: function() {
    return {
      photo: Photos.findOne({_id: this.params._id}),
      comment: Comments.find({}, {sort: { createdAt: 1 }})
    };
  }
});

Router.route('/photo/:_id', {
  name: 'photo',
  controller: 'InController',
  waitOn: function() {
    return Meteor.subscribe('photo', this.params._id);
  },
  data: function() {
    return Photos.findOne({_id: this.params._id});
  }
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
