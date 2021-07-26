//first screen slider

function autoSlider() {
	
	function Slideshow( element ) {
		this.el = document.querySelector( element );
		this.init();
	}
	
	Slideshow.prototype = {
		init: function() {
			this.wrapper = this.el.querySelector( ".first__right-slider-img-wrapper" );
			this.slides = this.el.querySelectorAll( ".first__right-slider-img-js" );
			this.previous = this.el.querySelector( ".slider-previous" );
			this.next = this.el.querySelector( ".slider-next" );
			this.index = 0;
			this.total = this.slides.length;
			this.timer = null;
			
			this.action();
			this.stopStart();	
		},
		_slideTo: function( slide ) {
			let currentSlide = this.slides[slide];
			currentSlide.style.opacity = 1;
			
			for (let i = 0; i < this.slides.length; i++ ) {
				let slide = this.slides[i];
				if( slide !== currentSlide ) {
					slide.style.opacity = 0;
				}
			}
		},
		action: function() {
			let self = this;
			self.timer = setInterval(function() {
				self.index++;
				if( self.index == self.slides.length ) {
					self.index = 0;
				}
				self._slideTo( self.index );
				
			}, 3500);
		},
		stopStart: function() {
			let self = this;
			self.el.addEventListener( "mouseover", function() {
				clearInterval( self.timer );
				self.timer = null;
				
			}, false);
			self.el.addEventListener( "mouseout", function() {
				self.action();
				
			}, false);
		}
	};
	
  let slider = new Slideshow( ".first__right-slider" );
  
};

autoSlider();

//best-price slider screen slider

let bestPriceSliderFeature = document.querySelectorAll(['.best-price__right-slider-feature span', '.best-price__right-slider-feature']);
let bestPriceSliderMainImg = document.querySelectorAll('.best-price__right-slider-img');

bestPriceSliderFeature.forEach(item => {
  item.addEventListener('mouseover', (e) => {
    let currentImg = document.querySelector(`.best-price__right-slider-img-${e.target.getAttribute('data-slide')}`);
    currentImg.classList.remove('active');
    bestPriceSliderMainImg.forEach(img => {
      img.classList.remove('active');
    });
    if (!currentImg.classList.contains('active')) {
      bestPriceSliderFeature.forEach(item => {
        item.classList.remove('active');
      });
      currentImg.classList.add('active');
      item.classList.add('active');
    } 
  })
})

//review slider
let swiper = undefined;
const swiperWrapper = document.querySelector('.swiper-wrapper');
const swiperSlide = document.querySelector('.swiper-slide');

