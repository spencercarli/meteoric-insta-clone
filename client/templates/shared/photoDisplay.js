Template.photoDisplay.events({
  'click [data-action=like]': function(e, tmp) {
    Meteor.call('Photos.like', this._id, Meteor.userId());
  },

  'dblclick [data-action=like-photo]': function(e, tmp) {
    Meteor.call('Photos.like', this._id, Meteor.userId());
  },

  // 'click [data-action=comment]': function(e, tmp) {
  //   console.log()
  //   Router.go('comments', {_id: this._id});
  // },

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
