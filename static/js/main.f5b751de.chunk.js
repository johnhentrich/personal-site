(this["webpackJsonppersonal-site"]=this["webpackJsonppersonal-site"]||[]).push([[0],{19:function(e,t,n){"use strict";var c=n(0),i=n(1),l=n(15),s=n(5),r=n(21),a=[{index:!0,label:"John Hentrich",path:"/"},{label:"About",path:"/about"},{label:"Resume",path:"/resume"},{label:"Projects",path:"/projects"},{label:"Stats",path:"/stats"},{label:"Contact",path:"/contact"}],j=Object(i.lazy)((function(){return n.e(4).then(n.t.bind(null,162,7))})),o=function(){var e=Object(i.useState)(!1),t=Object(r.a)(e,2),n=t[0],l=t[1];return Object(c.jsxs)("div",{className:"hamburger-container",children:[Object(c.jsx)("nav",{className:"main",id:"hambuger-nav",children:Object(c.jsx)("ul",{children:n?Object(c.jsx)("li",{className:"menu close-menu",children:Object(c.jsx)("div",{onClick:function(){return l(!n)},className:"menu-hover",children:"\u2715"})}):Object(c.jsx)("li",{className:"menu open-menu",children:Object(c.jsx)("div",{onClick:function(){return l(!n)},className:"menu-hover",children:"\u2630"})})})}),Object(c.jsx)(i.Suspense,{fallback:Object(c.jsx)(c.Fragment,{}),children:Object(c.jsx)(j,{right:!0,isOpen:n,children:Object(c.jsx)("ul",{className:"hamburger-ul",children:a.map((function(e){return Object(c.jsx)("li",{children:Object(c.jsx)(s.b,{to:e.path,onClick:function(){return l(!n)},children:Object(c.jsx)("h3",{className:e.index&&"index-li",children:e.label})})},e.label)}))})})})]})},h=function(){return Object(c.jsxs)("header",{id:"header",children:[Object(c.jsx)("h1",{className:"index-link",children:a.filter((function(e){return e.index})).map((function(e){return Object(c.jsx)(s.b,{to:e.path,children:e.label},e.label)}))}),Object(c.jsx)("nav",{className:"links",children:Object(c.jsx)("ul",{children:a.filter((function(e){return!e.index})).map((function(e){return Object(c.jsx)("li",{children:Object(c.jsx)(s.b,{to:e.path,children:e.label})},e.label)}))})}),Object(c.jsx)(o,{})]})},b=n(22),d=function(){return Object(c.jsxs)("section",{id:"sidebar",children:[Object(c.jsxs)("section",{id:"intro",children:[Object(c.jsx)(s.b,{to:"/",className:"logo",children:Object(c.jsx)("img",{src:"".concat("","/images/me.jpg"),alt:""})}),Object(c.jsxs)("header",{children:[Object(c.jsx)("h2",{children:"John Hentrich"}),Object(c.jsx)("p",{children:Object(c.jsx)("a",{href:"mailto:john.hentrich@gmail.com",children:"john.hentrich@gmail.com"})})]})]}),Object(c.jsxs)("section",{className:"blurb",children:[Object(c.jsx)("h2",{children:"About"}),Object(c.jsxs)("p",{children:["Hi, I'm John. Welcome to my personal website. I am a current ",Object(c.jsx)("a",{href:"https://gradadm.seas.upenn.edu/masters/computer-and-information-technology-mcit/",children:"Penn MCIT"})," student, and currently work for ",Object(c.jsx)("a",{href:"https://ford.com",children:"Ford"})," where I am helping drive the strategy and launch of new data enabled businesses. Before Ford I worked at ",Object(c.jsx)("a",{href:"https://vpadvisors.com",children:"Vantage Point Advisors"}),", ",Object(c.jsx)("a",{href:"https://cabrilloadvisors.com",children:"Cabrillo Advisors"}),", ",Object(c.jsx)("a",{href:"https://www.beyondtrust.com",children:"BeyondTrust Software"}),", and ",Object(c.jsx)("a",{href:"https://www.qualcomm.com",children:"Qualcomm"}),"."]}),Object(c.jsx)("ul",{className:"actions",children:Object(c.jsx)("li",{children:window.location.pathname.includes("/resume")?Object(c.jsx)(s.b,{to:"/about",className:"button",children:"About Me"}):Object(c.jsx)(s.b,{to:"/resume",className:"button",children:"Learn More"})})})]}),Object(c.jsxs)("section",{id:"footer",children:[Object(c.jsx)(b.a,{}),Object(c.jsxs)("p",{className:"copyright",children:["\xa9 Michael D'Angelo ",Object(c.jsx)(s.b,{to:"/",children:"mldangelo.com"}),"."]})]})]})},u=n(3),O=function(){var e=Object(u.f)().pathname;return Object(i.useEffect)((function(){window.scrollTo(0,0)}),[e]),null},m=function(e){return Object(c.jsxs)(l.b,{children:[Object(c.jsx)(O,{}),Object(c.jsxs)(l.a,{titleTemplate:"%s | John Hentrich",defaultTitle:"John Hentrich",defer:!1,children:[e.title&&Object(c.jsx)("title",{children:e.title}),Object(c.jsx)("meta",{name:"description",content:e.description})]}),Object(c.jsxs)("div",{id:"wrapper",children:[Object(c.jsx)(h,{}),Object(c.jsx)("div",{id:"main",children:e.children}),e.fullPage?null:Object(c.jsx)(d,{})]})]})};m.defaultProps={children:null,fullPage:!1,title:null,description:"John Hentrich's personal website."};t.a=m},22:function(e,t,n){"use strict";var c=n(0),i=(n(1),n(26)),l=n(27),s=n(28),r=n(29),a=[{link:"https://github.com/johnhentrich",label:"Github",icon:l.faGithub},{link:"https://www.linkedin.com/in/jhentrich",label:"LinkedIn",icon:s.faLinkedinIn},{link:"mailto:john.hentrich@gmail.com",label:"Email",icon:r.faEnvelope}];t.a=function(){return Object(c.jsx)("ul",{className:"icons",children:a.map((function(e){return Object(c.jsx)("li",{children:Object(c.jsx)("a",{href:e.link,children:Object(c.jsx)(i.a,{icon:e.icon})})},e.label)}))})}},42:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n(1),l=n.n(i),s=n(14),r=n(5),a=n(3),j=n(19),o=(n(42),Object(i.lazy)((function(){return Promise.all([n.e(2),n.e(6)]).then(n.bind(null,158))}))),h=Object(i.lazy)((function(){return n.e(7).then(n.bind(null,159))})),b=Object(i.lazy)((function(){return n.e(8).then(n.bind(null,160))})),d=Object(i.lazy)((function(){return n.e(9).then(n.bind(null,161))})),u=Object(i.lazy)((function(){return n.e(5).then(n.bind(null,165))})),O=Object(i.lazy)((function(){return n.e(10).then(n.bind(null,163))})),m=Object(i.lazy)((function(){return n.e(11).then(n.bind(null,164))})),x=function(){return Object(c.jsx)(r.a,{basename:"",children:Object(c.jsx)(i.Suspense,{fallback:Object(c.jsx)(j.a,{}),children:Object(c.jsxs)(a.c,{children:[Object(c.jsx)(a.a,{exact:!0,path:"/",component:b}),Object(c.jsx)(a.a,{path:"/about",component:o}),Object(c.jsx)(a.a,{path:"/projects",component:u}),Object(c.jsx)(a.a,{path:"/stats",component:m}),Object(c.jsx)(a.a,{path:"/contact",component:h}),Object(c.jsx)(a.a,{path:"/resume",component:O}),Object(c.jsx)(a.a,{component:d,status:404})]})})})},p=function(){return Object(c.jsx)(l.a.StrictMode,{children:Object(c.jsx)(x,{})})},f=document.getElementById("root");f.hasChildNodes()?Object(s.hydrate)(Object(c.jsx)(p,{}),f):Object(s.render)(Object(c.jsx)(p,{}),f)}},[[43,1,3]]]);
//# sourceMappingURL=main.f5b751de.chunk.js.map