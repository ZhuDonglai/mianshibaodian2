<template>
	<div style="margin-top:10px">
		<div style="width: 95%; margin:0 auto">
			<el-form-item label="用户编号" :label-width="80" style="display:inline-flex; margin-right: 10px;">
				<el-input v-model="searchId" placeholder="请输入用户编号"></el-input>
			</el-form-item>
			
			<el-button type="primary" @click="search">查询</el-button>
			<el-form-item label="题目号" :label-width="80" style="display:inline-flex; margin-right: 10px;">
				<el-input v-model="inID" placeholder="请输入题目编号"></el-input>
			</el-form-item>
			
			<el-button type="primary" @click="sear">查询</el-button>
		</div>

		<div style="width: 95%; margin:0 auto">
			<el-button type="info" @click="research">重置</el-button>
			<el-button type="success" @click="toAdd">添加
			</el-button>
		</div>
		<el-table :data="interviewRemarks" style="width: 95%; margin:0 auto">】
			<el-table-column prop="id" label="编号" width="100" />
			<el-table-column prop="content" label="评论内容" width="300" />
			<el-table-column prop="userId" label="用户编号" width="100" />
			<el-table-column prop="userName" label="用户名称" width="100" />
			<el-table-column prop="createTime" label="创建时间" width="200">
				<template #default="scope">
					{{ scope.row.createTime != null ? scope.row.createTime.replace("T"," ").slice(0,19) : ""}}
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="150">
				<template #default="scope">
					<el-button link type="info" size="small" @click="check(scope.row.content)">查看</el-button>
					<el-button link type="warning" size="small" @click="toEdit(scope.row)">更新</el-button>
					<el-button link type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
			style="width: 95%; margin:0 auto" @current-change="currentchange" />
	</div>
	<el-dialog v-model="dialogFormVisible" title="添加面试题目">
		<el-form :model="interviewRemark">
			<el-form-item label="评论内容" :label-width="formLabelWidth">
				<el-input type="textarea" :row="3" style="width:80%;" v-model="interviewRemark.content" autocomplete="off" />
			</el-form-item>
			<el-form-item label="评论的题目" :label-width="formLabelWidth">
				<t-pagination-select @page-change="pageChange" :optionSource="interviews" v-model="interviewRemark.interviewId"
					labelKey="title" valueKey="id" style="width:90%;" placeholder="请选择要评论的题目"
					:paginationOption="selectPage" />
			</el-form-item>
			<el-form-item label="创建时间" :label-width="formLabelWidth">
				<div class="block">
					<el-date-picker v-model="interviewRemark.createTime" type="datetime" placeholder="请选择创建时间" />
				</div>
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取消</el-button>
				<el-button type="primary" @click="save">
					保存
				</el-button>
			</span>
		</template>
	</el-dialog>
	<el-dialog v-model="dialogFormVisible1" title="评论详情">
		<el-input type="textarea" :row="3" style="width:80%;" v-model="remarks" autocomplete="off" />
	</el-dialog>
</template>

<script>
	import {
		defineComponent
	} from "vue";

	import {
		getInterviewRemarkByPage,
		getOne,
		addInterviewRemark,
		updateInterviewRemark,
		delOne
	} from "../../http/interviewRemark";
	import {
		getInterviewWithTypeByPage,
	} from "../../http/interview";
	import {
		cloneDeep
	} from "lodash-es";
	import {
		ElMessage
	} from "element-plus";

	import TPaginationSelect from "./module/TPaginationSelect.vue";
	export default defineComponent({
		data() {
			return {
				interviewRemarks: [],
				interviews:[],
				interviewRemark: {
					id: 0,
					content: "",
					interviewId: 1,
					createTime: new Date(),
					userId: 1,
					userName: "414090297@qq.com"
				},
				remarks: "",
				page: {
					total: 0,
					current: 1,
					size: 6,
				},
				inID:null,
				selectPage: {
					total: 0,
					current: 1,
					size: 6,
					pagerCount: 5,
				},

				searchId: null,
				dialogFormVisible: false,
				dialogFormVisible1: false,
			}
		},
		mounted() {
			
			this.getInterviewsPage(1);

		},
		components: {
			"t-pagination-select": TPaginationSelect,
		},
		methods: {
			pageChange(current) {
				this.getInterviewsPage(current);
			},
			sear(){
				this.searchId=null;
				if (this.inID == null || this.inID == "") {
					alert("请输入题目编号后查询");
					return;
				}
				this.getInterviewRemarksPage(1);
			},
			search() {
				this.inID=null;
				if (this.searchId == null || this.searchId == "") {
					alert("请输入用户编号后查询");
					return;
				};
				const data = {
					  colums: [],
					  current: 1,
					  size: 6,
					  userId: this.searchId
				};

				getOne(data)
					.then((res) => {
						if(!res.success){
							this.interviewRemarks =[];
						}else{
							console.log(res);
							const page = res.data.page;
							this.interviewRemarks = page.records;
							this.page = page;
						}
						
					})
					.catch((err) => {
						console.log(err);
					});
			},
			research() {
				
				this.searchId = null;
				this.interviewRemarks=[];
			},
			getInterviewsPage(current) {
				const data = {
					current: current,
					size: 6,
				};
				getInterviewWithTypeByPage(data).then((res) => {
					console.log(res);
					const page = res.data.page;
					this.interviews = page.records;
					this.selectPage = page;
				}).catch((err) => {
					console.log(err);
				});
			},
			toAdd() {
				this.dialogFormVisible = true;
				this.interviewRemark = {
					id: 0,
					content: "",
					interviewId: 1,
					createTime: new Date(),
					userId: 1,
					userName: ""
				}
			},
			currentchange(current) {
				console.log(current);
				this.getInterviewsPage(current);
				this.page.current = current; //数据更新到目前显示的页面
			},
			save() {
				const interviewRemark = this.interviewRemark;
				if (interviewRemark.id == 0) {
					addInterviewRemark(interviewRemark)
						.then((res) => {
							if (res.success) {
								this.dialogFormVisible = false;
								this.inID=interviewRemark.interviewId;
								this.sear();
							} else {
								ElMessage(res.msg);
								return false;
							}
						})
						.catch((err) => {
							ElMessage("网络错误联系管理员");
						});
				} else {
					updateInterviewRemark(interviewRemark).then((res) => {
						if (res.success) {
							//刷新页面
							this.dialogFormVisible = false;
							if(this.searchId == null || this.searchId == ""){
								this.sear();
							}else{
								this.search();
							}
							ElMessage(res.msg);
						} else {
							ElMessage(res.msg);
							return false;
						}
					})
				}
			},
			del(id) {
				delOne(id)
					.then((res) => {
						if (res.success) {
							if(this.searchId == null || this.searchId == ""){
								this.sear();
							}else{
								this.search();
							}
						} else {
							console.log(res.msg);
							return false;
						}
					})
					.catch((err) => {});
			},
			check(a) {
				this.dialogFormVisible1 = true;
				console.log(a)
				this.remarks = a;
			},

			toEdit(userLevel) {
				this.dialogFormVisible = true;
				this.interviewRemark = cloneDeep(userLevel);
			},
			getInterviewRemarksPage(current) {
				const data = {
					current: current,
					size: 6,
					interviewId: this.inID,
					colums: [],
				};
				console.log('***', this)
				getInterviewRemarkByPage(data).then((res) => {
					console.log(res);
					const page = res.data.page;
					this.interviewRemarks = page.records;
					this.page = res.data.page;
					console.log(this.page)
				}).catch((err) => {
					console.log(err);
				});
			}
		}
	});
</script>

<style>
</style>