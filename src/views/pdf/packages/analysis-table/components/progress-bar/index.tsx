/**
 * 进度条
 */

import {
  defineComponent,
  PropType,
  toRefs,
  computed,
} from 'vue';
import { ReportItem } from '@yolanda-qn/eight-electrodes-report-lib';
import style from './style.module.css';

export default defineComponent({
  name: 'QnAnalysisTableComponentsProcessBar',
  props: {
    level: {
      type: Number as PropType<number>,
      required: true,
    },
    levelProgress: {
      type: Number as PropType<number>,
      default: 0,
    },
    paddingLeft: {
      type: Boolean as PropType<boolean>,
    },
    paddingRight: {
      type: Boolean as PropType<boolean>,
    },
    // 要显示的值
    value: {
      type: String as PropType<string>,
    },
    displayValue: {
      type: Boolean as PropType<boolean>,
    },
  },
  setup(props) {
    const {
      level: refLevel,
      levelProgress: refRevelProgress,
      paddingLeft: refPaddingLeft,
      paddingRight: refPaddingRight,
      displayValue: refDisplayValue,
      value: refValue,
    } = toRefs(props);

    return () => (
      <div class={ [style.progressBar, { [style.progressBarPaddingLeft]: refPaddingLeft.value, [style.progressBarPaddinRight]: refPaddingRight.value }] } data-level={ refLevel.value }>
        <div class={ style.progressBarWrap }>
          <div class={ style.progressBarFill } style={{ width: `${refRevelProgress.value}%` }}></div>
          {
            refDisplayValue.value
              ? <span class={ style.value } style={{ left: `${refRevelProgress.value}%` }}>{ refValue.value }</span>
              : null
          }
        </div>
      </div>
    );
  },
});
