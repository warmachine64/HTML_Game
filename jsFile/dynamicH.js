/**
 * Created by Yang.
 */

window.onload = function () {
    responsive();
}

window.onresize = function () {
    responsive();
}

function responsive() {
    $(".view-wrapper").css('height', $('.view-wrapper').width() * 1.2);
}
