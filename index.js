'use strict';

function bindEventListeners() {
    hospitalOrDoctor();
    checkButton();

}

//Medicare Hospital API request and response
const HOSPITAL_URL = 'https://data.medicare.gov/resource/rbry-mqwu.json';

function getHospitalList(city) {
    $.ajax({
        url: HOSPITAL_URL,
        type: "GET",
        dataType: "json",
        data: {
            "$limit": 20,
            "$q": city,
            "$$app_token": "gK0Y0BlDIwKZ3ddE4ZxzecEJA",
        }


    }).done(function(data) {
        if (data.length == 0) {
            alert('No results found. Please input another location!');
        }
        console.log("Retrieved " + data.length + " records from the dataset!");
        console.log(data);
        $.each(data, function(index, value) {
            let phone = data[index].phone_number;
            let formatPhone = `(` + phone.substr(0, 3) + `) ` + phone.substr(3, 3) + `-` + phone.substr(6, 4);
            let address = data[index].address;
            let formatAddress = toTitleCase(address);
            let city = data[index].city;
            let formatCity = toTitleCase(city);
            let hospital = data[index].hospital_name;
            let formatHospital = toTitleCase(hospital);

            $('.hospital-list').append(
                `<div class="col-8" id="content" class="clearfix">
                    <div id="userphoto"><img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/128x128/hospital.png" alt="hospital-icon"></div>
                      <h2>` + formatHospital + `</h2>     
                    <section id="hospital-info">
                      <h4><span>Hospital Type: </span>` + data[index].hospital_ownership + `</h4>
                      <h4 class="address"><span>Address: </span>` + formatAddress + `, ` + formatCity + `, ` + data[index].state + ` ` + data[index].zip_code + `</h4>
                      <h4><span>Phone Number: </span>` + formatPhone + `</h4>
                      
                    </section>
                    
                    <section id="hospital-details">
                      <p><i>How Does This Hospital Compare to the National Average?</i></p>

                      <p class="detail"><span>Effectiveness of Care: </span>` + data[index].effectiveness_of_care_national_comparison + `</p>
                      
                      <p class="detail"><span>Patient Experience: </span>` + data[index].patient_experience_national_comparison + `</p>
                      
                      <p class="detail"><span>Mortality Rate: </span>` + data[index].mortality_national_comparison + `</p>

                      <p class="detail"><span>Safety of Care: </span>` + data[index].safety_of_care_national_comparison + `</p>
                      
                      <p class="detail"><span>Timeliness of Care: </span>` + data[index].timeliness_of_care_national_comparison + `</p>

                    </section>
                  </div>
              </div>`
            )
            if ($('.doctor-list').length) {
                $('.doctor-list').children().remove();
                backToTop();
            }

        });

    });
}

//function to get proper formatting for JSON responses
function toTitleCase(str) {
    return str.toLowerCase().split(' ').map(function(word) {
        return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
}

//control back to top button
function backToTop() {
    $(window).scroll(function() {
        if ($(this).scrollTop()) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });
    //actions on to top button click -- essentially reset page
    $("#toTop").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        $("input[type='text']").val('');

        if ($('.doctor-list').length) {
            $('.doctor-list').children().remove();
        }
        if ($('.hospital-list').length) {
            $('.hospital-list').children().remove();
        }
        $('.search-container').addClass('hidden');

    });
}



//Better Doctor API call and response
const DOCTOR_URL = 'https://api.betterdoctor.com/2016-03-01/doctors';
const API_KEY = '8ed32e7cd794252c93e1eaabd46b41d2';

function getDoctorList(location) {
    $.ajax({
        url: DOCTOR_URL,
        type: "GET",
        dataType: "json",
        data: {
            user_key: API_KEY,
            location: location,
        }


    }).done(function(results) {
        if (results.data == 0) {
            alert('No results found. Please input another location!')
        }
        let data = results.data;
        $.each(data, function(index, value) {
            let phone = data[index].practices[0].phones[0].number;
            let formatPhone = `(` + phone.substr(0, 3) + `) ` + phone.substr(3, 3) + `-` + phone.substr(6, 4);
            console.log('data successfully loaded', data);
            $('.doctor-list').append(
                `<div class="col-8" id="content" class="clearfix">
                              <div id="userphoto"><img src="` + data[index].profile.image_url + `" alt="avatar"></div>
                                <h2>` + data[index].profile.first_name + ` ` + data[index].profile.last_name + `, ` + data[index].profile.title + `</h2>     
                              <section id="bio">
                                <h4><span>Specialties: </span>` + data[index].specialties[0].name +
                `<p id="bio">` + data[index].profile.bio + `</p>
                              </section>

                              <section id="doctor-details">
                                <p><i>Contact Information is listed below:</i></p>

                                <p class="detail"><span>Practice Name: </span>` + data[index].practices[0].name + `</p>

                                <p class="detail"><span>Phone Number: </span>` + formatPhone + `</p>

                                <p class="detail"><span>Address: </span>` + data[index].practices[0].visit_address.street + `, ` +
                data[index].practices[0].visit_address.city + `, ` + data[index].practices[0].visit_address.state + ` ` + data[index].practices[0].visit_address.zip + `</p>

                                <p class="detail"><span>National Provider Identifier Standard (NPI) Number: </span>` + data[index].npi + `</p>
                              </section>
                            </div>
                      </div>`

            );
            if ($('.hospital-list').length) {
                $('.hospital-list').children().remove();
                backToTop();
            }

        });
    });
}

//load hospital or doctor search based off radio input.
function hospitalOrDoctor() {

    $('input:radio').change(
        function() {
            if ($(this).val() == 'Hospital') {
                function createHospitalInput() {
                    $('.hospital_search_container').removeClass('hidden');
                    $('.doctor_search_container').addClass('hidden');
                }
                createHospitalInput();


            } else {
                function createDoctorInput() {
                    $('.doctor_search_container').removeClass('hidden');
                    $('.hospital_search_container').addClass('hidden');
                }
                createDoctorInput();
            };
        }
    );
}

//go to content on click
function moveToContent() {
    $('html,body').animate({
        scrollTop: $(".data-lists").offset().top},
        '2000');
}


//handle submit button and run request based off which button is pressed
function checkButton() {
    $("#decision-form button").click(function(event) {
        event.preventDefault();
        let which = $(this).attr("id");
        console.log(which);

        if (which == 'hospital-sub') {
            let query = $('#hospital_search').val();
            console.log(query);
            getHospitalList(query);
            moveToContent();

        } else {
            let input = $("#doctor_search").val().toLowerCase();
            console.log(input);
            getDoctorList(input);
            moveToContent();

        }


    });
};



bindEventListeners();