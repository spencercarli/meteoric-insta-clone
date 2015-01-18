Photos = new Mongo.Collection('photos');

Photos.helpers({

});

Photos.before.insert(function(userId, doc){
  doc.createdAt = new Date()
});
