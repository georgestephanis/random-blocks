/** global businessHours */
/** @format */

/**
 * External dependencies
 */

const {
	Fragment
} = wp.element;

const {
	TextControl
} = wp.components;

const {
	__
} = wp.i18n;

/**
 * Internal dependencies
 */

const HoursRow = ( { day, hours, setAttributes, resetFocus, edit = true } ) => {
	return (
		<Fragment>
			<dt className={ day }>
				{ businessHours.days[ day ] }
			</dt>
			{ ( edit || hours[ day ].opening && hours[ day ].closing ) ?
				(
					<dd className={ day }>
						{
							edit ? ( <TextControl
								type="time"
								label={ __( 'Opening', 'random-blocks' ) }
								value={ hours[ day ].opening }
								onChange={ value => {
									resetFocus && resetFocus();
									setAttributes( { hours: {
										...hours,
										[ day ]: {
											...hours[ day ],
											opening: value,
										}
									} } );
								} }
							/> ) : hours[ day ].opening
						}
						&nbsp;&mdash;&nbsp;
						{
							edit ? ( <TextControl
								type="time"
								label={ __( 'Closing', 'random-blocks' ) }
								value={ hours[ day ].closing }
								onChange={ value => {
									resetFocus && resetFocus();
									setAttributes( { hours: {
										...hours,
										[ day ]: {
											...hours[ day ],
											closing: value,
										}
									} } );
								} }
							/> ) : hours[ day ].closing
						}
					</dd>
				) : (
					<dd className={ day + ' closed' }>
						{ __( 'CLOSED', 'random-blocks' ) }
					</dd>
				)
			}

		</Fragment>
	);
};

export default HoursRow;