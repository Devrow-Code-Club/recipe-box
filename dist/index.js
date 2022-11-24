var O=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,tt=Symbol(),ft=new Map,M=class{constructor(t,e){if(this._$cssResult$=!0,e!==tt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=ft.get(this.cssText);return O&&t===void 0&&(ft.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}},$t=s=>new M(typeof s=="string"?s:s+"",tt),v=(s,...t)=>{let e=s.length===1?s[0]:t.reduce((i,n,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+s[r+1],s[0]);return new M(e,tt)},et=(s,t)=>{O?s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{let i=document.createElement("style"),n=window.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=e.cssText,s.appendChild(i)})},I=O?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return $t(e)})(s):s;var it,_t=window.trustedTypes,Xt=_t?_t.emptyScript:"",yt=window.reactiveElementPolyfillSupport,nt={toAttribute(s,t){switch(t){case Boolean:s=s?Xt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},At=(s,t)=>t!==s&&(t==t||s==s),st={attribute:!0,type:String,converter:nt,reflect:!1,hasChanged:At},_=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;(e=this.l)!==null&&e!==void 0||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();let t=[];return this.elementProperties.forEach((e,i)=>{let n=this._$Eh(i,e);n!==void 0&&(this._$Eu.set(n,i),t.push(n))}),t}static createProperty(t,e=st){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){let i=typeof t=="symbol"?Symbol():"__"+t,n=this.getPropertyDescriptor(t,i,e);n!==void 0&&Object.defineProperty(this.prototype,t,n)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(n){let r=this[t];this[e]=n,this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||st}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){let e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(let n of i)this.createProperty(n,e[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let n of i)e.unshift(I(n))}else t!==void 0&&e.push(I(t));return e}static _$Eh(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Em(),this.requestUpdate(),(t=this.constructor.l)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$Eg)!==null&&e!==void 0?e:this._$Eg=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$Eg)===null||e===void 0||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;let e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return et(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=st){var n,r;let o=this.constructor._$Eh(t,i);if(o!==void 0&&i.reflect===!0){let c=((r=(n=i.converter)===null||n===void 0?void 0:n.toAttribute)!==null&&r!==void 0?r:nt.toAttribute)(e,i.type);this._$Ei=t,c==null?this.removeAttribute(o):this.setAttribute(o,c),this._$Ei=null}}_$AK(t,e){var i,n,r;let o=this.constructor,c=o._$Eu.get(t);if(c!==void 0&&this._$Ei!==c){let l=o.getPropertyOptions(c),a=l.converter,u=(r=(n=(i=a)===null||i===void 0?void 0:i.fromAttribute)!==null&&n!==void 0?n:typeof a=="function"?a:null)!==null&&r!==void 0?r:nt.fromAttribute;this._$Ei=c,this[c]=u(e,l.type),this._$Ei=null}}requestUpdate(t,e,i){let n=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||At)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Ei!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):n=!1),!this.isUpdatePending&&n&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((n,r)=>this[r]=n),this._$Et=void 0);let e=!1,i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$Eg)===null||t===void 0||t.forEach(n=>{var r;return(r=n.hostUpdate)===null||r===void 0?void 0:r.call(n)}),this.update(i)):this._$EU()}catch(n){throw e=!1,this._$EU(),n}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$Eg)===null||e===void 0||e.forEach(i=>{var n;return(n=i.hostUpdated)===null||n===void 0?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$ES(i,this[i],e)),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}};_.finalized=!0,_.elementProperties=new Map,_.elementStyles=[],_.shadowRootOptions={mode:"open"},yt?.({ReactiveElement:_}),((it=globalThis.reactiveElementVersions)!==null&&it!==void 0?it:globalThis.reactiveElementVersions=[]).push("1.3.1");var rt,E=globalThis.trustedTypes,bt=E?E.createPolicy("lit-html",{createHTML:s=>s}):void 0,y=`lit$${(Math.random()+"").slice(9)}$`,ot="?"+y,te=`<${ot}>`,k=document,U=(s="")=>k.createComment(s),z=s=>s===null||typeof s!="object"&&typeof s!="function",Pt=Array.isArray,Ht=s=>{var t;return Pt(s)||typeof((t=s)===null||t===void 0?void 0:t[Symbol.iterator])=="function"},T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xt=/-->/g,wt=/>/g,b=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,St=/'/g,Ct=/"/g,Mt=/^(?:script|style|textarea|title)$/i,Tt=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),g=Tt(1),P=Tt(2),$=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),Et=new WeakMap,Ut=(s,t,e)=>{var i,n;let r=(i=e?.renderBefore)!==null&&i!==void 0?i:t,o=r._$litPart$;if(o===void 0){let c=(n=e?.renderBefore)!==null&&n!==void 0?n:null;r._$litPart$=o=new A(t.insertBefore(U(),c),c,void 0,e??{})}return o._$AI(s),o},C=k.createTreeWalker(k,129,null,!1),zt=(s,t)=>{let e=s.length-1,i=[],n,r=t===2?"<svg>":"",o=T;for(let l=0;l<e;l++){let a=s[l],u,d,h=-1,f=0;for(;f<a.length&&(o.lastIndex=f,d=o.exec(a),d!==null);)f=o.lastIndex,o===T?d[1]==="!--"?o=xt:d[1]!==void 0?o=wt:d[2]!==void 0?(Mt.test(d[2])&&(n=RegExp("</"+d[2],"g")),o=b):d[3]!==void 0&&(o=b):o===b?d[0]===">"?(o=n??T,h=-1):d[1]===void 0?h=-2:(h=o.lastIndex-d[2].length,u=d[1],o=d[3]===void 0?b:d[3]==='"'?Ct:St):o===Ct||o===St?o=b:o===xt||o===wt?o=T:(o=b,n=void 0);let N=o===b&&s[l+1].startsWith("/>")?" ":"";r+=o===T?a+te:h>=0?(i.push(u),a.slice(0,h)+"$lit$"+a.slice(h)+y+N):a+y+(h===-2?(i.push(void 0),l):N)}let c=r+(s[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return[bt!==void 0?bt.createHTML(c):c,i]},x=class{constructor({strings:t,_$litType$:e},i){let n;this.parts=[];let r=0,o=0,c=t.length-1,l=this.parts,[a,u]=zt(t,e);if(this.el=x.createElement(a,i),C.currentNode=this.el.content,e===2){let d=this.el.content,h=d.firstChild;h.remove(),d.append(...h.childNodes)}for(;(n=C.nextNode())!==null&&l.length<c;){if(n.nodeType===1){if(n.hasAttributes()){let d=[];for(let h of n.getAttributeNames())if(h.endsWith("$lit$")||h.startsWith(y)){let f=u[o++];if(d.push(h),f!==void 0){let N=n.getAttribute(f.toLowerCase()+"$lit$").split(y),L=/([.?@])?(.*)/.exec(f);l.push({type:1,index:r,name:L[2],strings:N,ctor:L[1]==="."?V:L[1]==="?"?j:L[1]==="@"?F:S})}else l.push({type:6,index:r})}for(let h of d)n.removeAttribute(h)}if(Mt.test(n.tagName)){let d=n.textContent.split(y),h=d.length-1;if(h>0){n.textContent=E?E.emptyScript:"";for(let f=0;f<h;f++)n.append(d[f],U()),C.nextNode(),l.push({type:2,index:++r});n.append(d[h],U())}}}else if(n.nodeType===8)if(n.data===ot)l.push({type:2,index:r});else{let d=-1;for(;(d=n.data.indexOf(y,d+1))!==-1;)l.push({type:7,index:r}),d+=y.length-1}r++}}static createElement(t,e){let i=k.createElement("template");return i.innerHTML=t,i}};function w(s,t,e=s,i){var n,r,o,c;if(t===$)return t;let l=i!==void 0?(n=e._$Cl)===null||n===void 0?void 0:n[i]:e._$Cu,a=z(t)?void 0:t._$litDirective$;return l?.constructor!==a&&((r=l?._$AO)===null||r===void 0||r.call(l,!1),a===void 0?l=void 0:(l=new a(s),l._$AT(s,e,i)),i!==void 0?((o=(c=e)._$Cl)!==null&&o!==void 0?o:c._$Cl=[])[i]=l:e._$Cu=l),l!==void 0&&(t=w(s,l._$AS(s,t.values),l,i)),t}var B=class{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;let{el:{content:i},parts:n}=this._$AD,r=((e=t?.creationScope)!==null&&e!==void 0?e:k).importNode(i,!0);C.currentNode=r;let o=C.nextNode(),c=0,l=0,a=n[0];for(;a!==void 0;){if(c===a.index){let u;a.type===2?u=new A(o,o.nextSibling,this,t):a.type===1?u=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(u=new q(o,this,t)),this.v.push(u),a=n[++l]}c!==a?.index&&(o=C.nextNode(),c++)}return r}m(t){let e=0;for(let i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},A=class{constructor(t,e,i,n){var r;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=n,this._$Cg=(r=n?.isConnected)===null||r===void 0||r}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=w(this,t,e),z(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==$&&this.$(t):t._$litType$!==void 0?this.T(t):t.nodeType!==void 0?this.k(t):Ht(t)?this.S(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==p&&z(this._$AH)?this._$AA.nextSibling.data=t:this.k(k.createTextNode(t)),this._$AH=t}T(t){var e;let{values:i,_$litType$:n}=t,r=typeof n=="number"?this._$AC(t):(n.el===void 0&&(n.el=x.createElement(n.h,this.options)),n);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===r)this._$AH.m(i);else{let o=new B(r,this),c=o.p(this.options);o.m(i),this.k(c),this._$AH=o}}_$AC(t){let e=Et.get(t.strings);return e===void 0&&Et.set(t.strings,e=new x(t)),e}S(t){Pt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,n=0;for(let r of t)n===e.length?e.push(i=new A(this.M(U()),this.M(U()),this,this.options)):i=e[n],i._$AI(r),n++;n<e.length&&(this._$AR(i&&i._$AB.nextSibling,n),e.length=n)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){let n=t.nextSibling;t.remove(),t=n}}setConnected(t){var e;this._$AM===void 0&&(this._$Cg=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},S=class{constructor(t,e,i,n,r){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=n,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,n){let r=this.strings,o=!1;if(r===void 0)t=w(this,t,e,0),o=!z(t)||t!==this._$AH&&t!==$,o&&(this._$AH=t);else{let c=t,l,a;for(t=r[0],l=0;l<r.length-1;l++)a=w(this,c[i+l],e,l),a===$&&(a=this._$AH[l]),o||(o=!z(a)||a!==this._$AH[l]),a===p?t=p:t!==p&&(t+=(a??"")+r[l+1]),this._$AH[l]=a}o&&!n&&this.C(t)}C(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},V=class extends S{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===p?void 0:t}},ee=E?E.emptyScript:"",j=class extends S{constructor(){super(...arguments),this.type=4}C(t){t&&t!==p?this.element.setAttribute(this.name,ee):this.element.removeAttribute(this.name)}},F=class extends S{constructor(t,e,i,n,r){super(t,e,i,n,r),this.type=5}_$AI(t,e=this){var i;if((t=(i=w(this,t,e,0))!==null&&i!==void 0?i:p)===$)return;let n=this._$AH,r=t===p&&n!==p||t.capture!==n.capture||t.once!==n.once||t.passive!==n.passive,o=t!==p&&(n===p||r);r&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}},q=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){w(this,t)}},Rt={L:"$lit$",P:y,V:ot,I:1,N:zt,R:B,j:Ht,D:w,H:A,F:S,O:j,W:F,B:V,Z:q},kt=window.litHtmlPolyfillSupport;kt?.(x,A),((rt=globalThis.litHtmlVersions)!==null&&rt!==void 0?rt:globalThis.litHtmlVersions=[]).push("2.2.2");var lt,at;var m=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;let i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!1)}render(){return $}};m.finalized=!0,m._$litElement$=!0,(lt=globalThis.litElementHydrateSupport)===null||lt===void 0||lt.call(globalThis,{LitElement:m});var Dt=globalThis.litElementPolyfillSupport;Dt?.({LitElement:m});((at=globalThis.litElementVersions)!==null&&at!==void 0?at:globalThis.litElementVersions=[]).push("3.2.0");var H=v`
  * {
    box-sizing: border-box;
  }
  :host {
    --primary: hsla(205, 28%, 40%, 1);
    --accent: hsla(32, 100%, 75%, 1);
    --bold-primary: hsla(225, 41%, 29%, 1);
    --muted-primary: hsla(182, 21%, 50%, 1);
    --muted-accent: hsla(53, 19%, 63%, 1);
  }
  h2 {
    margin: 0;
    padding: 4px 0;
    font-family: 'Chelsea Market', cursive;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--muted-primary);
  }

  h3 {
    padding: 8px 4px;
    margin: 0;
    font-size: 1.25em;
    display: grid;
    place-items: center;
    flex-grow: 1;
    background: var(--primary);
    color: white;
    flex: 1;
  }
  button {
    border: none;
    background: none;
    flex-grow: 1;
    cursor: pointer;
  }
