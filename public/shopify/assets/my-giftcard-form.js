/* PSEUDO OPTION FOR AMOUNT/TREATMENT TOGGLING 
  *  github.com/nacmonad
  *  Works with added template which checks for if product type is giftcard, and 
  *  tags extra variant field options
  */  
 

function getUrlVars(url) {
    var hash;
    var myJson = {};
    var hashes = url.slice(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i ].split('=');
        myJson[hash[0]] = hash[1];
        // If you want to get in native datatypes
        // myJson[hash[0]] = JSON.parse(hash[1]); 
    }
    return myJson;
}  
function showExtraRecipientFields() {
  	const isDigital = document.querySelector('[value="Digital"]').checked;
    document.querySelector('#recipient-email').style.display = isDigital ? '' : 'none';	
    document.querySelector('#my-giftcard-delivery_date').style.display = '';
 
  }
function hideExtraRecipientFields() {
    document.querySelector('#recipient-email').style.display = 'none';	
  	document.querySelector('#my-giftcard-delivery_date').style.display = 'none';
  }
  
function handleRadioClick(e) {
	console.log("handleRadioClick", e.target.value)
    switch(e.target.value) {
      case "Treatment":
      case "Amount":
        const allTreatmentAmounts = Array.from(document.querySelectorAll(`[name="options[Amount]"]`));
        document.querySelector('#By-Value').innerText = e.target.value;
		document.querySelector('[data-select-label="Amount"] .radio__legend__label').innerText = e.target.value.toUpperCase();
 		const toShow = allTreatmentAmounts.filter(opt=>e.target.value === "Amount" ? opt.value.includes("$") : !opt.value.includes("$"));
        const toHide = allTreatmentAmounts.filter(opt=>e.target.value === "Amount" ? !opt.value.includes("$") : opt.value.includes("$"));
        toShow.forEach(el=>{
        	el.style.display = "";
          	el.nextElementSibling.style.display = ''
        });
        toHide.forEach(el=>{
        	el.style.display = "none";
          	el.nextElementSibling.style.display = 'none'
        });       
        break;
      case "Digital":
        showExtraRecipientFields();
        break;
      case "Physical":
        hideExtraRecipientFields();
        break;
      default:
        console.log("unhandled variant type", e.target.value)
    
    }
          
  }
  
  
function initCustomForm() {
    	const product = window.myGiftcard;
        console.log("main-product.liquid loaded dumping product info:", product)

        console.log("selected fieldsets:", document.querySelectorAll('form fieldset'));  

  	
  
          Array.from(document.querySelectorAll('form fieldset input')).map(r=> {
            	console.log("Tagging radio input", r);
              r.addEventListener('click', handleRadioClick);
          })
        
  
         const urlVars = getUrlVars(window.location.href);
         console.log("Init with", urlVars);
         if(urlVars.variant) {
         	
            const variantInfo = product.variants.find(v=>v.id === parseInt(urlVars.variant));
            console.log("Initialize with seed", variantInfo)
            const isDigital = variantInfo.option1 === 'Digital';
            const isAmount = variantInfo.option2.includes("$");
            //const isGift = variantInfo.option3 === 'Yes'
         	
           if(isDigital) {
             showExtraRecipientFields()
           } else {
             hideExtraRecipientFields()
           }
            
           if(!isAmount) {
             document.querySelector('#By-Value').innerText = 'Treatment'
             document.querySelector('[data-select-label="Amount"] .radio__legend__label').innerText = 'Treatment';

           	 document.querySelector('[value="Amount"]').checked = false;
           	 document.querySelector('[value="Treatment"]').checked = true;
           } 
           
           const allTreatmentAmounts = Array.from(document.querySelectorAll(`[name="options[Amount]"]`));
           const toHide = allTreatmentAmounts.filter(opt=>isAmount ? !opt.value.includes("$"): opt.value.includes("$"));
              toHide.forEach(el=>{
                  el.style.display = "none";
                  el.nextElementSibling.style.display = 'none'
              });
     
//             if(isGift) {
//               showExtraRecipientFields();
//             } else {
//               hideExtraRecipientFields();
//             }
         
         } else {
           console.log("Initialize with default");
           //Digital, Amount, No

           const allTreatmentAmounts = Array.from(document.querySelectorAll(`[name="options[Amount]"]`));
           const toHide = allTreatmentAmounts.filter(opt=>!opt.value.includes("$"));
            toHide.forEach(el=>{
                el.style.display = "none";
                el.nextElementSibling.style.display = 'none'
            });
           
            document.querySelector('#By-Value').innerText = 'Amount'
            showExtraRecipientFields();
         }
  }
  

  
  initCustomForm()
