$(document).ready(function () {
   $('select').formSelect();

   // array to hold location info for the beach options
   let beachLocation = [ 
      {name: "Select Beach"},
      {name: "Zuma Beach", lat: 34.021802, lng: -118.831190},
      {name: "Santa Monica", lat: 34.024212, lng: -118.496475},
      {name: "Manhattan Beach", lat: 33.881248, lng: -118.407211},
      {name: "Redondo Beach", lat: 33.849182, lng: -118.388405},
      {name: "Hermosa Beach", lat: 33.862141, lng: -118.400009},
      {name: "Huntington Beach", lat: 33.660057, lng: -117.998970},
      {name: "Newport Beach", lat: 33.628342, lng: -117.927933},
   ];


   ////////////////////////////////////

   let getDirection = function( degree ) {
      if ( degree >= 0 && degree <= 11.25 ) {
         return "N";
      }
      else if ( degree > 11.25 && degree <= 33.75 ) {
         return "NNE";
      }
      else if ( degree > 33.75 && degree <= 56.25 ) {
         return "NE";
      }
      else if ( degree > 56.25 && degree <= 78.75 ) {
         return "ENE";
      }
      else if ( degree > 78.75 && degree <= 101.25 ) {
         return "E";
      }
      else if ( degree > 101.25 && degree <= 123.75 ) {
         return "ESE";
      }
      else if ( degree > 123.75 && degree <= 146.25 ) {
         return "SE";
      }
      else if ( degree > 146.25 && degree <= 168.75 ) {
         return "SSE";
      }
      else if ( degree > 168.75 && degree <= 191.25 ) {
         return "S";
      }
      else if ( degree > 191.25 && degree <= 213.75 ) {
         return "SSW";
      }
      else if ( degree > 213.75 && degree <= 236.25 ) {
         return "SW";
      }
      else if ( degree > 236.25 && degree <= 258.75 ) {
         return "WSW";
      }
      else if ( degree > 258.75 && degree <= 281.25 ) {
         return "W";
      }
      else if ( degree > 281.25 && degree <= 303.75 ) {
         return "WNW";
      }
      else if ( degree > 303.75 && degree <= 326.25 ) {
         return "NW";
      }
      else if ( degree > 326.25 && degree <= 348.75 ) {
         return "NNW";
      }
      else if ( degree > 348.75 && degree <= 360 ) {
         return "N";
      }
   };

   ////////////////////////////////////

   let parseAndDisplayStormglassData = function (fetchedData) {
      let airTemp = fetchedData.hours[0].airTemperature.noaa;
      // Convert from celcius to fahrenheit and round to 2 decimal places
      airTemp = ((airTemp * (9 / 5)) + 32).toFixed(2);
      $( "#airTemp" ).html( "<p class='black-text'>Air Temp</p>" + airTemp + " °F" );

      let waterTemp = fetchedData.hours[0].waterTemperature.noaa;
      // Convert from celcius to fahrenheit and round to 2 decimal places
      waterTemp = ((waterTemp * (9 / 5)) + 32).toFixed(2);
      $( "#waterTemp" ).html( "<p class='black-text'>Water Temp</p>" + waterTemp + " °F" );

      let humidity = fetchedData.hours[0].humidity.noaa;

      let swellDirection = fetchedData.hours[0].swellDirection.noaa;
      $( "#swellDirection" ).text( getDirection( swellDirection ) + " " + swellDirection + "°" );

      let swellPeriod = fetchedData.hours[0].swellPeriod.noaa;
      $( "#swellPeriod" ).text( swellPeriod + "s" );

      let waveDirection = fetchedData.hours[0].waveDirection.noaa;
      $( "#waveDirection" ).text( getDirection( waveDirection ) + " " + waveDirection + "°" );

      let waveHeight = fetchedData.hours[0].waveHeight.noaa;
      // Convert waveHeight from meters to feet and round to 2 decimal places
      waveHeight = (waveHeight * 3.281).toFixed(2);
      $( "#waveHeight" ).text( waveHeight + "ft" );

      let wavePeriod = fetchedData.hours[0].wavePeriod.noaa;
      $( "#wavePeriod" ).text( wavePeriod + "s" );

      let windDirection = fetchedData.hours[0].windDirection.noaa;
      $( "#windDirection" ).text( getDirection( windDirection ) + " " + windDirection + "°" );

      let windSpeed = fetchedData.hours[0].windSpeed.noaa;
      // Convert waveHeight from meters to feet and round to 2 decimal places
      windSpeed = (windSpeed * 3.281).toFixed(2);
      $( "#windSpeed" ).text( windSpeed + " fts" );

   };
   
   ////////////////////////////////////

   // Fetch Gifs from Giphy Analyze weather data and display surf conditions with Gif and Descriptive Heading

   let fetchGifs = function( fetchedData ) {
      let surfConditions = "";

      // pull data used to determine surf conditions

      let windData = fetchedData.hours[0].windSpeed.noaa;


      let swellData = fetchedData.hours[0].swellHeight.noaa;


      let waveData = fetchedData.hours[0].waveHeight.noaa;


      let waveRatio = swellData / waveData ;



//    initialize surf description variable
      let surfConditions = "";

      // analyze data to compare with my own definitions of surf conditions and display findings

      if (windData > 8.2) {


         surfConditions = "Windy Surf";
         console.log(surfConditions);
      } else if (windData > 6.69 && windData < 8.2 && waveRatio < .5) {


         surfConditions = "Bad Surf";
         console.log(surfConditions);
      } else if (waveData < .6) {


         surfConditions = "Small Surf"

      } else {

         // return "Good Surf";

         surfConditions = "Good Surf";
         console.log(surfConditions);
      }

      console.log(surfConditions);
      let off = Math.floor(Math.random() * 20 + 1);

      // pull gifs with key word coming from the surf conditions algorhythm and post to gif container on page

      fetch(
         `https://api.giphy.com/v1/gifs/search?q=' +
         ${surfConditions} +
         '&api_key=Z26qJYEkd2BAT394FJ20Br3U9wES9ngF&limit=1&offset=${off}`
      )

         .then(function(response) {
            if (response.ok) {
            return response.json();
         } else {
            throw new Error('Something went wrong');
         }
      })
         .then(function(response) {
            let responseContainerEl = document.querySelector('#giphy');

            responseContainerEl.innerHTML = "";

            let gifImg = document.createElement('img');
            gifImg.setAttribute('src', response.data[0].images.fixed_height.url);

            responseContainerEl.appendChild(gifImg);

      })
         .catch((error) => {
            console.log(error)
         });

      // display surf conditions description and append to page

      let conditionsHeadingEl = document.querySelector("#surf-description");

      conditionsHeadingEl.innerHTML = surfConditions;

      let conditionsDescription = surfConditions;

      conditionsHeadingEl.appendChild(conditionsDescription);
   };

   ////////////////////////////////////

   let fetchStormglassData = function( lat, lng ) {

      // Convert time to UTC time, required to pass into the fetch parameter
      let todayInUtcTime = Math.floor(( new Date().getTime()) / 1000 );

      ///////////////////////////////////////////////////
      // Uncomment these two lines to test fetch error //
      ///////////////////////////////////////////////////
      //lat = 3333.5705796;
      //lng = -1173.8108887;

      const params = "windSpeed,waterTemperature,windDirection,humidity,airTemperature,waveHeight,waveDirection,wavePeriod,swellDirection,swellHeight,swellPeriod";
      apiKey = "4e36911e-6673-11eb-b399-0242ac130002-4e369240-6673-11eb-b399-0242ac130002"

      fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${todayInUtcTime}&end=${todayInUtcTime}&source=noaa`, {
            headers: {
            'Authorization': apiKey
         }
      }).then(( response ) => {
         if (response.ok ) {
            response.json().then(( jsonData ) => {
               parseAndDisplayStormglassData( jsonData );
   
               // push data from stormglass api call to gif function.  and call function.  
   
               fetchGifs(jsonData);
            });
         }
         else {
            console.log( "Fetch error" );
            document.querySelector( ".modal-bg" ).style.display = "flex";
         };
      });
   };

   ///////////////////////////////////////
   // event listener for beach selection 
   let beachSelect = document.querySelector('#select');
   beachSelect.addEventListener("change", function(event) {
      // set variable for index value of selection
      let selection = document.getElementById("select").value;

      // change the lat and lng variables to correspond with the selected beach
      let lat = beachLocation[event.target.value].lat; 
      let lng = beachLocation[event.target.value].lng; 
      let beachName = beachLocation[event.target.value].name;

      // save last search option value and lat lng in local.storage
      localStorage.setItem("last-beach-name", beachName);
      localStorage.setItem("last-selection", selection);
      localStorage.setItem("last-lat", lat);
      localStorage.setItem("last-lng", lng);
      fetchStormglassData(lat, lng);

      // fetchStormglass with the new lat and lng parameters 

   });

   //////////////////////////////////
   // Pull values from local storage
   // if there is no value for last-selection then load page as is.  
   // If there is a value then load last-lat and last-lng to be passed to fetchStormglassData as lat and lng arguments
  
   if (localStorage.getItem("last-selection")){
      beachSelect.value = localStorage.getItem("last-selection");
      lat = localStorage.getItem("last-lat");
      lng = localStorage.getItem("last-lng");
      console.log(this);
      $('#default').removeAttr('selected');
      $(this).attr('selected', true);
      // beachSelect.textContent = localStorage.getItem("last-beach-name");
      console.log("we in here");
      fetchStormglassData(lat, lng);
  }


   // When the user clicks on the X to close the fetch error modal
   document.querySelector( ".modal-close" ).addEventListener( "click", function() {
      document.querySelector( ".modal-bg" ).style.display = "none";
   });
});
