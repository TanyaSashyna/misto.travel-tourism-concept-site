/*
 * Custom scripts
 */
(function ($) {
    initApartmentGallery();
    mapResize();
    initMapScroll();
    initLoader();
    operationDropdown();
    operationMnvMenu();
    scrollTopPage();
    operationTabs();
})(jQuery);

var mapCard = new leafletMap('#map-card', {
   zoom: 20,
});

var map = new leafletMap('#map', {
  zoom: 11,
  pinPopup: 'appartment',
  districts: true,
  groupMarkers: true,
  initCenterCity: true
});

var mapContact = new leafletMap('#map-contact', {
   zoom: 20,
   pinPopup: 'address',
   pinPopupActive: true
});

function initApartmentGallery() {
    var captions = [];
 
    if (document.querySelector('.apartment-slider')) {
       initSlick();
    }

    if (document.querySelector('.company-logo')) {
      initSlickItem();
    }

    function initSlickItem() {
      $('.hotel-slider').slick({
         slidesToShow: 1,
         slidesToScroll: 1,
         arrows: true,
         fade: true,
         infinite: true,
         nextArrow: '<button class="slick-next slick-arrow" type="button"></button>',
         prevArrow: '<button class="slick-prev slick-arrow" type="button"></button>'
      });
    }
 
     function initSlick() {
       $('.apartment-slider-main').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          fade: true,
          infinite: false,
          asNavFor: '.apartment-slider-thumbs',
          nextArrow: '<button class="slick-next slick-arrow" type="button"></button>',
          prevArrow: '<button class="slick-prev slick-arrow" type="button"></button>',
          onAfterChange: function(currentSlide){
           }
 
       });
 
       $('.apartment-slider-thumbs').slick({
          asNavFor: '.apartment-slider-main',
          slidesToShow: 6.5,
          vertical: true,
          focusOnSelect: true,
          verticalSwiping: true,
          infinite: false,
          responsive: [
             {
               breakpoint: 767,
               settings: {
                 vertical: false,
                 verticalSwiping: false,
                 slidesToShow: 3,
                 infinite: true,
                 centerMode: true
               }
             }
           ]
       });
 
       initCaption('.apartment-slider-main');
    }
 
    $('.apartment-slider-main').on('beforeChange init', function(event, slick, currentSlide, nextSlide){
       initCaptionControl(nextSlide);
    });
 
    function initCaption(el) {
       var carousel = document.querySelector(el);
       var slides = carousel.querySelectorAll('.slide');
 
       var captionWrap = document.createElement('div');
       captionWrap.classList.add('apartment-slider-info');
 
       slides.forEach(function(item, i) {
          var caption = document.createElement('div');
          caption.classList.add('apartment-slider-info-item');
          caption.innerHTML = item.getAttribute('data-caption');
          if (i !== 0) {
             caption.style.display = 'none';
          }
          captions.push(caption);
          captionWrap.appendChild(caption);
       })
       carousel.parentNode.appendChild(captionWrap);
    }
 
    function initCaptionControl(index) {
       captions.forEach(function(item, i){
          if (i === index) {
             item.style.display = 'block';
          } else {
             item.style.display = 'none';
          }
       })
    }
}

function mapResize() {
   var btn = document.querySelector('.map-size');
   if (btn) {
      var btnText = btn.querySelector('span');
      var map = document.querySelector(btn.getAttribute('data-map'));
      var height = map.offsetHeight;

      btnText.innerHTML = 'Открыть карту'

      btn.addEventListener('click', function(e) {
         e.preventDefault();
         if (!map.classList.contains('expanded')) {
            btnText.innerHTML = 'Закрыть карту'

            btn.classList.add('active');
            map.classList.add('expanded');
         } else {
            btnText.innerHTML = 'Открыть карту'

            btn.classList.remove('active');
            map.classList.remove('expanded');

            map.style.height = height;
         }
         $(map).one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",function(event) {
            mapContact.invalidateSize();
         });
      });
   }
}

function initMapScroll() {
   if (document.querySelector('.main-tw-map')) {
      $("#map").stick_in_parent({
         sticky_class: 'fixed-map'
      });
   }
}

function initLoader() {
   document.addEventListener("DOMContentLoaded", function() {
      setTimeout(function() {
         $(".loader").hide();
      }, 500);
   });
}

