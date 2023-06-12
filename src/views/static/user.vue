<template>
  <div style="margin-top:10px">
    <div style="width: 95%; margin:0 auto">
      <el-form-item
        label="用户编号"
        :label-width="80"
        style="display:inline-flex; margin-right: 10px;"
      >
        <el-input
          v-model="searchId"
          placeholder="请输入用户编号"
        ></el-input>
      </el-form-item>
      <el-button
        type="primary"
        @click="search"
      >查询</el-button>
    </div>

    <div style="width: 95%; margin:0 auto">
      <el-button
        type="info"
        @click="research"
      >重置</el-button>
      <el-button
        type="success"
        @click="toAdd"
      >添加
      </el-button>
    </div>
    <el-table
      :data="users"
      style="width: 95%; margin:0 auto"
    >
      <el-table-column
        prop="id"
        label="编号"
        width="80"
      />
      <el-table-column
        prop="userName"
        label="用户名称"
        width="200"
      />

      <el-table-column
        prop="email"
        label="邮箱"
        width="200"
      />

      <el-table-column
        prop="userType"
        label="用户类型"
        width="120"
      />
      <el-table-column
        label="状态"
        width="120"
      >
        <template #default="scope">
          {{ scope.row.state == 1 ? "启用" : "不启用" }}
        </template>
      </el-table-column>

      <el-table-column
        label="创建时间"
        width="120"
      >
        <template #default="scope">
          {{ scope.row.createTime != null ? scope.row.createTime.replace("T"," ").slice(0,19) : ""}}
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="功能管理"
        width="140"
      >
        <template #default="scope">
          <el-button
            type="warning"
            link
            size="small"
            @click="toEdit(scope.row)"
          >更新</el-button>
          <el-button
            type="danger"
            link
            size="small"
            @click="del(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :page-size="page.size"
      :total="page.total"
      style="width: 95%; margin:0 auto"
      @current-change="currentchange"
    />
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    title="用户编辑"
  >
    <el-form :model="user">
      <el-form-item
        label="用户名称"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="user.userName"
          placeholder="请输入类型名称"
          style="width:80%;"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="密码"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="user.password"
          type="password"
          placeholder="请输入密码"
          style="width:80%;"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="邮箱"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="user.email"
          type="email"
          placeholder="请输入邮箱"
          style="width:80%;"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="用户类型"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="user.userType"
          placeholder="请选择用户类型"
          style="width:80%;"
        >
          <el-option
            label="学生"
            value="学生"
          />
          <el-option
            label="教师"
            value="教师"
          />
          <el-option
            label="教辅"
            value="教辅"
          />
          <el-option
            label="管理员"
            value="管理员"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="状态"
        :label-width="formLabelWidth"
      >
        <el-select
          v-model="user.state"
          placeholder="请选择状态"
          style="width:80%;"
        >
          <el-option
            label="启用"
            :value="1"
          />
          <el-option
            label="不启用"
            :value="0"
          />
        </el-select>
      </el-form-item>

      <el-form-item
        label="创建时间"
        :label-width="formLabelWidth"
      >
        <div class="block">
          <el-date-picker
            v-model="user.createTime"
            type="datetime"
            placeholder="请选择创建时间"
          />
        </div>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button
          type="primary"
          @click="save"
        >保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
import { defineComponent } from "vue";
import {
  updateOne,
  addOne,
  delOne,
  getUserPage,
  getOne,
} from "../../http/user";
import { cloneDeep } from "lodash-es";
export default defineComponent({
  data() {
    return {
      users: [],
      page: {
        total: 0,
        current: 1,
        size: 6,
      },
      searchId: null,
      dialogFormVisible: false,
      user: {
        createTime: new Date(),
        email: "",
        id: 0,
        password: "",
        state: 1,
        userName: "",
        userType: "学生",
      },
      formLabelWidth: 80,
    };
  },
  mounted() {
    this.getCategoriesPage(1);
  },
  methods: {
    search() {
      if (this.searchId == null || this.searchId == "") {
        alert("请输入用户编号后查询");
        return;
      }
      getOne(this.searchId)
        .then((res) => {
          if (res.data == null) {
            this.users = [];
          } else {
            this.users = [];
            this.users.push(res.data.userinfo);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    research() {
      this.searchId = null;
      this.getCategoriesPage(1);
    },
    toEdit(user) {
      this.dialogFormVisible = true;
      this.user = cloneDeep(user);
    },
    getCategoriesPage(current) {
      const data = {
        current: current,
        size: 6,
        colums: [],
      };
      getUserPage(data)
        .then((res) => {
          console.log(res);
          const page = res.data.page;
          this.users = page.records;
          this.page = page;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    currentchange(current) {
      // console.log(current);
      this.getCategoriesPage(current);
      this.page.current = current; //数据更新到目前显示的页面
    },
    del(id) {
      if (confirm("是否删除") == true) console.log(id);
      console.log(id);
      delOne(id)
        .then((res) => {
          if (res.success) {
            this.getCategoriesPage(this.page.current);
          } else {
            return false;
          }
        })
        .catch((err) => {});
    },
    toAdd() {
      this.dialogFormVisible = true;
      this.user = {
        createTime: new Date(),
        email: "",
        id: 0,
        password: "",
        state: 1,
        userName: "",
        userType: "学生",
      };
    },
    save() {
      const user = this.user;
      if (user.id == 0) {
        addOne(user)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getCategoriesPage(this.page.current);
              ElMessage(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      } else {
        updateOne(user)
          .then((res) => {
            if (res.success) {
              this.dialogFormVisible = false;
              this.getCategoriesPage(this.page.current);
              ElMessage(res.msg);
            } else {
              ElMessage(res.msg);
              return false;
            }
          })
          .catch((err) => {
            ElMessage("网络错误联系管理员");
          });
      }
    },
  },
});
</script>
    <style scoped>
.el-col-12 {
  width: 15%;
}
</style>