function initSwiper() {
  if ((window.innerWidth >= 600) && (swiper == undefined)) {
    swiperWrapper.classList.add('swiper-wrapper');
    swiperSlide.classList.add('swiper-slide');
    swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      spaceBetween: 30,
      loop: true,
      centeredSlides: false,
      grabCursor: true,
      breakpoints: {
        320: {
          slidesPerView: "auto",
          spaceBetween: 20,
          centeredSlides: true,
        },
        768: {
          slidesPerView: "auto",
          spaceBetween: 30,
        },
        1250: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
  else if (window.innerWidth < 600 && (swiper != undefined)) {
    swiper.destroy();
    swiper = undefined;
    swiperWrapper.classList.remove('swiper-wrapper');
    swiperSlide.classList.remove('swiper-slide');
  }
};
initSwiper();

window.addEventListener('resize', function() {
    initSwiper();
})


//slider btn show more
const sliderBtnShow = document.querySelector('.review__slider-show-more');
const sliderWrapperShow = document.querySelector('.review__slider');

sliderBtnShow.addEventListener('click', () => {
  sliderWrapperShow.classList.toggle('show');
  if (sliderBtnShow.innerText === 'Показать еще') {
    sliderBtnShow.textContent = 'Свернуть';
  } else {
    sliderBtnShow.textContent = 'Показать еще';
  }
})

//slider slide btn show more
const sliderSlideBtnShow = document.querySelectorAll('.review__slider-item-description-link');
const sliderSlideWrapperShow = document.querySelector('.review__slider-item-description-text');

sliderSlideBtnShow.forEach(item => {
  item.addEventListener('click', (e) => {
    e.target.previousElementSibling.classList.toggle('active');
    e.target.closest('.review__slider-item').classList.toggle('active');
    if (e.target.innerText === 'Читать полностью') {
      e.target.textContent = 'Свернуть';
    } else {
      e.target.textContent = 'Читать полностью';
    }
})
})

//aos

AOS.init();

//animation circle to scroll
const heightFull = document.body.scrollHeight;
const bestPriceBlock = document.querySelector('.form__price-discont');
const bestPriceBlockMain = document.querySelector('.best-price');

window.addEventListener('scroll', function() {
  if ((pageYOffset + document.documentElement.clientHeight) >= (heightFull - bestPriceBlock.scrollHeight) * .93) {
    bestPriceBlockMain.classList.add('active');
    setTimeout(() => {
      bestPriceBlock.classList.add('active');
    }, 2000)
    
  }
});

/* scrollTop start */

let scrollTop = document.querySelector('.arrow');

if (pageYOffset > 550) {
  scrollTop.classList.add('show-scroll');
}

window.addEventListener('scroll', function (e) {
  if (pageYOffset > 550) {
    scrollTop.classList.add('show-scroll');
  } else {
    scrollTop.classList.remove('show-scroll');
  }
});

scrollTop.addEventListener('click', function (e) {
  window.scrollTo({ top: 0, behavior: 'smooth' });
})

/* scrollTop end */

//timer 
function getTimeRemaining(endtime) {
  var t = Date.parse(86400) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  return {
    'total': t,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var hoursSpan = clock.querySelector('.form__timer-count-hours');
  var minutesSpan = clock.querySelector('.form__timer-count-minutes');
  var secondsSpan = clock.querySelector('.form__timer-count-seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}

var deadline="January 01 2018 00:00:00 GMT+0300";
var deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000); 
initializeClock('countdown', deadline);

//youtube video

let player;

function onYouTubePlayerAPIReady() {
  player = new YT.Player("video", {
    videoId: '35K7ABcWiEI', // YouTube Video ID
    playerVars: {
      autoplay: 0,        // Auto-play the video on load
      controls: 1,        // Show pause/play buttons in player
      showinfo: 0,        // Hide the video title
      modestbranding: 1,  // Hide the Youtube Logo
      loop: 0,            // Run the video in a loop
      fs: 1,              // Hide the full screen button
      cc_load_policy: 0, // Hide closed captions
      iv_load_policy: 3,  // Hide the Video Annotations
      autohide: 1,
    },
    events: {
      onReady: function onPlayerReady(event) {
        let videoWrapper = document.querySelector(".video__video-overlay");
        let playButton = document.querySelector(".video__video-play-wrapper-video");
        let iframeYoutube = document.querySelector(".video__video iframe");
        videoWrapper.addEventListener("click", function () {
          playButton.classList.add('hidden');
          iframeYoutube.classList.add('active');
          player.playVideo();
        });
      },
    }
  });
}

setTimeout(() => {
  
  let tag = document.createElement("script");
  tag.src = "//www.youtube.com/player_api";
  let firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}, 3500);
// Inject YouTube API script

/* mask tel start */
let selector = document.querySelector('input[type="tel"]');
let im = new Inputmask({
  mask: `+7 (*99) 999-99-99`,
  showMaskOnHover: false,
  showMaskOnFocus: true,
  definitions: { '*': { "validator": "[0-79]" }}
});
im.mask(selector);

/* mask tel end */

//menu
const menuBtn = document.querySelector('.menu__btn');
const menuList = document.querySelector('.menu__list');
const body = document.querySelector('body');

menuBtn.addEventListener('click', function() {
  menuList.classList.toggle('active');
  menuBtn.classList.toggle('active');
  body.classList.toggle('overflow');
})

//change focus input form
let inputs = document.querySelectorAll("input");
for (let i = 0 ; i < inputs.length; i++) {
   inputs[i].addEventListener("keypress", function(e){
      if (e.which == 13) {
         e.preventDefault();
         let nextInput = document.querySelectorAll('[tabIndex="' + (this.tabIndex + 1) + '"]');
         if (nextInput.length === 0) {
            nextInput = document.querySelectorAll('[tabIndex="1"]');
         }
         nextInput[0].focus();
      }
   })
}