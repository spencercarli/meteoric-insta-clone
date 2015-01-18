Photos = new Mongo.Collection('photos');

Photos.helpers({
  owner: function() {
    return Users.findOne({_id: this.ownerId});
  },

  timeAgo: function() {
    return moment(this.createdAt).fromNow(true);
  }
});

Photos.before.insert(function(userId, doc){
  doc.createdAt = new Date()
});
