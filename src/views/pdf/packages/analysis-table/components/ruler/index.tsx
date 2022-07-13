/**
 * 刻度
 */

import {
  defineComponent,
  PropType,
  toRefs,
  computed,
} from 'vue';
import { ReportItem, consts } from '@yolanda-qn/eight-electrodes-report-lib';
import style from './style.module.css';

function transformValueByWeightUnit(value: number, unit: string, fixed: number) {
  return new ReportItem({
    value,
    isNeedTransformWeightValueByUnit: true,
    unitValue: unit,
    fixed,
  });
}

function genPointsArr(start: number, end: number, split: number) {
  const range = end - start;
  const step = range / (split + 1);

  const ret = [];

  for (let i = 1; i <= split; i += 1) {
    ret.push(start + (i * step));
  }

  return ret;
}

function getRatioOverStdValue(value: number, stdValue: number) {
  // eslint-disable-next-line no-mixed-operators
  return Math.round(value / stdValue * 100);
}

export default defineComponent({
  name: 'QnAnalysisTableComponentsRuler',
  props: {
    startValue: {
      type: Number as PropType<number>,
      required: true,
    },
    startValueVisible: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    endValue: {
      type: Number as PropType<number>,
      required: true,
    },
    // 标准值
    stdValue: {
      type: Number as PropType<number>,
    },
    displayStdValue: {
      type: Boolean as PropType<boolean>,
    },
    // 展示与标准值的百分比
    displayRatioOverStdValue: {
      type: Boolean as PropType<boolean>,
    },
    // 中间插入多少个数。如果为数组则插入指定数字
    split: {
      type: [Number, Array] as PropType<number[] | number>,
      required: true,
      default: 1,
    },
    unit: {
      type: String as PropType<string>,
      default: consts.WeightUnitEnum.kg,
    },
    fixed: {
      type: Number as PropType<number>,
      default: 2,
    },
    paddingLeft: {
      type: Boolean as PropType<boolean>,
    },
    paddingRight: {
      type: Boolean as PropType<boolean>,
    },
    // 是否是最后一个
    isLastItem: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props) {
    const {
      startValue: refStartValue,
      startValueVisible: refStartValueVisible,
      endValue: refEndValue,
      split: refSplit,
      unit: refUnit,
      paddingLeft: refPaddingLeft,
      paddingRight: refPaddingRight,
      fixed: refFixed,
      displayStdValue: refDisplayStdValue,
      stdValue: refStdValue,
      displayRatioOverStdValue: refDisplayRatioOverStdValue,
      isLastItem: refIsLastItem,
    } = toRefs(props);
    const stdVal = refStdValue.value as number;
    const computedStartValue = computed(() => {
      if (refDisplayRatioOverStdValue.value && refStdValue.value) {
        return getRatioOverStdValue(refStartValue.value, stdVal);
      }

      return transformValueByWeightUnit(
        refStartValue.value,
        refUnit.value,
        refFixed.value,
      ).toObject().value;
    });
    const computedEndValue = computed(() => {
      if (refDisplayRatioOverStdValue.value && refStdValue.value) {
        return getRatioOverStdValue(refEndValue.value, stdVal);
      }

      return transformValueByWeightUnit(
        refEndValue.value,
        refUnit.value,
        refFixed.value,
      ).toObject().value;
    });

    const computedRatioUnitTextVisible = computed(() => refIsLastItem.value && refDisplayRatioOverStdValue.value && refStdValue.value);

    const middlePoints = Array.isArray(refSplit.value)
      ? refSplit.value
      : genPointsArr(refStartValue.value, refEndValue.value, refSplit.value);
    if (refDisplayStdValue.value && (stdVal > refStartValue.value) && (stdVal < refEndValue.value)) {
      if (middlePoints.length > 0) {
        // 找出接近标准的点并将其替换掉
        const closestPointIdx = middlePoints.findIndex((item) => item >= (stdVal));
        middlePoints.splice(closestPointIdx > -1 ? closestPointIdx : 0, 1, stdVal);
      } else {
        middlePoints.push(stdVal);
      }
    }

    const middlePoinstsEls = middlePoints.map((item) => {
      const report = transformValueByWeightUnit(item, refUnit.value, refFixed.value);
      let value;
      if (refDisplayRatioOverStdValue.value && refStdValue.value) {
        value = getRatioOverStdValue(report.getValue() as number, stdVal);
      } else {
        value = report.toObject().value;
      }
      // eslint-disable-next-line no-mixed-operators
      const progress = (item - refStartValue.value) / (refEndValue.value - refStartValue.value) * 100;

      return (
        <span class={ [style.scalePoint] } style={{ left: `${progress}%` }}>
          <span class={ style.scaleValue }>{ value }</span>
        </span>
      );
    });

    return () => (
      <div class={ style.ruler }>
        <div class={ style.rulerAxis }></div>
        <div class={ [style.pointsWrap, { [style.pointsWrapPdLeft]: refPaddingLeft.value }, { [style.pointsWrapPdRight]: refPaddingRight.value }] }>
          <div class={ style.points }>
            {
              refStartValueVisible.value
                ? (
                  <span class={ [style.scalePoint, style.startPoint] }>
                    <span class={ style.scaleValue }>{ computedStartValue.value }</span>
                  </span>
                ) : null
            }
            { middlePoinstsEls }
            <span class={ [style.scalePoint, style.endPoint] }>
              <span class={ style.scaleValue }>{ computedEndValue.value }{ computedRatioUnitTextVisible.value ? '%' : '' }</span>
            </span>
          </div>
        </div>
      </div>
    );
  },
});
