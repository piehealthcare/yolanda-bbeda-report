/**
 * 肥胖分析表格
 */

import {
  defineComponent, PropType, toRef,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { util, ReportItem } from '@yolanda-qn/eight-electrodes-report-lib';
import style from './style.module.css';
import SectionCard from '../../packages/section-card';
import Report from '../../Report';
import AnalysisTable from '../../packages/analysis-table';

export default defineComponent({
  name: 'QnPdfPageComponentsObesityDiagnosisChart',
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
      report.ReportBuilderIdsEnum.BMI,
      report.ReportBuilderIdsEnum.Bodyfat,
      report.ReportBuilderIdsEnum.Visfat,
    ]);

    const visfatReportItemIdx = reportItems.findIndex((item) => item.getId() === report.ReportBuilderIdsEnum.Visfat);
    if (visfatReportItemIdx > -1) {
      const visfatReportItem = reportItems[visfatReportItemIdx];
      const newVisfatReportItem = new ReportItem(visfatReportItem as any);

      // newVisfatReportItem.setId(visfatReportItem.getId());
      // newVisfatReportItem.setName(visfatReportItem.getName());
      // newVisfatReportItem.setValue(visfatReportItem.getValue());
      // newVisfatReportItem.setMin(visfatReportItem.getMin());
      // newVisfatReportItem.setMax(visfatReportItem.getMax());
      // newVisfatReportItem.setUnitValue(visfatReportItem.getUnitValue());
      // newVisfatReportItem.setFixed(visfatReportItem.getFixed());
      newVisfatReportItem.setBoundaries(visfatReportItem.getSubBoundaries());
      const calclevelProgress = util.calcValuesLevelProcess(
        newVisfatReportItem.getValue() as number,
        newVisfatReportItem.getBoundaries(),
        newVisfatReportItem.getMin(),
        newVisfatReportItem.getMax(),
      );
      newVisfatReportItem.setLevelIndex(calclevelProgress.level);
      newVisfatReportItem.setLevelProgress(calclevelProgress.levelProgress);
      newVisfatReportItem.setProgress(calclevelProgress.progress);

      // 替换
      reportItems.splice(visfatReportItemIdx, 1, newVisfatReportItem);
    }

    return () => (
      <SectionCard class={style.obesityDiagnosisChart} title={ /* "肥胖分析" */ t('obesity_diagnosis')}>
        {
          {
            default: () => (
              <div>
                <AnalysisTable reportItems={reportItems} displayRatioOverStdValue={ false } />
              </div>
            ),
          }
        }
      </SectionCard>
    );
  },
});
