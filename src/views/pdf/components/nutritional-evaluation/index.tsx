/**
 * 营养评估
 */

import {
  defineComponent, PropType, toRef,
} from 'vue';
import { useI18n } from 'vue-i18n';
import style from './style.module.css';
import SectionCard from '../../packages/section-card';
import CheckTags from '../../packages/check-tags';
import Report from '../../Report';

export default defineComponent({
  name: 'QnPdfPageComponentsNutritionalEvaluation',
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
    const reportItemObjectsArr = report.pick([
      report.ReportBuilderIdsEnum.ProteinMass,
      report.ReportBuilderIdsEnum.Bone,
      report.ReportBuilderIdsEnum.BodyfatMass,
      report.ReportBuilderIdsEnum.WaterMass,
    ]);

    const checkedValueArr: number[] = [];
    const data = reportItemObjectsArr.map((reportItemObject) => {
      const ret = {
        label: reportItemObject.name,
        options: [] as Array<{
          name: string;
          value: string | number;
          order?: number;
        }>,
      };

      if (reportItemObject.id === report.ReportBuilderIdsEnum.BodyfatMass) {
        ret.options = [
          {
            name: /* '缺乏' */ t('deficient'),
            value: 0,
            order: 2,
          },
          {
            name: /* '正常' */ t('normal'),
            value: 1,
            order: 1,
          },
          {
            name: /* '过量' */ t('excessive'),
            value: 2,
            order: 2,
          },
        ];
        checkedValueArr.push(reportItemObject.levelIndex);
      } else {
        // 标准和超标准显示为正常,低标准显示为缺乏
        // const levelIndex = Math.max(1, reportItemObject.levelIndex);
        const levelIndex = reportItemObject.levelIndex > 1 ? 1 : reportItemObject.levelIndex;
        ret.options = [
          {
            name: /* '缺乏' */ t('deficient'),
            value: 0,
            order: 2,
          },
          {
            name: /* '正常' */ t('normal'),
            value: 1,
            order: 1,
          },
        ];
        checkedValueArr.push(levelIndex);
      }

      return ret;
    });

    return () => (
      <SectionCard class={style.nutritionalEvaluation} title={ /* "营养评估" */ t('nutritional_evaluation') } border>
        {
          {
            default: () => (<CheckTags data={ data } modelValue={ checkedValueArr } />),
          }
        }
      </SectionCard>
    );
  },
});
