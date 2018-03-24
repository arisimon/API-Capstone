'use strict';


const HOSPITAL_URL = 'https://data.medicare.gov/resource/rbry-mqwu.json';

/*function getHospitalList() {
    $.ajax({
        url: HOSPITAL_URL,
        type: "GET",
        dataType: "json",
        data: {
            "$limit": 15,
        }


    }).done(function(data) {
        alert("Retrieved " + data.length + " records from the dataset!");
        console.log(data);
        $.each(data, function(index, value) {
            $('.hospital-list').append(
                `<div class="row listing-container">
					  <div class="listing col-8" style="background-color:#aaa;">
					    <h2>` + data[index].hospital_name + `</h2>
					    <p>` + data[index].city + `</p>
					  </div>`
            )

        });

    });

}; */

const DOCTOR_URL = 'https://api.betterdoctor.com/2016-03-01/doctors';
const API_KEY = '8ed32e7cd794252c93e1eaabd46b41d2';

function getDoctorList() {
    $.ajax({
        url: DOCTOR_URL,
        type: "GET",
        dataType: "json",
        data: {
            limit: 15,
            user_key: API_KEY,
            location: 'ca-los-angeles',
        }


    }).done(function(results) {
        console.log(results);
        $.each(data, function(i, value) {
        	$('.doctors-list').append(
        `<div id="w">`
	    `<div id="content" class="clearfix">`
	      `<div id="userphoto"><img src="`results.data[i].profile.image_url`" alt="avatar"></div>
	      	<h1>`results.data[i].profile.first_name + ` ` + results.data[i].profile.last_name + ` ` + results.data[i].profile.title + `</h1>

	      <nav id="profiletabs">
	        <ul class="clearfix">
	          <li><a href="#bio" class="sel">Bio</a></li>
	          <li><a href="#settings">Contact Information</a></li>
	        </ul>
	      </nav>
	      
	      <section id="bio">
	      	<h4><span>Specialties: </span>` + data[i].specialties.name +
	        `<p>`results.data[i].profile.bio`</p>
	      </section>
	      
	      <section id="settings" class="hidden">
	        <p>Contact Information is listed below:</p>

	        <p class="setting"><span>Practice Name: </span>` + results.data[i].practices.name `</p>
	        
	        <p class="setting"><span>Phone Number: </span>` + results.data[i].practices.phones[0].number `</p>
	        
	        <p class="setting"><span>Address: </span>` + results.data[i].practices.visit_address.street + ` ` + results.data[i].practices.visit_address.street2 + `<br>`
	        results.data[i].practices.visit_address.city + `, ` + results.data[i].practices.visit_address.state + ` ` + results.data[i].practices.visit_address.zip + `</p>

	        <p class="setting"><span>Website: </span>` + results.data[i].practices.website + `</p>
	      </section>
	    </div>
  </div>
}
        });`
        		);
        	

    });




function watchSubmit() {
    $('.js-search-form').submit(function(event) {
        event.preventDefault();
        let query = $(this).find('.js-search-input').val();
        var why = $('input[name="why"]').val();
        getHospitalList(query); 
        getDoctorList(query);


        $('.js-search-form').hide();




    });
}

watchSubmit();