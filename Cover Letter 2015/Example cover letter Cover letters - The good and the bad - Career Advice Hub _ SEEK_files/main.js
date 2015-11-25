;(function ($,document,undefined) {

MQ = {
    small: 'only screen and (min-width: 50em)',
    mediumUp: 'only screen and (min-width: 50.063em)',
    largeUp: 'only screen and (min-width: 64.063em)'
}

window.app = {

    init: function () {
        var self = this;

        self.menu();
        self.imgToBg();
        self.sharePopup();
        self.imgLoad();
        self.shareThis();
        self.timeago();
        self.fbFeed();
        self.search();
        self.iframeVideo();
    },

    menu: function () {
        var $menu = $('.mobile-menu');

        function initMenuSlider() {
            if ( !Modernizr.mq( MQ.largeUp ) ) {
                if ( $menu.not('.slick-initialized') ) {
                    $menu.slick({
                        dots: false,
                        arrows: false,
                        variableWidth: true,
                        infinite: false,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    });
                }
            }
        }
        initMenuSlider();

        $(window).resize( function () {
            initMenuSlider();
        });
    },

    search: function () {
        $('.search-form').submit( function () {
            var action = $(this).attr('action');
            var searchline = $(this).find('input[name="searchline"]').val();
            window.location = action + 'search/' + searchline;
            return false;
        });
    },

    imgToBg: function () {
        $('.img-bg').each( function() {
            var $img = $(this).find('img').eq(0);
            $img.hide();
            $(this).css('backgroundImage','url("'+$img.attr('src')+'")');
        });
    },

    sharePopup: function () {
        var left = (screen.width/2)-(640/2);
        var top = (screen.height/2)-(320/2)-200;

        $('a.share-popup').click( function (e) {
            e.preventDefault();
            window.open($(this).attr('href'),
                'share_window',
                'height=320, width=640, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no, top='+top+', left='+left);
        });
    },

    imgLoad: function () {
        $( 'img' ).error(function() {
            $(this).remove();
        });
    },

    shareThis: function () {
        $('.st').each( function () {
            $(this).attr('st_title',$(this).attr('data-title'));

            if ( $(this).attr('data-url') ) {
                $(this).attr('st_url',$(this).attr('data-url'));
            }
            if ( $(this).attr('data-via') ) {
                $(this).attr('st_via',$(this).attr('data-via'));
            }
        });

        stLight.options({
            publisher: "045751e7-ee82-4ee6-a1ee-4f5fd3e5c6fb",
            doNotHash: false,
            doNotCopy: false,
            hashAddressBar: false,
            onhover: false,
            popup: false,
            shorten: false
        });

        app.shareButton();
    },

    shareButton: function () {
        $('.share-btn').not('.init').each( function (i, e) {
            $(this).addClass('init')
            $(this).click( function () {
                $(this).siblings('.share-pop').show();
            });

            $(this).parent().hover(function () {}, function () {
                $(this).find('.share-pop').hide();
            });
        });
    },

    timeago: function () {
        if ($.fn.timeago) {
            $('.timeago').timeago();
        }
    },

    pager: {
        page: 0,
        loadMore: function(ele) {
            var self = this;
            var href = $(ele).attr('href');
            self.page = self.page + 1;
            $('.blog-list').last().append('<div id="more-content-'+self.page+'" ></div>');
            $('.blog-list .more-articles').addClass('remove-on-load').hide();
            $('.blog-list .more-articles').after('<div class="more-articles loading remove-on-load">Loading &hellip;</div>');

            $('#more-content-'+self.page).load(href + ' .blog-item-list', { ajax: 1 } , function(response, status, xhr) {
                if (status == "error") {
                    var msg = "Sorry but there was an error: ";
                    console.log(msg);
                    $('.blog-list .more-articles').show();
                    $('.blog-list .more-articles.loading').remove();
                } else {
                    $('.blog-list .remove-on-load').remove();
                    app.shareButton();
                    stButtons.locateElements();
                }
            });
        }
    },

    fbFeed: function () {
        if ($('.fb-feed .fb-post').length > 0)
            $('.fb-feed').show();
    },

    iframeVideo: function () {
        $('iframe').each( function () {
            var src = $(this).attr('src');
            if (src.indexOf("youtube") > -1) {
                $(this).wrap('<div class="flex-video"></div>');
            }
        });
    }
}

$(document).foundation();

$(document).ready( function () {
    app.init();
});

})(jQuery, document);