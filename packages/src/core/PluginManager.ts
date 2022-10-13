class PluginManager {
  components: Record<string, any> = {};

  constructor() {}
  /**
   * 添加组件到插件管理器中
   * @param componentName 组件名称
   * @param component 组件
   */
  addComponent(componentName: string, component: any, bindModel: string = 'value') {
    // v-model 绑定的属性名,兼容不同ui差异
    component.bindModel = bindModel
    // 添加组件
    this.components[componentName] = component;
  }

  /**
   * 获取所有插件管理中的所有组件
   * @returns components
   */
  getComponents() {
    return this.components;
  }

  /**
   * 通过name 查询相应的组件
   * @returns components
   */
  getComponent(name: string) {
    return this.components[name];
  }

}

export const pluginManager = new PluginManager();