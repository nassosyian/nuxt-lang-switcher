const Vue = require('vue');
const component = require('./component.js');
const moduleOptions = <%= serialize(options) %>

export default function (ctx, inject) {

	moduleOptions.isDev = !!ctxt.isDev;
	component.moduleOptions = moduleOptions;

	// Globally register the 'lang-switcher' component
	Vue.component(moduleOptions.name, component)

}