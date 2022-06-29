/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
	env: {
		API_SERVER_URL: 'http://api-francepartage.zapto.org'
	},
	images: {
    domains: ['localhost', 'francepartage.zapto.org', 'api-francepartage.zapto.org']
  }
}

module.exports = nextConfig
