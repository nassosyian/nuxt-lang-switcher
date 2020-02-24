
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

	computed:
	{
		url()
		{
			let href = typeof window !== 'undefined' ? window.location.href : this.$route.path;
			let url = parseUrl(href);
			const urlPathname = decodeURIComponent(url.pathname);

			if (!this.moduleOptions)
			{
				console.error('lang-switcher error: no moduleOptions')
				return;
			}

			const label = this.moduleOptions.urlToLabel[urlPathname] || null;

			
			if ( !label || !this.moduleOptions.urlMap[label] )	return '';
			
			let site = this.moduleOptions.isDev ? '' : this.moduleOptions.site;

			return site + (this.moduleOptions.urlMap[label][this.lang] || '');
		},

		isActive()
		{
			let href = typeof window !== 'undefined' ? window.location.href : this.$route.path;
			let url = parseUrl(href);
			const urlPathname = decodeURIComponent(url.pathname);

			return (this.url == urlPathname);
		}
	},

	render(h)
	{
		return h('nuxt-link', 
			{
				props:
				{
					to: this.url,
					prefetch: this.prefetch,
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