'use strict';

const HOSPITAL_URL = 'https://data.medicare.gov/resource/rbry-mqwu.json';

function getHospitalList() {
	$.ajax({
    url: HOSPITAL_URL,
    type: "GET",
    data: {
      "$limit" : 25,
      city: `${city}`,
    }
}).done(function(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
});
}

getHospitalList();


/*const DOCTOR_URL = 'https://npiregistry.cms.hhs.gov/api/';

function getDoctorList(data, callback) {
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



/*const GOOGLE_MAPS_URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCswdNc_cY9ISFJHfNgVBzQVBqU42XvXHM&callback=initMap';
const GOOGLE_MAPS_KEY = 'AIzaSyCswdNc_cY9ISFJHfNgVBzQVBqU42XvXHM'; 


function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    let query = $(this).find('.js-search-input').val();
    getDoctorList(query);
    getHospitalList(query);


  });
}

watchSubmit(); */