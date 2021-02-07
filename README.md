# Los Angeles/Orange County Surf Conditions

This app finds current surf conditions for beaches along the OC/LA coastline.  By selecting one of our 7 tracked beach locations a user will recieve a simplified layout of relevant surf and weather conditons for their selected beach.  A fun gif is also displayed with the surf conditions to add to a fun experience and stylish user interface.  

When a user wants to go surfing, they want to know the current conditions for their favorite surf spots.  They are able to pull up our webpage and quickly select their favorite beaches from our drop down menu.  The site gets data from the StormGlass API and displays it on the page for the user in a simplified and easy to read format.  The user is also presented with a fun gif from the Giphy API corresponding to the current surf conditions for that selected beach.  


## Front End Materialize / CSS (Tae):


## Drop down menu functionality & local.storage (Nate):
The drop down menu upon load is set to a default option of "Select beach".  This option is disabled, making sure the user doesn't click that option and trigger a false fetch request.  

The user clicks or touches the menu to reveal the beaches in the list they are presented with 7 options.  Currently the options are set to the most popular surfing beaches in the Los Angeles and Orange County, CA area. They include: Zuma Beach, Santa Monica, Manhattan Beach, Redondo Beach, Hermosa Beach, Huntington Beach, and Newport Beach. 

When the user selects one of the beaches a fetch request is sent to the StormGlass.io API and relevant data is taken and formatted into a readable table for the user.  This function is triggered by a "change" event.  When the change in the select menu's index value is recorded a latitude and longitude coordinate for the selected beach is entered as arguments into the fetchStormGlassData function.  The latitudes and longitudes for each beach are saved in the beachLocation array. The index values of the array correspond with the index values of the select menu options, ensuring that the correct data is entered into the fetch requests.  

The fetched data is then integrated into a algorithm that determines the description of the surf conditions.  Based on that description a fetch request is sent to the Giphy API, returning a relevant gif.

The last searched beach, its index value, and its  coordinates are all saved as data points in local storage during the on change function.  When the user reloads the page their last selection will be automatically displayed.  

An if / else statement looks for values in local storage and if there is a previously selected beach then its lat and lng data is passed into the fetchStormGlassData function.  If else, meaning there are no values saved to local.storage, then the page loads as its default state.

## StormGlass fetch and data display (Shellie):


## Surf Conditions algorithm and giphy fetch & display (Mike):

## Ideas for future development:

We would like to incorporate a search input so the user will be able to look up any beach around the world and find surf conditions.  This could be accomplished by integrating the Google Maps API or another location/navigation API that can return accurate lat and long values for a searched beach location.  

Another idea for development would be to list the various "breaks" for each beach.  While surf conditions are generally the same accross a coastline, there could be changes in tidal flow, geography, or climate that cause one part of a beach to have differeing conditions to another part of the beach.  Surfers refer to these differing points as "breaks".  An experienced surfer will look to chose not only their favorite beach, but also the preferable break to surf in.  This will allow a heightened user experience for experienced surfers, but one consideration is it could make the information less digestable for a beginner surfer or average beach goer. 


## Link to GitHub pages deployment:
https://shellienguyen.github.io/surf-forecast/

## Link to Github repository:
https://github.com/shellienguyen/surf-forecast


## Screenshots of the deployed application:
