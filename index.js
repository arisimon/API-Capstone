'use strict';

function bindEventListeners() {
    watchSubmit();
}

// const HOSPITAL_URL = 'https://data.medicare.gov/resource/rbry-mqwu.json';

// function getHospitalList() {
//     $.ajax({
//         url: HOSPITAL_URL,
//         type: "GET",
//         dataType: "json",
//         data: {
//             "$limit": 15,
//         }


//     }).done(function(data) {
//         alert("Retrieved " + data.length + " records from the dataset!");
//         console.log(data);
//         $.each(data, function(index, value) {
//             $('.hospital-list').append(
//                 `<div class="col-8" id="content" class="clearfix">
//         <div id="userphoto"><img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/128x128/hospital.png" alt="hospital-icon"></div>
//           <h2>` + data[index].hospital_name + `</h2>     
//         <section id="bio">
//           <h4><span>Hospital Type: </span>` + data[index].hospital_ownership + `</h4>
//                 <h4><span>Address: </span>` + data[index].address + ` ` + data[index].city + `, ` + data[index].state + ` ` + data[index].zip_code + `</h4>
          
//         </section>
        
//         <section id="detail">
//           <p><i>How does this hospital compare to the national average?</i></p>

//           <p class="detail"><span>Effectiveness of care: </span>` + data[index].effectiveness_of_care_national_comparison + `</p>
          
//           <p class="detail"><span>Patient experience: </span>` + data[index].patient_experience_national_comparison + `</p>
          
//           <p class="detail"><span>Mortality rate: </span>` + data[index].mortality_national_comparison + `</p>

//           <p class="detail"><span>Safety of care: </span>` + data[index].safety_of_care_national_comparison + `</p>
          
//           <p class="detail"><span>Timeliness of care: </span>` + data[index].timeliness_of_care_national_comparison + `</p>

//         </section>
//       </div>
//   </div>`
//             )

//         });

//     });

// };

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
            console.log('data successfully loaded', data);
            $('.hospital-list').append(
                `<div class="col-8" id="content" class="clearfix">
	      <div id="userphoto"><img src="` + data[index].profile.image_url + `" alt="avatar"></div>
	      	<h2>` + data[index].profile.first_name + ` ` + data[index].profile.last_name + `, ` + data[index].profile.title + `</h2>     
	      <section id="bio">
	      	<h4><span>Specialties: </span>` + data[index].specialties[0].name +
                `<p id="bio">` + data[index].profile.bio + `</p>
	      </section>
	      
	      <section id="details">
	        <p><i>Contact Information is listed below:</i></p>

	        <p class="detail"><span>Practice Name: </span>` + data[index].practices[0].name + `</p>
	        
	        <p class="detail"><span>Phone Number: </span>` + data[index].practices[0].phones[0].number + `</p>
	        
	        <p class="detail"><span>Address: </span>` + data[index].practices[0].visit_address.street + `, ` +
                data[index].practices[0].visit_address.city + `, ` + data[index].practices[0].visit_address.state + ` ` + data[index].practices[0].visit_address.zip + `</p>

	        <p class="detail"><span>National Provider Identifier Standard (NPI) Number: </span>` + data[index].npi + `</p>
	      </section>
	    </div>
  </div>`

            );

        });
    });
}



function watchSubmit() {
    $('.js-search-form').submit(function(event) {
        event.preventDefault();
        let query = $(this).find('.js-search-input')
        getDoctorList(query);
        $('.js-search-form').hide();


    });
};

bindEventListeners();