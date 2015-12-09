﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
})();
//window.localStorage.removeItem('UserSign');
var applaunchCount = window.localStorage.getItem('launchCount');
var mySign = JSON.parse(window.localStorage.getItem('UserSign'));
var horoscopeArr = ""

console.log("1. applaunchCount = " + applaunchCount + " ja mySign = " + mySign)

//Check if launched before
if (!applaunchCount  || !mySign  ) {     //NOT
     //Local storage is not set, hence first time launch. set the local storage item
    //window.localStorage.setItem('launchCount', 1);
    window.localStorage.setItem('launchCount', 1);
    window.localStorage.setItem('UserSign', JSON.stringify({ set: 0, name: '' }));
    console.log("NEW. applaunchCount = " + applaunchCount + " ja mySign = " + mySign)
    document.getElementById("newButton").style.display = "none";
                                                                      
} else {
     // check
    console.log("applaunchCount = " + applaunchCount + " ja mySign = " + mySign)
    //document.getElementById("signs").style.display = "none";
    //document.getElementById("horoscope").style.display = "block";
    //function buildHoroscope() 
    //connecting horoscope page and building array from json
    var xmlhttp = new XMLHttpRequest();               
    var urlweek = "http://api.rajatieto.org/v1/horoscopes/week";
    //check
    alert('1. ' + xmlhttp.readyState);
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //check
            alert('2. ' + xmlhttp.readyState);
            horoscopeArr = JSON.parse(xmlhttp.responseText);
            window.localStorage.setItem('Horoscope', JSON.stringify(horoscopeArr));
            //check
            //console.log(window.localStorage.getItem('Horoscope'))
            console.log(' mySign.name ' + mySign.name)
            showHoroscope(horoscopeArr, mySign.name);
        }
    };
    //check
    alert('3. ' + xmlhttp.readyState);
    xmlhttp.open("GET", urlweek, true);
    xmlhttp.send();
}

function showHoroscope(arr, sign) {
    console.log(arr)
    var out = "";
    for (i = 0; i < arr.length; i++) {
        if (arr[i].fiSign == sign) {
            console.log('arrSign' + arr[i].fiSign)
            out += "<h2>" + arr[i].fiSign + "</h2> <h4>" + arr[i].horoscopeDays + "</h4> <p>" + arr[i].fortune + '</p>' + '</a><br>';
        }
    }
    document.getElementById("horoscope").innerHTML = out;
    //document.getElementById("signs").style.display = "none";
    //document.getElementById("horoscope").style.display = "block";
}

var curSign = '';

// set global UserSign
function selectSign() {
    var uSign = JSON.parse(window.localStorage.getItem('UserSign'))

    curSign = document.getElementById("sign");
    console.log('sign ' + document.getElementById("sign").value)
    if (uSign.set == 0) {
        uSign.set = 1
        uSign.name = curSign.options[curSign.selectedIndex].text
        console.log(JSON.stringify(uSign))
        window.localStorage.setItem('UserSign', JSON.stringify(uSign));
        console.log('UserSign' + window.localStorage.getItem('UserSign'))
    }
    console.log('uSign ' + uSign);
}

//* Launching app for first time
//else {
//    document.getElementById("signs").style.display = "none";
//} 