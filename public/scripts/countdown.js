setInterval(function () {
    var diff = countdown(null, new Date('December 3, 2020'));
    var months = diff.months;
    var days = diff.days;
    var hours = diff.hours;

    document.querySelector("#months").textContent = months;
    document.querySelector("#days").textContent = days;
    document.querySelector("#hours").textContent = hours;
}, 1000);