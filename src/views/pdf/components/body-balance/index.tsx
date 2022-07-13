/**
 * 肌肉均衡
 */

import {
  defineComponent, PropType, toRef,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { genPageTemplateModel } from '@yolanda-qn/eight-electrodes-report-lib';
import style from './style.module.css';
import SectionCard from '../../packages/section-card';
import CheckTags from '../../packages/check-tags';
import Report from '../../Report';

export default defineComponent({
  name: 'QnPdfPageComponentsBodyBalance',
  props: {
    report: {
      type: Object as PropType<Report>,
      default: () => (null),
    },
  },
  setup(props) {
    const { value: report } = toRef(props, 'report');

    if (!report) {
      return null;
    }

    const { t } = useI18n();
    /**
     * @see {@link https://qnplus-preview.yolanda.hk/@yolanda-qn/eight-electrodes-report-lib/index.html#/genPageTemplateModel}
     */
    const { muscleBalance } = genPageTemplateModel(report.measureData, report.config);
    const options = [
      {
        name: /* '均衡' */ t('balanced'),
        value: 0,
        order: 0,
      },
      {
        name: /* '轻度不均' */ t('slightly_unbalanced'),
        value: 1,
        order: 1,
      },
      {
        name: /* '重度不均' */ t('extremely_unbalanced'),
        value: 2,
        order: 2,
      },
    ];
    const data: Array<{
      label: string;
      options: Array<{
        name: string;
        value: string | number;
        order?: number;
      }>;
    }> = [
      {
        label: /* '上肢' */ t('upper'),
        options,
      },
      {
        label: /* '下肢' */ t('lower'),
        options,
      },
      {
        label: /* '上下肢' */ t('upper_lower'),
        options,
      },
    ];
    const checkedValueArr = [
      muscleBalance.swipeItem2.muscleBalance.arm.levelIndex,
      muscleBalance.swipeItem2.muscleBalance.leg.levelIndex,
      muscleBalance.swipeItem2.muscleBalance.armLeg.levelIndex,
    ];

    return () => (
      <SectionCard class={style.obesityDiagnosis} title={ /* "肌肉均衡" */ t('body_balance') } border>
        {
          {
            default: () => (<CheckTags data={ data } modelValue={ checkedValueArr } />),
          }
        }
      </SectionCard>
    );
  },
});
