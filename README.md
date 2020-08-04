
                /)             
                ((             
         /\_/\   ))  - Meow!   
        ( ^.^ )_//             
        (m) (m)\_)             

Yes. A project. How cool? Now pet the cat. Its name is Fluffymuffins.

#Forkinator
This is an application that gets information about your favourite food recipes. 
You can read those recipes, add them to your shopping list, or even mark them as favourite.

This application's purpose is to showcase my use of JavaScript together with HTML and CSS. The 3rd party API that the application is calling to fetch the recipes is extremely limited. It is able to return results for
limited popular searches. Some that I have found are 'coconut', 'pizza', 'bacon', 'cake', 'banana'.
In the future, the application might be updated to use a complete API with millions of recipes but as it was 
done for learning purposes its uses are extremely limited.

#####################################################################

Technical jibber-jabber:
The app is written in JavaScript, HTML and CSS. It fetches data from an actual API without any authorization.
There are additional tools used for the app - Webpack and Babel. 
Other third party tools: Fractional, uniqid

#####################################################################

Future work:

- Add better error handling
- Work with a fully-fledged recipes API to offer more recipes
- Find a better library for parsing fractions (see 'Known issues' below) in case API from 
  above returns odd values that cannot be processed by 'fractional' library

#####################################################################

Known issues:

There has been at least one recipe found to return very unfriendly data: "Deep Dish Fruit Pizza"
It returns a number from the likes of: 1.3333333333333333 and I haven't addressed this issue as 
it will bloat the code with some extreme edge cases which could easily have been avoided had the
API that the code is calling not allowed such values. This code already shows how some edge 
cases are handled and I found it unnecessary to try to solve this one as I have only found 1 recipe.
I did try to add a generic workaround but it seems the way it passes data is not handled very well
by the 3rd party module that is used for fractioning and formatting the numbers.
As the API is very basic and has a small amount of recipes, there is a plan to update the code to use
a more popular API that has millions of recipes instead of the small one used for this project's purpose.

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
