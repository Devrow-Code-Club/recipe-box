var O=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),at=new Map,P=class{constructor(t,e){if(this._$cssResult$=!0,e!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=at.get(this.cssText);return O&&t===void 0&&(at.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}},ht=n=>new P(typeof n=="string"?n:n+"",j),u=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new P(e,j)},F=(n,t)=>{O?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{let i=document.createElement("style"),s=window.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)})},I=O?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return ht(e)})(n):n;var q,ct=window.trustedTypes,Rt=ct?ct.emptyScript:"",dt=window.reactiveElementPolyfillSupport,G={toAttribute(n,t){switch(t){case Boolean:n=n?Rt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},pt=(n,t)=>t!==n&&(t==t||n==n),W={attribute:!0,type:String,converter:G,reflect:!1,hasChanged:pt},$=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;(e=this.l)!==null&&e!==void 0||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();let t=[];return this.elementProperties.forEach((e,i)=>{let s=this._$Eh(i,e);s!==void 0&&(this._$Eu.set(s,i),t.push(s))}),t}static createProperty(t,e=W){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){let i=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){let o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||W}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){let e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(let s of i)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(I(s))}else t!==void 0&&e.push(I(t));return e}static _$Eh(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Em(),this.requestUpdate(),(t=this.constructor.l)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$Eg)!==null&&e!==void 0?e:this._$Eg=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$Eg)===null||e===void 0||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;let e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return F(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=W){var s,o;let r=this.constructor._$Eh(t,i);if(r!==void 0&&i.reflect===!0){let c=((o=(s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==null&&o!==void 0?o:G.toAttribute)(e,i.type);this._$Ei=t,c==null?this.removeAttribute(r):this.setAttribute(r,c),this._$Ei=null}}_$AK(t,e){var i,s,o;let r=this.constructor,c=r._$Eu.get(t);if(c!==void 0&&this._$Ei!==c){let l=r.getPropertyOptions(c),a=l.converter,v=(o=(s=(i=a)===null||i===void 0?void 0:i.fromAttribute)!==null&&s!==void 0?s:typeof a=="function"?a:null)!==null&&o!==void 0?o:G.fromAttribute;this._$Ei=c,this[c]=v(e,l.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||pt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Ei!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((s,o)=>this[o]=s),this._$Et=void 0);let e=!1,i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$Eg)===null||t===void 0||t.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$EU()}catch(s){throw e=!1,this._$EU(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$Eg)===null||e===void 0||e.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$ES(i,this[i],e)),this._$EC=void 0),this._$EU()}updated(t){}firstUpdated(t){}};$.finalized=!0,$.elementProperties=new Map,$.elementStyles=[],$.shadowRootOptions={mode:"open"},dt?.({ReactiveElement:$}),((q=globalThis.reactiveElementVersions)!==null&&q!==void 0?q:globalThis.reactiveElementVersions=[]).push("1.3.1");var K,S=globalThis.trustedTypes,ut=S?S.createPolicy("lit-html",{createHTML:n=>n}):void 0,y=`lit$${(Math.random()+"").slice(9)}$`,bt="?"+y,Dt=`<${bt}>`,E=document,z=(n="")=>E.createComment(n),T=n=>n===null||typeof n!="object"&&typeof n!="function",_t=Array.isArray,Ot=n=>{var t;return _t(n)||typeof((t=n)===null||t===void 0?void 0:t[Symbol.iterator])=="function"},U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gt=/-->/g,mt=/>/g,b=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,vt=/'/g,ft=/"/g,At=/^(?:script|style|textarea|title)$/i,xt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),g=xt(1),H=xt(2),_=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),$t=new WeakMap,wt=(n,t,e)=>{var i,s;let o=(i=e?.renderBefore)!==null&&i!==void 0?i:t,r=o._$litPart$;if(r===void 0){let c=(s=e?.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=r=new x(t.insertBefore(z(),c),c,void 0,e??{})}return r._$AI(n),r},w=E.createTreeWalker(E,129,null,!1),It=(n,t)=>{let e=n.length-1,i=[],s,o=t===2?"<svg>":"",r=U;for(let l=0;l<e;l++){let a=n[l],v,h,d=-1,f=0;for(;f<a.length&&(r.lastIndex=f,h=r.exec(a),h!==null);)f=r.lastIndex,r===U?h[1]==="!--"?r=gt:h[1]!==void 0?r=mt:h[2]!==void 0?(At.test(h[2])&&(s=RegExp("</"+h[2],"g")),r=b):h[3]!==void 0&&(r=b):r===b?h[0]===">"?(r=s??U,d=-1):h[1]===void 0?d=-2:(d=r.lastIndex-h[2].length,v=h[1],r=h[3]===void 0?b:h[3]==='"'?ft:vt):r===ft||r===vt?r=b:r===gt||r===mt?r=U:(r=b,s=void 0);let R=r===b&&n[l+1].startsWith("/>")?" ":"";o+=r===U?a+Dt:d>=0?(i.push(v),a.slice(0,d)+"$lit$"+a.slice(d)+y+R):a+y+(d===-2?(i.push(void 0),l):R)}let c=o+(n[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ut!==void 0?ut.createHTML(c):c,i]},A=class{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0,c=t.length-1,l=this.parts,[a,v]=It(t,e);if(this.el=A.createElement(a,i),w.currentNode=this.el.content,e===2){let h=this.el.content,d=h.firstChild;d.remove(),h.append(...d.childNodes)}for(;(s=w.nextNode())!==null&&l.length<c;){if(s.nodeType===1){if(s.hasAttributes()){let h=[];for(let d of s.getAttributeNames())if(d.endsWith("$lit$")||d.startsWith(y)){let f=v[r++];if(h.push(d),f!==void 0){let R=s.getAttribute(f.toLowerCase()+"$lit$").split(y),D=/([.?@])?(.*)/.exec(f);l.push({type:1,index:o,name:D[2],strings:R,ctor:D[1]==="."?J:D[1]==="?"?Q:D[1]==="@"?X:k})}else l.push({type:6,index:o})}for(let d of h)s.removeAttribute(d)}if(At.test(s.tagName)){let h=s.textContent.split(y),d=h.length-1;if(d>0){s.textContent=S?S.emptyScript:"";for(let f=0;f<d;f++)s.append(h[f],z()),w.nextNode(),l.push({type:2,index:++o});s.append(h[d],z())}}}else if(s.nodeType===8)if(s.data===bt)l.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(y,h+1))!==-1;)l.push({type:7,index:o}),h+=y.length-1}o++}}static createElement(t,e){let i=E.createElement("template");return i.innerHTML=t,i}};function C(n,t,e=n,i){var s,o,r,c;if(t===_)return t;let l=i!==void 0?(s=e._$Cl)===null||s===void 0?void 0:s[i]:e._$Cu,a=T(t)?void 0:t._$litDirective$;return l?.constructor!==a&&((o=l?._$AO)===null||o===void 0||o.call(l,!1),a===void 0?l=void 0:(l=new a(n),l._$AT(n,e,i)),i!==void 0?((r=(c=e)._$Cl)!==null&&r!==void 0?r:c._$Cl=[])[i]=l:e._$Cu=l),l!==void 0&&(t=C(n,l._$AS(n,t.values),l,i)),t}var Z=class{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;let{el:{content:i},parts:s}=this._$AD,o=((e=t?.creationScope)!==null&&e!==void 0?e:E).importNode(i,!0);w.currentNode=o;let r=w.nextNode(),c=0,l=0,a=s[0];for(;a!==void 0;){if(c===a.index){let v;a.type===2?v=new x(r,r.nextSibling,this,t):a.type===1?v=new a.ctor(r,a.name,a.strings,this,t):a.type===6&&(v=new Y(r,this,t)),this.v.push(v),a=s[++l]}c!==a?.index&&(r=w.nextNode(),c++)}return o}m(t){let e=0;for(let i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},x=class{constructor(t,e,i,s){var o;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=(o=s?.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),T(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==_&&this.$(t):t._$litType$!==void 0?this.T(t):t.nodeType!==void 0?this.k(t):Ot(t)?this.S(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==p&&T(this._$AH)?this._$AA.nextSibling.data=t:this.k(E.createTextNode(t)),this._$AH=t}T(t){var e;let{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=A.createElement(s.h,this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.m(i);else{let r=new Z(o,this),c=r.p(this.options);r.m(i),this.k(c),this._$AH=r}}_$AC(t){let e=$t.get(t.strings);return e===void 0&&$t.set(t.strings,e=new A(t)),e}S(t){_t(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let o of t)s===e.length?e.push(i=new x(this.M(z()),this.M(z()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cg=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},k=class{constructor(t,e,i,s,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){let o=this.strings,r=!1;if(o===void 0)t=C(this,t,e,0),r=!T(t)||t!==this._$AH&&t!==_,r&&(this._$AH=t);else{let c=t,l,a;for(t=o[0],l=0;l<o.length-1;l++)a=C(this,c[i+l],e,l),a===_&&(a=this._$AH[l]),r||(r=!T(a)||a!==this._$AH[l]),a===p?t=p:t!==p&&(t+=(a??"")+o[l+1]),this._$AH[l]=a}r&&!s&&this.C(t)}C(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},J=class extends k{constructor(){super(...arguments),this.type=3}C(t){this.element[this.name]=t===p?void 0:t}},Nt=S?S.emptyScript:"",Q=class extends k{constructor(){super(...arguments),this.type=4}C(t){t&&t!==p?this.element.setAttribute(this.name,Nt):this.element.removeAttribute(this.name)}},X=class extends k{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=C(this,t,e,0))!==null&&i!==void 0?i:p)===_)return;let s=this._$AH,o=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==p&&(s===p||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}},Y=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}};var yt=window.litHtmlPolyfillSupport;yt?.(A,x),((K=globalThis.litHtmlVersions)!==null&&K!==void 0?K:globalThis.litHtmlVersions=[]).push("2.2.2");var tt,et;var m=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;let i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=wt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!1)}render(){return _}};m.finalized=!0,m._$litElement$=!0,(tt=globalThis.litElementHydrateSupport)===null||tt===void 0||tt.call(globalThis,{LitElement:m});var St=globalThis.litElementPolyfillSupport;St?.({LitElement:m});((et=globalThis.litElementVersions)!==null&&et!==void 0?et:globalThis.litElementVersions=[]).push("3.2.0");var M=u`
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
  }
