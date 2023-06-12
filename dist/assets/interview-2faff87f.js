import{_ as b,d as V,r as C,o as I,c as T,a as m,b as l,w as a,F as k,e as o,t as _}from"./index-58898c43.js";import{E as d,c as F,a as E,b as P,d as z}from"./el-table-column-e980d996.js";import{E as U,a as $,b as B,c as D}from"./el-form-item-7c29d327.js";import{E as S}from"./el-select-4cba9d68.js";import{T as W,g as L,a as N,u as A,d as K,b as M}from"./TPaginationSelect-d3d026d3.js";const O=V({data(){return{interviews:[],types:[{interviewType:1},{interviewType:2},{interviewType:3},{interviewType:4}],interview:{analysis:"",createTime:new Date,deleted:0,id:0,interviewType:1,title:"",updateTime:"",userinfoId:1,view:1},analysis:"",page:{total:0,current:1,size:6},selectPage:{total:0,current:1,size:6,pagerCount:5},searchId:null,dialogFormVisible:!1,dialogFormVisible1:!1}},mounted(){this.getInterviewsPage(1)},components:{"t-pagination-select":W},methods:{search(){if(this.searchId==null||this.searchId==""){alert("请输入用户编号后查询");return}const e={current:1,size:6,colums:[],userId:this.searchId};console.log(e),L(e).then(t=>{console.log(t);const n=t.data.page;this.interviews=n.records,this.page=n}).catch(t=>{console.log(t)})},research(){this.searchId=null,this.getInterviewsPage(1)},toAdd(){this.dialogFormVisible=!0,this.interview={analysis:"",createTime:new Date,deleted:0,id:0,interviewType:1,title:"",updateTime:"",userinfoId:1,view:1}},currentchange(e){console.log(e),this.getInterviewsPage(e),this.page.current=e},save(){const e=this.interview;e.id==0?N(e).then(t=>{if(t.success)this.dialogFormVisible=!1,this.getInterviewsPage(this.page.current),d(t.msg);else return d(t.msg),!1}).catch(t=>{d("网络错误联系管理员")}):A(e).then(t=>{if(t.success)this.dialogFormVisible=!1,this.getInterviewsPage(1),d(t.msg);else return d(t.msg),!1})},del(e){K(e).then(t=>{if(t.success)this.getInterviewsPage(1);else return console.log(t.msg),!1}).catch(t=>{})},check(e){this.dialogFormVisible1=!0,this.analysis=e},toEdit(e){this.dialogFormVisible=!0,this.interview=F(e)},getInterviewsPage(e){M({current:e,size:6,colums:[]}).then(n=>{console.log(n);const g=n.data.page;this.interviews=g.records,this.page=n.data.page,console.log(this.page)}).catch(n=>{console.log(n)})}}}),j={style:{"margin-top":"10px"}},q={style:{width:"95%",margin:"0 auto"}},G={style:{width:"95%",margin:"0 auto"}},H={class:"dialog-footer"};function J(e,t,n,g,Q,R){const p=B,u=U,s=$,r=z,c=E,f=S,v=C("t-pagination-select"),y=D,h=P;return I(),T(k,null,[m("div",j,[m("div",q,[l(u,{label:"用户编号","label-width":80,style:{display:"inline-flex","margin-right":"10px"}},{default:a(()=>[l(p,{modelValue:e.searchId,"onUpdate:modelValue":t[0]||(t[0]=i=>e.searchId=i),placeholder:"请输入用户编号"},null,8,["modelValue"])]),_:1}),l(s,{type:"primary",onClick:e.search},{default:a(()=>[o("查询")]),_:1},8,["onClick"])]),m("div",G,[l(s,{type:"info",onClick:e.research},{default:a(()=>[o("重置")]),_:1},8,["onClick"]),l(s,{type:"success",onClick:e.toAdd},{default:a(()=>[o("添加 ")]),_:1},8,["onClick"])]),l(c,{data:e.interviews,style:{width:"95%",margin:"0 auto"}},{default:a(()=>[o("】 "),l(r,{prop:"id",label:"编号",width:"100"}),l(r,{prop:"title",label:"标题",width:"300"}),l(r,{prop:"interviewType",label:"类型",width:"100"}),l(r,{prop:"userinfoId",label:"用户编号",width:"100"}),l(r,{prop:"createTime",label:"创建时间",width:"200"},{default:a(i=>[o(_(i.row.createTime!=null?i.row.createTime.replace("T"," ").slice(0,19):""),1)]),_:1}),l(r,{fixed:"right",label:"操作",width:"150"},{default:a(i=>[l(s,{link:"",type:"info",size:"small",onClick:w=>e.check(i.row.analysis)},{default:a(()=>[o("查看")]),_:2},1032,["onClick"]),l(s,{link:"",type:"warning",size:"small",onClick:w=>e.toEdit(i.row)},{default:a(()=>[o("更新")]),_:2},1032,["onClick"]),l(s,{link:"",type:"danger",size:"small",onClick:w=>e.del(i.row.id)},{default:a(()=>[o("删除")]),_:2},1032,["onClick"])]),_:1})]),_:1},8,["data"]),l(f,{layout:"prev, pager, next","page-size":e.page.size,total:e.page.total,style:{width:"95%",margin:"0 auto"},onCurrentChange:e.currentchange},null,8,["page-size","total","onCurrentChange"])]),l(h,{modelValue:e.dialogFormVisible,"onUpdate:modelValue":t[5]||(t[5]=i=>e.dialogFormVisible=i),title:"添加面试题目"},{footer:a(()=>[m("span",H,[l(s,{onClick:t[4]||(t[4]=i=>e.dialogFormVisible=!1)},{default:a(()=>[o("取消")]),_:1}),l(s,{type:"primary",onClick:e.save},{default:a(()=>[o(" 保存 ")]),_:1},8,["onClick"])])]),default:a(()=>[l(y,{model:e.interview},{default:a(()=>[l(u,{label:"标题","label-width":e.formLabelWidth},{default:a(()=>[l(p,{modelValue:e.interview.title,"onUpdate:modelValue":t[1]||(t[1]=i=>e.interview.title=i),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(u,{label:"内容","label-width":e.formLabelWidth},{default:a(()=>[l(p,{type:"textarea",row:3,style:{width:"80%",height:"200"},modelValue:e.interview.analysis,"onUpdate:modelValue":t[2]||(t[2]=i=>e.interview.analysis=i),autocomplete:"open"},null,8,["modelValue"])]),_:1},8,["label-width"]),l(u,{label:"题目类型","label-width":e.formLabelWidth},{default:a(()=>[l(v,{onPageChange:e.pageChange,optionSource:e.types,modelValue:e.interview.interviewType,"onUpdate:modelValue":t[3]||(t[3]=i=>e.interview.interviewType=i),labelKey:"interviewType",valueKey:"interviewType",style:{width:"90%"},placeholder:"请选择题目类型"},null,8,["onPageChange","optionSource","modelValue"])]),_:1},8,["label-width"])]),_:1},8,["model"])]),_:1},8,["modelValue"]),l(h,{modelValue:e.dialogFormVisible1,"onUpdate:modelValue":t[7]||(t[7]=i=>e.dialogFormVisible1=i),title:"题目详情"},{default:a(()=>[l(p,{type:"textarea",row:3,style:{width:"80%"},modelValue:e.analysis,"onUpdate:modelValue":t[6]||(t[6]=i=>e.analysis=i),autocomplete:"off"},null,8,["modelValue"])]),_:1},8,["modelValue"])],64)}const te=b(O,[["render",J]]);export{te as default};
