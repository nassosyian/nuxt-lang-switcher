const parseUrl = require('url-parse');
const moduleOptions = <%= serialize(options) %>

const Middleware = require('../../middleware');


export default function()
{
	console.log('registering lang-switcher-middleware...')

	Middleware['lang-switcher-middleware'] = function ({ app, route, isDev }) 
	{
		console.log('lang-switcher-middleware()')
		if (!process.server) 
		{
			return
		}

		let href = typeof window !== 'undefined' ? window.location.href : route.path;
		let url = parseUrl(href);
		const urlPathname = decodeURIComponent(url.pathname);

		const label = moduleOptions.urlToLabel[urlPathname] || null;
		
		if ( !label || !moduleOptions.urlMap[label] )	return;
		
		let site = isDev ? '' : moduleOptions.site;

		const locales = Object.keys(moduleOptions.urlMap[label]);
		for (let i = 0; i < locales.length; i++)
		{
			const lang = locales[i];
			app.head.link.push({
				rel: "alternate",
				hreflang: lang,
				href: (site + (moduleOptions.urlMap[label][lang] || '') ),
			});
		}

		app.head.link.push({
				rel: "alternate",
				hreflang: "x-default",
				href: (site + (moduleOptions.urlMap[label][moduleOptions.default_locale] || '') ),
			});
	}

	this.options.router.middleware.push('lang-switcher-middleware')
}