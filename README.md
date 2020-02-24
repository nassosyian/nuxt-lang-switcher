# nuxt-lang-switcher
Language switcher component and module that automatically adds Hreflang links to each page, mainly for fixed-url multilingual sites.


## Install

```bash
yarn add 'nuxt-lang-switcher'
```
or

```bash
yarn add 'nuxt-lang-switcher'
```

## Setup

in the "modules" section of nuxt.config.js add 'nuxt-lang-switcher'

```js
modules: [
	...
	'nuxt-lang-switcher'
	...
]

```

## Config

in the nuxt.config.js add 

```js
	'lang-switcher':
	{
		name: 'lang-switcher',	// the name of the globally visible vue component
		site: 'https://www.mysite.com',	// fully qualified url of your site
		default_locale: 'en',	// the locale to be used as hreflang='x-default'
		urlMap:
		{
			pageLabel_1: // arbitrary page label
			{
				// [key locale string]: [value unique url]
				en: '/',
				fr: '/fr/'
			},
			pageLabel_2: 
			{
				en: '/resume',
				fr: '/fr/resume'
			},
		}
	},
```