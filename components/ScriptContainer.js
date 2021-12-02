export function onClickSmoothLink(evt) {
    evt.preventDefault();

    $("body, html").animate({
        scrollTop: $(evt.currentTarget.getAttribute("href")).offset().top - $("header").height()
    }, {
        duration: 2500,
        queue: false
    });
}