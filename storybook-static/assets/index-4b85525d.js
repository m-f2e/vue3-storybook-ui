import{d as o,a as s,b as l}from"./vue.esm-bundler-9337b3ab.js";import{c as u}from"./index-582f377c.js";const i=()=>({value:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},halfChecked:{type:Boolean,default:!1},onChange:Function});const r=o({name:"MCheck",props:i(),setup(e,{slots:c,emit:n}){const d=s(()=>u("m-checkbox",{checked:e.value,"half-checked":e.halfChecked,disabled:e.disabled})),t=a=>{a.stopPropagation(),e.disabled||(n("update:value",!e.value),n("change",!e.value))};return()=>{var a;return l("div",{class:d.value,onClick:t},[l("div",{class:"inner"},null),l("div",{class:"content"},[(a=c.default)==null?void 0:a.call(c)])])}}});export{r as M};
//# sourceMappingURL=index-4b85525d.js.map