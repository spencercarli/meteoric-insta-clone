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
    alert('Not Implement Yet');
  },

  'dblclick [data-action=like-photo]': function(e, tmp) {
    alert('Not Implement Yet');
  },

  'click [data-action=comment]': function(e, tmp) {
    alert('Not Implement Yet');
  },

  'click [data-action=more]': function(e, tmp) {
    alert('Not Implement Yet');
  },

});
