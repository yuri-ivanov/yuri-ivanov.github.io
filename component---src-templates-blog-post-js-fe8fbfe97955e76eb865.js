(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{142:function(e,t,a){"use strict";a.r(t),a.d(t,"query",function(){return u});var n=a(0),r=a.n(n),i=a(152);t.default=function(e){var t=e.data.markdownRemark;return r.a.createElement(i.a,null,r.a.createElement("h1",null,t.frontmatter.title),r.a.createElement("div",{dangerouslySetInnerHTML:{__html:t.html}}))};var u="861893041"},149:function(e,t,a){var n;e.exports=(n=a(154))&&n.default||n},150:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return p}),a.d(t,"StaticQueryContext",function(){return f}),a.d(t,"StaticQuery",function(){return m});var n=a(0),r=a.n(n),i=a(4),u=a.n(i),o=a(148),c=a.n(o);a.d(t,"Link",function(){return c.a}),a.d(t,"withPrefix",function(){return o.withPrefix}),a.d(t,"navigate",function(){return o.navigate}),a.d(t,"push",function(){return o.push}),a.d(t,"replace",function(){return o.replace}),a.d(t,"navigateTo",function(){return o.navigateTo});var s=a(149),l=a.n(s);a.d(t,"PageRenderer",function(){return l.a});var d=a(34);a.d(t,"parsePath",function(){return d.a});var f=r.a.createContext({}),m=function(e){return r.a.createElement(f.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function p(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}m.propTypes={data:u.a.object,query:u.a.string.isRequired,render:u.a.func,children:u.a.func}},151:function(e,t,a){"use strict";a.d(t,"a",function(){return c});var n=a(156),r=a.n(n),i=a(157),u=a.n(i),o=new r.a(u.a),c=o.rhythm},152:function(e,t,a){"use strict";var n=a(153),r=a(0),i=a.n(r),u=a(155),o=a(151),c=a(150);t.a=function(e){var t=e.children;return i.a.createElement(c.StaticQuery,{query:"3892401927",render:function(e){return i.a.createElement("div",{className:Object(u.a)("margin:0 auto;max-width:700px;padding:",Object(o.a)(2),";padding-top:",Object(o.a)(1.5),";")},i.a.createElement(c.Link,{to:"/"},i.a.createElement("h3",{className:Object(u.a)("margin-bottom:",Object(o.a)(2),";display:inline-block;font-style:normal;")},e.site.siteMetadata.title)),i.a.createElement(c.Link,{to:"/about/",className:Object(u.a)("float:right;")},"About"),t)},data:n})}},153:function(e){e.exports={data:{site:{siteMetadata:{title:"Pandas Eating Lots"}}}}},154:function(e,t,a){"use strict";a.r(t);a(35);var n=a(0),r=a.n(n),i=a(4),u=a.n(i),o=a(48),c=a(2),s=function(e){var t=e.location,a=c.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(o.a,Object.assign({location:t,pageResources:a},a.json))};s.propTypes={location:u.a.shape({pathname:u.a.string.isRequired}).isRequired},t.default=s}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-fe8fbfe97955e76eb865.js.map