/** @format */

/**
 * External dependencies
 */

const {
	registerBlockType
} = wp.blocks;

const {
	DateTimePicker
} = wp.components;

const {
	__experimentalGetSettings,
	format
} = wp.date;

const {
	__
} = wp.i18n;

/**
 * Internal dependencies
 */

/**
 * Block Registrations:
 */

registerBlockType( 'random-blocks/time', {
	title: __( 'Time', 'random-blocks' ),
	icon: ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg> ),
	category: 'widgets',
	supports: {
		html: false,
	},

	attributes: {
		time: {
			type: 'string',
			default: new Date(),
		},
	},

	edit: function( props ) {
		const settings = __experimentalGetSettings();

		const is12HourTime = /a(?!\\)/i.test(
			settings.formats.time
				.toLowerCase() // Test only the lower case a
				.replace( /\\\\/g, '' ) // Replace "//" with empty strings
				.split( '' ).reverse().join( '' ) // Reverse the string and test for "a" not followed by a slash
		);

		return (
			<DateTimePicker
				currentDate={ props.attributes.time }
				onChange={ time => props.setAttributes( { time } ) }
				is12Hour={ is12HourTime }
			/>
		);
	},

	save: function( props ) {
		const settings = __experimentalGetSettings();
		const time = props.attributes.time;

		return (
			<div>
				<a href={ 'https://www.timeanddate.com/worldclock/fixedtime.html?iso=' + format( 'Ymd\THi', time ) }>
					<abbr className="date" title={ format( 'c', time ) }>
						{ format( settings.formats.datetime, time ) }
					</abbr>
				</a>
			</div>
		);
	}
} );
