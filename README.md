Instructions

To Run

npm install

A. For live reload:
npm start

In a browser, go to http://<host>:<port>/webpack-dev-server/
For example:
http://localhost:8080/webpack-dev-server/

Should say "App ready" at the top of the page.


B. For bundle file generation:
npm run build


C. For bundle file generation, updating upon saving any files:
npm run watch


Edit app/js/main.js
or other modules loaded by main.js (directly or indirectly)

Edit app/index.html

Enjoy!


Useful Info:
To filter out webpack's console messages, use this regex in e.g. chrome's console
^(?!.*?\[[\w]*\])