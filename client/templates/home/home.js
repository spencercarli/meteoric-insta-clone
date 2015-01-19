Template.home.rendered = function() {
  // this.autorun(function() {
  //   var ready = Router.current().ready();
  //   IonLoading.show({});
  //   if (ready) {
  //     IonLoading.hide({});
  //     IonBackdrop.release(); // Should this go away automatically?
  //   }
  // });
};

Template.home.events({
  'click [data-action=like]': function(e, tmp) {
    Meteor.call('Photos.like', this._id, Meteor.userId());
  },

  'dblclick [data-action=like-photo]': function(e, tmp) {
    Meteor.call('Photos.like', this._id, Meteor.userId());
  },

  'click [data-action=comment]': function(e, tmp) {
    alert('Not Implement Yet');
  },

  'click [data-action=more]': function(e, tmp) {
    IonActionSheet.show({
      // titleText: 'ActionSheet Example',
      buttons: [
        { text: 'Report Inappropriate' },
        { text: 'Tweet' },
        { text: 'Copy Share URL'}
      ],
      // destructiveText: 'Delete',
      cancelText: 'Cancel',
      cancel: function() {
        console.log('Cancelled!');
      },
      buttonClicked: function(index) {
        if (index === 0) {
          console.log('Shared!');
        }
        if (index === 1) {
          console.log('Moved!');
        }
        return true;
      },
      destructiveButtonClicked: function() {
        console.log('Destructive Action!');
        return true;
      }
    });
  },

});
