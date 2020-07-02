import React, { useState } from 'react';
import { Tree } from 'antd';
import { EventDataNode } from 'rc-tree/lib/interface';


interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

const initTreeDate: DataNode[] = [
  { title: 'Expand to load', key: '0' },
  { title: 'Expand to load', key: '1' },
  { title: 'Tree Node', key: '2', isLeaf: true },
];

// It's just a simple demo. You can use tree map to optimize update perf.
function updateTreeData(list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] {
  
  
  return list.map(node => {

    if (node.key === key) {
      console.log(node)
      // console.log(children)
      return {
        ...node,
        children,
      };
    } else if (node.children) {
      console.log(node.children)
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      };
    }
    return node;
  });
}

export default () => {


  const [treeData, setTreeData] = useState(initTreeDate);

  const onLoadData = (treeNode: EventDataNode): Promise<any> => {

    // @ts-ignore
    const { children, key } = treeNode;
    return new Promise(resolve => {
      
      if (children) {
        resolve();
        return;
      }
      setTimeout(() => {
        setTreeData(origin =>
          updateTreeData(origin, key, [
            { title: 'Child Node', key: `${key}-0` },
            { title: 'Child Node', key: `${key}-1` },
          ]),
        );

        resolve();
      }, 1000);
    })
  }

  return (
    <div>
      <Tree loadData={onLoadData} treeData={treeData} />
    </div>
  );
}
