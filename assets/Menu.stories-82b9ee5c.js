import{d as k,n as v,w as O,b as c,m as p,p as $,r as q}from"./vue.esm-bundler-9337b3ab.js";import{c as h}from"./index-582f377c.js";import"./_commonjsHelpers-042e6b4d.js";const B=()=>({defaultIndex:{type:String,default:"0"},mode:{type:String,default:"horizontal"},onSelect:Function}),H=()=>({index:{type:String,required:!0},disabled:{type:Boolean,default:!1},activeIndex:String,onSelect:Function}),j=()=>({index:String,title:String,mode:{type:String,default:"horizontal"},activeIndex:String,onSelect:Function});const I=k({name:"MMenu",props:B(),emits:["onSelect"],setup(e,{emit:r,slots:o,attrs:i}){const t=v(e.defaultIndex);O(()=>e.defaultIndex,n=>{t.value=n});const a=n=>{if(n.indexOf("-")!==void 0){const u=n.split("-")[0];t.value=u}else t.value=n;r("onSelect",n)};return()=>{const{mode:n}=e,u=()=>o.default().map((d,b)=>{if(d.type.name==="MMenuItem"||d.type.name==="MSubMenu")return $(d,{index:b.toString(),onSelect:a,activeIndex:t.value,mode:n});console.error("Menu's child must be MenuItem or MSubMenu")}),l=h("m-menu",{[`menu-${n}`]:n});return c("ul",p(i,{class:l}),[u()])}}}),x=k({name:"MMenuItem",props:H(),setup(e,{slots:r,attrs:o}){return()=>{const{index:i,disabled:t,activeIndex:a,onSelect:n}=e,u=()=>{n&&!t&&n(i)},l=h("menu-item",{"is-disabled":t,"is-active":a===i});return c("li",p(o,{class:l,onClick:u}),[r.default()])}}});x.playName="MenuItem";const C=k({name:"MSubMenu",props:j(),setup(e,{attrs:r,slots:o}){const i=v(!1),t=q({"m-submenu":!0,"menu-opened":e.mode==="vertical"?!i.value:i.value}),a=v();O(()=>e.activeIndex,()=>{e.activeIndex!==e.index&&(a.value="")});const n=m=>{m.preventDefault(),e.onSelect&&e.onSelect(e.index)};let u;const l=(m,s)=>{clearTimeout(u),m.preventDefault(),u=setTimeout(()=>{t["menu-opened"]=s},100)},d=e.mode==="vertical"?{onClick:n}:{},b=e.mode!=="vertical"?{onMouseenter:m=>{l(m,!0)},onMouseleave:m=>{l(m,!1)}}:{},w=m=>{a.value=m,e.onSelect&&e.onSelect(m)},A=()=>{const m=o.default().map((s,g)=>{if(s.type.name==="MMenuItem")return $(s,{index:`${e.index}-${g.toString()}`,activeIndex:a.value,onSelect:w});console.error("MSubMenu's child must be a MMenuItem")});return c("ul",{class:t},[m])};return()=>{const{index:m,title:s,activeIndex:g}=e,_=h("menu-item submenu-item",{"is-active":g===m});return c("li",p(r,{key:m,class:_},b),[c("div",p({class:"submenu-title"},d,{onClick:n}),[s]),A()])}}}),L={title:"Example/MMenu",component:I,tags:["autodocs"],argTypes:{mode:{control:"select",options:["horizontal","vertical"]},defaultIndex:{control:"text"},onSelect:{action:"onSelect"}},args:{}},M={args:{defaultIndex:"0"},render:e=>({components:{MMenu:I,MMenuItem:x,MSubMenu:C},setup(){return{args:e}},template:`<m-menu
      :defaultIndex="args.defaultIndex"
      :mode="args.mode"
      @onSelect="handleClick"
      >
      <m-menu-item>link1</m-menu-item>
      <m-menu-item disabled>link2</m-menu-item>
      <m-menu-item>link3</m-menu-item>
    </m-menu>`})},f={args:{mode:"horizontal",defaultIndex:"0"},render:e=>({components:{MMenu:I,MMenuItem:x,MSubMenu:C},setup(){return{args:e}},template:`<m-menu 
      :defaultIndex="args.defaultIndex" 
      :mode="args.mode"
      @onSelect="handleClick">
      <m-menu-item>link1</m-menu-item>
      <m-menu-item disabled>link2</m-menu-item>
      <m-sub-menu title="下拉">
        <m-menu-item disabled>2323</m-menu-item>
        <m-menu-item>过去</m-menu-item>
        <m-menu-item>现在</m-menu-item>
      </m-sub-menu>
      <m-menu-item>link3</m-menu-item>
    </m-menu>`})},S={args:{mode:"vertical",defaultIndex:"0"},render:e=>({components:{MMenu:I,MMenuItem:x,MSubMenu:C},setup(){return{args:e}},template:`<m-menu 
      :defaultIndex="args.defaultIndex" 
      :mode="args.mode"
      @onSelect="handleClick">
      <m-menu-item>link1</m-menu-item>
      <m-menu-item disabled>link2</m-menu-item>
      <m-sub-menu title="下拉">
        <m-menu-item disabled>2323</m-menu-item>
        <m-menu-item>过去</m-menu-item>
        <m-menu-item>现在</m-menu-item>
      </m-sub-menu>
      <m-menu-item>link3</m-menu-item>
    </m-menu>`})};var y,z,D;M.parameters={...M.parameters,docs:{...(y=M.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    defaultIndex: '0'
  },
  render: (args: any) => ({
    components: {
      MMenu,
      MMenuItem,
      MSubMenu
    },
    setup() {
      return {
        args
      };
    },
    template: \`<m-menu
      :defaultIndex="args.defaultIndex"
      :mode="args.mode"
      @onSelect="handleClick"
      >
      <m-menu-item>link1</m-menu-item>
      <m-menu-item disabled>link2</m-menu-item>
      <m-menu-item>link3</m-menu-item>
    </m-menu>\`
  })
}`,...(D=(z=M.parameters)==null?void 0:z.docs)==null?void 0:D.source}}};var E,N,P;f.parameters={...f.parameters,docs:{...(E=f.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    mode: 'horizontal',
    defaultIndex: '0'
  },
  render: (args: any) => ({
    components: {
      MMenu,
      MMenuItem,
      MSubMenu
    },
    setup() {
      return {
        args
      };
    },
    template: \`<m-menu 
      :defaultIndex="args.defaultIndex" 
      :mode="args.mode"
      @onSelect="handleClick">
      <m-menu-item>link1</m-menu-item>
      <m-menu-item disabled>link2</m-menu-item>
      <m-sub-menu title="下拉">
        <m-menu-item disabled>2323</m-menu-item>
        <m-menu-item>过去</m-menu-item>
        <m-menu-item>现在</m-menu-item>
      </m-sub-menu>
      <m-menu-item>link3</m-menu-item>
    </m-menu>\`
  })
}`,...(P=(N=f.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};var T,V,F;S.parameters={...S.parameters,docs:{...(T=S.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    mode: 'vertical',
    defaultIndex: '0'
  },
  render: (args: any) => ({
    components: {
      MMenu,
      MMenuItem,
      MSubMenu
    },
    setup() {
      return {
        args
      };
    },
    template: \`<m-menu 
      :defaultIndex="args.defaultIndex" 
      :mode="args.mode"
      @onSelect="handleClick">
      <m-menu-item>link1</m-menu-item>
      <m-menu-item disabled>link2</m-menu-item>
      <m-sub-menu title="下拉">
        <m-menu-item disabled>2323</m-menu-item>
        <m-menu-item>过去</m-menu-item>
        <m-menu-item>现在</m-menu-item>
      </m-sub-menu>
      <m-menu-item>link3</m-menu-item>
    </m-menu>\`
  })
}`,...(F=(V=S.parameters)==null?void 0:V.docs)==null?void 0:F.source}}};const Q=["Direction","SubMenu","VerticalSubMenu"];export{M as Direction,f as SubMenu,S as VerticalSubMenu,Q as __namedExportsOrder,L as default};
//# sourceMappingURL=Menu.stories-82b9ee5c.js.map
