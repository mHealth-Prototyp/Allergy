"use strict";(globalThis["webpackChunkmhealth_proto_patient"]=globalThis["webpackChunkmhealth_proto_patient"]||[]).push([[698],{8698:(e,t,a)=>{a.r(t),a.d(t,{default:()=>L});var o=a(9835),l=a(6970);const n={class:"sub-title"},r={class:"q-mr-lg"};function u(e,t,a,u,i,s){const m=(0,o.up)("q-btn"),c=(0,o.up)("q-toolbar-title"),d=(0,o.up)("q-icon"),g=(0,o.up)("q-toolbar"),p=(0,o.up)("q-header"),f=(0,o.up)("q-item-label"),w=(0,o.up)("router-link"),h=(0,o.up)("q-item"),b=(0,o.up)("q-list"),k=(0,o.up)("q-drawer"),_=(0,o.up)("router-view"),q=(0,o.up)("q-page-container"),y=(0,o.up)("q-layout");return(0,o.wg)(),(0,o.j4)(y,{view:"lHh Lpr lFf"},{default:(0,o.w5)((()=>[(0,o.Wm)(p,{elevated:""},{default:(0,o.w5)((()=>[(0,o.Wm)(g,null,{default:(0,o.w5)((()=>[(0,o.Wm)(m,{flat:"",dense:"",round:"",icon:"fas fa-bars","aria-label":e.$t("layout.title"),onClick:e.toggleLeftDrawer},null,8,["aria-label","onClick"]),(0,o.Wm)(c,null,{default:(0,o.w5)((()=>[(0,o.Uk)((0,l.zw)(e.$t("layout.title"))+" ",1),(0,o._)("span",n,(0,l.zw)(e.$t("layout.subtitle")),1)])),_:1}),(0,o._)("div",r,(0,l.zw)(e.$today.toLocaleDateString()),1),e.user.givenName?((0,o.wg)(),(0,o.iD)("div",{key:0,onClick:t[0]||(t[0]=(...t)=>e.logout&&e.logout(...t))},[(0,o.Uk)((0,l.zw)((e.user.prefix?e.user.prefix:"")+" "+e.user.givenName+" "+e.user.familyName)+" ",1),(0,o.Wm)(d,{name:"fas fa-user",id:"user-icon"})])):(0,o.kq)("",!0)])),_:1})])),_:1}),(0,o.Wm)(k,{modelValue:e.leftDrawerOpen,"onUpdate:modelValue":t[1]||(t[1]=t=>e.leftDrawerOpen=t),bordered:""},{default:(0,o.w5)((()=>[(0,o.Wm)(b,null,{default:(0,o.w5)((()=>[(0,o.Wm)(f,{header:""},{default:(0,o.w5)((()=>[(0,o.Uk)((0,l.zw)(e.$t("layout.menu.title")),1)])),_:1}),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.menuEntries,(t=>((0,o.wg)(),(0,o.j4)(h,{key:t.to},{default:(0,o.w5)((()=>[t.icon?((0,o.wg)(),(0,o.j4)(d,{key:0,name:"fas fa-"+t.icon,class:"menu-icon"},null,8,["name"])):(0,o.kq)("",!0),(0,o.Wm)(w,{to:t.to,class:"menu-link"},{default:(0,o.w5)((()=>[(0,o.Uk)((0,l.zw)(e.$t("layout.menu."+t.translateString)),1)])),_:2},1032,["to"])])),_:2},1024)))),128))])),_:1})])),_:1},8,["modelValue"]),(0,o.Wm)(q,null,{default:(0,o.w5)((()=>[(0,o.Wm)(_)])),_:1})])),_:1})}var i=a(7861);const s=(0,o.aZ)({name:"MainLayout",components:{},data(){return{leftDrawerOpen:!1,user:{},menuEntries:[{to:"/",translateString:"home",icon:"home"},{to:"/documents",translateString:"documents",icon:"book-medical"},{to:"/upload",translateString:"upload",icon:"file-upload"},{to:"/settings",translateString:"settings",icon:"cog"},{to:"/about",translateString:"about",icon:"question-circle"}]}},beforeCreate(){this.$i18n.locale=this.$store.getLanguage(),a(7404)("./"+(0,i.getLangStringFromLocale)(this.$store.getLanguage())).then((e=>{this.$q.lang.set(e.default)})).catch((e=>console.error(e)))},mounted(){this.user=this.$store.getUser()||{}},methods:{toggleLeftDrawer(){this.leftDrawerOpen=!this.leftDrawerOpen},logout(){confirm(this.$t("layout.logoutPrompt"))&&(this.$store.logoutUser(),location.reload())}}});var m=a(1639),c=a(249),d=a(6602),g=a(1663),p=a(4455),f=a(1973),w=a(2857),h=a(906),b=a(3246),k=a(3115),_=a(490),q=a(2133),y=a(9984),Z=a.n(y);const $=(0,m.Z)(s,[["render",u],["__scopeId","data-v-442d8352"]]),L=$;Z()(s,"components",{QLayout:c.Z,QHeader:d.Z,QToolbar:g.Z,QBtn:p.Z,QToolbarTitle:f.Z,QIcon:w.Z,QDrawer:h.Z,QList:b.Z,QItemLabel:k.Z,QItem:_.Z,QPageContainer:q.Z})}}]);