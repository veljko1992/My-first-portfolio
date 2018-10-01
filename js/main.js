// VISINE SEKCIJE
var winHeight;
var footerHeight;
var sectionID ="";
var sectionPosition;

function setSectionHeight() {
  winHeight = $(window).height();
  footerHeight = $(".main-footer").outerHeight();
  console.log(winHeight);
  //zadavanje min visine s
  $("#home, #about, #works").css("min-height" , winHeight);
  $("#contact").css("min-height", winHeight - footerHeight);
};
setSectionHeight();
$(window).on("resize", function () {
  setSectionHeight();
})

//Navigacija
var nav = $("nav");
var menuBtn = $(".menu-btn");
var winWidth;

$(window).resize(function () {
  winWidth = $(window).width();
  if (winWidth >= 992) {
    nav.css("display", "block");
  } else {
    nav.css("display", "none");
  }
});

menuBtn.on("click", function () {
  nav.fadeToggle(400);
  nav.toggleClass("open");
});
nav.on("click", function () {
  if (winWidth < 992 || $(this).attr("class") == "open") {
    $(this).fadeOut(400);
    $(this).removeClass("open");
  }
});

//Skupljanje hedera na scrool
// var fromTop;
//
// $(window).on("scroll", function () {
//   fromTop = $(this).scrollTop();
//   if (fromTop > 100) {
//     $(".main-header").addClass("small")
//     menuBtn.css({"top" : "5px"})
//   }else {
//     $(".main-header").removeClass("small")
//     menuBtn.css({"top" : "30px"})
//   }
// });

// smooth
$("nav .navigation-link").on("click", function (e) {
    e.preventDefault();
    sectionID = $(this).attr("href");
    console.log(sectionID);
    sectionPosition = $(sectionID).offset().top;
    console.log(sectionPosition);
    $("html, body").animate({
      scrollTop : sectionPosition
    }, 1000);
} );

// Navigacija
$("li").hover(function () {
  $(this).find("span").css("color", "red");
},function () {
  $(this).find("span").css("color", "white");
});

// Kontakt forma
$('#contact-form').validate({
    submitHandler: function (form) {

        // Uzimanje podataka iz forme
        var data = $(form).serialize();

        // Uzimanje vrednosti iz action atributa
        var action = $(form).prop('action');

        // Onemogućavanje svih polja
        $('input, textarea, button').prop('disabled', true);
        // Promena natpisa na dugmetu
        $(form).find('button').text('Sending in progress...');

        // Slanje podataka iz forme putem AJAX metode
        $.post(
            action,
            data,
            function (response) {
                console.log(response);
                if (response == 1) {
                    // Sakrij i ukloni formu
                    $(form).slideUp(function () {
                        $(this).remove();
                    });
                    // Prikaži da je poruka uspešno poslata
                    $('.alert-success').slideDown();
                } else if ( response != '') {
                    // Ako poruka nije prosleđena - pokazaće se greška
                    alert(response);
                } else {
                    alert('Server validation has not passed');
                }
            }
        );
    }
});

// Load more WORKS
var winWidth;
var num;

function itemsNum() {
  winWidth = $(window).width();
  if (winWidth < 576) {
    num = 4;
  }
  else if (winWidth < 768) {
    num = 6;
  } else {
    num = 6;
  }
  $('.imgbox').css('display', 'none');
  $(".imgbox").slice(0,num).show();
  if (num >= $(".gallery-img:hidden").length) {
    $("#loadMore").hide();
  }
  $("#loadMore").off("click");
  $("#loadMore").on("click", function (e) {
    e.preventDefault();
    $(".imgbox:hidden").slice(0,num).slideDown();
    if ($(".imgbox:hidden").length == 0){
      $("#loadMore").fadeOut("slow");
    }
    $("html,body").animate({scrollTop:$(this).offset().top}, 800);
  });
  if ($(".imgbox:hidden").length !== 0){
    $("#loadMore").show();
  }
}
itemsNum();
$(window).on("resize", itemsNum);
// Load more works end
