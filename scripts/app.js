/**
 * Copyright 2013 Kinvey, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function(window, Kinvey) {
  // Export, so declarations can be accessed outside this files’ scope.
  var App = window.Bookshelf = {};

  // Configure conflict policy prior to init, since that will trigger
  // synchronization. Prioritize client over server.
  Kinvey.Sync.configure({ conflict: Kinvey.Sync.clientAlwaysWins });

  // Configure.
  Kinvey.init({
    appKey: '<your-app-key>',
    appSecret: '<your-app-secret>',
    sync: true// Enable offline saving.
  });

  /**
   * Define application-domain entities and collections.
   */
  // Define the Book entity.
  var Book = Kinvey.Entity.extend({
    // Override constructor to preset the collection and store.
    constructor: function(attributes) {
      Kinvey.Entity.prototype.constructor.call(this, attributes, 'books', {
        store: Kinvey.Store.OFFLINE// Enable offline saving.
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
        store: Kinvey.Store.OFFLINE// Enable offline saving.
      });
    }
  });

  // Export class declaration and collection instance.
  App.Book = Book;
  App.bookCollection = new BookCollection();
}(window, window.Kinvey));