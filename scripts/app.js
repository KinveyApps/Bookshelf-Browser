(function(window, Kinvey) {
  /*globals window, Kinvey*/

  // Export.
  var App = window.Bookshelf = {};

  // Configure conflict policy prior to init, since that will trigger
  // synchronization. Prioritize client over server.
  Kinvey.Sync.configure({ conflict: Kinvey.Sync.clientAlwaysWins });

  // Configure.
  Kinvey.init({
    appKey: '<your-app-key>',
    appSecret: '<your-app-secret>',
    sync: true
  });

  /**
   * Define application-domain entities and collections.
   */
  // Define the Book entity.
  var Book = Kinvey.Entity.extend({
    // Override constructor to preset the collection and store.
    constructor: function(attributes) {
      Kinvey.Entity.prototype.constructor.call(this, attributes, 'books', {
        store: Kinvey.Store.OFFLINE
      });
    },

    // Shortcut to return attributes.
    getAuthor: function() {
      return this.get('author');
    },
    getTitle: function() {
      return this.get('title');
    }
  });

  // Define the Book collection.
  var BookCollection = Kinvey.Collection.extend({
    entity: Book,
    constructor: function(query) {
      // Override constructor to preset the collection and store.
      Kinvey.Collection.prototype.constructor.call(this, 'books', {
        query: query,
        store: Kinvey.Store.OFFLINE
      });
    }
  });

  // Application instances.
  App.Book = Book;
  App.bookCollection = new BookCollection();

}(window, window.Kinvey));