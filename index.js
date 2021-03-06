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
        if (data.length === 0) {
            alert('No results found. Please input another location!');
        }
        console.log("Retrieved " + data.length + " records from the dataset!");
        console.log(data);
        $.each(data, function(index, value) {
            let phone = data[index].phone_number;
            let formatPhone = `(` + phone.substr(0, 3) + `) ` + phone.substr(3, 3) + `-` + phone.substr(6, 4);


            $('.hospital-list').append(
                `<div class="col-8" id="content" class="clearfix">
                    <div id="userphoto"><img src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/128x128/hospital.png" alt="hospital-icon" id="hospital-icon"></div>
                      <h2>` + data[index].hospital_name + `</h2>    
                    <section id="hospital-info">
                      <h3><span>Hospital Type: </span>` + data[index].hospital_ownership + `</h3>
                      <h3 class="address"><span>Address: </span>` + data[index].address + `, ` + data[index].city + `, ` + data[index].state + ` ` + data[index].zip_code + `</h3>
                      <h3><span>Phone Number: </span>` + formatPhone + `</h3>
                      
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
            );
            if ($('.doctor-list').length) {
                $('.doctor-list').children().remove();
                backToTop();
            }

        });

    });
}


//control back to top button
function backToTop() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > $('body').height() / 2) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }

    });

    //actions on to top button click -- essentially reset page
    $("#toTop").click(function() {
        $("html, body").animate({ scrollTop: 0 }, 1000);
        location.reload();
        bindEventListeners();

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
            limit: 20,
        }


    }).done(function(results) {
        let data = results.data;
         if (results.data === 0) {
            alert(`No results found. Check your formatting!`);
        }
        $.each(data, function(index, value) {
            let phone = data[index].practices[0].phones[0].number;
            let formatPhone = `(` + phone.substr(0, 3) + `) ` + phone.substr(3, 3) + `-` + phone.substr(6, 4);
            console.log('data successfully loaded', data);
            $('.doctor-list').append(
                `<div class="col-8" id="content" class="clearfix">
                              <div id="userphoto"><img src="` + data[index].profile.image_url + `" alt="user photo"></div>
                                <h2>` + data[index].profile.first_name + ` ` + data[index].profile.last_name + `, ` + data[index].profile.title + `</h2>   
                              <section id="bio">
                                <h3><span>Specialties: </span>` + data[index].specialties[0].name + `</h3>
                <p id="bio">` + data[index].profile.bio + `</p>
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

//actions if hospital button selected
function createHospitalInput(input) {
    $('.hospital-search-container').removeClass('hidden');
    $('.doctor-search-container').addClass('hidden');
}
//actions if doctor button selected
function createDoctorInput(input) {
    if (('.hospital-search-container').length) {
        $('.hospital-search-container').addClass('hidden');
    }
    $('.doctor-search-container').removeClass('hidden');

}

//load hospital or doctor search based off radio input.
function hospitalOrDoctor() {

    $('input:radio').change(
        function() {
            if ($(this).val() === 'Hospital') {
                createHospitalInput();


            } else {
                createDoctorInput();
            }
        }
    );
}

//go to content on click
function moveToContent() {
    $('html,body').animate({
            scrollTop: $(".data-lists").offset().top
        },
        '1000');
}

//takes input in doctor input and converts it from fromat Los Angeles, CA -> ca-los-angeles to use in AJAX request
function formatDoctorInput(value) {
    let res = value.replace(/[, ]+/g, " ").trim();
    let split = res.split(' ');
    let state = split.pop();
    split.unshift(state);
    let final = split.join('-').toLowerCase();
    return final;
}


//handle submit button and run request based off which button is pressed
function checkButton() {

    $('form').submit(function(event) {
        event.preventDefault();
        let which = $(this).find('button').attr("id");
        console.log(which);


        if (which === 'hospital-sub') {
            let query = $('#hospital-search').val();
            if (query == '') {
                alert('Please provide a valid input!');
            } else {
                console.log(query);
                getHospitalList(query);
                moveToContent();
            }


        } else {
            let input = $("#doctor-search").val();
            if (input == '') {
                alert('Please provide a valid input!');
            } else {
                let result = formatDoctorInput(input);
                getDoctorList(result);
                moveToContent();
            }

        }


    });
}



bindEventListeners();