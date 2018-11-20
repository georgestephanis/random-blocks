( function( $ ) {
	function convertTime() {
		var parseDate, formatTime, formatDate, toLocaleTimeStringSupportsLocales;

		parseDate = function( text ) {
			var m = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})\+00:00$/.exec( text ),
				d = new Date();

			d.setUTCFullYear( + m[1] );
			d.setUTCDate( + m[3] );
			d.setUTCMonth( + m[2] - 1 );
			d.setUTCHours( + m[4] );
			d.setUTCMinutes( + m[5] );
			d.setUTCSeconds( + m[6] );

			return d;
		};

		formatTime = function( d ) {
			return d.toLocaleTimeString( navigator.language, {
				weekday     : 'long',
				month       : 'long',
				day         : 'numeric',
				year        : 'numeric',
				hour        : '2-digit',
				minute      : '2-digit',
				timeZoneName: 'short'
			} );
		};

		formatDate = function( d ) {
			return d.toLocaleDateString( navigator.language, {
				weekday: 'long',
				month  : 'long',
				day    : 'numeric',
				year   : 'numeric'
			} );
		};

		// Not all browsers, particularly Safari, support arguments to .toLocaleTimeString().
		toLocaleTimeStringSupportsLocales = (
			function() {
				try {
					new Date().toLocaleTimeString( 'i' );
				} catch ( e ) {
					return e.name === 'RangeError';
				}
				return false;
			}
		)();

		$( 'abbr.date' ).each( function() {
			var $el = $( this ), d, newText = '';

			d = parseDate( $el.attr( 'title' ) );
			if ( d ) {
				if ( ! toLocaleTimeStringSupportsLocales ) {
					newText += formatDate( d );
					newText += ' ';
				}
				newText += formatTime( d );
				$el.text( newText + 'changed' );
			}
		} );
	}
	convertTime();
	$( document.body ).on( 'post-load ready.o2', convertTime );
})( jQuery );