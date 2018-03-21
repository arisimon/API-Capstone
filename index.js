'use strict';

/*const HOSPITAL_URL = 'https://data.medicare.gov/resource/rbry-mqwu.json';


$.ajax({
    url: HOSPITAL_URL,
    type: 'GET',
    data: {
      '$limit' : 100,
    }
}).done(function(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);

}); */

/*const GOOGLE_MAPS_URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCswdNc_cY9ISFJHfNgVBzQVBqU42XvXHM&callback=initMap';
const GOOGLE_MAPS_KEY = 'AIzaSyCswdNc_cY9ISFJHfNgVBzQVBqU42XvXHM'; */

const DOCTOR_URL = 'https://npiregistry.cms.hhs.gov/api/';

function getDoctorList(number, first_name, last_name, callback) {
  const settings = {
    url: DOCTOR_URL,
    data: {
        number,
        first_name,
        last_name
    },
    dataType: 'json',
    type: 'GET',
    success: function logData (data) {
    console.log(data)
}
  };

  $.ajax(settings);
}




