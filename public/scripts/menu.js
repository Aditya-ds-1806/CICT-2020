var authors = $('#authors');
var authorsBtn = $('#auth-btn')
var programsBtn = $('#prog-btn');
var programs = $('#programs');
var close = $('#close');
var stickyNav = $("nav.fixed-top");

window.addEventListener('load', function () {
    authors.removeClass('d-none');
    programs.removeClass('d-none');
    authors.slideUp();
    programs.slideUp();

    document.querySelectorAll("svg.feather.feather-menu").forEach(btn => {
        btn.parentElement.addEventListener('click', (e) => {
            e.preventDefault();
            $('aside').removeClass('close-menu');
            $('aside').addClass('open-menu');
        });
    });

    stickyNav.removeClass('d-none');
    stickyNav.fadeOut(0);

    close.on('click', function (e) {
        this.parentElement.parentElement.classList.remove('open-menu');
        this.parentElement.parentElement.classList.add('close-menu');
        closeItem(authors, authorsBtn);
        closeItem(programs, programsBtn);
    });
    authorsBtn.on('click', function (e) {
        e.preventDefault();
        authors.removeClass('d-none');
        authors.slideToggle();
        closeItem(programs, programsBtn);
        authorsBtn.toggleClass('text-white text-bahama-blue bg-white');
    });
    programsBtn.on('click', function (e) {
        e.preventDefault();
        programs.removeClass('d-none');
        programs.slideToggle();
        closeItem(authors, authorsBtn);
        programsBtn.toggleClass('text-white text-bahama-blue bg-white');
    });
});

window.addEventListener('scroll', toggleStickyNav);
window.addEventListener('load', toggleStickyNav);

function toggleStickyNav() {
    if (window.scrollY > window.innerHeight) {
        if (stickyNav.hasClass('d-none')) stickyNav.removeClass('d-none');
        stickyNav.fadeIn();
    } else {
        stickyNav.fadeOut();
    }
}

function closeItem(item, btn) {
    if (isOpen(item)) {
        item.slideUp();
        btn.removeClass('text-bahama-blue bg-white');
        btn.addClass('text-white');
    }
}

function isOpen([item]) {
    return item.style.display !== 'none';
}