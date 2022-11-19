/**
 * 节点管理
 */
import { pluginManager } from "./index";
import { NodeItem, SchemaGroupItem } from '../types/kDesigner.d'


class NodeSchema {
    schemaList: NodeItem[] = [];
    schemaGroup: SchemaGroupItem[] = [
        {
            title: "基础组件",
            list: [
                "input",
                "textarea",
                "number",
                "select",
                "checkbox",
                "radio",
                "date",
                "time",
                "rate",
                "slider",
                "uploadFile",
                "uploadImg",
                "cascader",
                "treeSelect",
                "batch",
                "selectInputList",
                "editor",
                "switch",
                "button",
                "alert",
                "text",
                "html"
            ]
        },
        {
            title: "布局组件",
            list: ["divider", "card", "tabs", "grid", "table",'Test']
        }
    ];

    /**
     * 添加节点结构数据
     * @param {*} schemas []
     * @returns
     */
    addSchemas(schemas: NodeItem[]) {
        const s = schemas.map(item => {
            // 存在component组件则添加到插件管理器中
            item.component && pluginManager.addComponent(item.type, item.component);
            // 删除schemas中的component属性
            delete item.component;
            return item;
        });

        return this.schemaList.push(...s);
    }

    /**
     * 获取所有node schema
     * @returns
     */
    getSchemaList() {
        return this.schemaList;
    }

    /**
     * 通过type查询node schema
     * @returns
     */
    getSchemaByType(type: string) {
        const schemaList = this.schemaList;
        for (const i in schemaList) {
            if (schemaList[i].type === type) {
                return schemaList[i];
            }
        }
        return null;
    }

    /**
     * 设置分组,这个操作将会覆盖原来的数据
     * @param {*} schemaGroup
     * @returns
     */
    setSchemaGroup(schemaGroup: SchemaGroupItem[]) {
        this.schemaGroup = schemaGroup;
    }

    /**
     * 添加分组
     * @param {*} schemaGroupItem
     * @returns
     */
    addSchemaGroup(schemaGroupItem: SchemaGroupItem) {
        this.schemaGroup.push(schemaGroupItem);
    }

    /**
     * 添加计算schemaGroup 值
     * @param {*} schemaGroup
     */
    // addComputed(schemaGroup) {
    //     this.designSchemaGroup = schemaGroup;
    //     schemaGroup.push(...this.getSchemaByGroup());
    // }

    /**
     * 按照分组获取schemaGroupList
     * @returns schemaGroupList
     */
    getSchemaByGroup() {
        const schemaGroupList = this.schemaGroup.map(item => {
            const list = this.schemaList.filter(element => {
                console.log(this.schemaList)
                return item.list.includes(element.type || '');
            });
            return {
                ...item,
                list
            };
        });
        return schemaGroupList;
    }
}

export const nodeSchema = new NodeSchema();
//  nodeSchema.addSchemas(defaultSchemaList);
