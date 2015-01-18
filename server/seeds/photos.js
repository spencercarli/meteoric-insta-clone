Meteor.startup(function() {
  Factory.define('photo', Photos, {
    url: function() { return '/images/test.jpg'; },
    description: function() { return Fake.sentence(30); },
    likes: function() { return 0; }
  });

  if (Photos.find({}).count() === 0) {
    console.log('Inserting Photos');

    Users.find().forEach(function(user) {
      _(3).times(function(n) {
        Factory.create('photo', {
          ownerId: user._id
        });
      });
    });
  }

});
