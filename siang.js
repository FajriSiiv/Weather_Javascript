$(".night-mode button").click(function () {
  $("body").toggleClass("toggle-white");
  $(".top-banner").toggleClass("toggle-dark-font");
  $(".ajax-section .city").toggleClass("toggle-dark toggle-white-font");
  $(".city-temp").toggleClass("toggle-white-font");
  $(".night-mode button").toggleClass("toggle-dark");
});
