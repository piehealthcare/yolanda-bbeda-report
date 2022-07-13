/**
 * 身体力量
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
  name: 'QnPdfPageComponentsBodyStrength',
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
        name: /* '不足' */ t('weak'),
        value: 0,
        order: 2,
      },
      {
        name: /* '正常' */ t('normal'),
        value: 1,
        order: 1,
      },
      {
        name: /* '发达' */ t('developed'),
        value: 2,
        order: 1,
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
        label: /* '肌肉' */ t('muscle'),
        options,
      },
    ];
    const checkedValueArr = [
      muscleBalance.swipeItem2.bodyStrength.arm.levelIndex,
      muscleBalance.swipeItem2.bodyStrength.leg.levelIndex,
      muscleBalance.swipeItem2.bodyStrength.muscle.levelIndex,
    ];

    return () => (
      <SectionCard class={style.obesityDiagnosis} title={ /* "身体力量" */ t('body_strength')} border>
        {
          {
            default: () => (<CheckTags data={ data } modelValue={ checkedValueArr } />),
          }
        }
      </SectionCard>
    );
  },
});
