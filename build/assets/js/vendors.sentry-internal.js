!function(){try{var t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},e=(new Error).stack;e&&(t._sentryDebugIds=t._sentryDebugIds||{},t._sentryDebugIds[e]="d32caf6b-6d81-49dc-af3e-c8ab5f320308",t._sentryDebugIdIdentifier="sentry-dbid-d32caf6b-6d81-49dc-af3e-c8ab5f320308")}catch(t){}}();var _global="undefined"!==typeof window?window:"undefined"!==typeof global?global:"undefined"!==typeof self?self:{};_global.SENTRY_RELEASE={id:"db3ffc115127a21c9be3f7527c2d5897b48218ec"},(self.webpackChunklocal_services_lookup=self.webpackChunklocal_services_lookup||[]).push([[152],{9766:(t,e,n)=>{n.d(e,{gE:()=>z});var r=n(5544),a=n(2931),i=n(9791),o=n(2343),s=n(7638),c=n(8464),u=n(7513),d=n(3821);var p=n(1170),l=n(5363),g=n(5029);function m(t){return"number"===typeof t&&isFinite(t)}function f(t,{startTimestamp:e,...n}){return e&&t.startTimestamp>e&&(t.startTimestamp=e),t.startChild({startTimestamp:e,...n})}const h=2147483647;function T(t){return t/1e3}function v(){return d.WINDOW&&d.WINDOW.addEventListener&&d.WINDOW.performance}let _,b,y=0,k={};function S(){const t=v();if(t&&p.Z1){t.mark&&d.WINDOW.performance.mark("sentry-tracing-init");const e=(0,l.to)((({metric:t})=>{const e=t.entries.pop();if(!e)return;const n=T(p.Z1),r=T(e.startTime);u.X&&o.kg.log("[Measurements] Adding FID"),k.fid={value:t.value,unit:"millisecond"},k["mark.fid"]={value:n+r,unit:"second"}})),n=(0,l.PR)((({metric:t})=>{const e=t.entries.pop();e&&(u.X&&o.kg.log("[Measurements] Adding CLS"),k.cls={value:t.value,unit:""},b=e)})),r=(0,l.$A)((({metric:t})=>{const e=t.entries.pop();e&&(u.X&&o.kg.log("[Measurements] Adding LCP"),k.lcp={value:t.value,unit:"millisecond"},_=e)}));return()=>{e(),n(),r()}}return()=>{}}function I(t){const e=v();if(!e||!d.WINDOW.performance.getEntries||!p.Z1)return;u.X&&o.kg.log("[Tracing] Adding & adjusting spans using Performance API");const n=T(p.Z1),r=e.getEntries();let a,i;if(r.slice(y).forEach((e=>{const r=T(e.startTime),s=T(e.duration);if(!("navigation"===t.op&&n+r<t.startTimestamp))switch(e.entryType){case"navigation":!function(t,e,n){["unloadEvent","redirect","domContentLoadedEvent","loadEvent","connect"].forEach((r=>{W(t,e,r,n)})),W(t,e,"secureConnection",n,"TLS/SSL","connectEnd"),W(t,e,"fetch",n,"cache","domainLookupStart"),W(t,e,"domainLookup",n,"DNS"),function(t,e,n){f(t,{op:"browser",origin:"auto.browser.browser.metrics",description:"request",startTimestamp:n+T(e.requestStart),endTimestamp:n+T(e.responseEnd)}),f(t,{op:"browser",origin:"auto.browser.browser.metrics",description:"response",startTimestamp:n+T(e.responseStart),endTimestamp:n+T(e.responseEnd)})}(t,e,n)}(t,e,n),a=n+T(e.responseStart),i=n+T(e.requestStart);break;case"mark":case"paint":case"measure":{!function(t,e,n,r,a){const i=a+n,o=i+r;f(t,{description:e.name,endTimestamp:o,op:e.entryType,origin:"auto.resource.browser.metrics",startTimestamp:i})}(t,e,r,s,n);const a=(0,g.Y)(),i=e.startTime<a.firstHiddenTime;"first-paint"===e.name&&i&&(u.X&&o.kg.log("[Measurements] Adding FP"),k.fp={value:e.startTime,unit:"millisecond"}),"first-contentful-paint"===e.name&&i&&(u.X&&o.kg.log("[Measurements] Adding FCP"),k.fcp={value:e.startTime,unit:"millisecond"});break}case"resource":{const a=e.name.replace(d.WINDOW.location.origin,"");!function(t,e,n,r,a,i){if("xmlhttprequest"===e.initiatorType||"fetch"===e.initiatorType)return;const o={};w(o,e,"transferSize","http.response_transfer_size"),w(o,e,"encodedBodySize","http.response_content_length"),w(o,e,"decodedBodySize","http.decoded_response_content_length"),"renderBlockingStatus"in e&&(o["resource.render_blocking_status"]=e.renderBlockingStatus);const s=i+r,c=s+a;f(t,{description:n,endTimestamp:c,op:e.initiatorType?`resource.${e.initiatorType}`:"resource.other",origin:"auto.resource.browser.metrics",startTimestamp:s,data:o})}(t,e,a,r,s,n);break}}})),y=Math.max(r.length-1,0),function(t){const e=d.WINDOW.navigator;if(!e)return;const n=e.connection;n&&(n.effectiveType&&t.setTag("effectiveConnectionType",n.effectiveType),n.type&&t.setTag("connectionType",n.type),m(n.rtt)&&(k["connection.rtt"]={value:n.rtt,unit:"millisecond"}));m(e.deviceMemory)&&t.setTag("deviceMemory",`${e.deviceMemory} GB`);m(e.hardwareConcurrency)&&t.setTag("hardwareConcurrency",String(e.hardwareConcurrency))}(t),"pageload"===t.op){"number"===typeof a&&(u.X&&o.kg.log("[Measurements] Adding TTFB"),k.ttfb={value:1e3*(a-t.startTimestamp),unit:"millisecond"},"number"===typeof i&&i<=a&&(k["ttfb.requestTime"]={value:1e3*(a-i),unit:"millisecond"})),["fcp","fp","lcp"].forEach((e=>{if(!k[e]||n>=t.startTimestamp)return;const r=k[e].value,a=n+T(r),i=Math.abs(1e3*(a-t.startTimestamp)),s=i-r;u.X&&o.kg.log(`[Measurements] Normalized ${e} from ${r} to ${i} (${s})`),k[e].value=i}));const e=k["mark.fid"];e&&k.fid&&(f(t,{description:"first input delay",endTimestamp:e.value+T(k.fid.value),op:"ui.action",origin:"auto.ui.browser.metrics",startTimestamp:e.value}),delete k["mark.fid"]),"fcp"in k||delete k.cls,Object.keys(k).forEach((e=>{t.setMeasurement(e,k[e].value,k[e].unit)})),function(t){_&&(u.X&&o.kg.log("[Measurements] Adding LCP Data"),_.element&&t.setTag("lcp.element",(0,c.Rt)(_.element)),_.id&&t.setTag("lcp.id",_.id),_.url&&t.setTag("lcp.url",_.url.trim().slice(0,200)),t.setTag("lcp.size",_.size));b&&b.sources&&(u.X&&o.kg.log("[Measurements] Adding CLS Data"),b.sources.forEach(((e,n)=>t.setTag(`cls.source.${n+1}`,(0,c.Rt)(e.node)))))}(t)}_=void 0,b=void 0,k={}}function W(t,e,n,r,a,i){const o=i?e[i]:e[`${n}End`],s=e[`${n}Start`];s&&o&&f(t,{op:"browser",origin:"auto.browser.browser.metrics",description:a||n,startTimestamp:r+T(s),endTimestamp:r+T(o)})}function w(t,e,n,r){const a=e[n];null!=a&&a<h&&(t[r]=a)}var D=n(7522),E=n(5659),C=n(454),O=n(1394),N=n(5322),R=n(7321),L=n(9181),P=n(7597);function x(t,e,n,r,a="auto.http.browser"){if(!(0,D.z)()||!t.fetchData)return;const i=e(t.fetchData.url);if(t.endTimestamp&&i){const e=t.fetchData.__span;if(!e)return;const n=r[e];if(n){if(t.response){n.setHttpStatus(t.response.status);const e=t.response&&t.response.headers&&t.response.headers.get("content-length");if(e){const t=parseInt(e);t>0&&n.setData("http.response_content_length",t)}}else t.error&&n.setStatus("internal_error");n.finish(),delete r[e]}return}const o=(0,E.Gd)(),c=o.getScope(),u=o.getClient(),d=c.getSpan(),{method:p,url:l}=t.fetchData,g=i&&d?d.startChild({data:{url:l,type:"fetch","http.method":p},description:`${p} ${l}`,op:"http.client",origin:a}):void 0;if(g&&(t.fetchData.__span=g.spanId,r[g.spanId]=g),n(t.fetchData.url)&&u){const e=t.args[0];t.args[1]=t.args[1]||{};const n=t.args[1];n.headers=function(t,e,n,r,a){const i=a||n.getSpan(),o=i&&i.transaction,{traceId:c,sampled:u,dsc:d}=n.getPropagationContext(),p=i?i.toTraceparent():(0,s.$p)(c,void 0,u),l=o?o.getDynamicSamplingContext():d||(0,C._)(c,e,n),g=(0,L.IQ)(l),m="undefined"!==typeof Request&&(0,P.V9)(t,Request)?t.headers:r.headers;if(m){if("undefined"!==typeof Headers&&(0,P.V9)(m,Headers)){const t=new Headers(m);return t.append("sentry-trace",p),g&&t.append(L.bU,g),t}if(Array.isArray(m)){const t=[...m,["sentry-trace",p]];return g&&t.push([L.bU,g]),t}{const t="baggage"in m?m.baggage:void 0,e=[];return Array.isArray(t)?e.push(...t):t&&e.push(t),g&&e.push(g),{...m,"sentry-trace":p,baggage:e.length>0?e.join(","):void 0}}}return{"sentry-trace":p,baggage:g}}(e,u,c,n,g)}return g}const $=["localhost",/^\/(?!\/)/],H={traceFetch:!0,traceXHR:!0,enableHTTPTimings:!0,tracingOrigins:$,tracePropagationTargets:$};function X(t){const{traceFetch:e,traceXHR:n,tracePropagationTargets:r,tracingOrigins:a,shouldCreateSpanForRequest:i,enableHTTPTimings:o}={traceFetch:H.traceFetch,traceXHR:H.traceXHR,...t},c="function"===typeof i?i:t=>!0,u=t=>function(t,e){return(0,R.U0)(t,e||$)}(t,r||a),d={};e&&(0,O.U)((t=>{const e=x(t,c,u,d);o&&e&&q(e)})),n&&(0,N.UK)((t=>{const e=function(t,e,n,r){const a=t.xhr,i=a&&a[N.xU];if(!(0,D.z)()||!a||a.__sentry_own_request__||!i)return;const o=e(i.url);if(t.endTimestamp&&o){const t=a.__sentry_xhr_span_id__;if(!t)return;const e=r[t];return void(e&&void 0!==i.status_code&&(e.setHttpStatus(i.status_code),e.finish(),delete r[t]))}const c=(0,E.Gd)(),u=c.getScope(),d=u.getSpan(),p=o&&d?d.startChild({data:{type:"xhr","http.method":i.method,url:i.url},description:`${i.method} ${i.url}`,op:"http.client",origin:"auto.http.browser"}):void 0;p&&(a.__sentry_xhr_span_id__=p.spanId,r[a.__sentry_xhr_span_id__]=p);if(a.setRequestHeader&&n(i.url))if(p){const t=p&&p.transaction,e=t&&t.getDynamicSamplingContext(),n=(0,L.IQ)(e);M(a,p.toTraceparent(),n)}else{const t=c.getClient(),{traceId:e,sampled:n,dsc:r}=u.getPropagationContext(),i=(0,s.$p)(e,void 0,n),o=r||(t?(0,C._)(e,t,u):void 0);M(a,i,(0,L.IQ)(o))}return p}(t,c,u,d);o&&e&&q(e)}))}function q(t){const e=t.data.url;if(!e)return;const n=(0,l._j)("resource",(({entries:r})=>{r.forEach((r=>{if(function(t){return"resource"===t.entryType&&"initiatorType"in t&&"string"===typeof t.nextHopProtocol&&("fetch"===t.initiatorType||"xmlhttprequest"===t.initiatorType)}(r)&&r.name.endsWith(e)){(function(t){const{name:e,version:n}=function(t){let e="unknown",n="unknown",r="";for(const a of t){if("/"===a){[e,n]=t.split("/");break}if(!isNaN(Number(a))){e="h"===r?"http":r,n=t.split(r)[1];break}r+=a}r===t&&(e=r);return{name:e,version:n}}(t.nextHopProtocol),r=[];if(r.push(["network.protocol.version",n],["network.protocol.name",e]),!p.Z1)return r;return[...r,["http.request.redirect_start",A(t.redirectStart)],["http.request.fetch_start",A(t.fetchStart)],["http.request.domain_lookup_start",A(t.domainLookupStart)],["http.request.domain_lookup_end",A(t.domainLookupEnd)],["http.request.connect_start",A(t.connectStart)],["http.request.secure_connection_start",A(t.secureConnectionStart)],["http.request.connection_end",A(t.connectEnd)],["http.request.request_start",A(t.requestStart)],["http.request.response_start",A(t.responseStart)],["http.request.response_end",A(t.responseEnd)]]})(r).forEach((e=>t.setData(...e))),setTimeout(n)}}))}))}function A(t=0){return((p.Z1||performance.timeOrigin)+t)/1e3}function M(t,e,n){try{t.setRequestHeader("sentry-trace",e),n&&t.setRequestHeader(L.bU,n)}catch(r){}}var F=n(734);const B={...r.AT,markBackgroundTransactions:!0,routingInstrumentation:function(t,e=!0,n=!0){if(!d.WINDOW||!d.WINDOW.location)return void(u.X&&o.kg.warn("Could not initialize routing instrumentation due to invalid location"));let r,a=d.WINDOW.location.href;e&&(r=t({name:d.WINDOW.location.pathname,startTimestamp:p.Z1?p.Z1/1e3:void 0,op:"pageload",origin:"auto.pageload.browser",metadata:{source:"url"}})),n&&(0,F.a)((({to:e,from:n})=>{void 0===n&&a&&-1!==a.indexOf(e)?a=void 0:n!==e&&(a=void 0,r&&(u.X&&o.kg.log(`[Tracing] Finishing current transaction with op: ${r.op}`),r.finish()),r=t({name:d.WINDOW.location.pathname,op:"navigation",origin:"auto.navigation.browser",metadata:{source:"url"}}))}))},startTransactionOnLocationChange:!0,startTransactionOnPageLoad:!0,enableLongTask:!0,_experiments:{},...H};class z{constructor(t){this.name="BrowserTracing",this._hasSetTracePropagationTargets=!1,(0,a.T)(),u.X&&(this._hasSetTracePropagationTargets=!(!t||!t.tracePropagationTargets&&!t.tracingOrigins)),this.options={...B,...t},void 0!==this.options._experiments.enableLongTask&&(this.options.enableLongTask=this.options._experiments.enableLongTask),t&&!t.tracePropagationTargets&&t.tracingOrigins&&(this.options.tracePropagationTargets=t.tracingOrigins),this._collectWebVitals=S(),this.options.enableLongTask&&(0,l._j)("longtask",(({entries:t})=>{for(const e of t){const t=(0,i.x1)();if(!t)return;const n=T(p.Z1+e.startTime),r=T(e.duration);t.startChild({description:"Main UI thread blocked",op:"ui.long-task",origin:"auto.ui.browser.metrics",startTimestamp:n,endTimestamp:n+r})}})),this.options._experiments.enableInteractions&&(0,l._j)("event",(({entries:t})=>{for(const e of t){const t=(0,i.x1)();if(!t)return;if("click"===e.name){const n=T(p.Z1+e.startTime),r=T(e.duration);t.startChild({description:(0,c.Rt)(e.target),op:`ui.interaction.${e.name}`,origin:"auto.ui.browser.metrics",startTimestamp:n,endTimestamp:n+r})}}}))}setupOnce(t,e){this._getCurrentHub=e;const n=e().getClient(),r=n&&n.getOptions(),{routingInstrumentation:a,startTransactionOnLocationChange:s,startTransactionOnPageLoad:c,markBackgroundTransactions:p,traceFetch:l,traceXHR:g,shouldCreateSpanForRequest:m,enableHTTPTimings:f,_experiments:h}=this.options,T=r&&r.tracePropagationTargets,v=T||this.options.tracePropagationTargets;u.X&&this._hasSetTracePropagationTargets&&T&&o.kg.warn("[Tracing] The `tracePropagationTargets` option was set in the BrowserTracing integration and top level `Sentry.init`. The top level `Sentry.init` value is being used."),a((t=>{const n=this._createRouteTransaction(t);return this.options._experiments.onStartRouteTransaction&&this.options._experiments.onStartRouteTransaction(n,t,e),n}),c,s),p&&(d.WINDOW&&d.WINDOW.document?d.WINDOW.document.addEventListener("visibilitychange",(()=>{const t=(0,i.x1)();if(d.WINDOW.document.hidden&&t){const e="cancelled";u.X&&o.kg.log(`[Tracing] Transaction: ${e} -> since tab moved to the background, op: ${t.op}`),t.status||t.setStatus(e),t.setTag("visibilitychange","document.hidden"),t.finish()}})):u.X&&o.kg.warn("[Tracing] Could not set up background tab detection due to lack of global document")),h.enableInteractions&&this._registerInteractionListener(),X({traceFetch:l,traceXHR:g,tracePropagationTargets:v,shouldCreateSpanForRequest:m,enableHTTPTimings:f})}_createRouteTransaction(t){if(!this._getCurrentHub)return void(u.X&&o.kg.warn(`[Tracing] Did not create ${t.op} transaction because _getCurrentHub is invalid.`));const e=this._getCurrentHub(),{beforeNavigate:n,idleTimeout:r,finalTimeout:i,heartbeatInterval:c}=this.options,p="pageload"===t.op,l=p?U("sentry-trace"):"",g=p?U("baggage"):"",{traceparentData:m,dynamicSamplingContext:f,propagationContext:h}=(0,s.KA)(l,g),T={...t,...m,metadata:{...t.metadata,dynamicSamplingContext:m&&!f?{}:f},trimEnd:!0},v="function"===typeof n?n(T):T,_=void 0===v?{...T,sampled:!1}:v;_.metadata=_.name!==T.name?{..._.metadata,source:"custom"}:_.metadata,this._latestRouteName=_.name,this._latestRouteSource=_.metadata&&_.metadata.source,!1===_.sampled&&u.X&&o.kg.log(`[Tracing] Will not send ${_.op} transaction because of beforeNavigate.`),u.X&&o.kg.log(`[Tracing] Starting ${_.op} transaction on scope`);const{location:b}=d.WINDOW,y=(0,a.l)(e,_,r,i,!0,{location:b},c),k=e.getScope();return p&&m?k.setPropagationContext(h):k.setPropagationContext({traceId:y.traceId,spanId:y.spanId,parentSpanId:y.parentSpanId,sampled:y.sampled}),y.registerBeforeFinishCallback((t=>{this._collectWebVitals(),I(t)})),y}_registerInteractionListener(){let t;const e=()=>{const{idleTimeout:e,finalTimeout:n,heartbeatInterval:r}=this.options,s="ui.action.click",c=(0,i.x1)();if(c&&c.op&&["navigation","pageload"].includes(c.op))return void(u.X&&o.kg.warn(`[Tracing] Did not create ${s} transaction because a pageload or navigation transaction is in progress.`));if(t&&(t.setFinishReason("interactionInterrupted"),t.finish(),t=void 0),!this._getCurrentHub)return void(u.X&&o.kg.warn(`[Tracing] Did not create ${s} transaction because _getCurrentHub is invalid.`));if(!this._latestRouteName)return void(u.X&&o.kg.warn(`[Tracing] Did not create ${s} transaction because _latestRouteName is missing.`));const p=this._getCurrentHub(),{location:l}=d.WINDOW,g={name:this._latestRouteName,op:s,trimEnd:!0,metadata:{source:this._latestRouteSource||"url"}};t=(0,a.l)(p,g,e,n,!0,{location:l},r)};["click"].forEach((t=>{addEventListener(t,e,{once:!1,capture:!0})}))}}function U(t){const e=(0,c.qT)(`meta[name=${t}]`);return e?e.getAttribute("content"):void 0}},5363:(t,e,n)=>{n.d(e,{PR:()=>S,to:()=>W,$A:()=>I,_j:()=>w});var r=n(2343),a=n(360),i=n(7513);const o=(t,e,n)=>{let r,a;return i=>{e.value>=0&&(i||n)&&(a=e.value-(r||0),(a||void 0===r)&&(r=e.value,e.delta=a,t(e)))}};var s=n(3821);const c=()=>s.WINDOW.__WEB_VITALS_POLYFILL__?s.WINDOW.performance&&(performance.getEntriesByType&&performance.getEntriesByType("navigation")[0]||(()=>{const t=s.WINDOW.performance.timing,e=s.WINDOW.performance.navigation.type,n={entryType:"navigation",startTime:0,type:2==e?"back_forward":1===e?"reload":"navigate"};for(const r in t)"navigationStart"!==r&&"toJSON"!==r&&(n[r]=Math.max(t[r]-t.navigationStart,0));return n})()):s.WINDOW.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0],u=()=>{const t=c();return t&&t.activationStart||0},d=(t,e)=>{const n=c();let r="navigate";return n&&(r=s.WINDOW.document.prerendering||u()>0?"prerender":n.type.replace(/_/g,"-")),{name:t,value:"undefined"===typeof e?-1:e,rating:"good",delta:0,entries:[],id:`v3-${Date.now()}-${Math.floor(8999999999999*Math.random())+1e12}`,navigationType:r}},p=(t,e,n)=>{try{if(PerformanceObserver.supportedEntryTypes.includes(t)){const r=new PerformanceObserver((t=>{e(t.getEntries())}));return r.observe(Object.assign({type:t,buffered:!0},n||{})),r}}catch(r){}};var l=n(188);const g=t=>{const e=d("CLS",0);let n,r=0,a=[];const i=t=>{t.forEach((t=>{if(!t.hadRecentInput){const i=a[0],o=a[a.length-1];r&&0!==a.length&&t.startTime-o.startTime<1e3&&t.startTime-i.startTime<5e3?(r+=t.value,a.push(t)):(r=t.value,a=[t]),r>e.value&&(e.value=r,e.entries=a,n&&n())}}))},s=p("layout-shift",i);if(s){n=o(t,e);const r=()=>{i(s.takeRecords()),n(!0)};return(0,l.u)(r),r}};var m=n(5029);const f=t=>{const e=(0,m.Y)(),n=d("FID");let r;const a=t=>{t.startTime<e.firstHiddenTime&&(n.value=t.processingStart-t.startTime,n.entries.push(t),r(!0))},i=t=>{t.forEach(a)},s=p("first-input",i);r=o(t,n),s&&(0,l.u)((()=>{i(s.takeRecords()),s.disconnect()}),!0)},h={},T=t=>{const e=(0,m.Y)(),n=d("LCP");let r;const a=t=>{const a=t[t.length-1];if(a){const t=Math.max(a.startTime-u(),0);t<e.firstHiddenTime&&(n.value=t,n.entries=[a],r())}},i=p("largest-contentful-paint",a);if(i){r=o(t,n);const e=()=>{h[n.id]||(a(i.takeRecords()),i.disconnect(),h[n.id]=!0,r(!0))};return["keydown","click"].forEach((t=>{addEventListener(t,e,{once:!0,capture:!0})})),(0,l.u)(e,!0),e}},v={},_={};let b,y,k;function S(t){return N("cls",t,E,b)}function I(t){return N("lcp",t,O,k)}function W(t){return N("fid",t,C,y)}function w(t,e){return R(t,e),_[t]||(!function(t){const e={};"event"===t&&(e.durationThreshold=0);p(t,(e=>{D(t,{entries:e})}),e)}(t),_[t]=!0),L(t,e)}function D(t,e){const n=v[t];if(n&&n.length)for(const s of n)try{s(e)}catch(o){i.X&&r.kg.error(`Error while triggering instrumentation handler.\nType: ${t}\nName: ${(0,a.$P)(s)}\nError:`,o)}}function E(){g((t=>{D("cls",{metric:t}),b=t}))}function C(){f((t=>{D("fid",{metric:t}),y=t}))}function O(){T((t=>{D("lcp",{metric:t}),k=t}))}function N(t,e,n,r){return R(t,e),_[t]||(n(),_[t]=!0),r&&e({metric:r}),L(t,e)}function R(t,e){v[t]=v[t]||[],v[t].push(e)}function L(t,e){return()=>{const n=v[t];if(!n)return;const r=n.indexOf(e);-1!==r&&n.splice(r,1)}}},3821:(t,e,n)=>{n.d(e,{WINDOW:()=>r});const r=n(1235).n2},5029:(t,e,n)=>{n.d(e,{Y:()=>o});var r=n(3821),a=n(188);let i=-1;const o=()=>(i<0&&(i="hidden"!==r.WINDOW.document.visibilityState||r.WINDOW.document.prerendering?1/0:0,(0,a.u)((({timeStamp:t})=>{i=t}),!0)),{get firstHiddenTime(){return i}})},188:(t,e,n)=>{n.d(e,{u:()=>a});var r=n(3821);const a=(t,e)=>{const n=a=>{"pagehide"!==a.type&&"hidden"!==r.WINDOW.document.visibilityState||(t(a),e&&(removeEventListener("visibilitychange",n,!0),removeEventListener("pagehide",n,!0)))};addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)}},7513:(t,e,n)=>{n.d(e,{X:()=>r});const r="undefined"===typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__}}]);
//# sourceMappingURL=vendors.sentry-internal.js.map