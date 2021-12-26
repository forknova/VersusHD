document.addEventListener("DOMContentLoaded", function(event) {
    function waitForElem(selectorTxt) {
        return new Promise(resolve => {
            if (document.querySelector(selectorTxt)) {
                return resolve(document.querySelector(selectorTxt));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selectorTxt)) {
                    resolve(document.querySelector(selectorTxt));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }
  
  	const elemCenterScreen = (elem) => {
      	var Mwidth = elem.offsetWidth;
        var Mheight = elem.offsetHeight;
        var Wwidth = window.innerWidth;
        var Wheight = window.innerHeight;
        elem.style.position = "absolute";
        elem.style.top = ((Wheight - Mheight ) / 2 + window.pageYOffset ) + "px";
      	elem.style.left = '0';	
        //elem.style.left = ((Wwidth - Mwidth) / 2 +window.pageXOffset ) + "px";
    }
    
    const showModal = ($elem) => {
      	elemCenterScreen($elem);
      	$elem.style.opacity = '1';
      	$elem.style.visibility = 'visible';
      	$elem.style.zIndex = '500';
      	document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    }
    const closeModal = ($elem) => {
      	$elem.style.opacity = '0';
      	$elem.style.visibility = 'hidden';
      	$elem.style.zIndex = '-1';
      	document.getElementsByTagName('body')[0].style.overflow = 'visible';
    }
    
    const fillReviewModal = ($item) => {
    	let $img = $item.querySelector('.image-container img');
      	let imgUrl = '';
	    if ($img) { imgUrl = $img.getAttribute('src'); }
        let reviewAuthor = $item.querySelector('p.hulk-vendor-name').textContent;
		let reviewTime = $item.querySelector('p.review-time').textContent;
      	let $reviewStars = $item.querySelector('div.hulk-pr__review-icon');
      	let reviewTitle = '';
      	let reviewBody = '';
		if ($reviewStars.parentNode.nextElementSibling.classList.contains("reviewBody-caption"))
          	reviewBody = $reviewStars.parentNode.nextElementSibling.textContent;
      	else if($reviewStars.parentNode.nextElementSibling.nextElementSibling.classList.contains("reviewBody-caption")) {
          	reviewTitle = $reviewStars.parentNode.nextElementSibling.textContent;
			reviewBody = $reviewStars.parentNode.nextElementSibling.nextElementSibling.textContent;
        } else {
          	reviewTitle = $reviewStars.parentNode.nextElementSibling.textContent;
        }
		$reviewStars = $reviewStars.cloneNode(true).outerHTML;
      
      	let $productThumbnail = $item.querySelector('.review-details').nextElementSibling;
      	let productImgUrl = $productThumbnail.querySelector('img').getAttribute('src');
      	let productName = $productThumbnail.querySelector('p a').textContent;
      	let productUrl = $productThumbnail.querySelector('p a').getAttribute('href');

      	let $modal = document.querySelector('.page-width.customer-reviews .modal-container .modal-content');
      
      	const reviewBodyContent = '<p class="author">'+reviewAuthor+'</p><p class="date">'+reviewTime+'</p>'+$reviewStars+'<p class="title">'+reviewTitle+'</p><p class="body">'+reviewBody+'</p>';
      	const productContent = '<a href="'+productUrl+'"><div class="img-container"><img src="'+productImgUrl+'" /></div><p>'+productName+'<br><button>View Product</button></p></a>'
      	const reviewContent = '<div class="review-body">'+reviewBodyContent+'</div><div class="product-container">'+productContent+'</div>';
      	const closeIcon = '<div class="close-icon"><svg viewBox="2 2 20 20"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" /></svg></div>';

      	$modal.insertAdjacentHTML('afterbegin', '<img class="review-img" src="'+imgUrl+'" /><div class="review-content">'+reviewContent+closeIcon+'</div>');
    }
    
    const emptyReviewModal = () => {
      	let $modal = document.querySelector('.page-width.customer-reviews .modal-container .modal-content');
      	while ($modal.firstChild) {
          	$modal.firstChild.remove()
      	}
    }
  
    if (document.querySelector('.page-width.customer-reviews')) {

        var $imageDiv = document.createElement("div");
      	var $image = document.createElement("img");
      
        waitForElem('.hulk-pr__list-items .hulk-row').then((elm) => {
          
          	let $reviewList = document.querySelector('.hulk-pr__list-view');
          	const modalContent = '<div class="modal-content"></div>';
      		$reviewList.insertAdjacentHTML('afterbegin', '<div class="modal-container"><div class="modal-bkg"></div>'+modalContent+'</div>');
			
          	let $modal = document.querySelector('.modal-container');
          	//elemCenterScreen($modal);
          	$modal.addEventListener("click", function(e) {
              console.log(e.target);
              	if (e.target.closest('.close-icon') || (e.target.closest('.modal-content') == null)) {
                	closeModal($modal);
                  	emptyReviewModal();
              	}
            })
            
            let $loadMoreBtn = document.querySelector('#next-link .hulk-button');
          	console.log($loadMoreBtn);
          	if ($loadMoreBtn) {
              $loadMoreBtn.style.backgroundColor = '#000';
              $loadMoreBtn.style.border = '1px solid #838383';
            }
         	let $reviewItems = document.querySelectorAll('.hulk-pr__list-items .hulk-row');
          	//console.log($reviewItems);

            for(let i=0; i<$reviewItems.length; i++) {

              let $thumbImg = $reviewItems[i].querySelector('.product-review-photo img');
              if ($thumbImg) {
              	let imgSrc = $thumbImg.getAttribute("src").replace("/thumbnails","");
                $reviewItems[i].insertAdjacentHTML('afterbegin', '<div class="image-container"><img src="'+imgSrc+'" alt="Bracelet"/></div>');
              }
              
              let $reviewTime = $reviewItems[i].querySelector('.review-time');
              $reviewItems[i].querySelector('.hulk-item').insertBefore($reviewTime, $reviewItems[i].querySelector('.review-details'));
              
              let productHandle = $reviewItems[i].querySelector('div.font-weight-bold a').getAttribute('href');
			  //console.log(productHandle);
              fetch(productHandle+'.js')
                .then(response => response.json())
              	.then(data => {
                	let imgUrl = data.featured_image;
                	let $prodLink = $reviewItems[i].querySelector('div.font-weight-bold').insertAdjacentHTML('afterbegin', '<img src="'+imgUrl+'" />');
              	});
              
              // Add show modal listeners
              $reviewItems[i].addEventListener("click", function() {
                fillReviewModal($reviewItems[i], $modal);
                showModal($modal);
              })
            }
        })

    }
      
})