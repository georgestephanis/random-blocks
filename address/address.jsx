/** @format */

/**
 * External dependencies
 */

const {
	registerBlockType
} = wp.blocks;

const {
	TextControl,
	TextareaControl
} = wp.components;

const {
	__
} = wp.i18n;

/**
 * Internal dependencies
 */

import './address.scss'

/**
 * Block Registrations:
 */

registerBlockType( 'random-blocks/address', {
	title: __( 'Address', 'random-blocks' ),
	icon: ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9zm6-3h-2v2H9v2h2v2h2v-2h2V8h-2z"/></svg> ),
	category: 'widgets',
	supports: {
		html: true,
	},

	attributes: {
		name: {
			type: 'string',
			default: '',
			source: 'text',
			selector: 'h3',
		},
		address: {
			type: 'string',
			default: '',
			source: 'text',
			selector: 'p',
		}
	},

	edit: function( props ) {
		return (
			<div>
				<TextControl
					label={ __( 'Place Name', 'random-blocks' ) }
					value={ props.attributes.name }
					onChange={ name => props.setAttributes( { name } ) }
				/>
				<TextareaControl
					label={ __( 'Address', 'random-blocks' ) }
					value={ props.attributes.address }
					onChange={ address => props.setAttributes( { address } ) }
				/>
			</div>
		);
	},

	save: function( props ) {
		return (
			<div className="random-blocks-address">
				<h3><a target="_blank" href={ 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent( props.attributes.address ) }>{ props.attributes.name }</a></h3>
				<p>{ props.attributes.address }</p>
			</div>
		);
	}
} );
