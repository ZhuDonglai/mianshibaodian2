<template>
	<div style="margin-top:10px">
		<div style="width: 95%; margin:0 auto">
			<el-form-item label="类型编号" :label-width="80" style="display:inline-flex; margin-right: 10px;">
				<el-input v-model="searchId" placeholder="请输入类型编号"></el-input>
			</el-form-item>
			<el-button type="primary" @click="search">查询</el-button>
		</div>

		<div style="width: 95%; margin:0 auto">
			<el-button type="info" @click="research">重置</el-button>
			<el-button type="success" @click="toAdd">添加
			</el-button>
		</div>
		<el-table :data="interviewTypes" style="width: 95%; margin:0 auto;height: 800px;">】
			<el-table-column prop="id" label="编号" width="100" />
			<el-table-column prop="typeName" label="类型名" width="300" />
			
			<el-table-column fixed="right" label="操作" width="120">
				<template #default="scope">
					
					<el-button link type="warning" size="small" @click="toEdit(scope.row)">更新</el-button>
					<el-button link type="danger" size="small" @click="del(scope.row.id)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
	</div>
	<el-dialog v-model="dialogFormVisible" title="添加题目类型">
		<el-form :model="interview">
			<el-form-item label="类型名" :label-width="formLabelWidth">
				<el-input v-model="interviewType.typeName" autocomplete="off" />
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
	
</template>

<script>
	import {
		defineComponent
	} from "vue";
	import {
		getInterviewTypes,
		addInterviewType,
		updateInterviewType,
		getOne,
		delOne
	} from "../../http/interviewType";
	import {
		cloneDeep
	} from "lodash-es";
	import {
		ElMessage
	} from "element-plus";
	export default defineComponent({
		data() {
			return {
				interviewTypes: [],
				
				interviewType: {
					id:0,
					typeName:"",
				},

				searchId: null,
				dialogFormVisible: false,
			}
		},
		mounted() {
			this.getInterviewTypesByPage();
		},
		
		methods: {
			search() {
				if (this.searchId == null || this.searchId == "") {
					alert("请输入用户编号后查询");
					return;
				};
				
				getOne(this.searchId)
					.then((res) => {
						console.log(res);
						
						this.interviewTypes = [];
						this.interviewTypes.push(res.data.interviewType);
						
					})
					.catch((err) => {
						console.log(err);
					});
			},
			research() {
				this.searchId = null;
				this.getInterviewTypesByPage();
			},
			toAdd() {
				this.dialogFormVisible = true;
				this.interviewType = {
					id:0,
					typeName:"",
				}
			},
			
			save() {
				const interviewType = this.interviewType;
				if (interviewType.id == 0) {
					addInterviewType(interviewType)
						.then((res) => {
							if (res.success) {
								this.dialogFormVisible = false;
								this.getInterviewTypesByPage();
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
					updateInterviewType(interviewType).then((res)=>{
						if (res.success) {
							//刷新页面
							this.dialogFormVisible = false;
							this.getInterviewTypesByPage();
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
							this.getInterviewTypesByPage();
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
				this.interviewType = cloneDeep(userLevel);
			},
			getInterviewTypesByPage() {
				getInterviewTypes().then((res) => {
					console.log(res);
					this.interviewTypes= res.data.interviewTypes;
					this.page = res.data.page;
					console.log("***",this.interviewTypes)
				}).catch((err) => {
					console.log(err);
				});
			}
		}
	});
</script>

<style>
</style>