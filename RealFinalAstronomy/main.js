$(document).ready( function() {
    $('.sub_opis').show();
    $('.opis_div').show();
    $('.opis_right').show();
    $('footer').show();

    //$('img.lazyload').lazyload();

    $('.toform').on('click', function () {
        $('html, body').animate({
            scrollTop: $('#orderform').offset().top
        }, 500)
    });

    counts = 0;
    cards = [];
    cards1 = ['imperator', 'kolesofortuni', 'jrec', 'mir'];
    cards2 = ['shut', 'solnce', 'otshelnik'];
    cards3 = ['imperatrica', 'spravedlivost', 'sud', 'zvezda',];
    var item1 = cards1[Math.floor(Math.random()*cards1.length)];
    var item2 = cards2[Math.floor(Math.random()*cards2.length)];
    var item3 = cards3[Math.floor(Math.random()*cards3.length)];
    $('.cc1').css({'background':'url(tarot-cards/'+item1+'.png) top center no-repeat'});
    $('.cc2').css({'background':'url(tarot-cards/'+item2+'.png) top center no-repeat'});
    $('.cc3').css({'background':'url(tarot-cards/'+item3+'.png) top center no-repeat'});
    polojenie = [];
    $('#random').click(function(){
        $('#show_coloda .taro_card').shuffle();
        $('#show_coloda .taro_card').attr({'data-rel':'notchecked'});
        $('#show_coloda .taro_card').css({'background':'url(../1.png)'});
        counts = 0;
        cards = [];
        polojenie = [];
        $('#show_coloda').fadeOut().fadeIn(100);
    });
    $('.taro_card').hover(function(){
        $(this).css({'opacity':'0.5'});
    },function(){
        $(this).css({'opacity':'1'});
    });


    $('.taro_card').click(function(){
        if($(this).attr('data-rel') == 'notchecked')
        {
            $(this).attr({'data-rel':'checked'});
            counts++;
            cards.push( $(this).attr('data-id') );
            polojenie.push( $(this).attr('data-polojenie') );
            $(this).css({
                'background':'url(./tarot-cards/' + $(this).attr('data-id') + $(this).attr('data-polojenie') + '.png) no-repeat center',
                'background-size': 'contain',
            });

            if( counts == 3 ) {
                $('.bggg').show();
                $('.step_1').show();
                window.scrollTo(0, 0);
            }
        }
    });


    $('.butter1').click(function(){
        $('.step_1').hide();
        $('.step_2').show();
        $('.set-user-name').val($('#user-name').val());
    });
    $('.butter2').click(function(){
        $('.bggg').hide();
        $('.bggg1').hide();
        $('.opis_right').hide();
        $('#h1_display').hide();
        $('#show_coloda').hide();
        document.cookie = "first_view=1";
        $('.sub_opis').hide();
        $('.text').hide();
        $('.prediction-gen').fadeIn();
        $('footer').hide();
        setTimeout(function () {
            $('.prediction-gen').hide();
            $('#showen').fadeIn();
            $('footer').show();
        }, 7000)
    });
    $('.butter3').click(function() {
        $('.bggg1').hide();
        $('.bggg').hide();
        $('#h1_display').hide();
        $('#show_coloda').hide();
        $('.sub_opis').hide();
        $('.text').hide();
        $('.sub_opis').hide();
        $('.opis_div').hide();
        $('.opis_right').hide();
        $('footer').show();
        $('#showen').show();
    });

    switch (item1) {
        case 'jrec':
            $('.cf1 p').text('á€¡á€˜á€­á€¯á€¸á€¡á€­á€¯');
            break;
        case 'mir':
            $('.cf1 p').text('á€…á€¯á€”á€¹á€¸á€™');
            break;
        case 'imperator':
            $('.cf1 p').text('á€§á€€á€›á€¬á€‡á€¹á€˜á€¯á€›á€„á€¹');
            break;
        case 'kolesofortuni':
            $('.cf1 p').text('á€€á€¶á€»á€€á€™á¼á€¬ á€œá€½á€Šá€¹á€¸á€˜á€®á€¸');
            break;
    }

    switch (item2) {
        case 'shut':
            $('.cf2 p').text('á€»á€•á€Šá€¹á€·á€±á€”á€±á€žá€¬á€¡á€­á€¯á€¸');
            break;
        case 'solnce':
            $('.cf2 p').text('á€±á€”á€™á€„á€¹á€¸');
            break;
        case 'otshelnik':
            $('.cf2 p').text('á€›á€±á€žá€·');
            break;
    }

    switch (item3) {
        case 'spravedlivost':
            $('.cf3 p').text('á€œá€…á‚áµá€¬');
            break;
        case 'imperatrica':
            $('.cf3 p').text('á€§á€€á€›á€®á€˜á€¯á€›á€„á€¹á€™');
            break;
        case 'sud':
            $('.cf3 p').text('á€á€›á€¬á€¸á€…á€®á€›á€„á€¹á€±á€”á‚”');
            break;
        case 'zvezda':
            $('.cf3 p').text('á€±á€›á€…á€„á€¹');
            break;
    }

    if(document.cookie.indexOf('first_view') != -1){
        $('.bggg1').show();
        $('.sub_opis').hide();
        $('.opis_div').hide();
        $('.opis_right').hide();
        $('footer').hide();
    }
});