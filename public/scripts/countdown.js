setInterval(function () {
    var diff = countdown(null, new Date('Thu, 03 Dec 2020 09:30:00 +0530'));
    var days = diff.days;
    var hours = diff.hours;
    var minutes = diff.minutes;

    document.querySelector("#days").textContent = days;
    document.querySelector("#hours").textContent = hours;
    document.querySelector("#minutes").textContent = minutes;
}, 1000);