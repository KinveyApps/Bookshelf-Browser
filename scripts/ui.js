$(function() {
  /*globals window,Kinvey*/

  // Import.
  var App = window.Bookshelf;

  // Templating.
  var encode = function(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;')
        .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  };
  var tpl = function(book) {
    var item = '<li class="row">' +
               '  <div class="span8">' +
               '    <h3>“' + encode(book.getTitle()) + '”</h3> by <em>' + encode(book.getAuthor()) + '</em>' +
               '  </div>';

    // Only show shredder if the user has permission to do so.
    if(book.getMetadata().hasWritePermissions()) {
      item += '  <div class="span4">' +
              '    <button class="btn btn-danger destroy" data-id="' + encode(book.getId()) + '">Shredder!</button>' +
              '  </div>';
    }

    return item + '</li>';
  };

  // Status updates.
  var status = function(type, msg) {
    if(!Kinvey.Sync.isOnline) {
      msg += ' [Offline mode: the data below may be outdated]';
    }
    $('#status').attr('class', 'alert alert-' + (type || 'info')).text(msg);
  };

  // Catch data synchronization.
  Kinvey.Sync.configure({
    start: function() {
      status('info', 'Synchronizing your data…');
    },
    success: function() {
      status('success', 'Synchronization complete.');
      list.trigger('submit');// Trigger collection refresh.
    },
    error: function(error) {
      status('error', error.description);
    }
  });

  /**
   * List all books.
   */
  var list = $('#list');
  list.on('submit', function(e) {
    e.preventDefault();

    // Flood protection.
    if(list.hasClass('loading')) {
      return;
    }
    list.addClass('loading');

    // Update status.
    status('info', 'Going through the shelf…');

    // Build query.
    var query = new Kinvey.Query();
    var limit = list.find('[name="limit"]').val();
    var sort = list.find('[name="sort"]').val();
    limit && query.setLimit(limit);
    sort && query.on(sort).sort();

    // Pass query to collection, and fetch all the books.
    App.bookCollection.setQuery(query);
    App.bookCollection.fetch({
      success: function(list) {
        // Parse template.
        var books = list.map(tpl).join('');
        collection.html(books || '<li>No books on the shelf :(</li>');

        // Update status.
        status('success', 'Ready.');
      },
      error: function(error) {
        // Update status.
        status('error', error.description);
      },
      complete: function() {
        list.removeClass('loading');
      }
    });
  });

  /**
   * Adds a book to the shelf.
   */
  var add = $('#add');
  add.on('submit', function(e) {
    e.preventDefault();

    // Flood protection.
    if(add.hasClass('loading')) {
      return;
    }
    add.addClass('loading');
    
    // Update status.
    status('info', 'Finding an empty shelf…');

    // Get form values.
    var title = add.find('[name="title"]');
    var titleVal = $.trim(title.val());
    var author = add.find('[name="author"]');
    var authorVal = $.trim(author.val());

    // Validate form.
    if('' === titleVal || '' === authorVal) {
      status('error', 'Err… I need a title and author.');
      add.removeClass('loading');
      return;
    }

    // Save.
    new App.Book({ title: titleVal, author: authorVal }).save({
      success: function() {
        // Reset form.
        title.val('');
        author.val('');

        // Update status.
        status('success', 'Added!');
      },
      error: function(error) {
        // Update status.
        status('error', error.description);
      },
      complete: function() {
        add.removeClass('loading');
        list.trigger('submit');// Trigger collection refresh.
      }
    });
  });

  // Removes a book from the shelf.
  var collection = $('#collection');
  collection.on('click', '.destroy', function(e) {
    e.preventDefault();

    // Flood protection.
    var button = $(this);
    if(button.hasClass('loading')) {
      return;
    }
    button.addClass('loading');
    
    // Update status.
    status('info', 'Looking for the shredder…');

    // Remove.
    var book = new App.Book();
    book.setId(button.attr('data-id'));
    book.destroy({
      success: function() {
        // Update status.
        status('success', 'Don’t worry, it’s gone!');
      },
      error: function(error) {
        // Update status.
        status('error', error.description);
      },
      complete: function() {
        list.trigger('submit');// Trigger collection refresh.
      }
    });
  });

  // Onload, list all books.
  list.trigger('submit');

});