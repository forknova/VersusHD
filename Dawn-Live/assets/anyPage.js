document.addEventListener("DOMContentLoaded", function(event) {
  console.log('anyPage.js');
  console.log('deply');
  
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
  
  //const start = Date.now(); let timeElapsed = 0;
  let popAdsProduct = '.Autoketing-Spu__mainStyle-module__line2 a';
  
  waitForElem(popAdsProduct).then((elm) => {
      //console.log('Element is ready'); console.log(elm);
      //timeElapsed = Date.now() - start;
      //console.log(`seconds elapsed = ${Math.floor(timeElapsed / 1000)}`);
    
      elm.addEventListener("click", function() {
        //alert('pop click');
        let selector = '.Autoketing-Spu__quick-view-module__wrapPrice';
		waitForElem(selector).then((elm) => {
          	//console.log('Element is ready'); console.log(elm);
          	//console.log(elm.innerText.includes('€0,') ? 'is zero' : 'is not zero'); 
          	if (elm.innerText.includes('€0,00')) {
            	document.querySelector('.Autoketing-Spu__quick-view-module__wrapCloseButton').click();
                document.querySelector(popAdsProduct).click();
            }
        })
        
        selector = '.Autoketing-Spu__quick-view-module__wrapAddCartButton';
        waitForElem(selector).then((elm) => {
          	//console.log('Element is ready'); console.log(elm);
			elm.addEventListener("click", function() {
              //alert(' addcart click');
              window.location.reload();
            });
        })
      });

  });

})