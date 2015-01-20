Template._tabs.events({
  'click .js-take-photo': function(e, tmp) {
    console.log("CLICK");
    var options = {
      width: 500,
      height: 500,
      quality: 95
    }
    MeteoricCamera.getPicture(options, function(err, data) {
      var base64, fields;

      if (err) {
        console.log('error', err);
      }

      if (data) {
        Session.set('uploading', true);
        base64 = data.split(';base64,')[1];
        fields = {
          contentType: 'image/JPEG',
          filename: "" + (Meteor.userId()) + ".jpg",
          metadata: {
            ownerId: Meteor.userId()
          }
        };
        Meteor.call('Photos.upload', base64, fields, function(err, res) {
          Session.set('uploading', undefined);
          console.log('err', err);
          return console.log('res', res);
        });
      }

    });
  }
});
