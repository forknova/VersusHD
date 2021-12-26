document.addEventListener("DOMContentLoaded", function(event) {
  //alert('productPage script loaded');
  
  /* Remove "0 Review" from recommended products */
  
  setTimeout(function(){ 
  	console.log('hulk reviews');
  	const $prodReviews = document.querySelectorAll("div[data-hulkapps-reviews].h5");
  	console.log($prodReviews);
    for (let i = 0; i < $prodReviews.length; i++) {
      if ($prodReviews[i].innerText == "0 Reviews") {
        $prodReviews[i].remove();
      }
    }
  }, 3000);
  
  /* Media gallery customized */
  
  const $galleryImages = document.querySelectorAll(".product-media-container li");
  $galleryImages[0].classList.remove("hidden");
  const $gallerySelectors = document.querySelectorAll(".product__media-list.grid .product-media-selector");
  $gallerySelectors[0].parentElement.classList.add("selected");

  for (let i = 0; i < $gallerySelectors.length; i++) {
    $gallerySelectors[i].addEventListener("click", function() {
      document.querySelector(".product__media-list .product__media-item.grid__item.selected").classList.remove("selected");
      let $imageThumbnail = $gallerySelectors[i].parentElement;
      $imageThumbnail.classList.add("selected");
      let mediaId = $imageThumbnail.getAttribute("data-media-id");
      
      for(let i = 0; i < $galleryImages.length; i++) {
        if (mediaId == $galleryImages[i].getAttribute("data-media-id")) {
        	$galleryImages[i].classList.remove("hidden");
        } else {
			$galleryImages[i].classList.add("hidden");
        }
      }
    }); 
  }
  
  /* Accordion open/close */
  
  const $accordions = document.querySelectorAll(".accordion");
  for (let i = 0; i < $accordions.length; i++) {
  	let isOpen = $accordions[i].classList.contains('open');
    $accordions[i].querySelector('.accordion__label').addEventListener("click", function(e) {
      	e.preventDefault();
    	//console.log(e.target);
		//console.log(e.currentTarget);
      	
      if (isOpen) {
      	$accordions[i].classList.remove('open');
        $accordions[i].classList.add('closed');
        isOpen = false;
      } else {
		$accordions[i].classList.remove('closed');
		$accordions[i].classList.add('open');
		isOpen = true;
      }
    })
  }
})