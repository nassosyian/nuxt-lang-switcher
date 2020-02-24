import Vue from 'vue';
const path = require('path');
// const component = require('nuxt-lang-switcher/lib/component.js');
const component = require( '../node_modules/nuxt-lang-switcher/lib/component.js' );
const moduleOptions = <%= serialize(options) %>

export default function (ctxt, inject) {

	moduleOptions.isDev = !!ctxt.isDev;
	component.moduleOptions = moduleOptions;

	// Globally register the 'lang-switcher' component
	Vue.component(moduleOptions.name, component)

}