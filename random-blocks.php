<?php

/**
 * Plugin Name: Random Blocks
 */

// Business Hours


add_action( 'init', 'register_business_hours_block' );
function register_business_hours_block() {
	wp_register_style( 'business-hours', plugins_url( 'business-hours/business-hours.css', __FILE__ ) );
	if ( ! is_admin() ) {
		$inline_style = '.business-hours .' . current_time( 'D' ) . ' { font-weight: 900; }';
		wp_add_inline_style( 'business-hours', $inline_style );
	}
	register_block_type( 'random-blocks/business-hours', array(
		'style' => 'business-hours',
	) );
}

add_action( 'enqueue_block_editor_assets', 'enqueue_business_hours_block_editor_assets' );
function enqueue_business_hours_block_editor_assets() {
	global $wp_locale;
	wp_enqueue_script( 'business-hours', plugins_url( 'business-hours/business-hours.js', __FILE__ ) );
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'business-hours', 'random-blocks' );
	}
	wp_localize_script( 'business-hours', 'businessHours', array(
		'days' => array(
			'Sun' => $wp_locale->get_weekday( 0 ),
			'Mon' => $wp_locale->get_weekday( 1 ),
			'Tue' => $wp_locale->get_weekday( 2 ),
			'Wed' => $wp_locale->get_weekday( 3 ),
			'Thu' => $wp_locale->get_weekday( 4 ),
			'Fri' => $wp_locale->get_weekday( 5 ),
			'Sat' => $wp_locale->get_weekday( 6 ),
		),
	) );
}

// Contact Phone

