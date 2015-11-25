var isMobile = {
    Android: function () {
        return /Android/i.test(navigator.userAgent);
    },
    BlackBerry: function () {
        return /BlackBerry/i.test(navigator.userAgent);
    },
    iOS: function () {
        return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    Windows: function () {
        return /IEMobile/i.test(navigator.userAgent);
    },
    Chrome: function () {
        return /chrome/i.test(navigator.userAgent);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows() || isMobile.Chrome());
    }
};


//if (isMobile.iOS()) {alert('your on IOS');}
//if (isMobile.Android()) {alert('your on Android');}
//if (isMobile.Chrome()) {alert('your on Chrome');}
$(document).ready(function () {
    // duplicates for hamburger menu
    /*var NavOnLoad = $('#navDesktop>div').html();
    $(NavOnLoad).prependTo('#navMobile');*/

    if (!isMobile.Chrome()) { $('.hideNotChrome').hide(); }
    if (isMobile.iOS() || isMobile.Android()) { $('.show-IOS-Android').show(); }
    /*$('.level1>li>a').click(function(e){
    if (isMobile.Android() || isMobile.iOS()) {
    e.preventDefault();
    $(this).toggle(':hover');
    }	
    });*/

    //makes the megamenu showup
    $('.level1>li').mouseenter(function () {
        $('.level1>li').removeClass('hovered');
        $(this).addClass('hovered');
    });
    $('.level1>li').mouseleave(function () {
        $(this).removeClass('hovered');
    });

    $('.level1>li>a').click(function (e) {
        //alert('clicked');	
        if (isMobile.iOS() || isMobile.Android()) {
            e.preventDefault();
        }
        if (

				$(this).parent('li').hasClass('hovered')
				&&
				(isMobile.iOS() || isMobile.Android())

		) {
            $(this).parent('li').removeClass('hovered');
            //alert('true');
        } else {
            $(this).parent('li').addClass('hovered');
            //alert('false');
        }
    });

    /* find a job */
    function movefindJob() {
        var ObjectToMove = $('#findAJob');
        $(ObjectToMove).insertBefore('.subnav');
    }

    function movefindJobBack() {
        var ObjectToMove = $('#findAJob');
        $(ObjectToMove).prependTo('.rightCol');
    }

    /* Join Our Community */
    function moveJoinComm() {
        var ObjectToMove = $('#swapNavTrigger');
        $(ObjectToMove).appendTo('#JoinCommunityHere');
    }
    function moveJoinCommBack() {
        var ObjectToMove = $('#swapNavTrigger');
        $(ObjectToMove).appendTo('#JoinCommunity');
    }

    /*check the size of browser & run functions */
    function checkSize() {
        if (($('#stage1').css('display') != 'none') || ($('#stage2').css('display') != 'none')) {
            /*This is true if is under 768*/

            movefindJob();
            moveJoinComm();

            $('#footer .col-md-2>a').hide();
            $('#footer h6 a').click(function (e) {
               // alert('');
                e.preventDefault();
                var currentLinkDisplayState = $(this).parent('h6').siblings('a').css('display');
               // alert(currentLinkDisplayState);
                if (currentLinkDisplayState == 'none') {
                    $('#footer .col-md-2>a').hide();
                    $(this).parent('h6').siblings('a').toggle();
                } else { $('#footer .col-md-2>a').hide(); }
            });
        } else {
            movefindJobBack();
            moveJoinCommBack();

            $('#footer .col-md-2>a').show();
        }
    };

    // these next 3 are also part of the fixed element, addl' code within resize (to check width over again) and around line 217.
    if ($('.fixedElement').length > 0) {
        var initialOffset = $('.fixedElement').offset();
        var initialWidth = $('.fixedElement').width();
        var offsetTop = initialOffset.top;
    }

    checkSize();
    $(window).resize(function () {
        checkSize();
        if ($('.fixedElement').length > 0) {
            initialOffset = $('.fixedElement').offset();
            initialWidth = $('.fixedElement').width();
        }
    });

    /* Accordion */
    //$('.Accordion .content').hide();
    //$('.Accordion .tab.active').next('.content').show();
 
    $('.Accordion .tab').click(function () {
        if ($(this).hasClass('active')) {
            $(this).next('.content').slideUp();
            $('.Accordion .tab').removeClass('active');
        } else {
            $('.Accordion .tab').removeClass('active');
            $(this).addClass('active');
            $('.Accordion .content').slideUp();
            $(this).next('.content').slideDown();
        }
    });

        


    /* Nav mobile
    $('#navMobile button').click(function(){
    $('#navMobile .nav').toggle();
    $('#navMobile .level1>li').removeClass('open');
    $('#navMobile .level2>li').removeClass('open');
    });*/
    //Initial settings of what elements are parents, what aren't
    /*$('#navMobile .level1>li').each(function(){// for mobile, if level 1 has children, give it a 'parent' class
    if ($(this).children('.level2Container').size() > 0){
    $(this).addClass('parent');
    }
				
    });*/
    /*$('#navMobile .level2>li').each(function(){// for mobile, if level 2 has children, give it a 'parent' class
    //alert($(this).siblings('.level3').size() > 0);
    if ($(this).children('.level3').size() > 0){
    $(this).addClass('parent');
    }
    });*/
    // toggle level 2
    /*$('#navMobile .level1>li>a').click(function(e){ 
    e.preventDefault();
    if ($(this).parent('li').hasClass('open')){
    $('#navMobile .level1>li').removeClass('open');
    $('#navMobile .level2>li').removeClass('open');
    } else {
    $('#navMobile .level1>li').removeClass('open');
    $('#navMobile .level2>li').removeClass('open');
    $(this).parent('li').addClass('open');
    }
				
    });*/
    // toggle level 3
    /*$('#navMobile .level2>li>a').click(function(e){ 
    e.preventDefault();
    if ($(this).parent('li').hasClass('open')) {
    $('#navMobile .level2>li').removeClass('open');
    } else {
    $('#navMobile .level2>li').removeClass('open');
    $(this).parent('li').addClass('open');
    }
    });*/
    // Desktop Nav - makes sure the megamenu appears to left of stage, instead of even with button.
    $('.level1>li>a').mouseover(function () {
        var ItemO = $(this).offset();
        var NavO = $('.navbar').offset();
        var FirstO = $('.level1>li:first').offset();
        console.log(ItemO.left + 'ItemO - ' + NavO.left + 'FirstO');
        //console.log(FirstO.left+'FirstO');
        var ContainerO = NavO.left - ItemO.left;
        $(this).siblings('.level2Container').css('left', ContainerO);
    });

    // Related content (with overlay and such)
    $('.relatedContent .content>a').click(function (e) {
        e.preventDefault();
        var whichRelated = $(this).attr('class');
        $('#overlay').show();
        $('#' + whichRelated).show();
        $('#' + whichRelated + ' div').show();
    });
    $('.related .close, #overlay').click(function () {
        $('.related').hide();
        $('#overlay').hide();
    });


    // toggle search in mobile
    $('.mobileSearch a').click(function (e) {
        e.preventDefault();
        //$(this).parent('span').toggleClass('active');
        var keyword = $("#searchTxtboxMobile").val();
        var url = "/templates/pages/SearchResults.aspx?searchtext=";
        url += keyword
        window.open(url, '_self');
    });
    // sticky element that has scrolled past

    $(window).scroll(function (e) {
        $el = $('.fixedElement');
        if ($(this).scrollTop() > offsetTop && $el.css('position') != 'fixed') {
            $('.fixedElement').css({ 'position': 'fixed', 'top': '0px', 'width': initialWidth });
        }
        if ($(this).scrollTop() < offsetTop) {
            $('.fixedElement').css({ 'position': 'inherit' });
        }
    });

});
$(document).keyup(function (e) {
    if (e.keyCode == 27) {
        $('.related').hide();
        $('#overlay').hide();
    }   // esc key kills the overlay with related media
});


$(document).ready(function () {

    $('.Accordion .content').slideUp();
    $(".Accordion .tab:last").addClass('active');
    $(".Accordion .tab:last").next('.content').slideDown();
    

    $("#ctl00_megamenuDiv").show();
    $("#ctl00_ctl00_menuLayout_megamenuDiv").show();

});




