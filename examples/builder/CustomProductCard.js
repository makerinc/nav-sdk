import v from"react";window.__MAKER_REACT__=window.__MAKER_REACT__||v;var i=window.__MAKER_REACT__;var E="maker-nav-importmap",M={imports:{react:"https://esm.sh/react@16.14.0","react-dom":"https://esm.sh/react@16.14.0","react/jsx-runtime":"https://esm.sh/react@16.14.0/jsx-runtime"}},R=()=>{if(typeof window>"u"||typeof document>"u"||document.getElementById(E))return;let t=document.createElement("script");t.innerHTML=JSON.stringify(M),t.type="importmap",t.id=E,document.head.appendChild(t)};var S=window.__MAKER_NAV_LOGGING_ENABLED__||!0,c=(...t)=>{S&&console.log("[nav-sdk]",...t)};var _={REGISTERED:"maker-nav-component-registered",UNREGISTERED:"maker-nav-component-unregistered"},I=()=>{let e=new Error().stack?.split(`
`)||[];c("getCallerModuleUrl stack lines",e);let o=e[e.length-1];if(!o)return;c("getCallerModuleUrl last stack line",o);let r=o.match(/.*at\s+(https?:\/\/.*?(\.js|\.tsx|\.ts))(?::\d+:\d+)?.*/);if(c("getCallerModuleUrl match",r),r)return r[1]},l=class t{components=new Map;constructor(){typeof window>"u"||typeof document>"u"||(R(),window.__MAKER_NAV_COMPONENT_REGISTRY__={register:(e,o,r)=>{let n=I()||import.meta.url,a=r.defaultProps;this.components.set(o,{componentType:e,componentUrl:n,render:r,defaultProps:a}),window.dispatchEvent(new CustomEvent(_.REGISTERED,{detail:{componentType:e,componentId:o,componentUrl:n,defaultProps:a}}))},unregister:e=>{this.components.get(e)&&(this.components.delete(e),window.dispatchEvent(new CustomEvent(_.UNREGISTERED,{detail:{componentId:e}})))},list:()=>Array.from(this.components.entries()).map(([e,o])=>({componentId:e,componentUrl:o.componentUrl,componentType:o.componentType,render:o.render,defaultProps:o.defaultProps}))})}static getInstance(){if(typeof window<"u"&&window.__MAKER_COMPONENT_REGISTRY_INSTANCE__)return window.__MAKER_COMPONENT_REGISTRY_INSTANCE__;let e=new t;return typeof window<"u"&&(window.__MAKER_COMPONENT_REGISTRY_INSTANCE__=e),e}register(e,o,r){this.isRegistryAvailable()&&window.__MAKER_NAV_COMPONENT_REGISTRY__.register(e,o,r)}unregister(e){this.isRegistryAvailable()&&window.__MAKER_NAV_COMPONENT_REGISTRY__.unregister(e)}getById(e){return window.__MAKER_NAV_COMPONENT_REGISTRY__.list().find(o=>o.componentId===e)}getByUrl(e){return window.__MAKER_NAV_COMPONENT_REGISTRY__.list().find(o=>o.componentUrl===e)}isRegistryAvailable(){return typeof window<"u"&&!!window.__MAKER_NAV_COMPONENT_REGISTRY__}},m=l.getInstance();import{jsx as L}from"react/jsx-runtime";window.__MAKER_SHARED_COMPONENTS_CONTEXT__=window.__MAKER_SHARED_COMPONENTS_CONTEXT__||i.createContext({renderImage:void 0,renderVideo:void 0,renderProductLink:void 0,renderCategoryLink:void 0});var P=window.__MAKER_SHARED_COMPONENTS_CONTEXT__,x=()=>i.useContext(P);function T({renderImage:t,renderVideo:e,renderProductLink:o,renderCategoryLink:r,children:n}){return L(P.Provider,{value:{renderImage:t,renderVideo:e,renderProductLink:o,renderCategoryLink:r},children:n})}var d={Provider:T,useContext:x};import{jsx as b}from"react/jsx-runtime";var A=t=>{let{renderImage:e}=d.useContext();return typeof e=="function"?e(t):b("img",{src:t.src,alt:t.alt,loading:t.priority==0?"eager":"lazy",fetchpriority:t.priority==0?"high":"low",style:{objectFit:t.fit,objectPosition:"center",width:"100%",height:"100%",position:"absolute",top:0,left:0}})},f=A;import{jsx as ee}from"react/jsx-runtime";import{jsx as p}from"react/jsx-runtime";var k=({props:t,children:e})=>i.cloneElement(e,{...t}),O=t=>t.target==="product"?p(D,{...t}):t.target==="category"?p(V,{...t}):p(g,{...t}),g=({children:t,...e})=>p("a",{...e,children:t}),D=({productId:t,variantId:e,categoryId:o,href:r,children:n,target:a,...y})=>{let{renderProductLink:C}=d.useContext();return typeof C=="function"?p(k,{props:y,children:C({productId:t,variantId:e,categoryId:o,href:r,children:n,target:a})}):p(g,{href:r,target:"_top",...y,children:n})},V=({categoryId:t,href:e,children:o,target:r,...n})=>{let{renderCategoryLink:a}=d.useContext();return typeof a=="function"?p(k,{props:n,children:a({categoryId:t,href:e,children:o,target:r})}):p(g,{href:e,target:"_top",...n,children:o})},u=O;import me from"react";var h=class extends i.Component{state={hasError:!1};static getDerivedStateFromError(e){return{hasError:!0}}componentDidCatch(e,o){console.error("Error caught in ErrorBoundary:",e,o)}render(){return this.state.hasError?this.props.renderFallback():this.props.children}};import{jsx as ge}from"react/jsx-runtime";import{jsx as s,jsxs as w}from"react/jsx-runtime";var N=t=>{let[e,o]=i.useState(0),r=()=>{o(e+1)};return s(u,{target:"product",productId:t.data.id,categoryId:t.data.categoryId,href:t.data.link,children:w("div",{children:[s("div",{style:{position:"relative",aspectRatio:"16/9",width:"100%"},children:s(f,{src:t.data.variants[0].imageLink,alt:t.data.title,fit:"cover",priority:1})}),s("div",{children:t.data.title}),s(u,{href:t.data.link,target:"_blank",onClick:n=>n.stopPropagation(),children:"Open Product"}),w("button",{onClick:r,children:["Clicked ",e," times"]})]})})};N.defaultProps={test:"test"};m.register("product-card","my-custom-product-card",N);export{N as Component};
