Template.comments.events({
  'click [data-action=send]': function(e, tmp) {
    var input = $('input[type=text]');
    var val = input.val();
    if (val.length > 0) {
      Meteor.call('Comments.create', val, Router.current().data().photo._id);
    }
    input.val('');
  }
});
