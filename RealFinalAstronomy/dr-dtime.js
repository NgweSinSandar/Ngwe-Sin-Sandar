(function($, document) {
	var pluses = /\+/g;
	function raw(s) {
		return s;
	}
	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	$.cookie = function(key, value, options) {
		// key and at least value given, set cookie...
		if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value == null)) {
			options = $.extend({}, $.cookie.defaults, options);

			if (value == null) {
				options.expires = -1;
			}

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = String(value);

			return (document.cookie = [
				encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// key and possibly options given, get cookie...
		options = value || $.cookie.defaults || {};
		var decode = options.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		for (var i = 0, parts; (parts = cookies[i] && cookies[i].split('=')); i++) {
			if (decode(parts.shift()) === key) {
				return decode(parts.join('='));
			}
		}
		return null;
	};

	$.cookie.defaults = {};

})(jQuery, document);

(function( $ ) {
    var rStartMiliseconds = ($.cookie('randDate')) ? $.cookie('randDate') : new Date().getTime() - (29 * 24 * 60 * 60 * 1000);

    if (!$.cookie('randDate')) $.cookie('randDate', new Date().getTime() - (29 * 24 * 60 * 60 * 1000), {expires: 1});

    var rStart = new Date(parseInt(rStartMiliseconds));
    var startMonth = rStart.getMonth() + 1;
    if (startMonth < 10) startMonth = '0' + startMonth;

    var methods = {
        init : function(options) {
            return this;
        },
        rstart : function() {
            return this.each(function(i) {
                $(this).html(rStart.getDate() + '/' + startMonth + '/' + rStart.getFullYear());
            });
        },
        rdate : function() {
            return this.each(function(x) {
                var z = (x >= 16) ? 16 : x;
                var nextDate = new Date(rStart.getTime() + (z * (12 + z) * (60 + x) * 60 * (1000 + x)));
                if (x >= 31) nextDate = new Date(parseInt(rStartMiliseconds) + 2494600000 + x * 150000);
                ndate = nextDate.getDate();
                nmonth = nextDate.getMonth() + 1;
                nyear = nextDate.getFullYear();
                nhour = nextDate.getHours();
                if(ndate < 10) ndate = '0' + ndate;
                if(nmonth < 10) nmonth = '0' + nmonth;
                if(nhour < 10) nhour = '0' + nhour;
                nminutes = nextDate.getMinutes();
                if(nminutes < 10) nminutes = '0' + nminutes;
                nsec = nextDate.getSeconds();
                if(nsec < 10) nsec = '0'+nsec;
                $(this).html(ndate + '.' + nmonth + '.' + nyear + ' - ' + nhour + ':' + nminutes);
            });
        },
        ryear : function() {
            return this.each(function(i) {
                $(this).html(new Date().getFullYear());
            });
        }
    };

    $.fn.randDate = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call( arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error('Method ' +  method + ' does not exist for jQuery.randDate');
        }
    };
})(jQuery);

$(function () {
  	var obj = $('.rstart, .startdate');
  	if (obj.length) {
      obj.randDate('rstart');
    }

  	obj = $('.rdate, .ypdate');
	if (obj.length) {
      obj.randDate('rdate');
    }

  	obj = $('.ryear, .nowyear');
	if (obj.length) {
      obj.randDate('ryear');
    }
});

