
const parseUrl = require('url-parse');

export default {

	props:
	{
		lang: 
		{
			type: String,
			required: true,
		},

		prefetch:
		{
			type: Boolean,
			default: false,
		}
	},

	data()
	{
		return {}
	},

	computed:
	{
		url()
		{
			let href = /* typeof window !== 'undefined' ? window.location.href : */ this.$route.path;
			let url = parseUrl(href);
			const urlPathname = decodeURIComponent(url.pathname);

			if (!this.moduleOptions)
			{
				console.error('lang-switcher error: no moduleOptions')
				return '#';
			}

			const label = this.moduleOptions.urlToLabel[urlPathname] || null;

			
			if ( !label || !this.moduleOptions.urlMap[label] )	return '';
			
			let site = this.moduleOptions.isDev ? '' : this.moduleOptions.site;

			const result = site + (this.moduleOptions.urlMap[label][this.lang] || '');
			// console.log('lang-switcher found: ', result)
			return result;
		},

		isActive()
		{
			let href = /* typeof window !== 'undefined' ? window.location.href : */ this.$route.path;
			let url = parseUrl(href);
			const urlPathname = decodeURIComponent(url.pathname);

			return (this.url == urlPathname);
		}
	},

	render(h)
	{
		// nuxt-link prepends everything with baseUrl
		return h('a', 
			{
				// props:
				// {
				// 	to: this.url,
				// 	prefetch: this.prefetch,
				// },
				attrs:
				{
					href: this.url,
				},
				class:
				{
					'is-active': this.isActive
				}
			},
			this.$slots.default
		)
	}
}