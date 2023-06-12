<template>
	<div style="margin-top:10px">
		<div style="width: 95%; margin:0 auto">
			<el-form-item label="用户编号" :label-width="80" style="display:inline-flex; margin-right: 10px;">
				<el-input v-model="searchId" placeholder="请输入用户编号"></el-input>
			</el-form-item>
			<el-button type="primary" @click="search">查询</el-button>
		</div>

		<div style="width: 95%; margin:0 auto">
			<el-button type="info" @click="research">重置</el-button>
			<el-button type="success" @click="toAdd">添加
			</el-button>
		</div>
		<el-table :data="interviews" style="width: 95%; margin:0 auto">】
			<el-table-column prop="id" label="编号" width="100" />
			<el-table-column prop="title" label="标题" width="300" />
			<el-table-column prop="interviewType" label="类型" width="100" />
			<el-table-column prop="userinfoId" label="用户编号" width="100" />
			<el-table-column prop="createTime" label="创建时间" width="200">
				<template #default="scope">
					{{ scope.row.createTime != null ? scope.row.createTime.replace("T"," ").slice(0,19) : ""}}
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="150">
				<template #default="scope">
					<el-button link type="info" size="small" @click="check(scope.row.analysis)">查看</el-button>
					<el-button link type="warning" size="small" @click="toEdit(scope.row)">更新</el-button>
					<el-button link type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination layout="prev, pager, next" :page-size="page.size" :total="page.total"
			style="width: 95%; margin:0 auto" @current-change="currentchange" />
	</div>
	<el-dialog v-model="dialogFormVisible" title="添加面试题目">
		<el-form :model="interview">
			<el-form-item label="标题" :label-width="formLabelWidth">
				<el-input v-model="interview.title" autocomplete="off" />
			</el-form-item>
			<el-form-item label="内容" :label-width="formLabelWidth">
				<el-input type="textarea" :row="3" style="width:80%;height: 200;" v-model="interview.analysis" autocomplete="open" />
			</el-form-item>
			<el-form-item label="题目类型" :label-width="formLabelWidth">
				<t-pagination-select @page-change="pageChange" :optionSource="types" v-model="interview.interviewType"
					labelKey="interviewType" valueKey="interviewType" style="width:90%;" placeholder="请选择题目类型" />
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
	<el-dialog v-model="dialogFormVisible1" title="题目详情">
		<el-input type="textarea" :row="3" style="width:80%;" v-model="analysis" autocomplete="off" />
	</el-dialog>
</template>

<script>
	import {
		defineComponent
	} from "vue";
	import {
		getInterviewWithTypeByPage,
		getInterviewsPageByUserId,
		addInterview,
		updateInterview,
		delOne
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
				interviews: [],
				types: [{
						interviewType: 1
					},
					{
						interviewType: 2
					},
					{
						interviewType: 3
					},
					{
						interviewType: 4
					},
				],
				interview: {
					analysis: "",
					createTime: new Date(),
					deleted: 0,
					id: 0,
					interviewType: 1,
					title: "",
					updateTime: "",
					userinfoId: 1,
					view: 1
				},
				analysis:"",
				page: {
					total: 0,
					current: 1,
					size: 6,
				},
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
			search() {
				if (this.searchId == null || this.searchId == "") {
					alert("请输入用户编号后查询");
					return;
				};
				const data = {
					current: 1,
					size: 6,
					colums: [],
					userId: this.searchId,
				};
				console.log(data)
				getInterviewsPageByUserId(data)
					.then((res) => {
						console.log(res);
						const page = res.data.page;
						this.interviews = page.records;
						this.page = page;
					})
					.catch((err) => {
						console.log(err);
					});
			},
			research() {
				this.searchId = null;
				this.getInterviewsPage(1);
			},
			toAdd() {
				this.dialogFormVisible = true;
				this.interview = {
					analysis: "",
					createTime: new Date(),
					deleted: 0,
					id: 0,
					interviewType: 1,
					title: "",
					updateTime: "",
					userinfoId: 1,
					view: 1
				}
			},
			currentchange(current) {
				console.log(current);
				this.getInterviewsPage(current);
				this.page.current = current; //数据更新到目前显示的页面
			},
			save() {
				const interview = this.interview;
				if (interview.id == 0) {
					addInterview(interview)
						.then((res) => {
							if (res.success) {
								this.dialogFormVisible = false;
								this.getInterviewsPage(this.page.current);
								ElMessage(res.msg);
							} else {
								ElMessage(res.msg);
								return false;
							}
						})
						.catch((err) => {
							ElMessage("网络错误联系管理员");
						});
				}else{
					updateInterview(interview).then((res)=>{
						if (res.success) {
							//刷新页面
							this.dialogFormVisible = false;
							this.getInterviewsPage(1);
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
							this.getInterviewsPage(1);
						} else {
							console.log(res.msg);
							return false;
						}
					})
					.catch((err) => {});
			},
			check(a){
				this.dialogFormVisible1 = true;
				this.analysis=a;
			},

			toEdit(userLevel) {
				this.dialogFormVisible = true;
				this.interview = cloneDeep(userLevel);
			},
			getInterviewsPage(current) {
				const data = {
					current: current,
					size: 6,
					colums: [],
				};
				getInterviewWithTypeByPage(data).then((res) => {
					console.log(res);
					const page = res.data.page;
					this.interviews = page.records;
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