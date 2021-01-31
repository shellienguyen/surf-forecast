let parseStormglassData = function( fetchedData ) {
   let airTemp = fetchedData.hours[ 0 ].airTemperature.noaa;
   // Convert from celcius to fahrenheit and round to 2 decimal places
   airTemp = (( airTemp * ( 9 / 5 )) + 32 ).toFixed( 2 );
   console.log( "airTemp: " + airTemp + " °F");

   let waterTemp = fetchedData.hours[ 0 ].waterTemperature.noaa;
   // Convert from celcius to fahrenheit and round to 2 decimal places
   waterTemp = (( waterTemp * ( 9 / 5 )) + 32 ).toFixed( 2 );
   console.log( "waterTemp: " + waterTemp + " °F");

   let humidity = fetchedData.hours[ 0 ].humidity.noaa;
   console.log( "humidity: " + humidity + "%" );

   let swellDirection = fetchedData.hours[ 0 ].swellDirection.noaa;
   console.log( "swellDirection: " + swellDirection + "°" );

   let swellPeriod = fetchedData.hours[ 0 ].swellPeriod.noaa;
   console.log( "swellPeriod: " + swellPeriod + "s" );

   let waveDirection = fetchedData.hours[ 0 ].waveDirection.noaa;
   console.log( "waveDirection: " + waveDirection + "°" );

   let waveHeight = fetchedData.hours[ 0 ].waveHeight.noaa;
   // Convert waveHeight from meters to feet and round to 2 decimal places
   waveHeight = ( waveHeight * 3.281 ).toFixed( 2 );
   console.log( "waveHeight: " + waveHeight + "ft" );

   let wavePeriod = fetchedData.hours[ 0 ].wavePeriod.noaa;
   console.log( "wavePeriod: " + wavePeriod + "s" );

   let windDirection = fetchedData.hours[ 0 ].windDirection.noaa;
   console.log( "windDirection: " + windDirection + "°" );

   let windSpeed = fetchedData.hours[ 0 ].windSpeed.noaa;
   // Convert waveHeight from meters to feet and round to 2 decimal places
   windSpeed = ( windSpeed * 3.281 ).toFixed( 2 );
   console.log( "windSpeed: " + windSpeed + "fts" );
};

////////////////////////////////////

let fetchStormglassData = function() {
   console.log( "today: " + new Date() );

   // Convert time to UTC time, required to pass into the fetch parameter
   let todayInUtcTime = Math.floor(( new Date().getTime()) / 1000 );
   console.log( "todayInUtcTime: " + todayInUtcTime );

   const lat = 33.5705796;
   const lng = -117.8108887;
   const params = "windSpeed,waterTemperature,windDirection,humidity,airTemperature,waveHeight,waveDirection,wavePeriod,swellDirection,swellHeight,swellPeriod";
   apiKey = "777e70f8-6125-11eb-83d4-0242ac130002-777e7170-6125-11eb-83d4-0242ac130002"

   fetch(`https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lng}&params=${params}&start=${todayInUtcTime}&end=${todayInUtcTime}&source=noaa`, {
         headers: {
         'Authorization': apiKey
      }
   }).then(( response ) => response.json()).then(( jsonData ) => {
      // Do something with response data.
      console.log( jsonData );
      parseStormglassData( jsonData );
   });
};

////////////////////////////////////

// Upon page load
$( document ).ready( function() {
   fetchStormglassData();
});
document.addEventListener('DOMContentLoaded', function() {
   var elems = document.querySelectorAll('select');
   var instances = M.FormSelect.init(elems, options);
 });
 
 var instance = M.FormSelect.getInstance(elem);
 
 instance.getSelectedValues("")