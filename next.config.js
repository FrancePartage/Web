/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
	env: {
		API_SERVER_URL: 'http://localhost:3333'
	},
	images: {
    domains: ['localhost']
  }
}

module.exports = nextConfig
