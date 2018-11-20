<?php

/**
 * Plugin Name: Random Blocks
 */

// Business Hours

add_action( 'init', 'register_business_hours_block' );
function register_business_hours_block() {
	global $wp_locale;

	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	wp_register_script(
	    'business-hours',
        plugins_url( 'business-hours/business-hours.js', __FILE__ ),
        array(
            'wp-blocks',
            'wp-components',
            'wp-element',
            'wp-i18n',
        )
    );
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
		'start_of_week' => (int) get_option( 'start_of_week', 0 ),
	) );

	wp_register_style( 'business-hours', plugins_url( 'business-hours/business-hours.css', __FILE__ ) );
	if ( ! is_admin() ) {
		$inline_style = '.business-hours .' . current_time( 'D' ) . ' { font-weight: 900; }';
		wp_add_inline_style( 'business-hours', $inline_style );
	}

	register_block_type( 'random-blocks/business-hours', array(
		'editor_script'   => 'business-hours',
		'style'           => 'business-hours',
		'render_callback' => 'render_business_hours_block',
	) );
}

function render_business_hours_block( $attributes, $content ) {
	global $wp_locale;

	if ( empty( $attributes['hours'] ) || ! is_array( $attributes['hours'] ) ) {
		return $content;
	}

	$start_of_week = (int) get_option( 'start_of_week', 0 );
	$time_format = get_option( 'time_format' );
	$today = current_time( 'D' );
	$content = '<dl class="business-hours built-by-php">';

	$days = array( 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' );

	if ( $start_of_week ) {
		$chunk1 = array_slice( $attributes['hours'], 0, $start_of_week );
		$chunk2 = array_slice( $attributes['hours'], $start_of_week );
		$attributes['hours'] = array_merge( $chunk2, $chunk1 );
	}

	foreach ( $attributes['hours'] as $day => $hours ) {
		$opening = strtotime( $hours['opening'] );
		$closing = strtotime( $hours['closing'] );

		$content .= '<dt class="' . esc_attr( $day ) . '">' . $wp_locale->get_weekday( array_search( $day, $days ) ) . '</dt>';
		$content .= '<dd class="' . esc_attr( $day ) . '">';
		if ( $hours['opening'] && $hours['closing'] ) {
			$content .= date( $time_format, $opening );
			$content .= '&nbsp;&mdash;&nbsp;';
			$content .= date( $time_format, $closing );

			if ( $today === $day ) {
				$now = strtotime( current_time( 'H:i' ) );
				if ( $now < $opening ) {
					$content .= '<br />';
					$content .= esc_html( sprintf( __( 'Opening in %s', 'random-blocks' ), human_time_diff( $now, $opening ) ) );
				} elseif ( $now >= $opening && $now < $closing ) {
					$content .= '<br />';
					$content .= esc_html( sprintf( __( 'Closing in %s', 'random-blocks' ), human_time_diff( $now, $closing ) ) );
				}
			}
		} else {
			$content .= esc_html__( 'CLOSED', 'random-blocks' );
		}
		$content .= '</dd>';
	}

	$content .= '</dl>';

	return $content;
}

// Contact Phone

add_action( 'init', 'register_contact_phone_block' );
function register_contact_phone_block() {
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	wp_register_script(
	    'contact-phone-editor',
        plugins_url( 'contact-phone/contact-phone.js', __FILE__ ),
        array(
            'wp-blocks',
            'wp-i18n',
        )
    );
	if ( function_exists( 'wp_set_script_translations' ) ) {
		wp_set_script_translations( 'contact-phone', 'random-blocks' );
	}

	wp_register_style( 'contact-phone-editor', plugins_url( 'contact-phone/contact-phone.css', __FILE__ ) );

	register_block_type( 'random-blocks/contact-phone', array(
		'editor_script' => 'contact-phone-editor',
		'editor_style'  => 'contact-phone-editor',
	) );
}
