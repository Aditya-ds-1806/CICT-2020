setInterval(function () {
    var diff = countdown(null, new Date('December 3, 2020'));
    var days = diff.days;
    var hours = diff.hours;
    var minutes = diff.minutes;

    document.querySelector("#days").textContent = days;
    document.querySelector("#hours").textContent = hours;
    document.querySelector("#minutes").textContent = minutes;
}, 1000);