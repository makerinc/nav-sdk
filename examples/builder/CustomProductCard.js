import N from"react";window.__MAKER_REACT__=window.__MAKER_REACT__||N;var i=window.__MAKER_REACT__;var C="maker-nav-importmap",x={imports:{react:"https://esm.sh/react@16.14.0","react-dom":"https://esm.sh/react@16.14.0","react/jsx-runtime":"https://esm.sh/react@16.14.0/jsx-runtime"}},R=()=>{if(typeof window>"u"||typeof document>"u"||document.getElementById(C))return;let e=document.createElement("script");e.innerHTML=JSON.stringify(x),e.type="importmap",e.id=C,document.head.appendChild(e)};var L=window.__MAKER_NAV_LOGGING_ENABLED__||!0,c=(...e)=>{L&&console.log("[nav-sdk]",...e)};var _={REGISTERED:"maker-nav-component-registered",UNREGISTERED:"maker-nav-component-unregistered"},S=()=>{let t=new Error().stack?.split(`
`)||[];c("getCallerModuleUrl stack lines",t);let o=t[t.length-1];if(!o)return;c("getCallerModuleUrl last stack line",o);let r=o.match(/.*at\s+(https?:\/\/.*?(\.js|\.tsx|\.ts))(?::\d+:\d+)?.*/);if(c("getCallerModuleUrl match",r),r)return r[1]},l=class e{components=new Map;constructor(){typeof window>"u"||typeof document>"u"||(R(),window.__MAKER_NAV_COMPONENT_REGISTRY__={register:(t,o,r)=>{let n=S()||import.meta.url,p=r.defaultProps;this.components.set(o,{componentType:t,componentUrl:n,render:r,defaultProps:p}),window.dispatchEvent(new CustomEvent(_.REGISTERED,{detail:{componentType:t,componentId:o,componentUrl:n,defaultProps:p}}))},unregister:t=>{this.components.get(t)&&(this.components.delete(t),window.dispatchEvent(new CustomEvent(_.UNREGISTERED,{detail:{componentId:t}})))},list:()=>Array.from(this.components.entries()).map(([t,o])=>({componentId:t,componentUrl:o.componentUrl,componentType:o.componentType,render:o.render,defaultProps:o.defaultProps}))})}static getInstance(){if(typeof window<"u"&&window.__MAKER_COMPONENT_REGISTRY_INSTANCE__)return window.__MAKER_COMPONENT_REGISTRY_INSTANCE__;let t=new e;return typeof window<"u"&&(window.__MAKER_COMPONENT_REGISTRY_INSTANCE__=t),t}register(t,o,r){this.isRegistryAvailable()&&window.__MAKER_NAV_COMPONENT_REGISTRY__.register(t,o,r)}unregister(t){this.isRegistryAvailable()&&window.__MAKER_NAV_COMPONENT_REGISTRY__.unregister(t)}getRenderFunction(t){return window.__MAKER_NAV_COMPONENT_REGISTRY__.list().find(o=>o.componentId===t)?.render}isRegistryAvailable(){return typeof window<"u"&&!!window.__MAKER_NAV_COMPONENT_REGISTRY__}},m=l.getInstance();import{jsx as A}from"react/jsx-runtime";window.__MAKER_SHARED_COMPONENTS_CONTEXT__=window.__MAKER_SHARED_COMPONENTS_CONTEXT__||i.createContext({renderImage:void 0,renderVideo:void 0,renderProductLink:void 0,renderCategoryLink:void 0});var P=window.__MAKER_SHARED_COMPONENTS_CONTEXT__,M=()=>i.useContext(P);function T({renderImage:e,renderVideo:t,renderProductLink:o,renderCategoryLink:r,children:n}){return A(P.Provider,{value:{renderImage:e,renderVideo:t,renderProductLink:o,renderCategoryLink:r},children:n})}var s={Provider:T,useContext:M};import{jsx as b}from"react/jsx-runtime";var I=e=>{let{renderImage:t}=s.useContext();return typeof t=="function"?t(e):b("img",{src:e.src,alt:e.alt,loading:e.priority==0?"eager":"lazy",fetchpriority:e.priority==0?"high":"low",style:{objectFit:e.fit,objectPosition:"center",width:"100%",height:"100%",position:"absolute",top:0,left:0}})},f=I;import{jsx as te}from"react/jsx-runtime";import{jsx as a}from"react/jsx-runtime";var h=({props:e,children:t})=>i.cloneElement(t,{...e}),O=e=>e.target==="product"?a(D,{...e}):e.target==="category"?a(G,{...e}):a(g,{...e}),g=({children:e,...t})=>a("a",{...t,children:e}),D=({productId:e,variantId:t,categoryId:o,href:r,children:n,target:p,...y})=>{let{renderProductLink:E}=s.useContext();return typeof E=="function"?a(h,{props:y,children:E({productId:e,variantId:t,categoryId:o,href:r,children:n,target:p})}):a(g,{href:r,target:"_top",...y,children:n})},G=({categoryId:e,href:t,children:o,target:r,...n})=>{let{renderCategoryLink:p}=s.useContext();return typeof p=="function"?a(h,{props:n,children:p({categoryId:e,href:t,children:o,target:r})}):a(g,{href:t,target:"_top",...n,children:o})},u=O;import me from"react";var k=class extends i.Component{state={hasError:!1};static getDerivedStateFromError(t){return{hasError:!0}}componentDidCatch(t,o){console.error("Error caught in ErrorBoundary:",t,o)}render(){return this.state.hasError?this.props.renderFallback():this.props.children}};import{jsx as ge}from"react/jsx-runtime";import{jsx as d,jsxs as w}from"react/jsx-runtime";var v=e=>{let[t,o]=i.useState(0),r=()=>{o(t+1)};return d(u,{target:"product",productId:e.data.id,categoryId:e.data.categoryId,href:e.data.link,children:w("div",{children:[d("div",{style:{position:"relative",aspectRatio:"16/9",width:"100%"},children:d(f,{src:e.data.variants[0].imageLink,alt:e.data.title,fit:"cover",priority:1})}),d("div",{children:e.data.title}),d(u,{href:e.data.link,target:"_blank",onClick:n=>n.stopPropagation(),children:"Open Product"}),w("button",{onClick:r,children:["Clicked ",t," times"]})]})})};v.defaultProps={test:"test"};m.register("product-card","my-custom-product-card",v);export{v as Component};
