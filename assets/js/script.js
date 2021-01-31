$(document).ready(function () {
   $('select').formSelect();

   // array to hold location info for the beach options
   let beachLocation = [ 
      {name: "Zuma Beach", lat: 34.021802, lng: -118.831190},
      {name: "Santa Monica", lat: 34.024212, lng: -118.496475},
      {name: "Manhattan Beach", lat: 33.881248, lng: -118.407211},
      {name: "Redondo Beach", lat: 33.849182, lng: -118.388405},
      {name: "Hermosa Beach", lat: 33.862141, lng: -118.400009},
      {name: "Huntington Beach", lat: 33.660057, lng: -117.998970},
      {name: "Newport Beach", lat: 33.628342, lng: -117.927933},
   ]

   ///////////////////////////

   let parseStormglassData = function (fetchedData) {
      let airTemp = fetchedData.hours[0].airTemperature.noaa;
      // Convert from celcius to fahrenheit and round to 2 decimal places
      airTemp = ((airTemp * (9 / 5)) + 32).toFixed(2);
      console.log("airTemp: " + airTemp + " °F");

      let cloudCover = fetchedData.hours[0].cloudCover.noaa;
      console.log("cloudCover: " + cloudCover + "%");

      let humidity = fetchedData.hours[0].humidity.noaa;
      console.log("humidity: " + humidity + "%");

      let swellDirection = fetchedData.hours[0].swellDirection.noaa;
      console.log("swellDirection: " + swellDirection + "°");

      let swellPeriod = fetchedData.hours[0].swellPeriod.noaa;
      console.log("swellPeriod: " + swellPeriod + "s");

      let waveDirection = fetchedData.hours[0].waveDirection.noaa;
      console.log("waveDirection: " + waveDirection + "°");

      let waveHeight = fetchedData.hours[0].waveHeight.noaa;
      // Convert waveHeight from meters to feet and round to 2 decimal places
      waveHeight = (waveHeight * 3.281).toFixed(2);
      console.log("waveHeight: " + waveHeight + "ft");

      let wavePeriod = fetchedData.hours[0].wavePeriod.noaa;
      console.log("wavePeriod: " + wavePeriod + "s");

      // let windDirection = fetchedData.hours[0].windDirection.noaa;
      // console.log("windDirection: " + windDirection + "°");

      let windSpeed = fetchedData.hours[0].windSpeed.noaa;
      // Convert waveHeight from meters to feet and round to 2 decimal places
      windSpeed = (windSpeed * 3.281).toFixed(2);
      console.log("windSpeed: " + windSpeed + "fts");

   };
// Fetch Gifs from Giphy Analyze weather data and display surf conditions with Gif and Descriptive Heading

let fetchGifs = function( fetchedData ) {

   // pull data used to determine surf conditions

   let windData = fetchedData.hours [ 0 ].windSpeed.noaa;

   console.log("my wind data is " + windData);

   let swellData = fetchedData.hours [ 0 ].swellHeight.noaa;

   console.log("my swell data is " + swellData);

   let waveData = fetchedData. hours [ 0 ].waveHeight.noaa;

   console.log("my wave data is" + waveData);

   let waveRatio = swellData / waveData ;

   console.log(waveRatio);

   // analyze numbers to against my own descriptions to display surf coditions

   if (windData >= 8.2) {

      surfConditions = "windy surf";

   } else if (windData > 6.69 && windData < 8.2 && waveRatio < .5) {

      surfConditions = "bad surf";

   } else if (waveData < .6) {

      surfConditions = "small surf"

   } else if (waveData > .6 && windData < 6.69 && waveRatio > .5) {
      
      surfConditions = "good surf";

   }



   console.log(surfConditions);

   let off = Math.floor(Math.random() * 10 + 1);
   console.log(off);

   // pull gifs with key word coming from the surf conditions algorhythm and post to gif container on page

   fetch(
      `https://api.giphy.com/v1/gifs/search?q=' +
        ${surfConditions} +
        '&api_key=D4UdLTPgdxcfFYoHduwg3ZwTU5udC9K6&limit=1&offset=${off}`
   )

      .then(function(response) {
         return response.json();
      })
      .then(function(response) {
         console.log(response.data[0]);
         let responseContainerEl = document.querySelector('#giphy');

         responseContainerEl.innerHTML = "";

         let gifImg = document.createElement('img');
         gifImg.setAttribute('src', response.data[0].images.fixed_height.url);

         responseContainerEl.appendChild(gifImg);

      });

      // display surf conditions description and append to page

      let conditionsHeadingEl = document.querySelector("#surf-description");

      let conditionsDescription = conditionsHeadingEl.innerHTML = surfConditions;

      conditionsHeadingEl.appendChild(conditionsDescription);
   

};



////////////////////////////////////



let fetchStormglassData = function() {
   console.log( "today: " + new Date() );
   let todayInUtcTime = Math.floor(( new Date().getTime()) / 1000 );
   console.log( "todayInUtcTime: " + todayInUtcTime );

   const lat = 33.5705796;
   const lng = -117.8108887;
   const params = "windSpeed,windDirection,cloudCover,humidity,airTemperature,waveHeight,waveDirection,wavePeriod,swellDirection,swellHeight,swellPeriod";
   apiKey = "e1969a56-6125-11eb-9cfc-0242ac130002-e1969ad8-6125-11eb-9cfc-0242ac130002"

   fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${todayInUtcTime}&end=${todayInUtcTime}&source=noaa`, {
         headers: {
         'Authorization': apiKey
      }
   }).then(( response ) => response.json()).then(( jsonData ) => {
      // Do something with response data.
      console.log( jsonData );
      parseStormglassData( jsonData );

// push data from stormglass api call to gif function.  and call function.  

      fetchGifs(jsonData);

   });


};

   

   ////////////////////////////////////

   // let fetchStormglassData = function (lat, lng) {
   //    console.log("today: " + new Date());
   //    let todayInUtcTime = Math.floor((new Date().getTime()) / 1000);
   //    console.log("todayInUtcTime: " + todayInUtcTime);

   //    // const lat = 33.5705796;
   //    // const lng = -117.8108887;
   //    const params = "windSpeed,windDirection,cloudCover,humidity,airTemperature,waveHeight,waveDirection,wavePeriod,swellDirection,swellHeight,swellPeriod";
   //    apiKey = "567e2358-6125-11eb-83d4-0242ac130002-567e23c6-6125-11eb-83d4-0242ac130002"

   //    fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${todayInUtcTime}&end=${todayInUtcTime}&source=noaa`, {
   //       headers: {
   //          'Authorization': apiKey
   //       }
   //    }).then((response) => response.json()).then((jsonData) => {
   //       // Do something with response data.
   //       console.log(jsonData);
   //       parseStormglassData(jsonData);
   //    });
   // };

   ////////////////////////////////////
   // This section returns errors when page is loaded.  I believe it is corresponding to the changes made with our script tags in index.html.  Can this section be deleted?

   // Upon page load
   // $( document ).ready( function() {
   //    fetchStormglassData();
   // });
   // document.addEventListener('DOMContentLoaded', function() {
   //   var elems = document.querySelectorAll('select');
   //   var instances = M.FormSelect.init(elems, options);
   // });

   // var instance = M.FormSelect.getInstance(elem);

   // instance.getSelectedValues("")

   ///////////////////////////////////////
   // event listener for beach selection 

   let beachSelect = document.querySelector('#select');
   console.log(beachSelect);
   beachSelect.addEventListener("change", function(event) {
      // change the lat and lng variables to correspond with the selected beach
      console.log(beachLocation[event.target.value]); 
      let lat = beachLocation[event.target.value].lat; 
      let lng = beachLocation[event.target.value].lng; 

      fetchStormglassData(lat, lng);
      // fetchStormglass with the new lat and lng parameters 

   });


})