$("form").each(function () {
    $(this).submit(function (e) {
        e.preventDefault();
        const spinner = $(this).children().children()[2];
        const status = $(this).children()[2];
        $(spinner).removeClass("d-none");
        $.ajax({
            type: "POST",
            url: "/",
            data: $(this).serialize(),
            success: function (_, _, res) {
                $(spinner).addClass("d-none");
                if (res.status === 200) {
                    $(status).removeClass("text-white bg-danger invisible");
                    $(status).text("Thank you for subscribing!");
                } else {
                    $(status).addClass("text-white bg-danger");
                    $(status).removeClass("invisible");
                    $(status).text("Something went wrong. Please try again.");
                }
                setTimeout(() => $(status).addClass("invisible"), 5000);
            },
            error: function (res) {
                $(spinner).addClass("d-none");
                if (res.status === 429) {
                    $(status).addClass("text-white bg-danger");
                    $(status).removeClass("invisible");
                    $(status).text(res.responseText);
                }
                setTimeout(() => $(status).addClass("invisible"), 5000);
            }
        });
    });
});