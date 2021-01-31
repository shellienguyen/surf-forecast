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

      let windDirection = fetchedData.hours[0].windDirection.noaa;
      console.log("windDirection: " + windDirection + "°");

      let windSpeed = fetchedData.hours[0].windSpeed.noaa;
      // Convert waveHeight from meters to feet and round to 2 decimal places
      windSpeed = (windSpeed * 3.281).toFixed(2);
      console.log("windSpeed: " + windSpeed + "fts");
   };

   ////////////////////////////////////

   let fetchStormglassData = function (lat, lng) {
      console.log("today: " + new Date());
      let todayInUtcTime = Math.floor((new Date().getTime()) / 1000);
      console.log("todayInUtcTime: " + todayInUtcTime);

      // const lat = 33.5705796;
      // const lng = -117.8108887;
      const params = "windSpeed,windDirection,cloudCover,humidity,airTemperature,waveHeight,waveDirection,wavePeriod,swellDirection,swellHeight,swellPeriod";
      apiKey = "567e2358-6125-11eb-83d4-0242ac130002-567e23c6-6125-11eb-83d4-0242ac130002"

      fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${todayInUtcTime}&end=${todayInUtcTime}&source=noaa`, {
         headers: {
            'Authorization': apiKey
         }
      }).then((response) => response.json()).then((jsonData) => {
         // Do something with response data.
         console.log(jsonData);
         parseStormglassData(jsonData);
      });
   };

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