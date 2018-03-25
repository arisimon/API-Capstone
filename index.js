'use strict';

function bindEventListeners() {
    watchSubmit();
}

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
        let data = results.data;
        $.each(data, function(index, value) {
            $('.hospital-list').append(
                `<div id="w">
	    <div id="content" class="clearfix">
	      <div id="userphoto"><img src="` + data[index].profile.image_url + `" alt="avatar"></div>
	      	<h1>` + data[index].profile.first_name + ` ` + data[index].profile.last_name + ` ` + data[index].profile.title + `</h1>

	      <nav id="profiletabs">
	        <ul class="clearfix">
	          <li><a href="#bio" class="sel">Bio</a></li>
	          <li><a href="#settings">Contact Information</a></li>
	        </ul>
	      </nav>
	      
	      <section id="bio">
	      	<h4><span>Specialties: </span>` + data[index].specialties.name +
                `<p>` + data[index].profile.bio + `</p>
	      </section>
	      
	      <section id="settings" class="hidden">
	        <p>Contact Information is listed below:</p>

	        <p class="setting"><span>Practice Name: </span>` + data[index].practices[0].name + `</p>
	        
	        <p class="setting"><span>Phone Number: </span>` + data[index].practices[0].phones[0].number + `</p>
	        
	        <p class="setting"><span>Address: </span>` + data[index].practices[0].visit_address.street + ` ` + data[index].practices[0].visit_address.street2 + `<br>` +
                data[index].practices[0].visit_address.city + `, ` + data[index].practices[0].visit_address.state + ` ` + data[index].practices[0].visit_address.zip + `</p>

	        <p class="setting"><span>Website: </span>` + data[index].practices.website + `</p>
	      </section>
	    </div>
  </div>
}
        });`
            );

        });
    });
}

/* Controls functionality of Doctor's list response */
function bioTabs() {
    $(function() {
        $('#profiletabs ul li a').on('click', function(e) {
            e.preventDefault();
            var newcontent = $(this).attr('href');

            $('#profiletabs ul li a').removeClass('sel');
            $(this).addClass('sel');

            $('#content section').each(function() {
                if (!$(this).hasClass('hidden')) { $(this).addClass('hidden'); }
            });

            $(newcontent).removeClass('hidden');
        });
    });
}


function watchSubmit() {
    $('.js-search-form').submit(function(event) {
        event.preventDefault();
        let query = $(this).find('.js-search-input').val();
        getDoctorList(query);


        $('.js-search-form').hide();


    });
};

bindEventListeners();