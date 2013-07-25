# Bookshelf-HTML5

The Bookshelf application shows how to store data on Kinvey using the JavaScript library. This single-page application allows you to save and remove books from your bookshelf. In addition, the application implements offline saving and thus remains functional when offline.

## Run It
After downloading or cloning the repository:

* Replace `<your-app-key>` and `<your-app-secret>` (lines 11-12 in `scripts/app.js`) with your application credentials.
* Start your web server. 
* Point your browser to `http://localhost:80/index.html`. Adjust the hostname and port number if necessary.

## Functionality
This application demonstrates:

* Data Storage
* Caching
* Offline Saving

## Architecture
All HTML code to display the bookshelf is contained in `index.html`.

The actual functionality of the application is provided by multiple JavaScript files. The files in the `vendor` directory are third party scripts. Kinvey’s JavaScript library is loaded directly from Kinvey’s Content Delivery Network.

The `scripts` directory contains application-specific files. These are:

* `app.js` initializes Kinvey’s JavaScript library for use in your app. In addition, the application domain (classes `Book` and `BookCollection`) is specified.
* `ui.js` connects the application domain with the user interface. This is done by fetching, saving, or removing books when certain events (for example: a button click) occur.

## License

    Copyright 2013 Kinvey, Inc.

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.