`;var N=u`
  h2 {
    position: sticky;
    top: 0;
    height: 55px;
  }
`;var B=u`
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
`;function Bt(){var n=!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent);if(!n||!indexedDB.databases)return Promise.resolve();var t;return new Promise(function(e){var i=function(){return indexedDB.databases().finally(e)};t=setInterval(i,100),i()}).finally(function(){return clearInterval(t)})}var Et=Bt;function st(n){return new Promise((t,e)=>{n.oncomplete=n.onsuccess=()=>t(n.result),n.onabort=n.onerror=()=>e(n.error)})}function Vt(n,t){let e=Et().then(()=>{let i=indexedDB.open(n);return i.onupgradeneeded=()=>i.result.createObjectStore(t),st(i)});return(i,s)=>e.then(o=>s(o.transaction(t,i).objectStore(t)))}var it;function Ct(){return it||(it=Vt("keyval-store","keyval")),it}function kt(n,t=Ct()){return t("readonly",e=>st(e.get(n)))}function Ht(n,t,e=Ct()){return e("readwrite",i=>(i.put(t,n),st(i.transaction)))}var V=H`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`,Mt=H`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/></svg>`,Pt=H`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"/></svg>`,Ut=H`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"/></svg>`,zt=H`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g fill="none"><path d="M0 0h24v24H0V0z"/><path d="M0 0h24v24H0V0z" opacity=".87"/></g><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7zm-4 6h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>`;var jt=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],nt=class extends m{static get styles(){return[M,N,B,u`
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
      `]}static get properties(){return{plan:Array}}constructor(){super(),this.plan=[],this.today=new Date}async firstUpdated(){this.generateDialog=this.shadowRoot.querySelector("#generate-dialog"),this.ingredientListDialog=this.shadowRoot.querySelector("#ingredient-list-dialog"),this.plan=await kt("plan")||[]}updated(t){t.has("plan")&&Ht("plan",this.plan)}promptGenerate(){this.generateDialog.showModal()}generate(){this.dispatchEvent(new CustomEvent("generate-plan",{detail:{amount:this.generateDialog.querySelector("#amount").value}})),this.generateDialog.close()}delete(t){return()=>{this.plan=this.plan.filter((e,i)=>i!==t),this.requestUpdate()}}see(t){return()=>{this.dispatchEvent(new CustomEvent("see-recipe",{detail:t,composed:!0,bubbles:!0}))}}ingredientList(){this.ingredientListDialog.showModal()}strike({target:t}){t.parentElement.classList.toggle("strike")}dialogClick(t){t.target.tagName==="DIALOG"&&t.target.close()}render(){return g` <h2>
        <button id="ingredient-list" class="header-button" @click=${this.ingredientList}>
          ${zt}
        </button>
        <span>Food Plan</span>
        <button id="generate" class="header-button" @click=${this.promptGenerate}>
          ${V}
        </button>
      </h2>
      <section id="food-plan">
        ${this.plan.length?this.plan.map((t,e)=>g`<div class="food-entry">
                  <button class="delete" @click=${this.delete(e)}>${Pt}</button>
                  <span class="mono">${jt[(this.today.getDay()+e)%7]}</span>
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
      </dialog>`}};customElements.define("food-list",nt);var rt=class extends m{static get styles(){return[M,N,u`
        section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        }
        .recipe {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
        }
        .actions {
          display: flex;
        }
        button {
          aspect-ratio: 1 / 1;
        }
        .add {
          background-color: var(--bold-primary);
          color: white;
        }
        .see {
          background-color: var(--accent);
        }
      `]}static get properties(){return{recipes:{type:Array}}}constructor(){super(),this.recipes=[],fetch("/_data/static-recipes.json").then(t=>t.json()).then(t=>{this.recipes=t})}add(t){return()=>{this.dispatchEvent(new CustomEvent("add-recipe",{detail:t}))}}see(t){return()=>{this.dispatchEvent(new CustomEvent("see-recipe",{detail:t,composed:!0,bubbles:!0}))}}random(t=7,e="dinner"){let i=this.recipes.filter(s=>s.meal===e);for(let s=0;s<t;s++){let o=Math.floor(Math.random()*i.length);this.dispatchEvent(new CustomEvent("add-recipe",{detail:i.splice(o,1)[0]}))}}render(){return g`<h2>Recipes</h2>
      <section id="recipes">
        ${this.recipes.map(t=>g`<div class="recipe">
            <h3>${t.title}</h3>
            <div class="actions">
              <button class="add" @click=${this.add(t)}>${V}</button>
              <button class="see" @click=${this.see(t)}>${Mt}</button>
            </div>
          </div>`)}
      </section>`}};customElements.define("recipe-list",rt);var ot=class extends m{static get styles(){return[M,B,u`
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
      `]}static get properties(){return{recipe:Object}}constructor(){super(),this.recipe={}}strike({target:t}){t.parentElement.classList.toggle("strike")}render(){return g` <h2>${this.recipe.title}</h2>
      <h3>Ingredients</h3>
      <ul>
        ${this.recipe.ingredients?.map(t=>g`<li class="ingredient">
              <label><input type="checkbox" @change=${this.strike} />${t}</label>
            </li>`)}
      </ul>
      <h3>Directions</h3>
      <ol>
        ${this.recipe.directions?.map(t=>g`<li class="direction">
              <label><input type="checkbox" @change=${this.strike} />${t}</label>
            </li>`)}
      </ol>
      <button id="close" @click=${()=>this.dispatchEvent(new CustomEvent("close-dialog"))}>
        ${Ut}
      </button>`}};customElements.define("recipe-display",ot);navigator.serviceWorker.register("/sw.js",{type:"module"}).then(function(n){console.log("Service Worker Registered")});var L=document.querySelector("#recipe-dialog"),Tt=L.querySelector("recipe-display"),Lt=document.querySelector("recipe-list"),lt=document.querySelector("food-list");L.addEventListener("click",n=>{n.target.tagName==="DIALOG"&&L.close()});Tt.addEventListener("close-dialog",()=>{L.close()});document.body.addEventListener("see-recipe",({detail:n})=>{Tt.recipe=n,requestAnimationFrame(()=>{L.showModal()})});Lt.addEventListener("add-recipe",({detail:n})=>{lt.plan=[...lt.plan,n]});lt.addEventListener("generate-plan",({detail:{amount:n}})=>{Lt.random(n)});
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
