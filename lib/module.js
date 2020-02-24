const path = require('path');
const parseUrl = require('url-parse');

function calcInverseMapping(urlMap)
{
	let urlToLabel = {};

	const pages = Object.keys(urlMap || {});
	for (let i = 0; i < pages.length; i++)
	{
		const label = pages[i];
		const langs = Object.keys(urlMap[label]);
		for (let j = 0; j < langs.length; j++)
		{
			const localeUrl = urlMap[label][langs[j]];
			urlToLabel[localeUrl] = label;
		}
	}

	return urlToLabel;
}

module.exports = function (moduleOptions) 
{

	const options = {
		name: 'lang-switcher',
		site: '',
		default_locale: 'en',
		...moduleOptions,
		...(this.options['lang-switcher'] || {}),
	}

	options.urlToLabel = calcInverseMapping(options.urlMap);

	// add file thats registers the component
	this.addPlugin(
		{
			src: path.resolve(__dirname, 'plugin.js'),
			fileName: 'lang-switcher-plugin.js',
			options: options
		})

	// add middleware for hreflang
	this.addPlugin(
		{
			src: path.resolve(__dirname, 'middleware.js'),
			fileName: 'lang-switcher-middleware.js',
			options: options
		})
}

module.exports.meta = require('../package.json')