function operationDropdown() {
   const btnDrop = document.getElementsByClassName('js-dropdown__toggle');
   const blockDrop = document.getElementsByClassName('js-dropdown__block');
   const drop = document.getElementsByClassName('js-dropdown');
 
   function openLangDropdown(e) {
      e.stopPropagation();

      Array.prototype.forEach.call(drop, function(elem){
         elem.classList.remove('-open')
      })

      let el = e.currentTarget.parentNode;
      el.classList.add('-open')
   };

   btnDrop ? Array.prototype.forEach.call(btnDrop, function(elem){
      elem.addEventListener('click', openLangDropdown)
   } ) : null;
 
   blockDrop ? Array.prototype.forEach.call(blockDrop,function(elem){
      elem.addEventListener('click', function(e){
         e.stopPropagation();
       })
   }) : null;
 
   btnDrop && blockDrop ? document.addEventListener('click', function(e){
      Array.prototype.forEach.call(blockDrop, function(elem) {
        elem.parentElement.classList.remove('-open')
     })
   }) : null;
}

function operationMnvMenu() {
   const btnOpenMenu = document.querySelector('.menu-toggle');
   const btnCloseMenu = document.querySelector('.mnv-menu__close');
   const menuBlock = document.querySelector('.mnv-menu');

   function openMnvMenu(e) {
      e.stopPropagation();
      menuBlock.classList.add('-open');
   };
   
   function closeMnvMenu(e) {
      menuBlock.classList.remove('-open');
   };

   btnOpenMenu.addEventListener('click', openMnvMenu);
   btnCloseMenu.addEventListener('click', closeMnvMenu);

   menuBlock.addEventListener('click', function(e){
      e.stopPropagation();
   });

   document.addEventListener('click', function(e){
      menuBlock.classList.remove('-open');
   })
}

function scrollUp(e) {
	var up = 0;
	var down = window.pageYOffset || document.documentElement.scrollTop;
	animation(down , up);
};

function animation (startVal, stopVal) {
  var tymeout = 10;
  var animationTime = 600;
  var way;
  var preIterationVal;
  var iterationVal;

    if (startVal > stopVal) {
    preIterationVal = startVal / animationTime;
      way = false;
  } else if (startVal < stopVal) {
    preIterationVal = stopVal / animationTime;
      way = true;
  };
  
  iterationVal = preIterationVal * tymeout;
  
  animationStep();
  
  function calculate(calcWay) {
	calcWay ? startVal += iterationVal : startVal -= iterationVal;

    if (calcWay) {
      	startVal >= stopVal ? startVal = stopVal : animationStep();
    } else if (!calcWay) {
      	startVal <= stopVal ? startVal = stopVal : animationStep();
    };
  };
  
  function animationStep() {
    setTimeout(function () {
        calculate(way);
        document.body.scrollTop = startVal;
        document.documentElement.scrollTop = startVal;
    }, tymeout);
  }
};

function scrollTopPage() {
   const btnTop = document.getElementById('goToTop');

   btnTop.addEventListener('click', function(e){
      e.preventDefault();
	   scrollUp(e);
   });
};

function operationTabs() {
   const btnTabsCollection = document.getElementsByClassName('tab-item');
   const tabsBlockCollection = document.getElementsByClassName('news-block');

   btnTabsCollection[0].classList.add('active');

   Array.prototype.forEach.call(tabsBlockCollection, function(tabBlock){
      tabBlock.getAttribute('data-city') === btnTabsCollection[0].getAttribute('data-city') ? tabBlock.classList.add('active') : null;
   })

   btnTabsCollection[0].getAttribute('data-city')

   function removeClass(elem){
      elem.classList.remove('active')
   }

   Array.prototype.forEach.call(btnTabsCollection, function(btn) {
      btn.addEventListener('click', function(e) {
         e.preventDefault();
         console.log(e.target.getAttribute('data-city'))

         Array.prototype.forEach.call(btnTabsCollection, removeClass);

         e.target.classList.add('active');

         Array.prototype.forEach.call(tabsBlockCollection, removeClass);

         Array.prototype.forEach.call(tabsBlockCollection, function(tabBlock){
            tabBlock.getAttribute('data-city') === e.target.getAttribute('data-city') ? tabBlock.classList.add('active') : null;
         });         
      })
   })
}