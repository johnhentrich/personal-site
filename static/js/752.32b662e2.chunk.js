(self.webpackChunkpersonal_site=self.webpackChunkpersonal_site||[]).push([[752],{2752:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var i=n(9439),s=(n(2791),n(1087)),r=n(7187),a=n(184),o=function(e){var t=e.data;return(0,a.jsx)("article",{className:"degree-container",children:(0,a.jsxs)("header",{children:[(0,a.jsx)("h4",{className:"degree",children:t.degree}),(0,a.jsxs)("p",{className:"school",children:[(0,a.jsx)("a",{href:t.link,children:t.school}),", ",t.year]})]})})},u=function(e){var t=e.data;return(0,a.jsxs)("div",{className:"education",children:[(0,a.jsx)("div",{className:"link-to",id:"education"}),(0,a.jsx)("div",{className:"title",children:(0,a.jsx)("h3",{children:"Education"})}),t.map((function(e){return(0,a.jsx)(o,{data:e},e.school)}))]})};u.defaultProps={data:[]};var c=u,l=n(7892),d=n.n(l),h=n(2773),f=function(e){var t=e.data,n=t.name,i=t.position,s=t.url,r=t.startDate,o=t.endDate,u=t.summary,c=t.highlights;return(0,a.jsxs)("article",{className:"jobs-container",children:[(0,a.jsxs)("header",{children:[(0,a.jsxs)("h4",{children:[(0,a.jsx)("a",{href:s,children:n})," - ",i]}),(0,a.jsxs)("p",{className:"daterange",children:[" ",d()(r).format("MMMM YYYY")," - ",o?d()(o).format("MMMM YYYY"):"PRESENT"]})]}),u?(0,a.jsx)(h.Z,{options:{overrides:{p:{props:{className:"summary"}}}},children:u}):null,c?(0,a.jsx)("ul",{className:"points",children:c.map((function(e){return(0,a.jsx)("li",{children:e},e)}))}):null]})},m=function(e){var t=e.data;return(0,a.jsxs)("div",{className:"experience",children:[(0,a.jsx)("div",{className:"link-to",id:"experience"}),(0,a.jsx)("div",{className:"title",children:(0,a.jsx)("h3",{children:"Experience"})}),t.map((function(e){return(0,a.jsx)(f,{data:e},"".concat(e.name,"-").concat(e.position))}))]})};m.defaultProps={data:[]};var p=m,v=function(e){var t=e.data,n=e.last;return(0,a.jsxs)("li",{className:"course-container",children:[(0,a.jsxs)("a",{href:t.link,children:[(0,a.jsxs)("h4",{className:"course-number",children:[t.number,":"]}),(0,a.jsx)("p",{className:"course-name",children:t.title})]}),!n&&(0,a.jsx)("div",{className:"course-dot",children:(0,a.jsx)("p",{className:"course-name",children:" \u2022"})})]})};v.defaultProps={last:!1};var y=v,g=function(e){return e.sort((function(e,t){var n=0;return e.university>t.university?n=-1:e.university<t.university||e.number>t.number?n=1:e.number<t.number&&(n=-1),n})).map((function(t,n){return(0,a.jsx)(y,{data:t,last:n===e.length-1},t.title)}))},$=function(e){var t=e.data;return(0,a.jsxs)("div",{className:"courses",children:[(0,a.jsx)("div",{className:"link-to",id:"courses"}),(0,a.jsx)("div",{className:"title",children:(0,a.jsx)("h3",{children:"Selected Courses"})}),(0,a.jsx)("ul",{className:"course-list",children:g(t)})]})};$.defaultProps={data:[]};var x=$,D=function(){return(0,a.jsxs)("div",{className:"references",children:[(0,a.jsx)("div",{className:"link-to",id:"references"}),(0,a.jsx)("div",{className:"title",children:(0,a.jsx)(s.rU,{to:"/contact",children:(0,a.jsx)("h3",{children:"References are available upon request"})})})]})},w=[{title:"Introduction to Software Development",number:"CIT 591",link:"https://www.cis.upenn.edu/~cit591/",university:"University of Pennsylvania"},{title:"Mathematical Foundations of Computer Science",number:"CIT 592",link:"https://online.seas.upenn.edu/course-catalog/mcit-online/",university:"University of Pennsylvania"},{title:"Introduction to Computer Systems",number:"CIT 593",link:"https://online.seas.upenn.edu/course-catalog/mcit-online/",university:"University of Pennsylvania"},{title:"Data Structures and Software Design",number:"CIT 594",link:"https://online.seas.upenn.edu/course-catalog/mcit-online/",university:"University of Pennsylvania"},{title:"Computer Systems Programming",number:"CIT 595",link:"https://online.seas.upenn.edu/course-catalog/mcit-online/",university:"University of Pennsylvania"},{title:"Algorithms and Computation",number:"CIT 596",link:"https://online.seas.upenn.edu/course-catalog/mcit-online/",university:"University of Pennsylvania"},{title:"Database and Information Systems",number:"CIS 550",link:"https://online.seas.upenn.edu/course-catalog/mcit-online/",university:"University of Pennsylvania"},{title:"Blockchains and Cryptography",number:"CIT 582",link:"https://www.cis.upenn.edu/~fbrett/mcit582.html/",university:"University of Pennsylvania"},{title:"Artificial Intelligence",number:"CIS 521",link:"https://artificial-intelligence-class.org/",university:"University of Pennsylvania"},{title:"Networked Systems",number:"CIS 553",link:"https://www.cis.upenn.edu/~cis5530/",university:"University of Pennsylvania"}],S=[{school:"University of Pennsylvania, School of Engineering and Applied Sciences",degree:"Master of Computer and Information Technology",year:"2019-2022",link:"https://online.seas.upenn.edu/degrees/mcit-online/"},{school:"University of California, Berkeley, Haas School of Business",degree:"Master of Business Administration",year:"2015-2027",link:"https://mba.haas.berkeley.edu"},{school:"Dartmouth College",degree:"Bachelor of Arts, Economics",year:"2005-2009",link:"https://dartmouth.edu"}],j=[{name:"Ford",position:"Business Lead, Safety and Security - Connected Services",url:"https://www.ford.com",startDate:"2022-04-01",highlights:["Launching new digital safety and security-focused connected services for Ford owners"]},{name:"Ford",position:"Strategy Manager, Data Products - Connected Services",url:"https://www.ford.com",startDate:"2020-02-01",endDate:"2022-04-01",highlights:["Drove key strategy, product, and new business initiatives for connected vehicle data products and services (insurance, energy, smart cities)"]},{name:"Ford",position:"Product Manager, City Solutions - Mobility Services",url:"https://www.ford.com",startDate:"2018-10-01",endDate:"2020-02-01",highlights:["Helped build software for new mobility services and smart cities"]},{name:"Ford",position:"Manager, Corporate Strategy",url:"https://www.ford.com",startDate:"2017-07-01",endDate:"2018-10-01",highlights:["Supported key corporate strategic planning initiatives"]},{name:"Ford",position:"MBA Intern, Corporate Development",url:"https://www.ford.com",startDate:"2016-05-01",endDate:"2016-08-01",highlights:["Evaluated potential investment and acquisition opportunities"]},{name:"Vantage Point Advisors (acquired by Stout in 2022)",position:"Associate, Business Valuation",url:"https://vpadvisors.com",startDate:"2012-04-01",endDate:"2015-06-01",highlights:["Developed financial models for financial reporting, strategic planning and other valuation services"]},{name:"Cabrillo Advisors",position:"Analyst, Business Valuation",url:"https://cabrilloadvisors.com",startDate:"2011-03-01",endDate:"2012-04-01",highlights:["Developed financial models for valuation and other financial advisory services"]},{name:"BeyondTrust Software",position:"Associate, Corporate Development",url:"https://beyondtrust.com",startDate:"2009-08-01",endDate:"2010-10-01",highlights:["Supported key sales, product, and marketing initiatives stemming from the integration of a privileged access management software company"]}],M={Education:function(){return(0,a.jsx)(c,{data:S})},Experience:function(){return(0,a.jsx)(p,{data:j})},Courses:function(){return(0,a.jsx)(x,{data:w})},References:function(){return(0,a.jsx)(D,{})}},b=function(){return(0,a.jsx)(r.Z,{title:"Resume",description:"John Hentrich's Resume",children:(0,a.jsxs)("article",{className:"post",id:"resume",children:[(0,a.jsx)("header",{children:(0,a.jsxs)("div",{className:"title",children:[(0,a.jsx)("h2",{children:(0,a.jsx)(s.rU,{to:"resume",children:"Resume"})}),(0,a.jsx)("div",{className:"link-container",children:Object.keys(M).map((function(e){return(0,a.jsx)("h4",{children:(0,a.jsx)("a",{href:"#".concat(e.toLowerCase()),children:e})},e)}))})]})}),Object.entries(M).map((function(e){var t=(0,i.Z)(e,2),n=t[0],s=t[1];return(0,a.jsx)(s,{},n)}))]})})}},7892:function(e){e.exports=function(){"use strict";var e=1e3,t=6e4,n=36e5,i="millisecond",s="second",r="minute",a="hour",o="day",u="week",c="month",l="quarter",d="year",h="date",f="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,p=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},y=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},g={s:y,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),s=n%60;return(t<=0?"+":"-")+y(i,2,"0")+":"+y(s,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),s=t.clone().add(i,c),r=n-s<0,a=t.clone().add(i+(r?-1:1),c);return+(-(i+(n-s)/(r?s-a:a-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:c,y:d,w:u,d:o,D:h,h:a,m:r,s:s,ms:i,Q:l}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},$="en",x={};x[$]=v;var D=function(e){return e instanceof M},w=function e(t,n,i){var s;if(!t)return $;if("string"==typeof t){var r=t.toLowerCase();x[r]&&(s=r),n&&(x[r]=n,s=r);var a=t.split("-");if(!s&&a.length>1)return e(a[0])}else{var o=t.name;x[o]=t,s=o}return!i&&s&&($=s),s||!i&&$},S=function(e,t){if(D(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new M(n)},j=g;j.l=w,j.i=D,j.w=function(e,t){return S(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var M=function(){function v(e){this.$L=w(e.locale,null,!0),this.parse(e)}var y=v.prototype;return y.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(j.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(m);if(i){var s=i[2]-1||0,r=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],s,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},y.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},y.$utils=function(){return j},y.isValid=function(){return!(this.$d.toString()===f)},y.isSame=function(e,t){var n=S(e);return this.startOf(t)<=n&&n<=this.endOf(t)},y.isAfter=function(e,t){return S(e)<this.startOf(t)},y.isBefore=function(e,t){return this.endOf(t)<S(e)},y.$g=function(e,t,n){return j.u(e)?this[t]:this.set(n,e)},y.unix=function(){return Math.floor(this.valueOf()/1e3)},y.valueOf=function(){return this.$d.getTime()},y.startOf=function(e,t){var n=this,i=!!j.u(t)||t,l=j.p(e),f=function(e,t){var s=j.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return i?s:s.endOf(o)},m=function(e,t){return j.w(n.toDate()[e].apply(n.toDate("s"),(i?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},p=this.$W,v=this.$M,y=this.$D,g="set"+(this.$u?"UTC":"");switch(l){case d:return i?f(1,0):f(31,11);case c:return i?f(1,v):f(0,v+1);case u:var $=this.$locale().weekStart||0,x=(p<$?p+7:p)-$;return f(i?y-x:y+(6-x),v);case o:case h:return m(g+"Hours",0);case a:return m(g+"Minutes",1);case r:return m(g+"Seconds",2);case s:return m(g+"Milliseconds",3);default:return this.clone()}},y.endOf=function(e){return this.startOf(e,!1)},y.$set=function(e,t){var n,u=j.p(e),l="set"+(this.$u?"UTC":""),f=(n={},n[o]=l+"Date",n[h]=l+"Date",n[c]=l+"Month",n[d]=l+"FullYear",n[a]=l+"Hours",n[r]=l+"Minutes",n[s]=l+"Seconds",n[i]=l+"Milliseconds",n)[u],m=u===o?this.$D+(t-this.$W):t;if(u===c||u===d){var p=this.clone().set(h,1);p.$d[f](m),p.init(),this.$d=p.set(h,Math.min(this.$D,p.daysInMonth())).$d}else f&&this.$d[f](m);return this.init(),this},y.set=function(e,t){return this.clone().$set(e,t)},y.get=function(e){return this[j.p(e)]()},y.add=function(i,l){var h,f=this;i=Number(i);var m=j.p(l),p=function(e){var t=S(f);return j.w(t.date(t.date()+Math.round(e*i)),f)};if(m===c)return this.set(c,this.$M+i);if(m===d)return this.set(d,this.$y+i);if(m===o)return p(1);if(m===u)return p(7);var v=(h={},h[r]=t,h[a]=n,h[s]=e,h)[m]||1,y=this.$d.getTime()+i*v;return j.w(y,this)},y.subtract=function(e,t){return this.add(-1*e,t)},y.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=e||"YYYY-MM-DDTHH:mm:ssZ",s=j.z(this),r=this.$H,a=this.$m,o=this.$M,u=n.weekdays,c=n.months,l=function(e,n,s,r){return e&&(e[n]||e(t,i))||s[n].slice(0,r)},d=function(e){return j.s(r%12||12,e,"0")},h=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:j.s(o+1,2,"0"),MMM:l(n.monthsShort,o,c,3),MMMM:l(c,o),D:this.$D,DD:j.s(this.$D,2,"0"),d:String(this.$W),dd:l(n.weekdaysMin,this.$W,u,2),ddd:l(n.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(r),HH:j.s(r,2,"0"),h:d(1),hh:d(2),a:h(r,a,!0),A:h(r,a,!1),m:String(a),mm:j.s(a,2,"0"),s:String(this.$s),ss:j.s(this.$s,2,"0"),SSS:j.s(this.$ms,3,"0"),Z:s};return i.replace(p,(function(e,t){return t||m[e]||s.replace(":","")}))},y.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},y.diff=function(i,h,f){var m,p=j.p(h),v=S(i),y=(v.utcOffset()-this.utcOffset())*t,g=this-v,$=j.m(this,v);return $=(m={},m[d]=$/12,m[c]=$,m[l]=$/3,m[u]=(g-y)/6048e5,m[o]=(g-y)/864e5,m[a]=g/n,m[r]=g/t,m[s]=g/e,m)[p]||g,f?$:j.a($)},y.daysInMonth=function(){return this.endOf(c).$D},y.$locale=function(){return x[this.$L]},y.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=w(e,t,!0);return i&&(n.$L=i),n},y.clone=function(){return j.w(this.$d,this)},y.toDate=function(){return new Date(this.valueOf())},y.toJSON=function(){return this.isValid()?this.toISOString():null},y.toISOString=function(){return this.$d.toISOString()},y.toString=function(){return this.$d.toUTCString()},v}(),b=M.prototype;return S.prototype=b,[["$ms",i],["$s",s],["$m",r],["$H",a],["$W",o],["$M",c],["$y",d],["$D",h]].forEach((function(e){b[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),S.extend=function(e,t){return e.$i||(e(t,M,S),e.$i=!0),S},S.locale=w,S.isDayjs=D,S.unix=function(e){return S(1e3*e)},S.en=x[$],S.Ls=x,S.p={},S}()}}]);
//# sourceMappingURL=752.32b662e2.chunk.js.map