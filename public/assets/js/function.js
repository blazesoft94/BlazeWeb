/**
 * Created by Hoang on 8/16/2016.
 */
$(document).ready(function () {
    'use strict';
// wow js
    new WOW().init();

    function creat_init_owl_carousel() {

        $('.slide-owl-carousel').each(function () {
            var $this = $(this),
                $loop = $this.attr('data-loop') == 'yes',
                $numberItem = parseInt($this.attr('data-number'),10),
                $Nav = $this.attr('data-navControl') == 'yes',
                $Dots = $this.attr('data-Dots') == 'yes',
                $autoplay = $this.attr('data-autoPlay') == 'yes',
                $autoplayTimeout = parseInt($this.attr('data-autoPlayTimeout'),10),
                $marginItem = parseInt($this.attr('data-margin'),10),
                $rtl = $this.attr('data-rtl') == 'yes',
                $resNumber; // Responsive Settings
            $numberItem = (isNaN($numberItem)) ? 1 : $numberItem;
            $autoplayTimeout = (isNaN($autoplayTimeout)) ? 4000 : $autoplayTimeout;
            $marginItem = (isNaN($marginItem)) ? 0 : $marginItem;
            switch ($numberItem) {
                case 1 :
                    $resNumber = {
                        0: {
                            items: 1
                        }
                    };
                    break;
                case 2 :
                    $resNumber = {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 1
                        },
                        768: {
                            items: 2
                        },
                        992: {
                            items: $numberItem
                        }
                    };
                    break;
                case 3 :
                case 4 :
                    $resNumber = {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 1
                        },
                        768: {
                            items: 2
                        },
                        992: {
                            items: 3
                        },
                        1200: {
                            items: $numberItem
                        }
                    };
                    break;
                default : // $numberItem > 4
                    $resNumber = {
                        0: {
                            items: 1
                        },
                        480: {
                            items: 2
                        },
                        768: {
                            items: 3
                        },
                        992: {
                            items: 4
                        },
                        1200: {
                            items: $numberItem
                        }
                    };
                    break;
            } // Endswitch

            $(this).owlCarousel({
                loop: $loop,
                nav: $Nav,
                navText: ['', ''],
                dots: $Dots,
                autoplay: $autoplay,
                autoplayTimeout: $autoplayTimeout,
                margin: $marginItem,
                //responsiveClass:true,
                rtl: $rtl,
                responsive: $resNumber,
                autoplayHoverPause: true,
                //center: true,
                onRefreshed: function () {
                    var total_active = $this.find('.owl-item.active').length;
                    var i = 0;
                    $this.find('.owl-item').removeClass('active-first active-last');
                    $this.find('.owl-item.active').each(function () {
                        i++;
                        if (i == 1) {
                            $(this).addClass('active-first');
                        }
                        if (i == total_active) {
                            $(this).addClass('active-last');
                        }
                    });
                },
                onTranslated: function () {
                    var total_active = $this.find('.owl-item.active').length;
                    var i = 0;
                    $this.find('.owl-item').removeClass('active-first active-last');
                    $this.find('.owl-item.active').each(function () {
                        i++;
                        if (i == 1) {
                            $(this).addClass('active-first');
                        }
                        if (i == total_active) {
                            $(this).addClass('active-last');
                        }
                    });
                },
                onResized: function () {
                }
            });
        });
    }

    creat_init_owl_carousel();

    function portfolio_isotope() {
        // init Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            getSortData: {
                name: '.name',
                symbol: '.symbol',
                number: '.number parseInt',
                category: '[data-category]',
                weight: function (itemElem) {
                    var weight = $(itemElem).find('.weight').text();
                    return parseFloat(weight.replace(/[\(\)]/g, ''));
                }
            }
        });

        // filter functions
        var filterFns = {
            // show if number is greater than 50
            numberGreaterThan50: function () {
                var number = $(this).find('.number').text();
                return parseInt(number, 10) > 50;
            },
            // show if name ends with -ium
            ium: function () {
                var name = $(this).find('.name').text();
                return name.match(/ium$/);
            }
        };

        // bind filter button click
        $('#filters').on('click', '.portfolio-button', function () {
            var filterValue = $(this).attr('data-filter');
            // use filterFn if matches value
            filterValue = filterFns[filterValue] || filterValue;
            $grid.isotope({filter: filterValue});
        });

        // bind sort button click
        $('#sorts').on('click', '.portfolio-button', function () {
            var sortByValue = $(this).attr('data-sort-by');
            $grid.isotope({sortBy: sortByValue});
        });

        // change is-checked class on buttons
        $('.porfolio-buttons').each(function (i, buttonGroup) {
            var $buttonGroup = $(buttonGroup);
            $buttonGroup.on('click', '.portfolio-button', function () {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $(this).addClass('is-checked');
            });
        });
    }

    // smooths croll
    function smooth_scroll() {
        $(function () {
            // This will select everything with the class smoothScroll
            // This should prevent problems with carousel, scrollspy, etc...
            $('a[href*="#"]:not([href="#"]):not([href*="#mm-"]):not([href="#primary-navigation"])').not('a[data-toggle="tab"]').on('click',function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('html,body').stop().animate({
                            scrollTop: target.offset().top
                        }, 1000); // The number here represents the speed of the scroll in milliseconds
                        return false;
                    }
                }
            });
        });
    }

    // Change the speed to whatever you want
    // Personally i think 1000 is too much
    // Try 800 or below, it seems not too much but it will make a difference
    function detail_project_sticky() {
        if ($(window).width() > 1024) {
            var heightoff = 0;
            if ($('#wpadminbar').length) {
                heightoff = $('#wpadminbar').outerHeight();
            }
            $('.project-sticky-detail .project-info').sticky();
        }
    }
    function sticky_project() {
        var scrollUp = 0;
        $(window).scroll(function (event) {
            var scrollTop = $(this).scrollTop();
            var ww_width = $(window).innerWidth();
            var height_single_left = $('.project-sticky-detail .project-gallery').outerHeight() - $('.project-sticky-detail .project-info').outerHeight();
            if (ww_width > 1024) {
                //Remove summary sticky
                if (scrollTop > height_single_left / 2) {
                    $('.project-sticky-detail .project-info').addClass('remove-sticky-detail-half')
                } else {
                    $('.project-sticky-detail .project-info').removeClass('remove-sticky-detail-half');
                }
                if (scrollTop > height_single_left) {
                    $('.project-sticky-detail .project-info').addClass('remove-sticky-detail')
                } else {
                    $('.project-sticky-detail .project-info').removeClass('remove-sticky-detail');
                }
                scrollUp = scrollTop;
            }
        });

    }

    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 200) {
            $('.main-header.header-fixed').addClass('menu-bg');
        } else {
            $('.main-header.header-fixed').removeClass('menu-bg')
        }
    });
    $(".fancybox-button").on('click',function() {
        $.fancybox({
            'padding'		: 0,
            'autoScale'		: false,
            'transitionIn'	: 'none',
            'transitionOut'	: 'none',
            'title'			: this.title,
            'width'			: 1280,
            'height'		: 720,
            'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
            'type'			: 'swf',
            'swf'			: {
                'wmode'				: 'transparent',
                'allowfullscreen'	: 'true'
            },
            helpers: {
                media: {}
            }
        });

        return false;
    });
    $("#primary-navigation").mmenu({
        extensions: ['effect-slide-menu', 'pageshadow'],
        navbar: {
            title: 'Menu'
        },
        navbars: [
            {
                position: 'top',
                content: [
                    'prev',
                    'title',
                    'close'
                ]
            }
        ]
    }, {
        // configuration
        clone: true
    });

    //EQUAL ELEM

    function better_equal_elems() {
        setTimeout(function () {
            $('.equal-container').each(function () {
                var $this = $(this);
                if ($this.find('.equal-element').length) {
                    $this.find('.equal-element').css({
                        'height': 'auto'
                    });
                    var elem_height = 0;
                    $this.find('.equal-element').each(function () {
                        var this_elem_h = $(this).height();
                        if (elem_height < this_elem_h) {
                            elem_height = this_elem_h;
                        }
                    });
                    $this.find('.equal-element').height(elem_height);
                }
            });
        }, 1000);
    }
    function sticky_scrollup() {
        if ($('.project-header-wrap').length){
            var previousScroll = 0,
                headerOrgOffset = $('.project-header').offset().top;

            $('.project-header-wrap').outerHeight($('.project-header').outerHeight());

            $(window).scroll(function () {
                var currentScroll = $(this).scrollTop();
                if (currentScroll > headerOrgOffset) {
                    if (currentScroll > previousScroll) {
                        $('.project-header').fadeOut();
                    } else {
                        $('.project-header').fadeIn();
                        $('.project-header').addClass('fixed');
                    }
                } else {
                    $('.project-header').removeClass('fixed');
                }
                previousScroll = currentScroll;
            });
        }
    }
    function lexio_google_maps() {
        if ($('.lexio-google-maps').length <= 0) {
            return;
        }
        $('.lexio-google-maps').each(function () {
            var $this = $(this),
                $id = $this.attr('id'),
                $title_maps = $this.attr('data-title_maps'),
                $phone = $this.attr('data-phone'),
                $email = $this.attr('data-email'),
                $zoom = parseInt($this.attr('data-zoom'),10),
                $latitude = $this.attr('data-latitude'),
                $longitude = $this.attr('data-longitude'),
                $address = $this.attr('data-address'),
                $map_type = $this.attr('data-map-type'),
                $pin_icon = $this.attr('data-pin-icon'),
                $modify_coloring = true,
                $saturation = $this.attr('data-saturation'),
                $hue = $this.attr('data-hue'),
                $map_style = $this.data('map-style'),
                $styles;

            if ($modify_coloring == true) {
                var $styles = [
                    {
                        stylers: [
                            {hue: $hue},
                            {invert_lightness: false},
                            {saturation: $saturation},
                            {lightness: 1},
                            {
                                featureType: "landscape.man_made",
                                stylers: [{
                                    visibility: "on"
                                }]
                            }
                        ]
                    }, {
                        "featureType": "all",
                        "elementType": "labels.text.fill",
                        "stylers": [{"saturation": 36}, {"color": "#000000"}, {"lightness": 40}]
                    }, {
                        "featureType": "all",
                        "elementType": "labels.text.stroke",
                        "stylers": [{"visibility": "on"}, {"color": "#000000"}, {"lightness": 16}]
                    }, {
                        "featureType": "all",
                        "elementType": "labels.icon",
                        "stylers": [{"visibility": "off"}]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [{"color": "#000000"}, {"lightness": 20}]
                    }, {
                        "featureType": "administrative",
                        "elementType": "geometry.stroke",
                        "stylers": [{"color": "#000000"}, {"lightness": 17}, {"weight": 1.2}]
                    }, {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [{"color": "#000000"}, {"lightness": 20}]
                    }, {
                        "featureType": "poi",
                        "elementType": "geometry",
                        "stylers": [{"color": "#000000"}, {"lightness": 21}]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [{"color": "#000000"}, {"lightness": 17}]
                    }, {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [{"color": "#000000"}, {"lightness": 29}, {"weight": 0.2}]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "geometry",
                        "stylers": [{"color": "#000000"}, {"lightness": 18}]
                    }, {
                        "featureType": "road.local",
                        "elementType": "geometry",
                        "stylers": [{"color": "#000000"}, {"lightness": 16}]
                    }, {
                        "featureType": "transit",
                        "elementType": "geometry",
                        "stylers": [{"color": "#000000"}, {"lightness": 19}]
                    }, {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [{"color": "#000000"}, {"lightness": 17}]
                    }
                ];
            }
            var map;
            var bounds = new google.maps.LatLngBounds();
            var mapOptions = {
                zoom: $zoom,
                panControl: true,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                draggable: true,
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId[$map_type],
                styles: $styles
            };

            map = new google.maps.Map(document.getElementById($id), mapOptions);
            map.setTilt(45);

            // Multiple Markers
            var markers = [];
            var infoWindowContent = [];

            if ($latitude != '' && $longitude != '') {
                markers[0] = [$address, $latitude, $longitude];
                infoWindowContent[0] = [$address];
            }

            var infoWindow = new google.maps.InfoWindow(), marker, i;

            for (i = 0; i < markers.length; i++) {
                var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                bounds.extend(position);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: markers[i][0],
                    icon: $pin_icon
                });
                if ($map_style == '1') {

                    if (infoWindowContent[i][0].length > 1) {
                        infoWindow.setContent(
                            '<div style="background-color:#fff; padding: 30px 30px 10px 25px; width:290px;line-height: 22px" class="lexio-map-info">' +
                            '<h4 class="map-title">' + $title_maps + '</h4>' +
                            '<div class="map-field"><i class="fa fa-map-marker"></i><span>&nbsp;' + $address + '</span></div>' +
                            '<div class="map-field"><i class="fa fa-phone"></i><span>&nbsp;' + $phone + '</span></div>' +
                            '<div class="map-field"><i class="fa fa-envelope"></i><span><a href="mailto:' + $email + '">&nbsp;' + $email + '</a></span></div> ' +
                            '</div>'
                        );
                    }

                    infoWindow.open(map, marker);

                }
                if ($map_style == '2') {
                    google.maps.event.addListener(marker, 'click', (function (marker, i) {
                        return function () {
                            if (infoWindowContent[i][0].length > 1) {
                                infoWindow.setContent(
                                    '<div style="background-color:#fff; padding: 30px 30px 10px 25px; width:290px;line-height: 22px" class="lexio-map-info">' +
                                    '<h4 class="map-title">' + $title_maps + '</h4>' +
                                    '<div class="map-field"><i class="fa fa-map-marker"></i><span>&nbsp;' + $address + '</span></div>' +
                                    '<div class="map-field"><i class="fa fa-phone"></i><span>&nbsp;' + $phone + '</span></div>' +
                                    '<div class="map-field"><i class="fa fa-envelope"></i><span><a href="mailto:' + $email + '">&nbsp;' + $email + '</a></span></div> ' +
                                    '</div>'
                                );
                            }

                            infoWindow.open(map, marker);
                        }
                    })(marker, i));
                }

                map.fitBounds(bounds);
            }

            var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
                this.setZoom($zoom);
                google.maps.event.removeListener(boundsListener);
            });
        });
    }
    $(window).on("resize", function () {
        detail_project_sticky();
        sticky_project();
        better_equal_elems();
        sticky_scrollup()
    });
    $(document).ready(function () {
        detail_project_sticky();
        sticky_project();
        sticky_scrollup();
        $('.scrollbar-macosx').scrollbar();
        lexio_google_maps();
    });
    $(window).on("load",function () {
        detail_project_sticky();
        sticky_project();
        better_equal_elems();
        sticky_scrollup();
        smooth_scroll();
        portfolio_isotope();
    });

    //for counter-up
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

});



