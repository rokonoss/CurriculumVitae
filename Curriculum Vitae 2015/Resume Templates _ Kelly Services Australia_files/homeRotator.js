var thumbYourOn = 1; // starting at 1
var isHovering = false;
$(document).ready(function () {

    var SlideAmt = $('div.slide').length;
    var ThumbAmt = $('div.thumb').length;
    var eachThumbW = 100;
    var thumbStageW = $('#thumb-stage').width();
	$('#thumb-slider').css('width', (ThumbAmt * eachThumbW));
	var thumbsperPage;
	function numOfThumbs(){
		if ($('#stage1').css('display') == 'block'){thumbsperPage = 0}
		if ($('#stage2').css('display') == 'block'){thumbsperPage = 0}
		if ($('#stage3').css('display') == 'block'){thumbsperPage = 4}
		if ($('#stage4').css('display') == 'block'){thumbsperPage = 6}
		if ($('#stage5').css('display') == 'block'){thumbsperPage = 7}
	};
	numOfThumbs();
	$(window).resize(function(){
		 numOfThumbs();	 
		 if (($('#stage1').css('display') != 'none') || ($('#stage2').css('display') != 'none')){
			 // This is to match heights via mobile back forward buttons to content 
			 var currentActive = $('#thumb-slider .active').index() + 1;
			 console.log(currentActive);
			//var whichSlideActive = $('.slide').css('display', 'block');
			//var contentHeight = $('.slide:nth-child('+currentActive+')').height();
			//$('.slide:nth-child('+currentActive+')').children('.back, .forward').height(contentHeight);
		 }
						
		//console.log(thumbsperPage);
	});
	
	// creates all the dots
	for(var i=1; i<=ThumbAmt; i++) {
		$('#dots').append('<div id="dot'+i+'"></div>');
	}
	//slide left/right btns for mobile
	$('<div class="back col-xs-1 showUnder768">&nbsp;</div>').insertBefore('.slide .col-md-9');
	$('<div class="forward col-xs-1 showUnder768">&nbsp;</div>').insertAfter('.slide .col-md-9');
	
	

	
    $(".slide, .thumb-container").mouseenter(function () {
        isHovering = true;
    });

    $(".slide, .thumb-container").mouseleave(function () {
        isHovering = false;
    });

    //var sliderWidth = (eachSlideW * SlideAmt);
    //$('#thumb-slider').css('width', ((ThumbAmt / thumbsperPage) * 515))

    if (SlideAmt != ThumbAmt) { alert("Error, you don't have a matching number of slides, and thumbs"); }
	
    $('.thumb').mouseenter(function () {
        isHovering = true;
        $('#thumb-slider div').removeClass('active');
        $(this).addClass('active');
        var WhichOneToDisplay = $(this).index() + 1;
		
		// for dots
		$('#dots div').removeClass('active');
		$('#dots div#dot'+WhichOneToDisplay).addClass('active');
		
		// show slide
        $('.slide').hide();
        $('.slide:nth-child(' + WhichOneToDisplay + ')').fadeIn(300);
		thumbYourOn = WhichOneToDisplay;
    });

    $('.thumb').mouseleave(function () {
        isHovering = false;
    });
	
	// Initial state
    $('.slide:first').fadeIn();
    $('#thumb-slider .thumb:first').addClass('active');
    $('#dots div:first').addClass('active');
	// This is to match heights via mobile back forward buttons to content 
	var contentHeight = $('.slide:first').height();
	$('.slide:first').children('.back, .forward').height(contentHeight);
	

    $('.slide .back').click(function () {
		var prevActive = $('#thumb-slider .active').index(); // grabs position of highlighted
		var currentActive = $('#thumb-slider .active').index() + 1; // grabs position of highlighted
		var nextActive = $('#thumb-slider .active').index() + 2; // grabs position of highlighted
		if (prevActive > 0){
			//slide
			$('.slide').hide();
			$('.slide:nth-child(' + prevActive + ')').fadeIn(300);
			//thumbs
			$('#dots div').removeClass('active');
			$('.thumb').removeClass('active');
			//dots
			$('#dots div:nth-child('+prevActive+')').addClass('active');
			$('.thumb:nth-child('+prevActive+')').addClass('active');
			// This is to match heights via mobile back forward buttons to content 
			var contentHeight = $('.slide:nth-child(' + prevActive + ')').height();
			$('.slide:nth-child(' + prevActive + ')').children('.back, .forward').height(contentHeight);
			thumbYourOn--;
		}
	});

    $('.slide .forward').click(function () {
		var prevActive = $('#thumb-slider .active').index(); // grabs position of highlighted
		var currentActive = $('#thumb-slider .active').index() + 1; // grabs position of highlighted
		var nextActive = $('#thumb-slider .active').index() + 2; // grabs position of highlighted
		if (nextActive <= ThumbAmt){
			//slide
			$('.slide').hide();
			$('.slide:nth-child(' + nextActive + ')').fadeIn(300);
			//thumbs
			$('#dots div').removeClass('active');
			$('.thumb').removeClass('active');
			//dots
			$('#dots div:nth-child('+nextActive+')').addClass('active');
			$('.thumb:nth-child('+nextActive+')').addClass('active');
			// This is to match heights via mobile back forward buttons to content 
			//var contentHeight = $('.slide:nth-child(' + nextActive + ')').height();
			//$('.slide:nth-child(' + nextActive + ')').children('.back, .forward').height(contentHeight);
			thumbYourOn--;
		}
	});








    $('#thumbLeft').click(function () {
		var isAnimating = $('#thumb-slider').is(':animated');
		if (!isAnimating){ // prevents you from clicking 10x and it rotating faster than it calculates what's visible.
			// Gets current position of slider
			var sliderPos = $('#thumb-slider').css('left');
			sliderPos = parseInt(sliderPos, 10); // remove px
			if (isNaN(sliderPos)) { sliderPos = 0; };
			if (sliderPos != 0) {
				$('#thumb-slider').animate({ "left": '+=' + eachThumbW }, "slow");
			}
		}
    });

    $('#thumbRight').click(function () {
		var isAnimating = $('#thumb-slider').is(':animated');
		if (!isAnimating){ // prevents you from clicking 10x and it rotating faster than it calculates what's visible.
			// Gets current position of slider
			var sliderPos = $('#thumb-slider').css('left');
			sliderPos = parseInt(sliderPos, 10); // remove px
			if (isNaN(sliderPos)) { sliderPos = 0; };
			var largestShown = (sliderPos / (-1 * eachThumbW)) + thumbsperPage;
			//thumbYourOn = $("#thumb-slider .active").index()
			if (largestShown < ThumbAmt) {
				$('#thumb-slider').animate({ "left": '-=' + eachThumbW }, "slow");
			}
		}
    });



    function rotate() {

        if (isHovering == true) {
            //console.log('mouse Enter do nothing');
        } else {
            // Gets current position of slider
            var sliderPos = $('#thumb-slider').css('left');
            sliderPos = parseInt(sliderPos, 10); // remove px
            if (isNaN(sliderPos)) { sliderPos = 0; };

            var largestShown = (sliderPos / (-1 * eachThumbW)) + thumbsperPage;
            //console.log(largestShown+' largest shown');

	
		var currentActive = $('#thumb-slider .active').index() + 1; // grabs position of highlighted
		var nextActive = $('#thumb-slider .active').index() + 2; // grabs position of highlighted
		//console.log(currentActive+' Current active');
		//console.log(nextActive+' next active');
			function moveIt() {
				if (nextActive <= largestShown) { // just change which is 'active' without moving stage
					$('#thumb-slider div').removeClass('active');
					$('#thumb-slider > div:nth-child('+nextActive+')').addClass('active');
					
					$('#dots div').removeClass('active');
					$('#dots > div:nth-child('+nextActive+')').addClass('active');
					
					var WhatsActive = $('#thumb-slider .active').index() + 1;
					$('.slide').hide();
					$('.slide:nth-child(' + WhatsActive + ')').fadeIn(300);
						// This is to match heights via mobile back forward buttons to content 
						//var contentHeight = $('.slide:nth-child(' + WhatsActive + ')').height();
						//$('.slide:nth-child(' + WhatsActive + ')').children('.back, .forward').height(contentHeight);
					thumbYourOn++;
				} else if ((nextActive > largestShown) && (nextActive <= ThumbAmt)) { // next active exists, and stage needs to move to be seen.
					$('#thumb-slider').animate({ "left": '-='+ eachThumbW }, "slow");
					$('#thumb-slider div').removeClass('active');
					$('#thumb-slider > div:nth-child('+nextActive+')').addClass('active');
					
					var WhatsActive = $('#thumb-slider .active').index() + 1;
					$('.slide').hide();
					$('.slide:nth-child(' + WhatsActive + ')').fadeIn(300);
						// This is to match heights via mobile back forward buttons to content 
						//var contentHeight = $('.slide:nth-child(' + WhatsActive + ')').height();
						//$('.slide:nth-child(' + WhatsActive + ')').children('.back, .forward').height(contentHeight);
					thumbYourOn++;
				} else if (nextActive > ThumbAmt){ // you hit the last slide
					$('#thumb-slider').animate({ "left": '0'}, "slow");
					$('#thumb-slider div').removeClass('active');
					$('#thumb-slider > div:nth-child(1)').addClass('active');
					
					var WhatsActive = $('#thumb-slider .active').index() + 1;
					$('.slide').hide();
					$('.slide:nth-child(' + WhatsActive + ')').fadeIn(300);
						// This is to match heights via mobile back forward buttons to content 
						//var contentHeight = $('.slide:nth-child(' + WhatsActive + ')').height();
						//$('.slide:nth-child(' + WhatsActive + ')').children('.back, .forward').height(contentHeight);
					thumbYourOn = 1;
				}
				$('#dots div').removeClass('active')
				$('#dots div#dot'+WhatsActive).addClass('active');
				
			}
			moveIt();
        };
    };
    setInterval(function () { rotate() }, 8000);


});