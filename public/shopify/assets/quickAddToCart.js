jQuery(document).ready(function(){
  $('.product-form').bind('submit',function(e) {
  	e.preventDefault();
    addItem(e.target);

    function addItem(form_id) {
       $.ajax({
          type: 'POST', 
          url: '/cart/add.js',
          dataType: 'json', 
          data: $(form_id).serialize(),
         success: function(response) {
            addToCartOk(response)
          },
          error: addToCartFail
        });
    }

    function addToCartOk(response) { 
      console.log('added to cart', response);

      let variant = {
        id: response.variant_id
      };

      let itemObject = {
        variant: variant
      }

      document.documentElement.dispatchEvent(new CustomEvent('theme:cart:popdown', {
            bubbles: true,
            detail: itemObject
      }));
     document.documentElement.dispatchEvent(new CustomEvent('theme:cart:init', {
            bubbles: true,
      }));

    } 

    function addToCartFail(obj, status) { 
        console.log(obj, status, 'item not added to cart');
    } 
  });
});