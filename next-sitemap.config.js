/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bdships.com',
  generateRobotsTxt: true, // Optional: creates robots.txt file
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/admin/*', '/api/*'], // Optional: exclude internal paths
};