`;var G=v`
  h2 {
    position: sticky;
    top: 0;
    height: 55px;
  }
`;var K=v`
  ul,
  ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  li {
    padding: 4px 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  label {
    display: flex;
    gap: 8px;
  }
  .strike {
    text-decoration: line-through;
  }
  label:has(> input:checked) {
    text-decoration: line-through;
  }
  li:nth-child(even) {
    background-color: var(--muted-accent);
  }
  input {
    align-self: center;
  }
`;function ie(){var s=!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent);if(!s||!indexedDB.databases)return Promise.resolve();var t;return new Promise(function(e){var i=function(){return indexedDB.databases().finally(e)};t=setInterval(i,100),i()}).finally(function(){return clearInterval(t)})}var Nt=ie;function dt(s){return new Promise((t,e)=>{s.oncomplete=s.onsuccess=()=>t(s.result),s.onabort=s.onerror=()=>e(s.error)})}function se(s,t){let e=Nt().then(()=>{let i=indexedDB.open(s);return i.onupgradeneeded=()=>i.result.createObjectStore(t),dt(i)});return(i,n)=>e.then(r=>n(r.transaction(t,i).objectStore(t)))}var ct;function Lt(){return ct||(ct=se("keyval-store","keyval")),ct}function Ot(s,t=Lt()){return t("readonly",e=>dt(e.get(s)))}function It(s,t,e=Lt()){return e("readwrite",i=>(i.put(t,s),dt(i.transaction)))}var W=P`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`,Bt=P`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/></svg>`,Vt=P`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>`,jt=P`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"/></svg>`,Ft=P`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g fill="none"><path d="M0 0h24v24H0V0z"/><path d="M0 0h24v24H0V0z" opacity=".87"/></g><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7zm-4 6h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>`;var ne=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],ht=class extends m{static get styles(){return[H,G,K,v`
        :host {
          display: flex;
          flex-direction: column;
        }
        .food-entry {
          display: grid;
          grid-template-columns: 55px 4ex 5ex 1fr;
          justify-content: space-between;
          background: var(--primary);
          color: white;
          align-items: center;
          height: 55px;
        }
        .food-entry:nth-child(even) {
          background: var(--accent);
          color: black;
        }
        .food-entry:nth-child(even) svg {
          fill: black;
        }
        .mono {
          padding: 4px;
          font-family: monospace;
        }
        button {
          display: grid;
          place-content: center;
          height: 50px;
          color: white;
          font-size: 1.5em;
          background-color: var(--bold-primary);
        }
        .title {
          flex-grow: 1;
          padding: 4px;
          font-family: sans-serif;
          text-align: right;
          font-size: 1rem;
          background: none;
          align-items: center;
          justify-content: flex-end;
        }
        .header-button {
          width: 50px;
          position: absolute;
          background: none;
        }
        .header-button svg {
          fill: white;
        }
        #ingredient-list {
          left: 4px;
        }
        #generate {
          right: 4px;
        }
        .delete {
          background: none;
        }
        dialog {
          padding: 0;
          flex-direction: column;
        }
        dialog[open] {
          display: flex;
        }
        dialog::backdrop {
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
        }
        #generate-dialog label,
        #generate-dialog input {
          font-size: 25px;
        }
        #generate-dialog label {
          display: grid;
          place-items: center;
          grid-template-columns: 2fr 1fr;
        }
        #amount {
          padding: 4px;
          border: 0;
          text-align: center;
          width: 100%;
        }
        #actions {
          display: flex;
          flex-direction: row;
          gap: 1px;
          background: black;
        }
      `]}static get properties(){return{plan:Array}}constructor(){super(),this.plan=[],this.today=new Date}async firstUpdated(){this.generateDialog=this.shadowRoot.querySelector("#generate-dialog"),this.ingredientListDialog=this.shadowRoot.querySelector("#ingredient-list-dialog"),this.plan=await Ot("plan")||[]}updated(t){t.has("plan")&&It("plan",this.plan)}promptGenerate(){this.generateDialog.showModal()}generate(){this.dispatchEvent(new CustomEvent("generate-plan",{detail:{amount:this.generateDialog.querySelector("#amount").value}})),this.generateDialog.close()}delete(t){return()=>{this.plan=this.plan.filter((e,i)=>i!==t),this.requestUpdate()}}see(t){return()=>{this.dispatchEvent(new CustomEvent("see-recipe",{detail:t,composed:!0,bubbles:!0}))}}ingredientList(){this.ingredientListDialog.showModal()}strike({target:t}){t.parentElement.classList.toggle("strike")}dialogClick(t){t.target.tagName==="DIALOG"&&t.target.close()}render(){return g` <h2>
        <button id="ingredient-list" class="header-button" @click=${this.ingredientList}>
          ${Ft}
        </button>
        <span>Food Plan</span>
        <button id="generate" class="header-button" @click=${this.promptGenerate}>
          ${W}
        </button>
      </h2>
      <section id="food-plan">
        ${this.plan.length?this.plan.map((t,e)=>g`<div class="food-entry">
                  <button class="delete" @click=${this.delete(e)}>${Vt}</button>
                  <span class="mono">${ne[(this.today.getDay()+e)%7]}</span>
                  <span class="mono"
                    >(${new Date(new Date().setDate(this.today.getDate()+e)).getDate()})</span
                  >
                  <button class="title" @click=${this.see(t)}>${t.title}</button>
                </div>`):g`<h3>There is no plan yet.</h3>`}
      </section>
      <dialog @click=${this.dialogClick} id="generate-dialog">
        <h2>Generate Food Plan</h2>
        <label><input id="amount" type="number" value="7" /> days</label>
        <div id="actions">
          <button @click=${this.generate}>Generate</button>
          <button @click=${({target:t})=>t.closest("dialog").close()}>Cancel</button>
        </div>
      </dialog>
      <dialog @click=${this.dialogClick} id="ingredient-list-dialog">
        <h2>Ingredients</h2>
        <ul>
          ${[...this.plan].slice(0,3).map(t=>t.ingredients.map(e=>g` <li>
                <label><input type="checkbox" @change=${this.strike} />${e}</label>
              </li>`))}
        </ul>
      </dialog>`}};customElements.define("food-list",ht);var pt=class extends m{static get styles(){return[H,G,v`
        section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 4px;
        }
        .recipe {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          box-shadow: black 2px 2px 4px;
          border-radius: 4px;
          overflow: hidden;
        }
        .actions {
          display: grid;
          grid-template-columns: 50% 50%;
        }
        button, a {
          aspect-ratio: 1 / 1;
          display:grid;
          place-items:center;
        }
        .add {
          background-color: var(--bold-primary);
          color: white;
        }
        .see {
          background-color: var(--accent);
        }
      `]}static get properties(){return{recipes:{type:Array}}}constructor(){super(),this.recipes=[],fetch("/recipesNames.json").then(t=>t.json()).then(t=>this.recipes=t)}add(t){return()=>{this.dispatchEvent(new CustomEvent("add-recipe",{detail:t}))}}see(t){return()=>{this.dispatchEvent(new CustomEvent("see-recipe",{detail:t,composed:!0,bubbles:!0}))}}random(t=7,e="dinner"){let i=this.recipes.filter(n=>n.meal===e);for(let n=0;n<t;n++){let r=Math.floor(Math.random()*i.length);this.dispatchEvent(new CustomEvent("add-recipe",{detail:i.splice(r,1)[0]}))}}render(){return g`<h2>Recipes</h2>
      <section id="recipes">
        ${this.recipes.map(t=>g`<div class="recipe">
            <h3>${t}</h3>
            <div class="actions">
              <button class="add" @click=${this.add(t)}>${W}</button>
              <a class="see" href="recipes/${t}/">${Bt}</a>
            </div>
          </div>`)}
      </section>`}};customElements.define("recipe-list",pt);var qt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ut=s=>(...t)=>({_$litDirective$:s,values:t}),Y=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};var{H:Ge}=Rt,Gt=s=>s===null||typeof s!="object"&&typeof s!="function";var Kt=s=>s.strings===void 0;var R=(s,t)=>{var e,i;let n=s._$AN;if(n===void 0)return!1;for(let r of n)(i=(e=r)._$AO)===null||i===void 0||i.call(e,t,!1),R(r,t);return!0},Q=s=>{let t,e;do{if((t=s._$AM)===void 0)break;e=t._$AN,e.delete(s),s=t}while(e?.size===0)},Wt=s=>{for(let t;t=s._$AM;s=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(s))break;e.add(s),le(t)}};function re(s){this._$AN!==void 0?(Q(this),this._$AM=s,Wt(this)):this._$AM=s}function oe(s,t=!1,e=0){let i=this._$AH,n=this._$AN;if(n!==void 0&&n.size!==0)if(t)if(Array.isArray(i))for(let r=e;r<i.length;r++)R(i[r],!1),Q(i[r]);else i!=null&&(R(i,!1),Q(i));else R(this,s)}var le=s=>{var t,e,i,n;s.type==qt.CHILD&&((t=(i=s)._$AP)!==null&&t!==void 0||(i._$AP=oe),(e=(n=s)._$AQ)!==null&&e!==void 0||(n._$AQ=re))},Z=class extends Y{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),Wt(this),this.isConnected=t._$AU}_$AO(t,e=!0){var i,n;t!==this.isConnected&&(this.isConnected=t,t?(i=this.reconnected)===null||i===void 0||i.call(this):(n=this.disconnected)===null||n===void 0||n.call(this)),e&&(R(this,t),Q(this))}setValue(t){if(Kt(this._$Ct))this._$Ct._$AI(t,this);else{let e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}};var J=class{constructor(t){this.U=t}disconnect(){this.U=void 0}reconnect(t){this.U=t}deref(){return this.U}},X=class{constructor(){this.Y=void 0,this.q=void 0}get(){return this.Y}pause(){var t;(t=this.Y)!==null&&t!==void 0||(this.Y=new Promise(e=>this.q=e))}resume(){var t;(t=this.q)===null||t===void 0||t.call(this),this.Y=this.q=void 0}};var Yt=s=>!Gt(s)&&typeof s.then=="function",vt=class extends Z{constructor(){super(...arguments),this._$Cwt=1073741823,this._$Cyt=[],this._$CG=new J(this),this._$CK=new X}render(...t){var e;return(e=t.find(i=>!Yt(i)))!==null&&e!==void 0?e:$}update(t,e){let i=this._$Cyt,n=i.length;this._$Cyt=e;let r=this._$CG,o=this._$CK;this.isConnected||this.disconnected();for(let c=0;c<e.length&&!(c>this._$Cwt);c++){let l=e[c];if(!Yt(l))return this._$Cwt=c,l;c<n&&l===i[c]||(this._$Cwt=1073741823,n=0,Promise.resolve(l).then(async a=>{for(;o.get();)await o.get();let u=r.deref();if(u!==void 0){let d=u._$Cyt.indexOf(l);d>-1&&d<u._$Cwt&&(u._$Cwt=d,u.setValue(a))}}))}return $}disconnected(){this._$CG.disconnect(),this._$CK.pause()}reconnected(){this._$CG.reconnect(this),this._$CK.resume()}},ni=ut(vt);var gt=class extends m{static get styles(){return[H,K,v`
        :host {
          display: flex;
          flex-direction: column;
          position: relative;
        }
        h2 {
          padding: 4px 32px 4px 4px;
        }
        h3 {
          padding: 4px;
        }
        h3 {
          margin: 0;
          background-color: var(--primary);
          color: white;
          place-items: flex-start;
        }
        #close {
          position: absolute;
          right: 0;
          top: 0;
          width: 32px;
          height: 32px;
          background: none;
          border: none;
        }
        #close svg {
          fill: white;
        }
        #nutrition {
          display:flex;
          flex-direction:column;
          border-top: 2px solid black;
        }
        #nutrition div {
          display:flex;
          flex-direction:row;
          justify-content:space-between;
          padding: 0 8px;
        }
        #nutrition div:nth-child(even) {
          background-color: var(--bold-primary);
          color: white;
        }
        #nutrition div[indented] {
          padding-left: 16px;
        }
      `]}static get properties(){return{recipeName:String,recipe:Object,nutrition:Object,nutritionPerIngredient:Object}}constructor(){super(),this.recipe={}}updated(t){t.has("recipeName")&&this.getRecipe(this.recipeName)}strike({target:t}){t.parentElement.classList.toggle("strike")}async getRecipe(t){this.recipe=await fetch(`/_data/recipes/${t}.json`).then(e=>e.json())}render(){return g` <h2>${this.recipe.title}</h2>
      <h3>Ingredients</h3>
      <ul>
        ${this.recipe.ingredients?.map(t=>g`<li class="ingredient">
              <label><input
                  type="checkbox"
                  @change=${this.strike}
                />${t.name}</label>
              <span class="budget">
                  <span>${Math.round(t.nutrition?.serving_size_g)}</span>g</span>
            </li>`)}
      </ul>
      <h3>Directions</h3>
      <ol>
        ${this.recipe.directions?.map(t=>g`<li class="direction">
              <label
                ><input
                  type="checkbox"
                  @change=${this.strike}
                />${t}</label
              >
            </li>`)}
      </ol>
      <div id="nutrition">
          <div>
            <span>Service Size</span
            ><span>${this.recipe.nutrition?.serving_size_g}g</span>
          </div>
          <div>
            <span>Servings per Recipe</span
            ><span>${this.recipe.nutrition?.servings}</span>
          </div>
          <div>
            <span><b>Calories</b></span><span><b>${this.recipe.nutrition?.calories}</b></span>
          </div>
          <div>
            <span>Fat</span><span>${this.recipe.nutrition?.fat_total_g}g</span>
          </div>
          <div indented>
            <span>Saturated Fat</span><span>${this.recipe.nutrition?.fat_saturated_g}g</span>
          </div>
          <div>
            <span>Cholesterol</span
            ><span>${this.recipe.nutrition?.cholesterol_mg}mg</span>
          </div>
          <div>
            <span>Sodium</span><span>${this.recipe.nutrition?.sodium_mg}mg</span>
          </div>
          <div>
            <span>Potassium</span
            ><span>${this.recipe.nutrition?.potassium_mg}mg</span>
          </div>
          <div>
            <span>Carbs</span
            ><span>${this.recipe.nutrition?.carbohydrates_total_g}g</span>
          </div>
          <div indented>
            <span>Sugar</span><span>${this.recipe.nutrition?.sugar_g}g</span>
          </div>
          <div indented>
            <span>fiber</span><span>${this.recipe.nutrition?.fiber_g}g</span>
          </div>
          <div>
            <span>Protein</span><span>${this.recipe.nutrition?.protein_g}g</span>
          </div>
      </div>
      <button
        id="close"
        @click=${()=>this.dispatchEvent(new CustomEvent("close-dialog"))}
      >
        ${jt}
      </button>`}};customElements.define("recipe-display",gt);navigator.serviceWorker.register("/sw.js",{type:"module"}).then(function(s){console.log("Service Worker Registered")});var D=document.querySelector("#recipe-dialog"),Qt=D.querySelector("recipe-display"),Zt=document.querySelector("recipe-list"),mt=document.querySelector("food-list"),ae=document.querySelector("#helpers"),Jt=document.querySelector("#helpers-dialog");[D,Jt].forEach(s=>s.addEventListener("click",t=>{t.target.tagName==="DIALOG"&&D.close()}));ae.addEventListener("click",s=>{Jt.showModal()});Qt.addEventListener("close-dialog",()=>{D.close()});document.body.addEventListener("see-recipe",({detail:s})=>{Qt.recipeName=s,requestAnimationFrame(()=>{D.showModal()})});Zt.addEventListener("add-recipe",({detail:s})=>{mt.plan=[...mt.plan,s]});mt.addEventListener("generate-plan",({detail:{amount:s}})=>{Zt.random(s)});
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
