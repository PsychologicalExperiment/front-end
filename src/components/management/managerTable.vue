<template>
  <el-table row-key="uid" :data="tableData" style="width: 100%">
    <el-table-column prop="uid" label="参与者ID" width="180" />
    <el-table-column prop="name" label="参与者姓名" width="240" />
    <el-table-column 
      prop="startTime"
      label="参与者开始时间"
      width="240"
    />
    <el-table-column prop="usedTime" label="参与者已用时间" width="240" />
    <el-table-column prop="progress" label="问卷完成度" width="240" />
    <el-table-column 
      prop="status"
      label="状态"
      width="240"
    >
      <template #default="scope">
        <el-tag
          :type="scope.row.status === '已批准' ? 'success' : 'warning'"
          disable-transitions
          effect="dark"
        >
          {{ scope.row.status }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template>
        <el-icon>
          <Message />
        </el-icon>
        <el-icon>
          <Check />
        </el-icon>
        <el-icon>
          <Close />
        </el-icon>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "managerTable",
  props: {
    tableData: {
      type: Array,
    }
  }
}
</script>