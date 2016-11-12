
// Initialize your app
var myApp = new Framework7({
	modalTitle: 'TeeUhr',
    material: true,
	smartSelectOpenIn:'picker',
	smartSelectBackOnSelect: 'true',
	smartSelectSearchbar: 'true',
	smartSelectPickerCloseText: 'Fertig',
	materialPageLoadDelay: 200,
	init: false,
});

// Export selectors engine
var $$ = Dom7;

// Add views
var view1 = myApp.addView('#view-1');
var view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view3 = myApp.addView('#view-3');
var view4 = myApp.addView('#view-4');

var teesorte = new Array();
teesorte['Assam']=5;
teesorte['Grüntee']=4;
teesorte['Früchtetee']=9;
teesorte['Kräutertee']=4;
teesorte['Weißtee']=3;

function onDeviceReady() {

};


$$('#timerstart').on('click', function(e) {
	
var now             = new Date().getTime(),
    _5_sec_from_now = new Date(now + 10*1000);

alert(cordova.platformId); 
cordova.plugins.notification.local.schedule({
    title: "Tee ist fertig!",
	text: "Ihr Grüntee war um " + _5_sec_from_now +" fertig!",
    at: _5_sec_from_now,
    led: "FF0000",
    sound: 'file://alarm.wav',
	data: { Teesorte: 'Grüntee'}
});
if (cordova.platformID=='Android') {	
alert("setze alarm");	


};

});


$$(document).on('pageInit', function (e) {
//myApp.onPageInit ('index-3', function(e) {
	
	var pagename=e.detail.page.name;
	//alert(e.detail.page.name);
	
	
	if ( pagename == 'index-3') {
		//alert(e.detail.page.name);
	for (k in teesorte) {
		myApp.smartSelectAddOption('.smart-select #teesorte', '<option value="'+teesorte[k]+'">'+k+'</option>');
	}
	//$$('.smart-select').selectpicker('refresh');
	};
	
});

myApp.init();

$$('#teesortes').on('change', function (e) {
    
	wert=6;
	teesortex=$$('#teesorte').prop('value');
	
	$$('#zeit').prop('value',teesortex);
	
	$$('#ziehzeit').html('Ziehzeit: '+teesortex);
	
	
});



$$('#zeit').on('input', function (e) {
    
	
	
	$$('#ziehzeit').html('Ziehzeit '+$$('#zeit').prop('value')+' Minuten');
	
	
});

$$('#bstart').on('click', function(e) {
	
	countdown( "countdown", $$('#zeit').prop('value'), 0 );
	$$('#bstart').hide();
	$$('#bstop').show();
});


$$('#bstop').on('click', function(e) {
	
	clearTimeout(myTime);
	$$('#bstart').show();
	$$('#bstop').hide();
});

function countdown( elementName, minutes, seconds )
{
    var element, endTime, hours, mins, msLeft, time;

    function twoDigits( n )
    {
        return (n <= 9 ? "0" + n : n);
    }

    function updateTimer()
    {
        msLeft = endTime - (+new Date);
        if ( msLeft < 1000 ) {
            element.innerHTML = "<h2>Tee ist fertig!<h2>";
			var audio = new Audio('./alarm.wav');
			audio.play();
        } else {
            time = new Date( msLeft );
            hours = time.getUTCHours();
            mins = time.getUTCMinutes();
            element.innerHTML = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
            myTime=setTimeout( updateTimer, 999 );
        }
    }

    element = document.getElementById( elementName );
    endTime = (+new Date) + 1000 * (60*minutes + seconds) + 500;
    updateTimer();
}
