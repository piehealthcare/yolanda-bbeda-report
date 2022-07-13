/**
 * 等级边界刻度
 */

import './style.css';
import { defineComponent, PropType, toRefs } from 'vue';
import { ReportItem } from '@yolanda-qn/eight-electrodes-report-lib';
import createNamespace from '@/assets/utils/createNamespace';

const { name, bem } = createNamespace('pdf-page-level-scale');

/**
 * 生成刻度点的数据
 */
function genPointsArr(reportItem: ReportItem, divides: Array<{ slice: number; offset: number; width: number; }>) {
  const bArr = [reportItem.getMin(), ...reportItem.getBoundaries(), reportItem.getMax()];

  // 5%
  const boundOffset = 2;

  const points: Array<{
    value: number;
    offset: string;
    itemWidth: string;
  }> = [
    {
      value: bArr[0],
      offset: `${boundOffset}%`,
      itemWidth: '',
    },
  ];

  let cursor = 0;
  divides.forEach((divide, idx) => {
    const startValue = bArr[cursor];
    const endValue = bArr[cursor + 1];
    const sliceValue = (endValue - startValue) / divide.slice;
    const startOffset = divide.offset + (idx === 0 ? boundOffset : 0);
    const endOffset = divide.offset + divide.width - (idx === (divides.length - 1) ? boundOffset : 0);
    const sliceOffset = (endOffset - startOffset) / divide.slice;

    let valueAcc = startValue;
    let offsetAcc = startOffset;
    for (let i = 0; i < divide.slice - 1; i += 1) {
      valueAcc += sliceValue;
      offsetAcc += sliceOffset;
      points.push({
        value: Math.ceil(valueAcc),
        offset: `${offsetAcc}%`,
        itemWidth: '',
      });
    }

    points.push({
      value: endValue,
      offset: `${endOffset}%`,
      itemWidth: '',
    });

    cursor += 1;
  });

  // eslint-disable-next-line no-mixed-operators
  const itemWidth = (1 / points.length) * 100;
  points.forEach((item) => {
    const report = new ReportItem({
      value: item.value,
      isNeedTransformWeightValueByUnit: reportItem.getIsNeedTransformWeightValueByUnit(),
      unitValue: reportItem.getUnitValue(),
    });
    Object.assign(item, {
      // 这里进行单位转换
      value: report.toObject().value,
      offset: `${Number.parseFloat(item.offset) - (itemWidth / 2)}%`,
      itemWidth: `${itemWidth}%`,
    });
  });

  return points;
}

export default defineComponent({
  name,
  props: {
    /**
     * 原始的数据。（kg单位）
     */
    reportItem: {
      type: Object as PropType<ReportItem>,
      default: null,
    },
    weightUnit: {
      type: String as PropType<string>,
      default: 'kg',
    },
    divides: {
      type: Array as PropType<Array<{
        slice: number;
        offset: number;
        width: number;
      }>>,
      default: () => [
        {
          // 几个点
          slice: 2,
          // 百分比
          offset: 0,
          // 百分比
          width: 19.5,
        },
        {
          slice: 2,
          offset: 20,
          width: 20.5,
        },
        {
          slice: 5,
          offset: 40,
          width: 59,
        },
      ],
    },
  },
  setup(props) {
    const {
      reportItem, divides,
    } = toRefs(props);
    const points = genPointsArr(reportItem.value as ReportItem, divides.value);

    function genPointsEle() {
      return points.map((p) => {
        const { offset, itemWidth: width } = p;
        return (
          <div class={ bem('point-item') } style={ { left: offset, width } }>
            <span class={ bem('point-scale') }></span>
            <span class={ bem('point-value') }>{ p.value }</span>
          </div>
        );
      });
    }

    return () => (
      <div class={ bem() }>
        <div class={ bem('bar') }>
          <div class={ bem('bar-line') }></div>
          <div class={ bem('values-bar-wrap') }>
            <div class={ bem('values-bar') }>
              {
                genPointsEle()
              }
            </div>
          </div>
        </div>
      </div>
    );
  },
});
