import{g as M,a as P,s as C,_ as b,b as N,u as w,d as S,T as x,j as s,i as A,f as U,R as _,C as O,W as k,P as e}from"./index-TkvRwM9j.js";import{C as D}from"./CardContent-CV9Nj8Vm.js";function E(o){return P("MuiCardHeader",o)}const j=M("MuiCardHeader",["root","avatar","action","content","title","subheader"]),W=["action","avatar","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"],X=o=>{const{classes:a}=o;return U({root:["root"],avatar:["avatar"],action:["action"],content:["content"],title:["title"],subheader:["subheader"]},E,a)},$=C("div",{name:"MuiCardHeader",slot:"Root",overridesResolver:(o,a)=>b({[`& .${j.title}`]:a.title,[`& .${j.subheader}`]:a.subheader},a.root)})({display:"flex",alignItems:"center",padding:16}),B=C("div",{name:"MuiCardHeader",slot:"Avatar",overridesResolver:(o,a)=>a.avatar})({display:"flex",flex:"0 0 auto",marginRight:16}),I=C("div",{name:"MuiCardHeader",slot:"Action",overridesResolver:(o,a)=>a.action})({flex:"0 0 auto",alignSelf:"flex-start",marginTop:-4,marginRight:-8,marginBottom:-4}),L=C("div",{name:"MuiCardHeader",slot:"Content",overridesResolver:(o,a)=>a.content})({flex:"1 1 auto"}),H=N.forwardRef(function(a,i){const t=w({props:a,name:"MuiCardHeader"}),{action:m,avatar:n,className:y,component:l="div",disableTypography:c=!1,subheader:v,subheaderTypographyProps:r,title:g,titleTypographyProps:f}=t,R=S(t,W),p=b({},t,{component:l,disableTypography:c}),d=X(p);let u=g;u!=null&&u.type!==x&&!c&&(u=s.jsx(x,b({variant:n?"body2":"h5",className:d.title,component:"span",display:"block"},f,{children:u})));let h=v;return h!=null&&h.type!==x&&!c&&(h=s.jsx(x,b({variant:n?"body2":"body1",className:d.subheader,color:"text.secondary",component:"span",display:"block"},r,{children:h}))),s.jsxs($,b({className:A(d.root,y),as:l,ref:i,ownerState:p},R,{children:[n&&s.jsx(B,{className:d.avatar,ownerState:p,children:n}),s.jsxs(L,{className:d.content,ownerState:p,children:[u,h]}),m&&s.jsx(I,{className:d.action,ownerState:p,children:m})]}))}),T={"& .MuiCardHeader-action":{mr:0}},q=_.forwardRef(({border:o=!1,boxShadow:a,children:i,content:t=!0,contentClass:m="",contentSX:n={},darkTitle:y,secondary:l,shadow:c,sx:v={},title:r,...g},f)=>s.jsxs(O,{ref:f,...g,sx:{border:o?"1px solid":"none",borderColor:"divider",":hover":{boxShadow:a?c||"0 2px 14px 0 rgb(32 40 45 / 8%)":"inherit"},...v},children:[!y&&r&&s.jsx(H,{sx:T,title:r,action:l}),y&&r&&s.jsx(H,{sx:T,title:s.jsx(x,{variant:"h3",children:r}),action:l}),r&&s.jsx(k,{}),t&&s.jsx(D,{sx:n,className:m,children:i}),!t&&i]}));q.propTypes={border:e.bool,boxShadow:e.bool,children:e.node,content:e.bool,contentClass:e.string,contentSX:e.object,darkTitle:e.bool,secondary:e.oneOfType([e.node,e.string,e.object]),shadow:e.oneOfType([e.string,e.number]),sx:e.object,title:e.oneOfType([e.node,e.string,e.object])};export{q as M};