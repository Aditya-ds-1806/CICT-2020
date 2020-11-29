setInterval(function () {
    var diff = countdown(null, new Date('Thu, 03 Dec 2020 09:30:00 +0530'));
    var days = diff.days;
    var hours = diff.hours;
    var minutes = diff.minutes;
    var seconds = diff.seconds;

    document.querySelector("#hours").textContent = hours + 24 * days;
    document.querySelector("#minutes").textContent = minutes;
    document.querySelector("#seconds").textContent = seconds;
}, 1000);