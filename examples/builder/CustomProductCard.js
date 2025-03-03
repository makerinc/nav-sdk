import w from"react";window.__MAKER_REACT__=window.__MAKER_REACT__||w;var i=window.__MAKER_REACT__;var R="maker-nav-importmap",v={imports:{react:"https://esm.sh/react@16.14.0","react-dom":"https://esm.sh/react@16.14.0","react/jsx-runtime":"https://esm.sh/react@16.14.0/jsx-runtime"}},_=()=>{if(typeof window>"u"||typeof document>"u"||document.getElementById(R))return;let e=document.createElement("script");e.innerHTML=JSON.stringify(v),e.type="importmap",e.id=R,document.head.appendChild(e)};var N=window.__MAKER_NAV_LOGGING_ENABLED__||!0,c=(...e)=>{N&&console.log("[nav-sdk]",...e)};var C={REGISTERED:"maker-nav-component-registered",UNREGISTERED:"maker-nav-component-unregistered"},S=()=>{let t=new Error().stack?.split(`
`)||[];c("getCallerModuleUrl stack lines",t);let r=t[t.length-1];if(!r)return;c("getCallerModuleUrl last stack line",r);let o=r.match(/(https?:\/\/[^:\n]+(:\d+)?(?:\/[^\n:]+)*)(?::\d+:\d+)?/);if(c("getCallerModuleUrl match",o),o)return o[1]},u=class e{components=new Map;constructor(){typeof window>"u"||typeof document>"u"||(_(),window.__MAKER_NAV_COMPONENT_REGISTRY__={register:(t,r,o)=>{let n=S()||import.meta.url;this.components.set(r,{contentType:t,componentUrl:n,render:o}),window.dispatchEvent(new CustomEvent(C.REGISTERED,{detail:{contentType:t,componentId:r,componentUrl:n}}))},unregister:t=>{this.components.get(t)&&(this.components.delete(t),window.dispatchEvent(new CustomEvent(C.UNREGISTERED,{detail:{componentId:t}})))},list:()=>Array.from(this.components.entries()).map(([t,r])=>({componentId:t,componentUrl:r.componentUrl,contentType:r.contentType,render:r.render}))})}static getInstance(){if(typeof window<"u"&&window.__MAKER_COMPONENT_REGISTRY_INSTANCE__)return window.__MAKER_COMPONENT_REGISTRY_INSTANCE__;let t=new e;return typeof window<"u"&&(window.__MAKER_COMPONENT_REGISTRY_INSTANCE__=t),t}register(t,r,o){this.isRegistryAvailable()&&window.__MAKER_NAV_COMPONENT_REGISTRY__.register(t,r,o)}unregister(t){this.isRegistryAvailable()&&window.__MAKER_NAV_COMPONENT_REGISTRY__.unregister(t)}getRenderFunction(t){return window.__MAKER_NAV_COMPONENT_REGISTRY__.list().find(r=>r.componentId===t)?.render}isRegistryAvailable(){return typeof window<"u"&&!!window.__MAKER_NAV_COMPONENT_REGISTRY__}},m=u.getInstance();import{jsx as M}from"react/jsx-runtime";window.__MAKER_SHARED_COMPONENTS_CONTEXT__=window.__MAKER_SHARED_COMPONENTS_CONTEXT__||i.createContext({renderImage:void 0,renderVideo:void 0,renderProductLink:void 0,renderCategoryLink:void 0});var T=window.__MAKER_SHARED_COMPONENTS_CONTEXT__,L=()=>i.useContext(T);function P({renderImage:e,renderVideo:t,renderProductLink:r,renderCategoryLink:o,children:n}){return M(T.Provider,{value:{renderImage:e,renderVideo:t,renderProductLink:r,renderCategoryLink:o},children:n})}var p={Provider:P,useContext:L};import{jsx as A}from"react/jsx-runtime";var x=e=>{let{renderImage:t}=p.useContext();return typeof t=="function"?t(e):A("img",{src:e.src,alt:e.alt,loading:e.priority==0?"eager":"lazy",fetchpriority:e.priority==0?"high":"low",style:{objectFit:e.fit,objectPosition:"center",width:"100%",height:"100%",position:"absolute",top:0,left:0}})},f=x;import{jsx as te}from"react/jsx-runtime";import{jsx as a}from"react/jsx-runtime";var h=({props:e,children:t})=>i.cloneElement(t,{...e}),I=e=>e.target==="product"?a(b,{...e}):e.target==="category"?a(O,{...e}):a(g,{...e}),g=({children:e,...t})=>a("a",{...t,children:e}),b=({productId:e,variantId:t,categoryId:r,href:o,children:n,target:s,...E})=>{let{renderProductLink:y}=p.useContext();return typeof y=="function"?a(h,{props:E,children:y({productId:e,variantId:t,categoryId:r,href:o,children:n,target:s})}):a(g,{href:o,target:"_top",...E,children:n})},O=({categoryId:e,href:t,children:r,target:o,...n})=>{let{renderCategoryLink:s}=p.useContext();return typeof s=="function"?a(h,{props:n,children:s({categoryId:e,href:t,children:r,target:o})}):a(g,{href:t,target:"_top",...n,children:r})},l=I;import me from"react";var k=class extends i.Component{state={hasError:!1};static getDerivedStateFromError(t){return{hasError:!0}}componentDidCatch(t,r){console.error("Error caught in ErrorBoundary:",t,r)}render(){return this.state.hasError?this.props.renderFallback():this.props.children}};import{jsx as ge}from"react/jsx-runtime";import{jsx as d,jsxs as V}from"react/jsx-runtime";var G=e=>{let[t,r]=i.useState(0),o=()=>{r(t+1)};return d(l,{target:"product",productId:e.data.id,categoryId:e.data.categoryId,href:e.data.link,children:V("div",{children:[d("div",{style:{position:"relative",aspectRatio:"16/9",width:"100%"},children:d(f,{src:e.data.variants[0].imageLink,alt:e.data.title,fit:"cover",priority:1})}),d("div",{children:e.data.title}),d(l,{href:e.data.link,target:"_blank",onClick:n=>n.stopPropagation(),children:"Open Product"})]})})};m.register("product-card","my-custom-product-card",G);export{G as Component};
