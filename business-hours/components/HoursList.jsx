/** global businessHours */
/** @format */

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

import HoursRow from './HoursRow';

const { start_of_week } = businessHours;

const HoursList = ( props ) => (
	<dl className={ 'business-hours ' + ( props.edit ? 'edit' : '' ) }>
		{
			Object.keys( props.hours ).concat( Object.keys( props.hours ).slice( 0, start_of_week ) ).slice( start_of_week ).map( function( day ) {
				return ( <HoursRow day={ day } { ...props } /> );
			} )
		}
	</dl>
);

export default HoursList;
