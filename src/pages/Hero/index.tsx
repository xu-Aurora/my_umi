import React, { FC } from 'react';
// HeroModelState: models里定义的接口
// ConnectProps: umi自带的校验redux参数类型
import { connect, HeroModelState, ConnectProps } from 'umi';
import { Row, Col, Radio, Card } from 'antd';
import { RadioChangeEvent } from 'antd/es/radio/interface';
import { useCountUp } from 'react-countup';   // 动效number库
import styles from './index.less';



interface PageProps extends ConnectProps {
  hero: HeroModelState;
  loading: boolean;
}

const RadioGroup = Radio.Group;

const heroType = [
  { key: 0, value: '全部' },
  { key: 1, value: '战士' },
  { key: 2, value: '法师' },
  { key: 3, value: '坦克' },
  { key: 4, value: '刺客' },
  { key: 5, value: '射手' },
  { key: 6, value: '辅助' },
];


const Hero: FC<PageProps> = ({ hero, loading, dispatch }) => {   
  

  const { heros = [], filterKey = 0 } = hero;
  const onChange = (e: RadioChangeEvent) => {
    // ‘!’ ts非空类型断言
    dispatch!({
      type: "hero/save", 
      payload: {
        filterKey: e.target.value
      }
    })
  };

  const { countUp } = useCountUp({ 
    end: 1234567,   
    decimals: 2,   // 保留两位小数
    separator: ",", // 分隔符
  });

  return (
    <div>

      <div>{countUp}</div>
      <Card className={ styles.radioPanel }>
        <RadioGroup onChange={ onChange } value={ filterKey }>
          { 
            heroType.map(data => (
              <Radio value={data.key} key={`hero-rodio-${data.key}`}>
                {data.value}
              </Radio>
            )) 
          }
        </RadioGroup>
      </Card>
      <Row>
        {
          heros && heros.filter(item => filterKey === 0 || item.hero_type === filterKey).map(item => (
            <Col key={item.ename} span={3} className={styles.heroitem}>
              <img src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`} />
              <p>{item.cname}</p>
            </Col>
          ))
        }
      </Row>
    </div>

  );
}

interface HeroModel {
  hero: HeroModelState,
  loading: {
    models: { [key: string]: boolean };
  }
}

export default connect(
  ({ hero, loading }: HeroModel) => ({ 
    hero, 
    loading: loading.models.hero
  })
)(Hero)