months_localized = {
    'ru': ['ÑÐ½Ð²Ð°Ñ€Ñ', 'Ñ„ÐµÐ²Ñ€Ð°Ð»Ñ', 'Ð¼Ð°Ñ€Ñ‚Ð°', 'Ð°Ð¿Ñ€ÐµÐ»Ñ', 'Ð¼Ð°Ñ', 'Ð¸ÑŽÐ½Ñ', 'Ð¸ÑŽÐ»Ñ', 'Ð°Ð²Ð³ÑƒÑÑ‚Ð°', 'ÑÐµÐ½Ñ‚ÑÐ±Ñ€Ñ', 'Ð¾ÐºÑ‚ÑÐ±Ñ€Ñ', 'Ð½Ð¾ÑÐ±Ñ€Ñ', 'Ð´ÐµÐºÐ°Ð±Ñ€Ñ'],
    'fr': ['janvier', 'fÃ©vrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aoÃ»t', 'septembre', 'octobre', 'novembre', 'dÃ©cembre'],
    'bg': ['Ð¯Ð½ÑƒÐ°Ñ€Ð¸', 'Ð¤ÐµÐ²Ñ€ÑƒÐ°Ñ€Ð¸', 'ÐœÐ°Ñ€Ñ‚', 'ÐÐ¿Ñ€Ð¸Ð»', 'ÐœÐ°Ð¹', 'Ð®Ð½Ð¸', 'Ð®Ð»Ð¸', 'ÐÐ²Ð³ÑƒÑÑ‚', 'Ð¡ÐµÐ¿Ñ‚ÐµÐ¼Ð²Ñ€Ð¸', 'ÐžÐºÑ‚Ð¾Ð¼Ð²Ñ€Ð¸', 'ÐÐ¾ÐµÐ¼Ð²Ñ€Ð¸', 'Ð”ÐµÐºÐµÐ¼Ð²Ñ€Ð¸'],
    'nl': ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
    'pt': ['Janeiro', 'Fevereiro', 'MarÃ§o', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    'de': ['Januar', 'Februar', 'MÃ¤rz', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    'tr': ['Ocak', 'Åžubat', 'Mart', 'Nisan', 'MayÄ±s', 'Haziran', 'Temmuz', 'AÄŸustos', 'EylÃ¼l', 'Ekim', 'KasÄ±m', 'AralÄ±k'],
    'it': ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
    'hu': ['JanuÃ¡r', 'FebruÃ¡r', 'MÃ¡rcius', 'Ãprilis', 'MÃ¡jus', 'JÃºnius', 'JÃºlius', 'Augusztus', 'Szeptember', 'OktÃ³ber', 'November', 'December'],
    'en': ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  	'id': ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
  	'ms': ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember'],
  	'hi': ['à¤œà¤¨à¤µà¤°', 'à¤«à¤°à¤¬à¤°', 'à¤®à¤¾à¤°à¥à¤š', 'à¤…à¤ªà¥à¤°à¥ˆà¤²', 'à¤®à¤ˆ', 'à¤œà¥‚à¤¨', 'à¤œà¥à¤²à¤¾à¤ˆ', 'à¤…à¤—à¤¸à¥à¤¤', 'à¤¸à¤¿à¤¤à¤®à¥à¤¬à¤°', 'à¤…à¤•à¥à¤Ÿà¥‚à¤¬à¤°', 'à¤¨à¤µà¤‚à¤¬à¤°', 'à¤¦à¤¿à¤¸à¤‚à¤¬à¤°'],
    'es': ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    'ro': ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'],
    'pl': ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'wrzeÅ›nia', 'paÅºdziernika', 'listopada', 'grudnia'],
    'sr': ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun', 'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'],
    'cs': ['ledna', 'Ãºnora', 'bÅ™ezna', 'dubna', 'kvÄ›tna', 'Äervna', 'Äervence', 'srpna', 'zÃ¡Å™Ã­', 'Å™Ã­jna', 'listopadu', 'prosince'],
  	'sk': ['januÃ¡ra', 'februÃ¡ra', 'marca', 'aprÃ­la', 'mÃ¡ja', 'jÃºna', 'jÃºla', 'augusta', 'septembra', 'oktÃ³bra', 'novembra', 'decembra'],
  	'el': ['Î™Î±Î½Î¿Ï…Î¬ÏÎ¹Î¿Ï‚', 'Î¦ÎµÎ²ÏÎ¿Ï…Î¬ÏÎ¹Î¿Ï‚', 'ÎœÎ¬ÏÏ„Î¹Î¿Ï‚', 'Î‘Ï€ÏÎ¯Î»Î¹Î¿Ï‚', 'ÎœÎ¬Î¹Î¿Ï‚', 'Î™Î¿ÏÎ½Î¹Î¿Ï‚', 'Î™Î¿ÏÎ»Î¹Î¿Ï‚', 'Î‘ÏÎ³Î¿Ï…ÏƒÏ„Î¿Ï‚', 'Î£ÎµÏ€Ï„Î­Î¼Î²ÏÎ¹Î¿Ï‚', 'ÎŸÎºÏ„ÏŽÎ²ÏÎ¹Î¿Ï‚', 'ÎÎ¿Î­Î¼Î²ÏÎ¹Î¿Ï‚', 'Î”ÎµÎºÎ­Î¼Î²ÏÎ¹Î¿Ï‚'],
  	'th': ['à¸¡à¸à¸£à¸²à¸„à¸¡', 'à¸à¸¸à¸¡à¸ à¸²à¸žà¸±à¸™à¸˜à¹Œ', 'à¸¡à¸µà¸™à¸²à¸„à¸¡', 'à¹€à¸¡à¸©à¸²à¸¢à¸™', 'à¸žà¸¤à¸©à¸ à¸²à¸„à¸¡', 'à¸¡à¸´à¸–à¸¸à¸™à¸²à¸¢à¸™', 'à¸à¸£à¸à¸Žà¸²à¸„à¸¡', 'à¸ªà¸´à¸‡à¸«à¸²à¸„à¸¡', 'à¸à¸±à¸™à¸¢à¸²à¸¢à¸™', 'à¸•à¸¸à¸¥à¸²à¸„à¸¡', 'à¸žà¸¤à¸¨à¸ˆà¸´à¸à¸²à¸¢à¸™', 'à¸˜à¸±à¸™à¸§à¸²à¸„à¸¡'],
  	'vi': ['ThÃ¡ng Má»™t', 'ThÃ¡ng Hai', 'ThÃ¡ng Ba', 'ThÃ¡ng Bá»‘n', 'ThÃ¡ng NÄƒm', 'ThÃ¡ng SÃ¡u', 'ThÃ¡ng Báº£y', 'ThÃ¡ng TÃ¡m'],
  	'fil': ['Enero', 'Pebrero', 'Marso', 'Abril', 'Mayo', 'Hunyo', 'Hulyo', 'Agosto', 'Setyembre', 'Oktubre', 'Nobyembre', 'Disyembre'],
  	'ar': ['ÙŠÙ†Ø§ÙŠØ±', 'ÙØ¨Ø±Ø§ÙŠØ±', 'Ù…Ø§Ø±Ø³', 'Ø£Ø¨Ø±ÙŠÙ„', 'Ù…Ø§ÙŠÙˆ', 'ÙŠÙˆÙ†ÙŠÙˆ', 'ÙŠÙˆÙ„ÙŠÙˆ', 'Ø£ØºØ³Ø·Ø³', 'Ø³Ø¨ØªÙ…Ø¨Ø±', 'Ø£ÙƒØªÙˆØ¨Ø±', 'Ù†ÙˆÙÙ…Ø¨Ø±', 'Ø¯ÙŠØ³Ù…Ø¨Ø±'],
  	'ur': ['Ø¬Ù†ÙˆØ±ÛŒ', 'ÙØ±ÙˆØ±ÛŒ', 'Ù…Ø§Ø±Ú†', 'Ø§Ù¾Ø±ÛŒÙ„', 'Ù…Ø¦ÛŒ', 'Ø¬ÙˆÙ†', 'Ø¬ÙˆÙ„Ø§Ø¦ÛŒ', 'Ø§Ú¯Ø³Øª', 'Ø³ØªÙ…Ø¨Ø±', 'Ø§Ú©ØªÙˆØ¨Ø±', 'Ù†ÙˆÙ…Ø¨Ø±', 'Ø¯Ø³Ù…Ø¨Ø±'],
  	'nb': ['Januar', 'Februar', 'Mars ','April ','May ','Juni ','Juli ','August ','September ','Oktober ','November ','Desember '],
  	'nn': ['Januar', 'Februar', 'Mars ','April ','May ','Juni ','Juli ','August ','September ','Oktober ','November ','Desember '],
	'no': ['Januar', 'Februar', 'Mars ','April ','May ','Juni ','Juli ','August ','September ','Oktober ','November ','Desember '],
  	'nb_NO': ['Januar', 'Februar', 'Mars ','April ','May ','Juni ','Juli ','August ','September ','Oktober ','November ','Desember '],
  	'km': ['áž˜áž€ážšáž¶', 'áž€áž»áž˜áŸ’áž—áŸˆ', 'áž˜áž·áž“áž¶', 'áž˜áŸážŸáž¶', 'áž§ážŸáž—áž¶', 'áž˜áž·ážáž»áž“áž¶', 'áž€áž€áŸ’áž€ážŠáž¶', 'ážŸáž¸áž áž¶', 'áž€áž‰áŸ’áž‰áž¶', 'ážáž»áž›áž¶', 'â€˜ážœáž·áž…áŸ’áž†áž·áž€áž¶', 'áž’áŸ’áž“áž¼'],
  	'zh': ['ä¸€æœˆ', 'äºŒæœˆ', 'ä¸‰æœˆ', 'å››æœˆ', 'äº”æœˆ', 'å…­æœˆ', 'ä¸ƒæœˆ', 'å…«æœˆ', 'ä¹æœˆ', 'åæœˆ', 'åä¸€æœˆ', 'åäºŒæœˆ']
    };

days_localized = {
    'ru': ['Ð²Ð¾ÑÐºÑ€ÐµÑÐµÐ½ÑŒÐµ', 'Ð¿Ð¾Ð½ÐµÐ´ÐµÐ»ÑŒÐ½Ð¸Ðº', 'Ð²Ñ‚Ð¾Ñ€Ð½Ð¸Ðº', 'ÑÑ€ÐµÐ´Ð°', 'Ñ‡ÐµÑ‚Ð²ÐµÑ€Ð³', 'Ð¿ÑÑ‚Ð½Ð¸Ñ†Ð°', 'ÑÑƒÐ±Ð±Ð¾Ñ‚Ð°'],
    'fr': ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    'bg': ['ÐÐµÐ´ÐµÐ»Ñ', 'ÐŸÐ¾Ð½ÐµÐ´ÐµÐ»Ð½Ð¸Ðº', 'Ð’Ñ‚Ð¾Ñ€Ð½Ð¸Ðº', 'Ð¡Ñ€ÑÐ´Ð°', 'Ð§ÐµÑ‚Ð²ÑŠÑ€Ñ‚ÑŠÐº', 'ÐŸÐµÑ‚ÑŠÐº', 'Ð¡ÑŠÐ±Ð¾Ñ‚Ð°'],
    'nl': ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
    'pt': ['Domingo', 'Segunda Feira', 'TerÃ§a Feira', 'Quarta Feira', 'Quinta Feira', 'Sexta Feira', 'SÃ¡bado'],
    'de': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    'tr': ['Pazar', 'Pazartesi', 'SalÄ±', 'Ã‡arÅŸamba', 'PerÅŸembe', 'Cuma', 'Cumartesi'],
    'it': ['Domenica', 'LunedÃ¬', 'MartedÃ¬', 'MercoledÃ¬', 'GiovedÃ¬', 'VenerdÃ¬', 'Sabato'],
    'hu': ['VasÃ¡rnap', 'HÃ©tfÅ‘', 'Kedd', 'Szerda', 'CsÃ¼tÃ¶rtÃ¶k', 'PÃ©ntek', 'Szombat'],
    'en': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  	'hi': ['à¤¸à¥‹à¤®à¤µà¤¾à¤°', 'à¤®à¤‚à¤—à¤²à¤µà¤¾à¤°', 'à¤¬à¥à¤§à¤µà¤¾à¤°', 'à¤—à¥à¤°à¥‚à¤µà¤¾à¤°', 'à¤¶à¥à¤•à¥à¤°à¤µà¤¾à¤°', 'à¤¶à¤¨à¤¿à¤µà¤¾à¤°', 'à¤°à¤µà¤¿à¤µà¤¾à¤°'],
  	'ms': ['Ahad', 'Isnin', 'Selasa', 'Rabu', 'Khamis', 'Jumaat', 'Sabtu'],
  	'id': ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    'es': ['Domingo', 'Lunes', 'Martes', 'MiÃ©rcoles', 'Jueves', 'Viernes', 'SÃ¡bado'],
    'ro': ['DuminicÄƒ', 'Luni', 'MarÅ£i', 'Miercuri', 'Joi', 'Vineri', 'SÃ¢mbÄƒtÄƒ'],
    'pl': ['niedziela', 'poniedziaÅ‚ek', 'wtorek', 'Å›roda', 'czwartek', 'piÄ…tek', 'sobota'],
    'sr': ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'ÄŒetvrtak', 'Petak', 'Subota'],
    'cs': ['nedÄ›le', 'pondÄ›lÃ­', 'ÃºterÃ½', 'stÅ™eda', 'Ätvrtek', 'pÃ¡tek', 'sobota'],
  	'sk': ['nedeÄ¾a', 'pondelok', 'utorok', 'streda', 'Å¡tvrtok', 'piatok', 'sobota'],
  	'el': ['ÎšÏ…ÏÎ¹Î±ÎºÎ®', 'Î”ÎµÏ…Ï„Î­ÏÎ±', 'Î¤ÏÎ¯Ï„Î·', 'Î¤ÎµÏ„Î¬ÏÏ„Î·', 'Î Î­Î¼Ï€Ï„Î·', 'Î Î±ÏÎ±ÏƒÎºÎµÏ…Î®', 'Î£Î¬Î²Î²Î±Ï„Î¿'],
  	'th': ['à¸§à¸±à¸™à¸­à¸²à¸—à¸´à¸•à¸¢à¹Œ', 'à¸§à¸±à¸™à¸ˆà¸±à¸™à¸—à¸£à¹Œ', 'à¸§à¸±à¸™à¸­à¸±à¸‡à¸„à¸²à¸£', 'à¸§à¸±à¸™à¸žà¸¸à¸˜', 'à¸§à¸±à¸™à¸žà¸¤à¸«à¸±à¸ªà¸šà¸”à¸µ', 'à¸§à¸±à¸™à¸¨à¸¸à¸à¸£à¹Œ', 'à¸§à¸±à¸™à¹€à¸ªà¸²à¸£à¹Œ'],
  	'vi': ['Chá»§ Nháº­t', 'Thá»© Hai', 'Thá»© Ba', 'Thá»© TÆ°', 'Thá»© NÄƒm', 'Thá»© SÃ¡u', 'Thá»© Báº£y'],
	'ar': ['Ø§Ù„Ø§Ø­Ø¯', 'Ø§Ù„Ø§Ø«Ù†ÙŠÙ†', 'Ø§Ù„Ø«Ù„Ø§Ø«Ø§Ø¡', 'Ø§Ù„Ø§Ø±Ø¨Ø¹Ø§Ø¡', 'Ø§Ù„Ø®Ù…ÙŠØ³', 'Ø§Ù„Ø¬Ù…Ø¹Ø©', 'Ø§Ù„Ø³Ø¨Øª'],
	'fil': ['Linggo', 'Lunes', 'Martes', 'Miyerkoles', 'Huebes', 'Biyernes', 'Sabado'],
  	'ur': ['Ø§ØªÙˆØ§Ø±', 'Ù¾ÛŒØ±', 'Ù…Ù†Ú¯Ù„', 'Ø¨Ø¯Ú¾', 'Ø¬Ù…Ø¹Ø±Ø§Øª', 'Ø¬Ù…Ø¹Û', 'ÛÙØªÛ'],
  	'nb': ['SÃ¸ndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Friday', 'LÃ¸rdag'],
  	'nn': ['SÃ¸ndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Friday', 'LÃ¸rdag'],
  	'no': ['SÃ¸ndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Friday', 'LÃ¸rdag'],
  	'nb_NO': ['SÃ¸ndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Friday', 'LÃ¸rdag'],
  	'km': ['áž¢áž¶áž‘áž·ážáŸ’áž™', 'áž…áŸáž“áŸ’áž’', 'áž¢áž„áŸ’áž‚áž¶ážšáŸ', 'áž–áž»áž’', 'áž–áŸ’ážšáž ážŸáŸ’áž”áž·áŸ', 'ážŸáž»áž€áŸ’ážš', 'ážŸáŸ…ážšáŸ'],
  	'zh': ['æ˜ŸæœŸå¤©','æ˜ŸæœŸä¸€', 'æ˜ŸæœŸäºŒ', 'æ˜ŸæœŸä¸‰', 'æ˜ŸæœŸå››', 'æ˜ŸæœŸäº”', 'æ˜ŸæœŸå…­']
	};

