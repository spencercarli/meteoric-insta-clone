PhotoData = FileCollection('photodata', {
  resumable: false,
  baseURL: '/photodata',
  http: [
    {
      method: 'get',
      path: '/:md5',
      lookup: function(params, query) {
        return {
          'md5': params.md5
        };
      }
    }
  ]
});

if (Meteor.isServer) {
  PhotoData.allow({
    insert: function(userId, file) {
      return false;
    },
    remove: function(userId, file) {
      return false;
    },
    read: function(userId, file) {
      return true;
    }
  });
}
