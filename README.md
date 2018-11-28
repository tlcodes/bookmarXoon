BookmarXoon - React/Redux bookmark management app for Flickr and Vimeo links.
[Live Demo](https://still-temple-47849.herokuapp.com/)

** Clone or download the repository **
> git clone https://github.com/tlcodes/bookmarXoon.git

 ** Install dependencies **
> npm install

** Edit the .env file in the root directory and add your own API keys: **

for Flickr, create an app at https://www.flickr.com/services/api/, then copy/paste your key: REACT_APP_FLICKR_API_KEY=**YOUR_KEY**

For Vimeo, create an app at https://developer.vimeo.com, then **generate a token with public scope ONLY**. Paste your token in the .env file:
REACT_APP_VIMEO_TOKEN=**YOUR_TOKEN**

** Start the app with npm start **

Note: The numbe rof links per page is set to 2. It can be adjusted within the src/reducers/appReducer.js file:
> const initialState = {
>   ...
>   linksPerPage: 2,
>   ...
>}