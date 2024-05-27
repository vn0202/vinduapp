(function ($, root, undefined) {

	$(window).on("load", function () {

		'use strict';
		// DOM ready, take it away
		handleNavbarPosition();
		setup_deep_links();
		resizePlansHeight();
		setTimeout(function () {
			initialOperations();
			setupClientsHeight();
			setupContactMessageHeight();
			initActionsContentSlider();
			initScrollReveal();
			// setupMarcasAnimations();
		}, 50)

		$(window).resize(function () {
			initialOperations();
			resizePlansHeight();
			setupClientsHeight();
			setupContactMessageHeight();
			// updateContentSliderHeight();
		});

		$(window).scroll(function (event) {
			var scroll = $(window).scrollTop();
			var arrow = $("#go-up-arrow");
			if (scroll > $(window).height() / 2) {
				arrow.addClass("visible")
			} else {
				arrow.removeClass("visible")
			}
			//handleNavbarPosition();
			checkActiveSection();
		});
		UnblockPage();
	});

	function BlockPage() {
		$(".page-blocker").fadeIn();
	}

	function UnblockPage() {
		$(".page-blocker").fadeOut();
	}

	// function setupMarcasAnimations(){
	//     var icons = $("#body-marcas .picture");
	//     icons.each(function(index,item){
	//         var icon = $(item);
	//         animateMarcasIcons(icon)
	//     });
	// }

	// function animateMarcasIcons(icon){
	//     icon.animate({deg: 180}, 500,function(){

	//             animateMarcasIcons(icon);

	//     })
	// }

	function checkActiveSection() {
		var buttons = $($('#menu-items .navbar-item a').get().reverse());
		var targetSections = $('.target-section');
		var currentPosition = $(window).scrollTop();
		var currentWidth = $(window).width();
		buttons.each(function (index, item) {
			var navbarItem = $(item).parent();
			var identifier = this.getAttribute('href');
			identifier = identifier.substring(1, identifier.length);
			var target = $(".target-section[id='" + identifier + "']");
			var nextTarget = $(targetSections[index + 1]);
			var positionTop = target.offset().top - 68;
			var positionBottom = nextTarget.length > 0 ? nextTarget.offset().top - 68 : null;

			if (currentWidth > 798) {
				if (positionBottom != null) {
					if (currentPosition >= positionTop - 150 && currentPosition < positionBottom - 150) {
						navbarItem.addClass("active");
					} else {
						navbarItem.removeClass("active");
					}
				} else {
					if (currentPosition >= positionTop - 150) {
						navbarItem.addClass("active");
					} else {
						navbarItem.removeClass("active");
					}
				}
			} else {
				if (positionBottom != null) {
					if (currentPosition >= positionTop && currentPosition < positionBottom) {
						navbarItem.addClass("active");
					} else {
						navbarItem.removeClass("active");
					}
				} else {
					if (currentPosition >= positionTop) {
						navbarItem.addClass("active");
					} else {
						navbarItem.removeClass("active");
					}
				}
			}

		});
	}

	function handleNavbarPosition() {
		var nav = $('#secondary-navbar');
		if (nav.length) {
			var fixmeTop = 52;
			$(window).scroll(function () {
				var currentScroll = $(window).scrollTop();
				if (currentScroll >= fixmeTop) {
					$('#secondary-navbar').css({
						position: 'fixed',
						top: '0px',
						left: '0'
                    });
                    $('#secondary-navbar .logo').addClass('active');
					$('#navbar').css({
						display: 'none'
					});
				} else {
					$('#secondary-navbar').css({
						position: 'fixed',
						top: fixmeTop + 'px',
						left: '0px'
                    });
                    $('#secondary-navbar .logo').removeClass('active');                    
					$('#navbar').css({
						display: 'block'
					});
				}
			});
		}
	}

	function initialOperations() {
		var bgImportantFeatures = $("#puntos-importantes-container");
		var greenBoxImportantFeatures = $("#green-important-features-filter");
        var slider = $(".my-slider");
        var sliderItem = $(".my-slider .tns-item");
		var greenBox = $("#green-slider-filter");
		var pinkShapeText = $("#pink-shape-text");
		var pinkShape = $("#pink-shape");

		var newSize = sliderItem.width() * 80 / 1920;
		var newPadding = sliderItem.width() * 100 / 1920;
		var newTopPositionForShapeText = sliderItem.height() * (350 / 750) - 100;
		var newTopPositionForShape = sliderItem.height() * (250 / 750) - 100;

		if (newTopPositionForShape < 140) {
			newTopPositionForShape = 140;
		}

		if (newTopPositionForShapeText < 160) {
			newTopPositionForShapeText = 160;
		}

		pinkShapeText.css({
			'font-size': newSize + "px",
			'padding-left': newPadding + "px",
			'padding-right': newPadding + "px",
			'top': newTopPositionForShapeText + "px"
		})
		pinkShape.css({
			'top': newTopPositionForShape + "px"
		})

		if (slider.length > 0) {
			greenBox.height(slider.outerHeight());
			greenBoxImportantFeatures.height(bgImportantFeatures.outerHeight());
		}
	}

	function setup_deep_links() {
		jQuery('a[href^="#"]').on('click', function (event) {
			var target = jQuery(this.getAttribute('href'));
			if (target.length) {
				event.preventDefault();
				jQuery('html, body').stop().animate({
					scrollTop: target.offset().top - 30
				}, 1000);
			}
		});
	}

	function resizePlansHeight() {
		var plans = $('.plan .body');
		var maxHeight = 0;
		plans.each(function (index, item) {
			$(item).css('min-height', 'auto');
		})
		if (window.innerWidth > 1000) {
			plans.each(function (index, item) {
				var height = $(item).height();
				if (height > maxHeight) {
					maxHeight = height;
				}
			});
			maxHeight += 30;
			plans.each(function (index, item) {
				$(item).css('min-height', maxHeight + 'px');
			})
		}
	}

	function setupClientsHeight() {
		var clients = $('.my-customers-slider .customers-slider-item');
		var container = $('#clientes-container');
		var background = $('#clientes-container .bg');
		var maxHeight = 0;
		clients.each(function (index, item) {
			$(item).css('min-height', 'auto');
			$(item).css('height', 'auto');
		})

		clients.each(function (index, item) {
			var height = $(item).height();
			if (height > maxHeight) {
				maxHeight = height;
			}
		});
		maxHeight = maxHeight;
		clients.each(function (index, item) {
			$(item).css('min-height', maxHeight + 'px');
			$(item).css('height', maxHeight + 'px');
		})

		var containerHeight = 164 + maxHeight + 164;

		background.css('min-height', containerHeight + 'px');

	}

	function setupContactMessageHeight() {
		var messageBox = $('#contacto-container #contacto-body #message');
		var columnLeft = $('#contacto-container #contacto-body .column-left');
		var sustract = $('#contacto-container #contacto-body .column-left .contacto-label.name');

		var messageHeight = columnLeft.height() - sustract.outerHeight() - 70;
		messageBox.height(messageHeight);
	}

	function initActionsContentSlider() {
		let interval = null;
		let running = false;
		$('.customLink').click(function () {
			if (running)
				return;
				
			running = true;
			clearInterval(interval);
			let targetAction = $(this).data('target');
			let currentImage = $('.acciones-img.active');
			let currentText = $('.text.active');
			let currentDot = $('.dot.active');

			// Find the target element id to display.
			let target = 0;
			if (targetAction == 'prev' || targetAction == 'next') {
				let currentItem = currentImage.data('slider-img');
				let countItems = $('.acciones-img').length;

				if (targetAction == 'prev')
					target = parseInt(currentItem) != 0 ? parseInt(currentItem) - 1 : countItems - 1;
				else
					target = parseInt(currentItem) != countItems - 1 ? parseInt(currentItem) + 1 : 0;
			}
			else
				target = parseInt(targetAction);

			// Display the new target element and hide the old one.
			let nextImage = $('.acciones-img[data-slider-img="' + target + '"]');
			let nextText = $('.text[data-slider-txt="' + target + '"]');
			let nextDot = $('.dot[data-target="' + target + '"]');

			currentImage.fadeOut(400, function () {
				$('.acciones-img').removeClass('active');
				nextImage.fadeIn(400, function () {
					nextImage.addClass('active');
				});
			});

			currentText.fadeOut(400, function () {
				$('.text').removeClass('active');
				nextText.fadeIn(400, function () {
					nextText.addClass('active');
				});
			});

			$('.dot').removeClass('active');
			nextDot.addClass('active');

			interval = setInterval(function () {
				$('.customLink[data-target="next"]').click();
			}, 4000);
			running = false;
		});

		interval = setInterval(function () {
			$('.customLink[data-target="next"]').click();
		}, 4000);
	}


	function initScrollReveal() {
		window.sr = ScrollReveal({
			// Custom options here
		});

		sr.reveal('#pink-shape', {
			origin: 'right',
			distance: '500px',
			rotate: {
				x: 90,
				y: 0,
				z: 0
			}
		});

		sr.reveal('#pink-shape-text', {
			delay: 500
		})

		sr.reveal('#about-vindu-container .step', {
			delay: 500
		}, 100)

		sr.reveal('.scroll-reveal.bottom', {
			origin: 'bottom',
			duration: 1000,
			distance: '250px'
		});

		sr.reveal('.scroll-reveal.right', {
			origin: 'right',
			duration: 1000,
			distance: '500px'
		});

		sr.reveal('.scroll-reveal.left', {
			origin: 'left',
			duration: 1000,
			distance: '500px'
		});

		sr.reveal('#body-marcas .item', {
			delay: 500,
			distance: '250px'
		}, 100)

		sr.reveal('#body-usuarios .col-60 .ventaja-item', {
			delay: 500,
			origin: 'right',
			distance: '250px'
		}, 100)

		if (window.outerWidth > 1000) {
			sr.reveal('#planes-container .plan', {
				distance: '250px'
			}, 200)
		} else {
			sr.reveal('#planes-container .plan', {
				distance: '250px'
			})
		}

		sr.reveal('#nuestras-acciones-container .slider', {
			distance: '250px',
			beforeReveal: function (domEl) {
				$('#nuestras-acciones-container .slidesContainer').css('transform', 'none');
			},
			beforeReset: function (domEl) {
				$('#nuestras-acciones-container .slidesContainer').css('transform', 'none');
			},
			afterReveal: function (domEl) {
				$('#nuestras-acciones-container .slidesContainer').css('transform', 'none');
			},
			afterReset: function (domEl) {
				$('#nuestras-acciones-container .slidesContainer').css('transform', 'none');

			}
		})

		sr.reveal('#contacto-body .field-left', {
			distance: '250px',
			origin: 'left'
		}, 200)

		sr.reveal('#contacto-body .field-right', {
			delay: 600,
			distance: '250px',
			origin: 'right'
		})



	}

})(jQuery, this);

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function openMenuDropDown() {
	var dropdown = jQuery("#myDropdown");
	if (dropdown.hasClass("show")) {
		dropdown.removeClass("show")
	} else {
		dropdown.addClass("show")
	}
}

function goHome() {
	jQuery('html, body').animate({
		scrollTop: 0
	}, 1000);
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
	if (!event.target.matches('.dropbtn')) {

		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
			var openDropdown = dropdowns[i];
			if (openDropdown.classList.contains('show')) {
				openDropdown.classList.remove('show');
			}
		}
	}
}