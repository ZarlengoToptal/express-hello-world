function quickView() {
    $(document).on('click', '.quick-view', function() {
     
        if ($('#quick-view').length == 0) {
            $("body").append('<div id="quick-view"></div>');
        }

        var product_handle = $(this).data('handle');

        $('#quick-view').addClass(product_handle);

        jQuery.getJSON('/products/' + product_handle + '.js', function(product) {
          
          	var vendor = product.vendor;
            var title = product.title;
            var type = product.type;
            var price = 0;
            var original_price = 0;
            var desc = product.description;
            var images = product.images;
            var variants = product.variants;
            var options = product.options;
            var url = '/products/' + product_handle;
          	var id = options.id;

            $('.qv-product-title').text(title);
            $('.qv-product-type').text(type);
            $('.qv-product-description').html(desc);
            $('.view-product').attr('href', url);
          	$('.qv-vendor').text(vendor);

            var imageCount = $(images).length;

            $(images).each(function(i, image) {
                if (i == imageCount - 1) {
                    var image_embed = '<div><img class="lazy2 lazyload fade-in" data-src="' + image + '"></div>';
                    image_embed = image_embed.replace('.jpg', '_800x.jpg').replace('.png', '_800x.png');
                    $('.qv-product-images').append(image_embed);
                } else {
                    image_embed = '<div><img class="lazyload fade-in" data-src="' + image + '"></div>';
                    image_embed = image_embed.replace('.jpg', '_800x.jpg').replace('.png', '_800x.png');
                    $('.qv-product-images').append(image_embed);
                }
            });

            $(options).each(function(i, option) {	
                var opt = option.name;
                var selectClass = '.option.' + opt.toLowerCase();

                $('.qv-product-options').append('<div class="option-selection-' + opt.toLowerCase() + '"><span class="option">' + opt + '</span><select name="id" id="ProductSelect-product" data-section="product" class="product-form__variants no-js option-' + i + ' option ' + opt.toLowerCase() + '"></select></div>');
                $(option.values).each(function(i, value) {
                    $('.option.' + opt.toLowerCase()).append('<option value="' + value + '">' + value + '</option>');
                });
            });

            $(product.variants).each(function(i, v) {
                if (v.inventory_quantity == 0) {
                    $('.qv-add-button').prop('disabled', true).val('Sold Out');
                    $('.qv-add-to-cart').hide();
                    $('.qv-product-price').text('Sold Out').show();
                    return true
                } else {
                    price = parseFloat(v.price / 100).toFixed(2);
                    original_price = parseFloat(v.compare_at_price / 100).toFixed(2);
                    $('.qv-product-price').text('$' + price);
                    
                  if (original_price > 0) {
                        $('.qv-product-original-price').text('$' + original_price).show();
                  } else {
                        $('.qv-product-original-price').hide();
                  }

                  $('select.option-0 option').val(v.id);
                  $('select.option-1 option').val(v.id);
                  $('select.option-2 option').val(v.id);

                  return false
                }
            });

            //instantiate the slider after data loaded
            $('.qv-product-images').slick({
                'dots': true,
                'arrows': true,
                'respondTo': 'min',
                'useTransform': false,
                customPaging: function(slider, i) {
                    const sliderEl = slider.$slides[i];
                    const imgEl = sliderEl.firstElementChild; //800px
                    const srcLarge = imgEl.getAttribute("data-src");
                    const srcSmall = srcLarge.replace("800x", "40x");
                    return '<img src="' + srcSmall + '">';
                }
            }).css('opacity', '1');
       });

        $.fancybox({
            href: '#quick-view',
            maxWidth: 1040,
            maxHeight: 600,
            fitToView: true,
            width: '93%',
            height: '70%',
            autoSize: false,
            closeClick: false,
            openEffect: 'none',
            closeEffect: 'none',

            'beforeLoad': function() {
              
            },
            'afterShow': function() {
              $('#quick-view').hide().html(content).css('opacity', '1').fadeIn(function() {
                  $('.qv-product-images').addClass('loaded');
              });
              $('.product-form').bind('submit',function(e) {
                e.preventDefault();
        
                
                addItem(e.target);

                function addItem(form_id) {
                   $.ajax({
                      type: 'POST', 
                      url: '/cart/add.js',
                      dataType: 'json', 
                      data: $(form_id).serialize(),
                       success: function(response){
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
                  
                  parent.$.fancybox.close();
                  $('.fancybox-wrap').css('overflow', 'hidden !important');
                } 

                function addToCartFail(obj, status) { 
                    console.log(obj, status, 'item not added to cart');
                } 
              });

            },
            'afterClose': function() {
                $('#quick-view').removeClass().empty();
            }
        });
    });
};


$(document).ready(function () {
    quickView();
});

$(window).resize(function() {
    if ($('#quick-view').is(':visible')) {
        $('.qv-product-images').slick('setPosition');
    }
});