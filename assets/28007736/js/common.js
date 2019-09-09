$(document).ready(function() {

    //Preloader
    setTimeout(function() {
        $('#preloader').fadeOut('slow', function() {
            $(this).remove();
        });
    }, 1000);

    // Img
    $("img, a").on("dragstart", function(event) {
        event.preventDefault();
    });

    // MatchHeight
    $('.key-box-item, .latest-wins-item, .promo-box-item, .kombo-box-item, .work-step-item, .filter-game-item').matchHeight();

    // Menu Toggle
    $('.menu-button').click(function() {
        $('.menu-button .main-menu-toggle').toggleClass("on");
        $('.main-menu').fadeToggle('slow');
    });

    $('.lang-button').click(function() {
        $('.lang-list').fadeToggle('slow');
    });

    // Scroll to to
    $(".scroll-down").mPageScroll2id({
        offset: 0
    });

    // Tooltips
    $('body').tooltip({
        selector: '[data-toggle="tooltip"]'
    });

    /* Lazyload
     $("img.lazy").lazyload({

     }); */

    if($('.clock').length > 0) {
        // clock
        var clock;

        clock = $('.clock').FlipClock({
            //clockFace: 'DailyCounter', //вид счетчика (с количеством часов)
            autoStart: true, //отключить автозапуск
            countdown: true, //отсчет назад
            language: 'ru-ru'
        });

        var now = new Date();
        var tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        var diff = tomorrow - now;

        clock.setTime(Math.round(diff / 1000)); // точка начала отсчета
        clock.setCountdown(true);
        clock.start();
    }

    $('#get-promo-code').click(function() {

        var clock = $('.clock').FlipClock({
            clockFace: 'MinuteCounter', //вид счетчика (с количеством часов)
            autoStart: true, //отключить автозапуск
            countdown: true, //отсчет назад
            language: 'ru-ru'
        });

        var now = new Date();
        var addminutes = new Date();
        addminutes.setMinutes(now.getMinutes() + 30);

        var diff = addminutes - now;

        $('.clock-promo-code-block').removeClass('hidden');
        clock.setTime(Math.round(diff / 1000)); // точка начала отсчета
        clock.setCountdown(true);
        clock.start();
        $(this).remove();

    });
    $('.clock-promo-code-block').on('click', '.clock a', function() {
        return false;
    });

    // popover
    $(".my-popover").popover({
        html: true,
        trigger: 'hover',
        content: function() {
            return $(this).next(".my-popover-content").html();
        },
        placement: "top"
    }).click(function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    $('[data-toggle="popover"]').popover({
        html: true,
        trigger: 'hover',
        placement: "top"
    });

    // PromoCodes
    $('.promocode-form').submit(function(event) {

        event.preventDefault();
        form = $(this);
        mydata = form.serialize();

        item_id = form.find('input[name="item_id"]').val();
        item_title = form.find('input[name="item_title"]').val();
        item_price = form.find('input[name="item_price"]').val();
        promocode = form.find('input[name="promocode"]').val();

        if(!promocode) {
            promo_show_error(form, 'Нужно заполнить поле');
            return
        } else {
            promo_show_error(form, '');
        }

        $.ajax({
            url: './diamond/check_promo',
            method: 'POST',
            data: mydata,
            dataType: 'json',
            success: function(msg) {
                if(msg.status == "ok") {
                    promo_modal_add_paymodal_info(item_id, item_title, item_price, promocode);
                    $('#payModal').modal('show');
                } else if(msg.status == 'fail') {
                    // Ошибка промокода
                    promo_show_error(form, 'Неверный промокод');
                } else {
                    // Ошибка
                    promo_show_error(form, 'Ошибка. Попробуйте еще раз');
                }
            },
        });
    });

    // VK widget
    if(typeof vk_public_id !== 'undefined' && vk_public_id === null) {
        if(vk_public_id && typeof VK !== 'undefined') {
            VK.Widgets.Group("vk_groups", {mode: 3, width: "auto"}, vk_public_id);
        }
    }

    var $gamesComboBoxes = $('.kombo-boxes-slider');

    $gamesComboBoxes.find('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        var target = $(this).attr('href');

        $(target).css('left', '-' + $(window).width() + 'px');
        var left = $(target).offset().left;
        $(target).css({left: left}).animate({"left": "0px"}, "10");
    });

    $gamesComboBoxes.find('.arrow').on('click', function() {
        if($(this).hasClass('arrow-left') || $(this).hasClass('arrow-left-small')) {
            var item = $('.block-buttons li.active').prev().find('a');
            if(item.length >= 1) {
                $(item).click();
            }
            else {
                item = $('.block-buttons li').last().find('a');
                $(item).click();
            }
        }
        else if($(this).hasClass('arrow-right') || $(this).hasClass('arrow-right-small')) {
            var item = $('.block-buttons li.active').next().find('a');
            if(item.length >= 1) {
                $(item).click();
            }
            else {
                item = $('.block-buttons li').first().find('a');
                $(item).click();
            }
        }
    });

});

function promo_show_error(form, msg) {
    form.find('.error-promo').html(msg);
}

function promo_modal_add_paymodal_info(id, title, price, promo) {
    $('#paymodal-info-holder').attr('data-item-id', id);
    $('#paymodal-info-holder').attr('data-item-title', title + ' - Promo-Box');
    $('#paymodal-info-holder').attr('data-item-price', parseInt(price));
    $('#paymodal-info-holder').attr('data-item-promo', promo);
}

// for Safari < 9
if(!Object.assign) {
    Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target) {
            'use strict';
            if(target === undefined || target === null) {
                throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);
            for(var i = 1; i < arguments.length; i++) {
                var nextSource = arguments[i];
                if(nextSource === undefined || nextSource === null) {
                    continue;
                }
                nextSource = Object(nextSource);

                var keysArray = Object.keys(Object(nextSource));
                for(var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                    var nextKey = keysArray[nextIndex];
                    var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if(desc !== undefined && desc.enumerable) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
            return to;
        }
    });
}