Meteor.startup(function() {
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

  Factory.define('user', Users, {
    emails: function() {
      return [{'address': Fake.user({fields: ['email']}).email}];
    },
    profile: {
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

  if (Users.find({}).count() === 0) {
    console.log('Inserting Users');
    _(10).times(function(n) {
      Factory.create('user');
    });

  }

});
