/**
 * 肌肉脂肪分析表格
 */

import {
  defineComponent, PropType, toRef,
} from 'vue';
import { useI18n } from 'vue-i18n';
import style from './style.module.css';
import SectionCard from '../../packages/section-card';
import Report from '../../Report';
import AnalysisTable from '../../packages/analysis-table';

export default defineComponent({
  name: 'QnPdfPageComponentsMuscleFatAnalysis',
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
    const reportItems = report.pickRaw([
      report.ReportBuilderIdsEnum.Weight,
      report.ReportBuilderIdsEnum.BodyfatMass,
      report.ReportBuilderIdsEnum.MuscleMass,
    ]);

    return () => (
      <SectionCard class={style.muscleFatAnalysis} title={ /* "肌肉脂肪分析" */ t('muscle_fat_analysis') }>
        {
          {
            default: () => (
              <div>
                <AnalysisTable reportItems={reportItems} displayRatioOverStdValue={ true } />
              </div>
            ),
          }
        }
      </SectionCard>
    );
  },
});
