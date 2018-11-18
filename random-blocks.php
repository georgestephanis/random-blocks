<?php

/**
 * Plugin Name: Random Blocks
 */

// Business Hours


add_action( 'init', 'register_business_hours_block' );
function register_business_hours_block() {
    wp_register_style( 'business-hours', plugins_url( 'business-hours/business-hours.css', __FILE__ ) );
    register_block_type( 'random-blocks/business-hours', array(
        'style' => 'business-hours',
    ) );
}

add_action( 'enqueue_block_editor_assets', 'enqueue_business_hours_block_editor_assets' );
function enqueue_business_hours_block_editor_assets() {
    wp_enqueue_script( 'business-hours', plugins_url( 'business-hours/business-hours.js', __FILE__ ) );
    if ( function_exists( 'wp_set_script_translations' ) ) {
        wp_set_script_translations( 'business-hours', 'random-blocks' );
    }
}

// Contact Phone

