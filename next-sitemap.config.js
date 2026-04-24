/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://resume-analyzer.vercel.app", // Replace with your website URL
  generateRobotsTxt: true, // (optional) generate robots.txt
  sitemapSize: 5000, // maximum URLs per sitemap file
  changefreq: "weekly", // default change frequency
  priority: 0.7, // default priority
};
