document.addEventListener("DOMContentLoaded", function(event) {
  //console.log('anyPage.js');
  function waitForElem(textSelector) {
      return new Promise(resolve => {
          if (document.querySelector(textSelector)) {
              return resolve(document.querySelector(textSelector));
          }

          const observer = new MutationObserver(mutations => {
              if (document.querySelector(textSelector)) {
                  resolve(document.querySelector(textSelector));
                  observer.disconnect();
              }
          });

          observer.observe(document.body, {
              childList: true,
              subtree: true
          });
      });
  }
  
  /* POP ADS extended */
  //const start = Date.now(); let timeElapsed = 0;
  let popAdsProduct = '.Autoketing-Spu__mainStyle-module__line2 a';
  waitForElem(popAdsProduct).then((elm) => {
    //console.log('Element is ready'); console.log(elm);
    //timeElapsed = Date.now() - start;
    //console.log(`seconds elapsed = ${Math.floor(timeElapsed / 1000)}`);
    
    elm.addEventListener("click", function() {
      let selector = '.Autoketing-Spu__quick-view-module__wrapPrice';
      waitForElem(selector).then((elm) => {
        if (elm.innerText.includes('€0,00')) {
          document.querySelector('.Autoketing-Spu__quick-view-module__wrapCloseButton').click();
          document.querySelector(popAdsProduct).click();
        }
      })
      
      selector = '.Autoketing-Spu__quick-view-module__wrapAddCartButton';
      waitForElem(selector).then((elm) => {
        elm.addEventListener("click", function() {
          //alert(' addcart click');
          window.location.reload();
        });
      })
    });
  });

  /* HEADER NAVIGATION */  
  const $navSubLinks = document.querySelectorAll('.header .header__menu-wrapper .list-menu--inline .header__submenu[level="2"] > li');  
  for(i=0; i<$navSubLinks.length; i++) {
    $navSubLinks[i].addEventListener("click", (e) => {
      if (e.target.tagName == "summary" || e.target.classList.contains('header__submenu-title')) {
        e.preventDefault();
      }
      if (e.currentTarget.classList.contains('not-active')) {
        e.currentTarget.classList.remove('not-active');
        e.currentTarget.classList.add('hovered');
      }
    })

    let hovered = false;
    $navSubLinks[i].addEventListener("mouseover", (e) => {
      if (!hovered && !e.currentTarget.classList.contains('not-active')) {
        e.currentTarget.classList.add('hovered');
      }
      hovered = true;
    })

    $navSubLinks[i].addEventListener("mouseleave", (e) => {
      if (!e.currentTarget.classList.contains('not-active')) {
        e.currentTarget.classList.remove('hovered');
      }
      hovered = false;
    })
  }


})