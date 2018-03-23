'use strict';


const HOSPITAL_URL = 'https://data.medicare.gov/resource/rbry-mqwu.json';

function getHospitalList() {
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

};

const DOCTOR_URL = 'https://developer.betterdoctor.com/documentation15';
const API_KEY = '8ed32e7cd794252c93e1eaabd46b41d2';

function getDoctorList() {
    $.ajax({
        url: DOCTOR_URL,
        type: "GET",
        dataType: "json",
        data: {
            limit: 15,
            user_key: API_KEY,
        }


    }).done(function(data) {
        console.log(data);
        

        });

    };




function watchSubmit() {
    $('.js-search-form').submit(function(event) {
        event.preventDefault();
        let query = $(this).find('.js-search-input').val();
        getHospitalList(query); 
        getDoctorList(query);


        $('.js-search-form').hide();




    });
}

watchSubmit();