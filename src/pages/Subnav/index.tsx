import React, { FC, useState, useEffect } from 'react';
import { Card, Tree } from 'antd';
import { EventDataNode } from 'rc-tree/lib/interface';
import { connect, Dispatch, AreaTreeModelState } from 'umi';
import { getTree } from '@/api/areaTree';

import styles from './index.less';

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  hasChildren?: boolean;
  children?: DataNode[];
}

interface AreaTreeProps {
  dispatch: Dispatch;
  areaTree: AreaTreeModelState;
  loading: boolean;
}

function updateTreeData(list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] {
  return list.map(node => {
    if (node.key === key) {
      return {
        ...node,
        children,
      };
    } else if (!node.isLeaf) {
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, key, children),
        };
      }

    }
    return node;
  });
}



const AreaTree: FC<AreaTreeProps> = ({ dispatch, areaTree, loading }) => {

  useEffect(() => {
    
    if (areaTree && areaTree.treeDatas) {
      const { treeDatas } = areaTree;
      let arr: DataNode[] = [];
  
      treeDatas && treeDatas.forEach(ele => arr.push({
        title: ele.text,
        key: ele.id,
        isLeaf: !ele.hasChildren,
      }));

      setTreeData(arr);
    }

  }, [areaTree.treeDatas])

  const [treeData, setTreeData] = useState<DataNode[]>([]);

  const onLoadData = async (treeNode: EventDataNode): Promise<any> => {

    // @ts-ignore
    const { children, key } = treeNode;

    return new Promise(async resolve => {
      if (children) {   
        resolve();
        return;
      } 

      await getTree({parentId: key}).then((res) => {
        if (res) {
          let arr1: DataNode[] = [];
          res.forEach((ele: { text: string; id: string; hasChildren: boolean; }) => arr1.push({
            title: ele.text,
            key: ele.id,
            isLeaf: !ele.hasChildren
          }));
          setTimeout(() => {
            setTreeData(origin =>
              updateTreeData(origin, key, arr1),
            );
            resolve();
          }, 1000);
        }
      })

    });
  }

  return (
    <div className={styles.container}>
      {/* 左边侧边栏 */}
      <div className={styles.sider}>
        <Card title="目录信息">
          <Tree loadData={onLoadData} treeData={treeData} />
        </Card>
      </div>
      {/* 右边内容 */}
      <div className={styles.content}>
        <Card title="区域信息">
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </div>


    </div>
  );
}

interface IareaTree {
  areaTree: AreaTreeModelState;
  loading: {
    models: { [key: string]: boolean };
  }
}

export default connect(
  ({ areaTree, loading }: IareaTree) => ({
    areaTree,
    loading: loading.models.hero
  })
)(AreaTree);
