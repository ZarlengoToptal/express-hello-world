(function($) {
		this.MobileNav = function() {
				this.curItem,
						this.curLevel = 0,
						this.transitionEnd = _getTransitionEndEventName();

				var defaults = {
						initElem: ".main-menu",
						menuTitle: "Menu"
				}

				// Check if MobileNav was initialized with some options and assign them to the "defaults"
				if (arguments[0] && typeof arguments[0] === "object") {
						this.options = extendDefaults(defaults, arguments[0]);
                }

				// Add to the "defaults" ONLY if the key is already in the "defaults"
				function extendDefaults(source, extender) {
						for (option in extender) {
								if (source.hasOwnProperty(option)) {
										source[option] = extender[option];
								}
						}
				}

				MobileNav.prototype.getCurrentItem = function() {
						return this.curItem;
				};

				MobileNav.prototype.setMenuTitle = function(title) {
						defaults.menuTitle = title;
						_updateMenuTitle(this);
						return title;
				};

				// Init is an anonymous IIFE
				(function(MobileNav) {
						var initElem = ($(defaults.initElem).length) ? $(defaults.initElem) : false;

						if (initElem) {
								defaults.initElem = initElem;
								_clickHandlers(MobileNav);
								_updateMenuTitle(MobileNav);
						} else {
								console.log(defaults.initElem + " element doesn't exist, menu not initialized.");
						}
				}(this));

				function _getTransitionEndEventName() {
						var i,
								undefined,
								el = document.createElement('div'),
								transitions = {
										'transition': 'transitionend',
										'OTransition': 'otransitionend', // oTransitionEnd in very old Opera
										'MozTransition': 'transitionend',
										'WebkitTransition': 'webkitTransitionEnd'
								};

						for (i in transitions) {
								if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
										return transitions[i];
								}
						}
				};

				function _clickHandlers(menu) {
                  		
						defaults.initElem.on('click', '.has-dropdown > a', function(e) {
								e.preventDefault();
                          		console.log('item clicked is ', $(this));
								menu.curItem = $(this).parent();
                          		console.log('parent of clicked item is ', menu.curItem);
								_updateActiveMenu(menu);
						});

						defaults.initElem.on('click', '.nav-toggle', function() {
								_updateActiveMenu(menu, 'back');
						});
				};

				// TODO: Make this DRY (deal with waiting for transitionend event)
				function _updateActiveMenu(menu, direction) {
						_slideMenu(menu, direction);
						if (direction === "back") {
// 								defaults.initElem.children('ul').one(menu.transitionEnd, function(e) {
// 										menu.curItem.removeClass('nav-dropdown-open nav-dropdown-active');
// 										menu.curItem = menu.curItem.parent().closest('li');
// 										menu.curItem.addClass('nav-dropdown-open nav-dropdown-active');
// 										_updateMenuTitle(menu);
// 								});

								menu.curItem.removeClass('nav-dropdown-open nav-dropdown-active');
								menu.curItem = menu.curItem.parent().closest('li');
								menu.curItem.addClass('nav-dropdown-open nav-dropdown-active');
								_updateMenuTitle(menu);
						} else {
								menu.curItem.addClass('nav-dropdown-open nav-dropdown-active');
								_updateMenuTitle(menu);
						}
				};

				// Update main menu title to be the text of the clicked menu item
				function _updateMenuTitle(menu) {
                   var title = defaults.menuTitle;

                  // inside a menu level or a title text has been provided
                  if (menu.curLevel > 0) {
                          title = menu.curItem.children('a').text();
                          defaults.initElem.find('.nav-toggle').addClass('back-visible');
                  } else {
                          defaults.initElem.find('.nav-toggle').removeClass('back-visible');
                  }

                  if (title == '' || title == null) {
                    // if default is set to none, add in html buttons on first layer
                    $('.nav-title').html('<div class="mobile-fixed-buttons-column"><a onclick="GorgiasChat.open();">CONCIERGE</a></div><div class="mobile-fixed-buttons-column no-border"><a href="/pages/account">LOGIN</a></div>');
                 	
                  } else {
                  	$('.nav-title').text(title);
                  }
				};

				// Slide the main menu based on current menu depth
				function _slideMenu(menu, direction) {
                  		const clickedEl = menu.curItem;
						const openedFirstTierEls = document.querySelectorAll('#first-tier-desktop > .nav-dropdown-active');
                  		const openedSecondTierEls = document.querySelectorAll('#second-tier-desktop > .nav-dropdown-active');
                  
                    	console.log("being clicked: ", clickedEl);
						console.log(openedFirstTierEls);
                  		console.log(openedSecondTierEls);
	
                  		 //user clicks another first tier, when no 2nd tier is open
                         if(openedFirstTierEls[0] && clickedEl[0].parentElement.id === 'first-tier-desktop') {
                         	console.log('user clicks another first tier, when no 2nd tier is open');
                            openedFirstTierEls[0].className = openedFirstTierEls[0].className.split(" ")[0]
                            
                            
                            //openedFirstTierEls[0].className = openedFirstTierEls[0].className.split(" ")[0]                         	openedSecondTierEls[0].removeAttribute('class','nav-dropdown-opened')

                         } 
                        //user clicks another first tier, existing 2nd tier open
                  		if(openedFirstTierEls[0] && openedSecondTierEls[0]) {
                         	console.log('user clicks another first tier, existing 2nd tier open');
                            //openedFirstTierEls[0].className = openedFirstTierEls[0].className.split(" ")[0]
                            //openedSecondTierEls[0].className = openedSecondTierEls[0].className.split(" ")[0]
                            //openedFirstTierEls[0].className = openedFirstTierEls[0].className.split(" ")[0]                         	openedSecondTierEls[0].removeAttribute('class','nav-dropdown-opened')
                         }
                  		
                  		//user clicks a second tier, 1st tier is assumed open
                  		if(openedSecondTierEls[0]) {
                       		console.log('user clicks a second tier, 1st tier is assumed open');
                            openedSecondTierEls[0].className = openedSecondTierEls[0].className.split(" ")[0]
                        }
						if (direction === "back") {
								menu.curLevel = (menu.curLevel > 0) ? menu.curLevel - 1 : 0;
						} else {
								menu.curLevel += 1;
						}
						defaults.initElem.children('ul').css({
								"transform": "translateX(-" + (menu.curLevel * 100) + "%)"
						});
				};
		}
}(jQuery));

$(document).ready(function() {
		var MobileMenu = new MobileNav({
				initElem: ".header__menu",
				menuTitle: "", 
		});
	
		$('.js-nav-toggle').on('click', function(e) {
			e.preventDefault();
			
			$('.nav-wrapper').toggleClass('show-menu');
		});
  
  		$('.menu-overlay').on('click', function(e) {
			e.preventDefault();
			$('.has-dropdown').removeClass('nav-dropdown-open nav-dropdown-active');
		});
          		
});