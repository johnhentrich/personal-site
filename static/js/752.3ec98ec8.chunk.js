(self.webpackChunkpersonal_site=self.webpackChunkpersonal_site||[]).push([[752],{2752:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return b}});var i=n(9439),r=(n(2791),n(1087)),s=n(6842),a=n(184),o=function(e){var t=e.data;return(0,a.jsx)("article",{className:"degree-container",children:(0,a.jsxs)("header",{children:[(0,a.jsx)("h4",{className:"degree",children:t.degree}),(0,a.jsxs)("p",{className:"school",children:[(0,a.jsx)("a",{href:t.link,children:t.school}),", ",t.year]})]})})},u=function(e){var t=e.data;return(0,a.jsxs)("div",{className:"education",children:[(0,a.jsx)("div",{className:"link-to",id:"education"}),(0,a.jsx)("div",{className:"title",children:(0,a.jsx)("h3",{children:"Education"})}),t.map((function(e){return(0,a.jsx)(o,{data:e},e.school)}))]})};u.defaultProps={data:[]};var c=u,l=n(7892),d=n.n(l),h=n(2773),f=function(e){var t=e.data,n=t.name,i=t.position,r=t.url,s=t.startDate,o=t.endDate,u=t.summary,c=t.highlights;return(0,a.jsxs)("article",{className:"jobs-container",children:[(0,a.jsxs)("header",{children:[(0,a.jsxs)("h4",{children:[(0,a.jsx)("a",{href:r,children:n})," - ",i]}),(0,a.jsxs)("p",{className:"daterange",children:[" ",d()(s).format("MMMM YYYY")," - ",o?d()(o).format("MMMM YYYY"):"PRESENT"]})]}),u?(0,a.jsx)(h.Z,{options:{overrides:{p:{props:{className:"summary"}}}},children:u}):null,c?(0,a.jsx)("ul",{className:"points",children:c.map((function(e){return(0,a.jsx)("li",{children:e},e)}))}):null]})},m=function(e){var t=e.data;return(0,a.jsxs)("div",{className:"experience",children:[(0,a.jsx)("div",{className:"link-to",id:"experience"}),(0,a.jsx)("div",{className:"title",children:(0,a.jsx)("h3",{children:"Experience"})}),t.map((function(e){return(0,a.jsx)(f,{data:e},"".concat(e.name,"-").concat(e.position))}))]})};m.defaultProps={data:[]};var v=m,p=function(e){var t=e.data,n=e.last;return(0,a.jsxs)("li",{className:"course-container",children:[(0,a.jsxs)("a",{href:t.link,children:[(0,a.jsxs)("h4",{className:"course-number",children:[t.number,":"]}),(0,a.jsx)("p",{className:"course-name",children:t.title})]}),!n&&(0,a.jsx)("div",{className:"course-dot",children:(0,a.jsx)("p",{className:"course-name",children:" \u2022"})})]})};p.defaultProps={last:!1};var y=p,g=function(e){return e.sort((function(e,t){var n=0;return e.university>t.university?n=-1:e.university<t.university||e.number>t.number?n=1:e.number<t.number&&(n=-1),n})).map((function(t,n){return(0,a.jsx)(y,{data:t,last:n===e.length-1},t.title)}))},$=function(e){var t=e.data;return(0,a.jsxs)("div",{className:"courses",children:[(0,a.jsx)("div",{className:"link-to",id:"courses"}),(0,a.jsx)("div",{className:"title",children:(0,a.jsx)("h3",{children:"Selected Courses"})}),(0,a.jsx)("ul",{className:"course-list",children:g(t)})]})};$.defaultProps={data:[]};var w=$,x=function(){return(0,a.jsxs)("div",{className:"references",children:[(0,a.jsx)("div",{className:"link-to",id:"references"}),(0,a.jsx)("div",{className:"title",children:(0,a.jsx)(r.rU,{to:"/contact",children:(0,a.jsx)("h3",{children:"References are available upon request"})})})]})},S=[{title:"Introduction to Software Development",number:"CIT 591",link:"https://www.cis.upenn.edu/~cit591/",university:"University of Pennsylvania"},{title:"Mathematical Foundations of Computer Science",number:"CIT 592",link:"https://www.seas.upenn.edu/~cit592/",university:"University of Pennsylvania"},{title:"Introduction to Computer Systems",number:"CIT 593",link:"https://www.seas.upenn.edu/~cit593/",university:"University of Pennsylvania"},{title:"Data Structures and Software Design",number:"CIT 594",link:"https://www.seas.upenn.edu/~cit594/",university:"University of Pennsylvania"},{title:"Computer Systems Programming",number:"CIT 595",link:"https://www.seas.upenn.edu/~cit595/",university:"University of Pennsylvania"},{title:"Algorithms and Computation",number:"CIT 596",link:"https://www.seas.upenn.edu/~cit596/",university:"University of Pennsylvania"},{title:"Database and Information Systems",number:"CIS 550",link:"https://www.seas.upenn.edu/~cis550/",university:"University of Pennsylvania"},{title:"Blockchain and Cryptography",number:"CIT 582",link:"https://onlinelearning.seas.upenn.edu/mcit-online-course-list/",university:"University of Pennsylvania"},{title:"Artificial Intelligence",number:"CIS 521",link:"https://artificial-intelligence-class.org/",university:"University of Pennsylvania"},{title:"Networked Systems",number:"CIS 553",link:"https://www.cis.upenn.edu/~cis553/",university:"University of Pennsylvania"}],M=[{school:"University of Pennsylvania, School of Engineering and Applied Sciences",degree:"Master of Computer and Information Technology",link:"https://gradadm.seas.upenn.edu/masters/computer-and-information-technology-mcit/",year:2022},{school:"University of California, Berkeley, Haas School of Business",degree:"Master of Business Administration",link:"https://mba.haas.berkeley.edu",year:2017},{school:"Dartmouth College",degree:"Bachelor of Arts, Economics",link:"https://dartmouth.edu",year:2009}],j=[{name:"Ford",position:"Services Marketing Manager, Safety and Security - Connected Services",url:"https://www.ford.com",startDate:"2022-04-01",highlights:["Launching new digital safety and security-focused connected services for Ford owners"]},{name:"Ford",position:"Strategy Manager, Data Products - Connected Services",url:"https://www.ford.com",startDate:"2020-02-01",highlights:["Helping drive product, strategy, and new business initiatives for connected vehicle data products and services"]},{name:"Ford",position:"Product Manager, City Solutions - Mobility Services",url:"https://www.ford.com",startDate:"2018-10-01",highlights:["Helped build software for new mobility services"]},{name:"Ford",position:"Strategy Manager, Corporate Strategy - Mobility Services",url:"https://www.ford.com",startDate:"2017-07-01",highlights:["Supported key corporate strategic planning initiatives"]},{name:"Vantage Point Advisors",position:"Senior Associate, Valuation Services",url:"https://vpadvisors.com",startDate:"2012-04-01",highlights:["Developed financial models for financial reporting, strategic planning and valuation advisory purposes"]},{name:"Cabrillo Advisors",position:"Analyst, Valuation Services",url:"https://cabrilloadvisors.com",startDate:"2011-03-01",highlights:["Developed financial models for valuation and financial advisory services"]},{name:"BeyondTrust",position:"Associate, Corporate Development",url:"https://beyondtrust.com",startDate:"2009-08-01",highlights:["Supported key corporate strategic initiatives including the acquisition and integration of an enterprise security software company"]}],D={Education:function(){return(0,a.jsx)(c,{data:M})},Experience:function(){return(0,a.jsx)(v,{data:j})},Courses:function(){return(0,a.jsx)(w,{data:S})},References:function(){return(0,a.jsx)(x,{})}},b=function(){return(0,a.jsx)(s.Z,{title:"Resume",description:"John Hentrich's Resume",children:(0,a.jsxs)("article",{className:"post",id:"resume",children:[(0,a.jsx)("header",{children:(0,a.jsxs)("div",{className:"title",children:[(0,a.jsx)("h2",{children:(0,a.jsx)(r.rU,{to:"resume",children:"Resume"})}),(0,a.jsx)("div",{className:"link-container",children:Object.keys(D).map((function(e){return(0,a.jsx)("h4",{children:(0,a.jsx)("a",{href:"#".concat(e.toLowerCase()),children:e})},e)}))})]})}),Object.entries(D).map((function(e){var t=(0,i.Z)(e,2),n=t[0],r=t[1];return(0,a.jsx)(r,{},n)}))]})})}},7892:function(e){e.exports=function(){"use strict";var e=1e3,t=6e4,n=36e5,i="millisecond",r="second",s="minute",a="hour",o="day",u="week",c="month",l="quarter",d="year",h="date",f="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,p={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],n=e%100;return"["+e+(t[(n-20)%10]||t[n]||t[0])+"]"}},y=function(e,t,n){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(n)+e},g={s:y,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),i=Math.floor(n/60),r=n%60;return(t<=0?"+":"-")+y(i,2,"0")+":"+y(r,2,"0")},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var i=12*(n.year()-t.year())+(n.month()-t.month()),r=t.clone().add(i,c),s=n-r<0,a=t.clone().add(i+(s?-1:1),c);return+(-(i+(n-r)/(s?r-a:a-r))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:c,y:d,w:u,d:o,D:h,h:a,m:s,s:r,ms:i,Q:l}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},$="en",w={};w[$]=p;var x=function(e){return e instanceof D},S=function e(t,n,i){var r;if(!t)return $;if("string"==typeof t){var s=t.toLowerCase();w[s]&&(r=s),n&&(w[s]=n,r=s);var a=t.split("-");if(!r&&a.length>1)return e(a[0])}else{var o=t.name;w[o]=t,r=o}return!i&&r&&($=r),r||!i&&$},M=function(e,t){if(x(e))return e.clone();var n="object"==typeof t?t:{};return n.date=e,n.args=arguments,new D(n)},j=g;j.l=S,j.i=x,j.w=function(e,t){return M(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var D=function(){function p(e){this.$L=S(e.locale,null,!0),this.parse(e)}var y=p.prototype;return y.parse=function(e){this.$d=function(e){var t=e.date,n=e.utc;if(null===t)return new Date(NaN);if(j.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(m);if(i){var r=i[2]-1||0,s=(i[7]||"0").substring(0,3);return n?new Date(Date.UTC(i[1],r,i[3]||1,i[4]||0,i[5]||0,i[6]||0,s)):new Date(i[1],r,i[3]||1,i[4]||0,i[5]||0,i[6]||0,s)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},y.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},y.$utils=function(){return j},y.isValid=function(){return!(this.$d.toString()===f)},y.isSame=function(e,t){var n=M(e);return this.startOf(t)<=n&&n<=this.endOf(t)},y.isAfter=function(e,t){return M(e)<this.startOf(t)},y.isBefore=function(e,t){return this.endOf(t)<M(e)},y.$g=function(e,t,n){return j.u(e)?this[t]:this.set(n,e)},y.unix=function(){return Math.floor(this.valueOf()/1e3)},y.valueOf=function(){return this.$d.getTime()},y.startOf=function(e,t){var n=this,i=!!j.u(t)||t,l=j.p(e),f=function(e,t){var r=j.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return i?r:r.endOf(o)},m=function(e,t){return j.w(n.toDate()[e].apply(n.toDate("s"),(i?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},v=this.$W,p=this.$M,y=this.$D,g="set"+(this.$u?"UTC":"");switch(l){case d:return i?f(1,0):f(31,11);case c:return i?f(1,p):f(0,p+1);case u:var $=this.$locale().weekStart||0,w=(v<$?v+7:v)-$;return f(i?y-w:y+(6-w),p);case o:case h:return m(g+"Hours",0);case a:return m(g+"Minutes",1);case s:return m(g+"Seconds",2);case r:return m(g+"Milliseconds",3);default:return this.clone()}},y.endOf=function(e){return this.startOf(e,!1)},y.$set=function(e,t){var n,u=j.p(e),l="set"+(this.$u?"UTC":""),f=(n={},n[o]=l+"Date",n[h]=l+"Date",n[c]=l+"Month",n[d]=l+"FullYear",n[a]=l+"Hours",n[s]=l+"Minutes",n[r]=l+"Seconds",n[i]=l+"Milliseconds",n)[u],m=u===o?this.$D+(t-this.$W):t;if(u===c||u===d){var v=this.clone().set(h,1);v.$d[f](m),v.init(),this.$d=v.set(h,Math.min(this.$D,v.daysInMonth())).$d}else f&&this.$d[f](m);return this.init(),this},y.set=function(e,t){return this.clone().$set(e,t)},y.get=function(e){return this[j.p(e)]()},y.add=function(i,l){var h,f=this;i=Number(i);var m=j.p(l),v=function(e){var t=M(f);return j.w(t.date(t.date()+Math.round(e*i)),f)};if(m===c)return this.set(c,this.$M+i);if(m===d)return this.set(d,this.$y+i);if(m===o)return v(1);if(m===u)return v(7);var p=(h={},h[s]=t,h[a]=n,h[r]=e,h)[m]||1,y=this.$d.getTime()+i*p;return j.w(y,this)},y.subtract=function(e,t){return this.add(-1*e,t)},y.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||f;var i=e||"YYYY-MM-DDTHH:mm:ssZ",r=j.z(this),s=this.$H,a=this.$m,o=this.$M,u=n.weekdays,c=n.months,l=function(e,n,r,s){return e&&(e[n]||e(t,i))||r[n].slice(0,s)},d=function(e){return j.s(s%12||12,e,"0")},h=n.meridiem||function(e,t,n){var i=e<12?"AM":"PM";return n?i.toLowerCase():i},m={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:j.s(o+1,2,"0"),MMM:l(n.monthsShort,o,c,3),MMMM:l(c,o),D:this.$D,DD:j.s(this.$D,2,"0"),d:String(this.$W),dd:l(n.weekdaysMin,this.$W,u,2),ddd:l(n.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(s),HH:j.s(s,2,"0"),h:d(1),hh:d(2),a:h(s,a,!0),A:h(s,a,!1),m:String(a),mm:j.s(a,2,"0"),s:String(this.$s),ss:j.s(this.$s,2,"0"),SSS:j.s(this.$ms,3,"0"),Z:r};return i.replace(v,(function(e,t){return t||m[e]||r.replace(":","")}))},y.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},y.diff=function(i,h,f){var m,v=j.p(h),p=M(i),y=(p.utcOffset()-this.utcOffset())*t,g=this-p,$=j.m(this,p);return $=(m={},m[d]=$/12,m[c]=$,m[l]=$/3,m[u]=(g-y)/6048e5,m[o]=(g-y)/864e5,m[a]=g/n,m[s]=g/t,m[r]=g/e,m)[v]||g,f?$:j.a($)},y.daysInMonth=function(){return this.endOf(c).$D},y.$locale=function(){return w[this.$L]},y.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),i=S(e,t,!0);return i&&(n.$L=i),n},y.clone=function(){return j.w(this.$d,this)},y.toDate=function(){return new Date(this.valueOf())},y.toJSON=function(){return this.isValid()?this.toISOString():null},y.toISOString=function(){return this.$d.toISOString()},y.toString=function(){return this.$d.toUTCString()},p}(),b=D.prototype;return M.prototype=b,[["$ms",i],["$s",r],["$m",s],["$H",a],["$W",o],["$M",c],["$y",d],["$D",h]].forEach((function(e){b[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),M.extend=function(e,t){return e.$i||(e(t,D,M),e.$i=!0),M},M.locale=S,M.isDayjs=x,M.unix=function(e){return M(1e3*e)},M.en=w[$],M.Ls=w,M.p={},M}()}}]);
//# sourceMappingURL=752.3ec98ec8.chunk.js.map