<template>
  <div class="k-designer-main">
    <KHeader />
    <div class="k-split-view-container">
      <KActionBar />
      <KEditContainer />
      <KRightSidebar />
    </div>
    <KFooter />
  </div>
</template>
<script lang="ts" setup>
import KHeader from './modules/KHeader/KHeader.vue'
import KFooter from './modules/KFooter/KFooter.vue'
import KRightSidebar from './modules/KAttributeView/KAttributeView.vue'
import KEditContainer from './modules/KEditContainer/KEditContainer.vue'
import KActionBar from './modules/KActionBar/KActionBar.vue'
import { provide, reactive, ref } from 'vue'
import { DesignerState, NodeItem, FormDataModel } from '../../../types/kDesigner'
import { getMatchedById } from '../../../utils/index'
const state = reactive<DesignerState>({
  checkedNode: null,
  hoverNode: null,
  disableHover: false,
  matched: []
})
const schemas = ref<NodeItem[]>([])

const formData = reactive<FormDataModel>({})
provide('schemas', schemas)
provide('formData', formData)
const rootSchema = {
  type: 'form',
  id: 'root',
  name: 'default',
  children: []
}

// 添加根节点
schemas.value.push(rootSchema)
// 选中根节点
setCheckedNode(rootSchema)

provide('designer', {
  setCheckedNode,
  setHoverNode,
  setDisableHover,
  state
})

/**
 * 选中节点
 * @param schema
 */
async function setCheckedNode (schema: NodeItem = rootSchema) {
  state.checkedNode = schema
  state.matched = getMatchedById(schemas.value, schema.id)
}

/**
 * 设置悬停节点
 * @param schema
 */
async function setHoverNode (schema: NodeItem | null = null) {
  if (state.disableHover) {
    state.hoverNode = null
    return false
  }
  state.hoverNode = schema
}

/**
 * 设置hover状态
 * @param disableHover
 */
async function setDisableHover (disableHover = false) {
  state.disableHover = disableHover
}

</script>

<style lang="less">
@import './KDesigner.less';
</style>
