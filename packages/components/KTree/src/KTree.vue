<template>
  <ul class="k-tree-main">
    <KTreeNode v-for="(item) in props.options" :record="item" :key="item.id" />
  </ul>
</template>
<script lang="ts" setup>
import { NodeItem } from '../../../types/kDesigner'
import type { PropType } from 'vue'
import { ref, provide } from 'vue'
import KTreeNode from './KTreeNode.vue'

// const schemas = inject('schemas') as Ref<NodeItem[]>

const expandedKeys = ref([])
const props = defineProps({
  options: {
    type: Array as PropType<NodeItem[]>
  },
  selectedKeys: {
    type: Array as PropType<string[]>
  }
})

const emit = defineEmits(['update:selectedKeys'])

function handleSelect (id: string, record: NodeItem) {
  emit('update:selectedKeys', { id, record })
}

provide('expandedKeys', expandedKeys)
provide('treeProps', props)
provide('handleSelect', handleSelect)

</script>
