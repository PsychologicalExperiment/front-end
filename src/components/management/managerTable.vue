<template>
  <el-table row-key="recordId" :data="tableData" style="width: 100%">
    <el-table-column prop="recordId" label="记录ID" width="180" />
    <el-table-column prop="name" label="参与者姓名" width="180" />
    <el-table-column 
      prop="startTime"
      label="参与者开始时间"
      width="240"
    />
    <el-table-column prop="usedTime" label="参与者所用时间" width="240" />
    <el-table-column prop="progress" label="问卷完成度" width="180" />
    <el-table-column 
      prop="status"
      label="状态"
      width="180"
    >
      <template #default="scope">
        <el-tag
          :type="scope.row.tagType"
          disable-transitions
          effect="dark"
        >
          {{ scope.row.status }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template #default="scope">
        <el-button
          :icon="Message"
          :circle="true" 
          @click="handleMsgButton(scope.$index, scope.row)"
        >
        </el-button>
        <el-button
          :icon="Check"
          :circle="true" 
          @click="handleCheckButton(scope.$index, scope.row)"
        >
        </el-button>
        <el-button
          :icon="Close"
          :circle="true" 
          @click="handleCloseButton(scope.$index, scope.row)"
        >
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

import { Message, Check, Close } from '@element-plus/icons-vue';

export default {
  name: "managerTable",
  props: {
    tableData: {
      type: Array,
    }
  },
  setup() {
    const handleMsgButton = (index, row) => {
      console.log(index, row)
    }
    const handleCheckButton = (index, row) => {
      console.log(index, row)
    }
    const handleCloseButton = (index, row) => {
      console.log(index, row)
    }
    return {
      Message,
      Check,
      Close,
      handleMsgButton,
      handleCheckButton,
      handleCloseButton,
    }
  }
}
</script>