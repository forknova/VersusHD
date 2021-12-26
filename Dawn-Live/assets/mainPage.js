document.addEventListener("DOMContentLoaded", function(event) {
  console.log('mainPage.js');
  
  const isDesktop = window.innerWidth > 900 ? true : false;
  
  /* Testimonials slide animation */
  
  let $testimonials = Array.from(document.querySelectorAll('.xotix-testimonials'));
  for (let testimonialIndex = 0; testimonialIndex < $testimonials.length; testimonialIndex++) {
  	let $testimonialItems = Array.from($testimonials[testimonialIndex].querySelectorAll('.testimonials__item'));
    
    const autoplayTime = $testimonials[testimonialIndex].getAttribute('data-autoplay');
    
    let timerID = null;
    let translationComplete = true;
    let testimonialContWidth = $testimonials[testimonialIndex].querySelector('.testimonials-container').clientWidth;
    let currentTrans = [];
    let slideCount = 0;
    let viewIndex = 0;
    let lastIndexMoved = 0;

    let transitionCompleted = function(){
        translationComplete = true;
    }
    
    for (let i = 0; i < $testimonialItems.length; i++) {
      	currentTrans[i] = 0;
    	$testimonialItems[i].addEventListener("transitionend", transitionCompleted, true);                    
        $testimonialItems[i].addEventListener("webkitTransitionEnd", transitionCompleted, true);                    
        $testimonialItems[i].addEventListener("oTransitionEnd", transitionCompleted, true);                    
        $testimonialItems[i].addEventListener("MSTransitionEnd", transitionCompleted, true);
    }
    
 	slideLeft();	

    function slideLeft() {
      slideCount++;
      
      // make last item visible again
      $testimonialItems[lastIndexMoved].style.opacity = '1';

      for (let i = 0; i < $testimonialItems.length; i++) {
        currentTrans[i] = currentTrans[i]-testimonialContWidth;
        $testimonialItems[i].style.transform = 'translateX('+currentTrans[i]+'px)';
      }
     
      // set item index
      viewIndex++; 
      viewIndex = (viewIndex == $testimonialItems.length) ? 0 : viewIndex;

      // move first to last
      if(slideCount >= $testimonialItems.length-1) {
        let outerIndex = ((viewIndex+1) == $testimonialItems.length) ? 0 : (viewIndex+1);
        currentTrans[outerIndex] = -((outerIndex-1)*testimonialContWidth);
        $testimonialItems[outerIndex].style.opacity = '0';
        $testimonialItems[outerIndex].style.transform = 'translateX('+currentTrans[outerIndex]+'px)';
      	lastIndexMoved = outerIndex;
      }
      
      clearInterval(timerID);
  
      timerID = setInterval(function() {
        slideLeft();
      }, autoplayTime);
    }
  }
  
  
  /* Double featured product */
  
  let $singleProdSections = document.querySelectorAll('.single-product-section');
  let $firstProdSection = $singleProdSections[0].parentNode;
  let $secondProdSection = $singleProdSections[1].parentNode;
  let $sectionHeading = document.querySelector('.featured-product-section .double-section-heading');

  var wrapper = document.createElement('div');
  var $divider = document.createElement('div');
  var $heading = document.createElement('h2');
  
  $divider.insertAdjacentHTML('afterbegin', '<div class="battle-logo"></div>');

  wrapper.classList.add('featured-double-product-section');
  $divider.classList.add('products-divider');
  $heading.classList.add('h1', 'title');
  $heading.textContent = $sectionHeading.textContent;

  // insert wrapper before el in the DOM tree
  $firstProdSection.parentNode.insertBefore(wrapper, $firstProdSection);

  // move el into wrapper
  wrapper.appendChild($heading);
  wrapper.appendChild($firstProdSection);
  wrapper.appendChild($divider);
  wrapper.appendChild($secondProdSection);


  /* Scroll-snap Carousel for Desktop */
  
  if (isDesktop) {
    const $sliders = document.querySelectorAll('.slider-mobile-gutter .slider');
    for(let i=0; i<$sliders.length; i++) {

      let isDown = false;
      let startX;
      let scrollLeft;
      $sliders[i].classList.add('slider--desktop');

      $sliders[i].addEventListener('mousedown', e => {
        e.preventDefault();
        isDown = true;
        $sliders[i].classList.add('active');

        startX = e.pageX - $sliders[i].offsetLeft;
        scrollLeft = $sliders[i].scrollLeft;
      });

      $sliders[i].addEventListener('mouseleave', e => {
        e.preventDefault();

        $sliders[i].querySelectorAll('a').forEach(function($link) {
            $link.classList.remove('prevent-me');
        })    

        isDown = false;
        $sliders[i].classList.remove('active');
      });

      $sliders[i].addEventListener('mouseup', e => {
        e.preventDefault();

        $sliders[i].querySelectorAll('a').forEach(function($link) {
            $link.classList.remove('prevent-me');
        })

        isDown = false;
        $sliders[i].classList.remove('active');
      });

      $sliders[i].addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();

        $sliders[i].querySelectorAll('a').forEach(function($link) {
            $link.classList.add('prevent-me');
        })

        const x = e.pageX - $sliders[i].offsetLeft;
        const SCROLL_SPEED = 1.5;
        const walk = (x - startX) * SCROLL_SPEED;
        $sliders[i].scrollLeft = scrollLeft - walk;
      });
    }
    
  }
  
})