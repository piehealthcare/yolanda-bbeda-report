/**
 * 阶段脂肪图表
 */
import {
  defineComponent, PropType, toRef,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { genPageTemplateModel } from '@yolanda-qn/eight-electrodes-report-lib';
import style from './style.module.css';
import SectionCard from '../../packages/section-card';
import Report from '../../Report';
import DiagramLayout from '../body-balance-diagram/components/diagram-layout';

export default defineComponent({
  name: 'QnPdfPageComponentsSegmentalFatAnalysis',
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
    const { segmentalFatAnalysis } = genPageTemplateModel(report.measureData, report.config);

    return () => (
      <SectionCard class={ style.segmentalFatAnalysis } title={ /* "节段脂肪分析" */ t('segmental_lean__analysis') } border>
        {
          {
            headerRight: () => (
              <div class={ style.floatedTipBox }>
                <p>{ /* 脂肪量 */ t('body_fat_mass')}</p>
                <div class={ style.dashedLine }></div>
                <p>%</p>
                <div class={ style.dashedLine }></div>
                <p>{ /* 评估 */ t('evaluation')}</p>
              </div>
            ),
            default: () => (
              <DiagramLayout data={ segmentalFatAnalysis } />
            ),
          }
        }
      </SectionCard>
    );
  },
});
