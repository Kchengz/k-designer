import { resolve } from "path";
import { NodeItem } from "../types/kDesigner";
/**
 * 生成一个用不重复的ID
 * @param randomLength 随机id长度
 */
export function getUUID(randomLength = 10): string {
  return Number(
    Math.random().toString().substring(3, randomLength) + Date.now()
  ).toString(36);
}

/**
 * 深拷贝数据
 * @param json
 * @returns
 */
export function deepClone(json: object | any[]) {
  return JSON.parse(JSON.stringify(json));
}

/**
 * 通过id查询schemas
 * @param schemas
 * @param id
 * @returns
 */
export function findSchemaById(schemas: NodeItem[], id: string) {
  let list: NodeItem[] = [];
  list.push(...schemas);
  // 遍历子节点
  for (let i = 0; list.length > i; i++) {
    // 判断id是否一致
    if (list[i].id === id) {
      // 返回结果
      return {
        list: list,
        schema: list[i],
        index: i,
      };
    }
  }

  while (list.length > 0) {
    // 弹出节点
    const item = list.pop();

    const children = item?.children;
    // 检查是否存在子节点，否则直接跳出循环
    if (!children) {
      continue;
    }

    // 遍历子节点
    for (let i = 0; children.length > i; i++) {
      // 判断id是否一致
      if (children[i].id === id) {
        // 返回结果
        return {
          list: children,
          schema: children[i],
          index: i,
        };
      }
    }
    // 添加子节点到待遍历数组中
    list.push(...children);
  }

  throw `没有查询到id为${id}的节点`;
}

/**
 * 通过id获取节点路径
 * @param schemas
 * @param id
 */
export function getMatchedById(schemas: NodeItem[], id: string) {
  let matched: NodeItem[] = [];
  try {
    function getNodePath(node: NodeItem) {
      matched.push(node);
      //找到符合条件的节点,终止查询
      if (node.id === id) {
        throw "查询到符合条件节点";
      }
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i]);
        }
        //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        matched.pop();
      } else {
        //找到叶子节点时，删除路径当中的该叶子节点
        matched.pop();
      }
    }

    schemas.forEach((node) => {
      getNodePath(node);
    });

    console.error(`没有查询到id为${id}的节点`);
  } finally {
    return matched;
  }
}
