import Vue from 'vue';
const path = require('path');
import component from '../node_modules/nuxt-lang-switcher/lib/component.js' ;
const moduleOptions = <%= serialize(options) %>

component.created = function()
{
	this.moduleOptions = moduleOptions;
};


// console.log(`nuxt-lang-switcher: registering "${moduleOptions.name}" globally`)
// Globally register the 'lang-switcher' component
Vue.component(moduleOptions.name, component)
