################################
#               /)             #
#               ((             #
#        /\_/\   ))  - Meow!   #
#       ( ^.^ )_//             #
#       (m) (m)\_)             #
################################

This is an application that gets information about your favourite food recipes. 
You can read those recipes, add them to your shopping list, or even mark them as favourite.

#####################################################################

Technical jibber-jabber:
The app is written in JavaScript, HTML and CSS. It fetches data from an actual API without any authorization.
There are additional tools used for the app - Webpack and Babel. 

#####################################################################

You need to have node.js installed to get this project up and running.

If you forked this project from the repository, you need to install all the necessary packages. 
To do that - open terminal in the forked repository and run the following:

npm install 

The above will install all the package dependencies in a node_modules folder.

There are 3 scripts associated with this repository:

    "dev": "webpack --mode development",
    "build": "webpack --mode production",
    "start": "webpack-dev-server --mode development --open"

You can run the following to build the solution for development purpose:

npm run dev 

Or run the following for production purpose:

npm run build

Finally, in order to start the webpack server, you have to do:

npm run start

This should automatically open the index file to your browser.