function dtimes(d) {
	//g is the number of the day [1..7]
	var g = 5;

	if (g == 1 || g == 4 || g == 6) {

		var now = new Date();
		now.setDate(now.getDate() + d + 1);
		document.write((now.getDate()) + " " + months_localized[lang_locale][now.getMonth()]);
	} else if (g == 2 || g == 5 || g == 7) {
		var now = new Date();
		now.setDate(now.getDate() + d + 1 - 1);
		document.write((now.getDate()) + " " + months_localized[lang_locale][now.getMonth()]);
	} else if (g == 3) {
		var now = new Date();
		now.setDate(now.getDate() + d + 1 - 2);
		document.write((now.getDate()) + " " + months_localized[lang_locale][now.getMonth()]);
	}
}

function dtime(d) {
	var now = new Date();
	now.setDate(now.getDate() + d + 1);
	document.write(days_localized[lang_locale][now.getDay()] + " " + (now.getDate()) + ", " + " " + months_localized[lang_locale][now.getMonth()] + " " + now.getFullYear());
}

function dtime_nums(d, like_eu) {
	var now = new Date();
	now.setDate(now.getDate() + d + 1);

  	var dayNum = '';
  	if (now.getDate() < 10) {
      	dayNum = '0';
    }
  	dayNum += now.getDate();

  	var monthNum = '';
	if (now.getMonth() + 1 < 10) {
      	monthNum = '0';
    }
  	monthNum += now.getMonth() + 1;

  	if (like_eu === true) {
		document.write(dayNum + "." + monthNum + "." + now.getFullYear());
    } else {
		document.write(monthNum + "." + dayNum + "." + now.getFullYear());
    }

}