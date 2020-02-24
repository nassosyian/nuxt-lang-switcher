const parseUrl = require('url-parse');
const removeLastSlash = require('../node_modules/nuxt-lang-switcher/lib/util.js').removeLastSlash;
const moduleOptions = <%= serialize(options) %>


export default function ({ app, route, isDev }) {

	if (!process.server) 
	{
		return
	}

	let href = /*typeof window !== 'undefined' ? window.location.href :*/ route.path;
	let url = parseUrl(href);
	const urlPathname = removeLastSlash( decodeURIComponent(url.pathname) );

	const label = moduleOptions.urlToLabel[urlPathname] || null;
	
	if ( !label || !moduleOptions.urlMap[label] )	return;
	
	let site = isDev ? '' : moduleOptions.site;

	const locales = Object.keys(moduleOptions.urlMap[label]);
	for (let i = 0; i < locales.length; i++)
	{
		const lang = locales[i];

		// Avoid duplicate entries
		let found = false;
		for (let j = 0; j < app.head.link.length; j++)
		{
			const link = app.head.link[j];
			if (link.hreflang==lang && link.rel=="alternate" )
			{
				found = true;
				break;
			}
		}
		if (found)	continue;

		app.head.link.push({
			rel: "alternate",
			hreflang: lang,
			//hid: "hreflang-"+lang,
			href: (site + (moduleOptions.urlMap[label][lang] || '') ),
		});
	}

	// Avoid duplicate entries
	let found = false;
	for (let j = 0; j < app.head.link.length; j++)
	{
		const link = app.head.link[j];
		if (link.hreflang=="x-default" && link.rel=="alternate" )
		{
			found = true;
			break;
		}
	}

	if (!found)	
	{	
		app.head.link.push({
				rel: "alternate",
				hreflang: "x-default",
				//hid: "hreflang-x-default",
				href: (site + (moduleOptions.urlMap[label][moduleOptions.default_locale] || '') ),
			});
	}
}