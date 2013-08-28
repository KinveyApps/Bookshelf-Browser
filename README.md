# Bookshelf-HTML5

The Bookshelf application shows how to store data on Kinvey using the JavaScript library. This single-page application allows you to save and remove books from your bookshelf. In addition, the application implements offline saving and thus remains functional when offline.

## Run It
After downloading or cloning the repository:

* Replace `App Key` and `App Secret` (`scripts/app.js`) with your application credentials.
* Start your web server. 
* Point your browser to `http://localhost:8000/index.html`. Adjust the hostname and port number if necessary.

## Functionality
This application demonstrates:

* Data Storage
* Caching
* Offline Saving

## Architecture
All HTML code to display the bookshelf is contained in `index.html`.

`scripts/app.js` contains the application-specific code which connects the app to Kinvey. [Bootstrap](http://getbootstrap.com/) is used for styling.

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