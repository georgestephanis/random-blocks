/** global businessHours */
/** @format */

/**
 * External dependencies
 */

const {
    createElement
} = wp.element;

/**
 * Internal dependencies
 */

import HoursRow from './HoursRow';

const HoursList = ( props ) => (
    <dl className="business-hours">
        {
            Object.keys( props.hours ).map( function( day ) {
                return ( <HoursRow day={ day } { ...props } /> );
            } )
        }
    </dl>
);

export default HoursList;
