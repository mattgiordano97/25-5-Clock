"break-decrement"
"break-increment"
"session-increment"
"session-decrement"
"break-length"
"session-length"
"time-left" // format mm:ss
"play"
"pause"
"reset"

/* Constants and global variables */
let breakLength = 5;
let sessionLength = 25;
let timeLeft = sessionLength * 60; // seconds, might change in milliseconds
let timerInterval;

/* Functions */
const displayTimeLeft = () => {
    const minsLeft = Math.floor(timeLeft / 60);
    const secsLeft = timeLeft % 60;
    $('#time-left').text(`${minsLeft > 9 ? minsLeft : '0' + minsLeft}:${secsLeft > 9 ? secsLeft : '0'+secsLeft}`);
}

/* Executes each second when timer is active */
const timerFunction = () => {


    // Decrease timeLeft
    timeLeft--;

    // If timeLeft reaches zero:
    if (timeLeft <= 0) {
        //  play alarm sound
        $('#alarm-sound')[0].play();

        //  switch label session/break and set timeLeft to appropriate value
        if ($('#timer-label').text() === 'Session') {
            $('#timer-label').text('Break');
            timeLeft = breakLength * 60;
        }
        else {
            $('#timer-label').text('Session');
            timeLeft = sessionLength * 60;
        }
    }

    // If timeLeft < 1 minute, make it red, otherwise make it normal
    if (timeLeft < 60 && $('#timer-col').hasClass('border-secondary')) {
        $('#timer-col').removeClass('border-secondary');
        $('#timer-col').addClass('border-danger');
        $('#timer-row').addClass('text-danger');
    }
    else if (timeLeft > 60 && $('#timer-col').hasClass('border-danger')) {
        $('#timer-col').removeClass('border-danger');
        $('#timer-col').addClass('border-secondary');
        $('#timer-row').removeClass('text-danger');
    }

    
    

    displayTimeLeft();
}

/* On document ready */
$(document).ready(function () {
    // Initialize elements
    $('#break-length').text(breakLength);
    $('#session-length').text(sessionLength);
    displayTimeLeft();
    $('#alarm-sound')[0].load();


    // Increment/decrement buttons
    $('.btn-change-length').on('click', function (e) {
        const buttonObj = $(e.currentTarget);
        console.log(buttonObj);
        
        // Increment button
        if (buttonObj.hasClass('btn-increment')) {
            // Break button
            if (buttonObj.hasClass('btn-change-break')) {
                breakLength < 60 ? breakLength++ : '';
            }
            // Session button
            else {
                sessionLength < 60 ? sessionLength++ : '';
            }
        }
        // Decrement button
        else {
            // Break button
            if (buttonObj.hasClass('btn-change-break')) {
                breakLength > 1 ? breakLength-- : '';
            }
            // Session button
            else {
                sessionLength > 1 ? sessionLength-- : '';
            }
        }
        
        $('#break-length').text(breakLength);
        $('#session-length').text(sessionLength);
        clearInterval(timerInterval);
        timeLeft = sessionLength * 60;
        displayTimeLeft();
    });

    // Play button
    $('#play').on('click', function () {
        // Start periodic timer function
        timerInterval = setInterval(timerFunction, 1000);
    });
    // Pause button
    $('#pause').on('click', function () {
        clearInterval(timerInterval);
    });
    // Reset button
    $('#reset').on('click', function () {
        clearInterval(timerInterval);
        sessionLength = 25;
        breakLength = 5;
        timeLeft = sessionLength * 60;
        $('#break-length').text(breakLength);
        $('#session-length').text(sessionLength);
        displayTimeLeft();
    });
});