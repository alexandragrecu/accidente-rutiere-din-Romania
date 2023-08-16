// WOW Animation
wow = new WOW({
  animateClass: "animated",
  offset: 100,
  callback: function (box) {},
});
wow.init();

// Nav Mobile Menu
function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

// Stiky Header
jQuery(document).ready(function ($) {
  var $stickyMenu = jQuery("header");

  var stickyNavTop = jQuery($stickyMenu).offset().top + 100;

  //Get Height of Navbar Div
  var navHeight = jQuery($stickyMenu).height();

  var stickyNav = function () {
    var scrollTop = jQuery(window).scrollTop();
    if (scrollTop > stickyNavTop) {
      jQuery($stickyMenu).addClass("affix");
      jQuery("html").css("padding-top", navHeight + "px");
    } else {
      jQuery($stickyMenu).removeClass("affix");
      jQuery("html").css("padding-top", "0");
    }
  };

  stickyNav();

  jQuery(window).scroll(function () {
    stickyNav();
  });
});

// Modal Section
jQuery(document).ready(function ($) {
  $(".login-button").click(function () {
    event.preventDefault();
    // Do other stuff if needed
    $("#myModallogin").addClass("show");
  });
  $(".close").click(function () {
    $("#myModallogin").removeClass("show");
  });
  $(".register-button").click(function () {
    event.preventDefault();
    // Do other stuff if needed
    $("#myModalregister").addClass("show");
  });
  $(".closeregister").click(function () {
    $("#myModalregister").removeClass("show");
  });
});
// Add Product
// jQuery(document).ready(function ($) {
//   $(".buttonaddproduct").click(function () {
//     event.preventDefault();
//     // Do other stuff if needed
//     $(".buttonaddproduct").addClass("hidden");
//     $(".disclaimer-points-added").removeClass("hidden");
//   });
// });
// // Add Product disclaimer
// jQuery(document).ready(function ($) {
//   $(".wrapper-modal-product .btn-blue").click(function () {
//     event.preventDefault();
//     // Do other stuff if needed
//     $(".wrapper-modal-product").addClass("hidden");
//     $(".disclaimer-product-added").removeClass("hidden");
//   });
// });
// // Show Product Modal
// jQuery(document).ready(function ($) {
//   $(".box-single-product a").click(function () {
//     event.preventDefault();
//     // Do other stuff if needed
//     $("#myModalProduct").addClass("show");
//   });
//   $(".closeproduct").click(function () {
//     $("#myModalProduct").removeClass("show");
//   });
// });
// Load More
jQuery(document).ready(function ($) {
  /*global $, document, alert, console*/
  $(function () {
    "use strict";
    $(".offer-general").slice(0, 2).show();
    $("#loadmore").on("click", function (e) {
      e.preventDefault();
      $(".offer-general:hidden").slice(0, 8).slideDown();
      if ($(".offer-general:hidden").length === 0) {
        $("#loadmore").replaceWith("<p class='p'>No More</p>");
      }
    });
    $("#top").on("click", function (e) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        600
      );
      return false;
    });
    $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        $("#top a").fadeIn();
      } else {
        $("#top a").fadeOut();
      }
    });
  });
});
