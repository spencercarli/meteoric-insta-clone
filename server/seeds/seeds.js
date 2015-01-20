Meteor.startup(function() {

  // STATIC CONTENT

  var avatars = [
    "https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg",
    "https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/128.jpg",
    "https://s3.amazonaws.com/uifaces/faces/twitter/mijustin/128.jpg",
    "https://s3.amazonaws.com/uifaces/faces/twitter/tomaslau/128.jpg",
    "https://s3.amazonaws.com/uifaces/faces/twitter/ok/128.jpg",
    "https://s3.amazonaws.com/uifaces/faces/twitter/ManikRathee/128.jpg",
    "https://s3.amazonaws.com/uifaces/faces/twitter/madedigital/128.jpg",
    "https://s3.amazonaws.com/uifaces/faces/twitter/jaredbooye/128.jpg"
  ];

  var stock = [
    "/images/stock/1.jpeg",
    "/images/stock/2.jpg",
    "/images/stock/3.jpg",
    "/images/stock/4.jpg",
    "/images/stock/5.jpg",
  ];

  // FACTORY DEFINITIONS

  Factory.define('user', Users.direct, {
    emails: function() {
      return [{'address': Fake.user({fields: ['email']}).email}];
    },
    following: function() { return []; },
    followers: function() { return []; },
    profile: {
      isNew: function() { return true },
      createdAt: function() { return new Date() },
      name: function() {
        return Fake.user({fields: ['fullname']}).fullname;
      },
      username: function() {
        return Fake.user({fields: ['username']}).username;
      },
      avatarUrl: function() { return Random.choice(avatars); },
      website: function() { return 'http://' + Fake.word() + '.com' } ,
      description: function() { return Fake.sentence(30); }
    }
  });

  Factory.define('photo', Photos, {
    url: function() { return Random.choice(stock); },
    description: function() { return Fake.sentence(30); },
    likes: function() { return []; }
  });

  // SEED DATA INSERTION

  if (Users.find({}).count() === 0) {
    console.log('Inserting Users');
    _(10).times(function(n) {
      Factory.create('user');
    });

  }

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
