import '../styles/index.scss';

(function ($) {
    'use strict';

    $(document).ready(function () {

        // Scroll to element
        $.fn.scrollToElement = function (opt) {
            if (!this.length) return this;
            let defaults = {
                element: '',
                speed: '500',
                active_class: '',
                section: ''
            }, options = $.extend(defaults, opt), ids = [], anchor, scrollTimer = null, $scrollTop;
            return this.each(function () {
                let $this = $(this),
                    $elements = $this.find(options.element),
                    $allAnchors = $elements.find('a');
        
                if (!!options.section) {
                    $(options.section).each(function () {
                        ids.push('#' + $(this).attr('id'));
                    });
                    _add_active_class();
                }
                $elements.each(function () {
                    let $element = $(this);
                    if (!!options.active_class) {
                        $element.click(function () {
                            $elements.removeClass(options.active_class);
                            $element.addClass(options.active_class);
                        });
                    }
                    anchor = $(this).find('a');
                    let attr = anchor.attr('href');
        
                    anchor.click(function (e) {
                        let $dataTop = $(this).attr('data-scroll-top');
                        $scrollTop = typeof $dataTop !== typeof undefined && $dataTop !== false ? Number($dataTop) : 50;
                        if (attr) {
                            e.preventDefault();
                        }
                        if (typeof attr !== typeof undefined && attr !== false) {
                            _scroll(attr, $scrollTop);
                        }
                    });
                });
        
                function _scroll(attr, top) {
                    $('html, body').animate({
                        scrollTop: $(attr).offset().top - top
                    }, options.speed);
                }
        
                function _add_active_class() {
                    $(window).scroll(function () {
                        if (scrollTimer) {
                            clearTimeout(scrollTimer);
                        }
                        scrollTimer = setTimeout(pageScroll, 50);
                    });
        
                    function pageScroll() {
                        let windowTop = $(window).scrollTop(), visibleElement;
                        $.each(ids, function () {
                            if (windowTop > $(this).offset().top - 500) {
                                visibleElement = this;
                            }
                        });
                        $allAnchors.each(function () {
                            let $self = $(this);
                            let $t = $self.get(0);
                            $($t).parent().removeClass(options.active_class);
                            let href = $($t).attr('href');
                            if (href.startsWith('/')) {
                                href = href.substr(1);
                            }
                            if (href === visibleElement) {
                                $($t).parent().addClass(options.active_class)
                            }
                        });
                    }
                }
            });
        };
        
        $('.js-scroll-menu').scrollToElement({
            element: '.js-scroll-element',
            speed: 750,
            active_class: 'active',
            section: '.js-scroll-section'
        });
        
        //scroll to
        $.fn.scrollTo = function (opt, callback) {
            if (!this.length) return this;
            const defaults = {
                href: '#',
                speed: 750,
                top: 0
            }, options = $.extend(defaults, opt);
            let href = options.href, speed = options.speed, top = options.top;
            return this.each(function () {
                $(this).on('click', function (e) {
                    e.preventDefault();
                    if (typeof callback === "function") callback();
                    $('html, body')
                        .animate({
                            scrollTop: $(href).offset().top - top
                        }, speed)
                });
            })
        };
        
        $('#new-id').scrollTo({
            href: '#testimonial',
            speed: 750,
            top: 10
        });

        // hamburger 
        var $hamburger = $(".hamburger");
        $hamburger.on("click", function(e) {
            $hamburger.toggleClass("is-active");
            $("hamburger--squeeze").click(function() {
                $("#navbarNav").hide();
            });
            $("hamburger--squeeze").click(function() {
                $("#navbarNav").show();
            });
        });




        // animation nav 

        $.fn.scrollToElement = function () {
            if (!this.length) return this;
            let navbarHeight = $('.navbar').outerHeight();
            return this.each(function () {
              let $this = $(this);
              $this.on('click', function (event) {
                event.preventDefault();
                let href = $this.attr('href');
                $('html, body').animate({
                  scrollTop: $(href).offset().top - navbarHeight
                }, 500);
              })
            });
          };
          let scrollElement = $('.nav-link, .navbar-brand');
          scrollElement.scrollToElement(80);
        
        
          $(window).on('scroll', function () {
            let scroll_top = $(window).scrollTop();
            let navbar = $('.navbar');
            let navLink = $('.navbar .nav-item');
            if (scroll_top > 120) {
              navbar.addClass('scrolled');
              navLink.addClass('scrolled-text-color'); 

            } else {
              navbar.removeClass('scrolled');
              navLink.removeClass('scrolled-text-color'); 
            }
          })

    

    });

})(jQuery);




