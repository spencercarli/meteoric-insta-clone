Template.onboarding.events({
  'click [data-action=submit]': function(e, tmp) {
    var profile = {};
    $('.item-input').each(function(i) {
      var $current = $(this).find('input');
      if ($current.length === 0) {
        $current = $(this).find('textarea');
      }

      var name = $current.prop('name');
      var value = $current.val();
      profile[name] = value;
    });

    profile.isNew = false;

    Users.update({_id: Meteor.userId()}, {
      $set:{ profile: profile }
    });
    Router.go('home');
  }
});
