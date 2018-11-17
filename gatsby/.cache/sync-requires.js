// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---node-modules-gatsby-plugin-offline-app-shell-js": preferDefault(require("/home/yivanov/yuri-ivanov.github.io/gatsby/node_modules/gatsby-plugin-offline/app-shell.js")),
  "component---src-templates-blog-post-js": preferDefault(require("/home/yivanov/yuri-ivanov.github.io/gatsby/src/templates/blog-post.js")),
  "component---src-pages-about-js": preferDefault(require("/home/yivanov/yuri-ivanov.github.io/gatsby/src/pages/about.js")),
  "component---src-pages-contact-js": preferDefault(require("/home/yivanov/yuri-ivanov.github.io/gatsby/src/pages/contact.js")),
  "component---src-pages-index-js": preferDefault(require("/home/yivanov/yuri-ivanov.github.io/gatsby/src/pages/index.js")),
  "component---src-pages-my-files-js": preferDefault(require("/home/yivanov/yuri-ivanov.github.io/gatsby/src/pages/my-files.js"))
}

