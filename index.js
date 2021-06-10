/* --------------------
Notes
-----
Tasks
- Setup Git, Github
- Create Simple Portfolio Website

Known Bugs
- Reverse Geocoder returns undefined when over remote areas.

Ideas
- Sort through address components for type country to properly display how i want it.
- Notify user via twitter, text, or email when ISS is within X distance from home.
- Look into Server-side geo-coding to prevent hitting query limit.

---------------------- */

var url = "https://api.wheretheiss.at/v1/satellites/25544";

//Fetches information from ISS API
async function update () {
	const resp = await fetch(url);
	const data = await resp.json();

//Function that updates Latitude, Longitude, Velocity
function updateLLV(){
  document.getElementById('lat').innerHTML = data.latitude.toFixed(4);
  document.getElementById('long').innerHTML = data.longitude.toFixed(4);
  document.getElementById('velocity').innerHTML = data.velocity.toFixed(0);
};

//Function that updates Current Time
function updateTime(){
  var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  document.getElementById('date').innerHTML = date;
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  document.getElementById('time').innerHTML = time;
};

//Reverse Geocoding
function initMap() {
  const geocoder = new google.maps.Geocoder();
  const infowindow = new google.maps.InfoWindow();
  let latlng = {lat: data.latitude, lng: data.longitude};
  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === "OK") {
      if (results[0]) {
            document.getElementById('country').innerHTML = results[0].formatted_address; 
            console.log(results[0].formatted_address);
      } else {
        console.log("No results found");
      }
    } else {
      document.getElementById('country').innerHTML = "a remote area";
      console.log("Geocoder failed due to: " + status);
    }
  });
}

updateLLV();
updateTime();
initMap();

};

update();

var run =  setInterval('update()', 5000);

function pause() {
	clearInterval(run);
};

//DARK MODE 
	function darkMode() {
  	var element = document.body;
  	element.classList.toggle("dark-mode");
};