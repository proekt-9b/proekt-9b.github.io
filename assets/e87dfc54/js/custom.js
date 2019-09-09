(function($) {
    $(document).ready(function() {
        // Notify Plugin - The below code (until line 42) is used for demonstration purposes only
        //-----------------------------------------------
        if(($(".main-navigation.onclick").length > 0) && !Modernizr.touch) {
            $.notify({
                // options
                message: 'The Dropdowns of the Main Menu, are now open with click on Parent Items. Click "Home" to checkout this behavior.'
            }, {
                // settings
                type: 'info',
                delay: 10000,
                offset: {
                    y: 150,
                    x: 20
                }
            });
        }

        if(!($(".main-navigation.animated").length > 0) && !Modernizr.touch && $(".main-navigation").length > 0) {
            $.notify({
                // options
                message: 'The animations of main menu are disabled.'
            }, {
                // settings
                type: 'info',
                delay: 10000,
                offset: {
                    y: 150,
                    x: 20
                }
            }); // End Notify Plugin - The above code (from line 14) is used for demonstration purposes only

        }

        // Input labels
        var $inputLabelAbsolute = $('.label-indicator-absolute input'),
            $inputLabelAbsoluteRepeat = $('.label-indicator-absolute-repeat');

        // Output labels
        var $outputLabelAbsolute = $('.label-indicator-absolute > span');

        // Absolute label
        $('.generate-label-absolute').click(function(e) {
            e.preventDefault();
            $inputLabelAbsolute.passy('generate', 15);
            $inputLabelAbsoluteRepeat.val($inputLabelAbsolute.val());
        });

        $('body').on('click', '#cabinet-menu > li > a', function(e) {
            e.preventDefault();
        });
        $('#cabinet-menu li').hover(function(){
            $(this).addClass('open');
            $('#dropdown-menu').fadeIn(300);
        }, function(){$(this).removeClass('open')} );
        var balanceText;


    }); // End document ready

    $('.main-btn').click( function () {
        $body = $('body');

        $.ajax({
            url: '/cabinet/black-friday',
            method: 'POST',
            data: {
                _csrf: LandingCore.getCsrfToken()
            },
            success: function (response) {
                if (response['status'] == 'ok') {
                    loader(0);
                    $('.load-wrap').css('display','block');
                }
            }
        });


        function loader(delay) {
            setTimeout(function(){
                $body.addClass('loading');
            }, delay);

            setTimeout(function(){
                $body.addClass('loaded');
            }, delay + 1700);

            setTimeout(function(){
                $body.removeClass('restart').addClass('new-page');
                $('.popup-wrap').css('display','flex');
                $('.hidd').css('display','none');
            }, delay + 1950);
        }
        setTimeout(function(){
            $('.load-wrap').css('display','none');

        }, 4500);
    });

    $('.ha').click(function(){
        $('.hidd').css('filter','opacity(0)');
        $('.popup').fadeIn(300);
        $('.popup-wrap').fadeIn(300);
        $('.popup-content').fadeIn(300);
    })
    $('.main-btn').hover(function(){
        $(this).addClass('two');
    }, function(){
        $(this).removeClass('two');
    })



    $(document).ready(function() {
        vsrowh=$('.vs-row').height();
        $('.vs').css('height',vsrowh);
        secw=$('body').width();

        setInterval(function() {
            vsrowh=$('.rg').height();
            $('.vs').css('height',vsrowh);
        }, 1000);
    }); // End document ready

})(this.jQuery);
