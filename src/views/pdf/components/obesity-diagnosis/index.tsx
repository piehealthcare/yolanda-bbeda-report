/**
 * 肥胖分析
 */

import {
  defineComponent, PropType, toRef,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { util } from '@yolanda-qn/eight-electrodes-report-lib';
import style from './style.module.css';
import SectionCard from '../../packages/section-card';
import CheckTags from '../../packages/check-tags';
import Report from '../../Report';

export default defineComponent({
  name: 'QnPdfPageComponentsObesityDiagnosis',
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
    const reportItemObjectsArr = report.pickRaw([
      report.ReportBuilderIdsEnum.BMI,
      report.ReportBuilderIdsEnum.Bodyfat,
    ]);

    const checkedValueArr: number[] = [];
    const data = reportItemObjectsArr.map((reportItem) => {
      const reportItemObject = reportItem.toObject();
      const ret = {
        label: reportItemObject.name,
        options: [] as Array<{
          name: string;
          value: string | number;
          order?: number;
        }>,
      };

      switch (reportItemObject.id) {
        case report.ReportBuilderIdsEnum.BMI: {
          // 使用细分等级范围
          const boundaries = reportItem.getSubBoundaries();
          const { level: bmiReporLevelIndex } = util.calcValuesLevelProcess(report.measureData.bmi, boundaries);

          ret.options = [
            {
              name: /* '低标准' */ t('under'),
              value: 0,
              order: 2,
            },
            {
              name: /* '正常' */ t('normal'),
              value: 1,
              order: 1,
            },
            {
              name: /* '过量' */ t('over_1'),
              value: 2,
              order: 2,
            },
            {
              name: /* '严重过量' */ t('extremely__over'),
              value: 3,
              order: 2,
            },
          ];
          checkedValueArr.push(bmiReporLevelIndex);
          break;
        }
        case report.ReportBuilderIdsEnum.Bodyfat: {
          // 使用细分等级范围
          // 低标准和标准合并为正常
          const boundaries = reportItem.getSubBoundaries();
          const { level: bodyfatReporLevelIndex } = util.calcValuesLevelProcess(report.measureData.bodyfat, boundaries);

          ret.options = [
            {
              name: /* '正常' */ t('normal'),
              value: 0,
              order: 1,
            },
            {
              name: /* '轻度肥胖' */ t('mild_obesity'),
              value: 1,
              order: 1,
            },
            {
              name: /* '肥胖' */ t('obesity'),
              value: 2,
              order: 1,
            },
          ];
          // 低标准和标准合并为正常
          checkedValueArr.push(Math.max(0, bodyfatReporLevelIndex - 1));
          break;
        }
        default:
          break;
      }

      return ret;
    });

    return () => (
      <SectionCard class={style.obesityDiagnosis} title={ /* "肥胖分析" */ t('obesity_diagnosis')} border>
        {
          {
            default: () => (<CheckTags data={ data } modelValue={ checkedValueArr } />),
          }
        }
      </SectionCard>
    );
  },
});
