/**
 * 附加数据
 */

import {
  defineComponent, PropType, toRef,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { genPageTemplateModel, consts } from '@yolanda-qn/eight-electrodes-report-lib';
import style from './style.module.css';
import SectionCard from '../../packages/section-card';
import Report from '../../Report';

export default defineComponent({
  name: 'QnPdfPageComponentsAdditionalData',
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
    const { additionalData } = genPageTemplateModel(report.measureData, report.config);
    // 不展示脂肪肝风险等级
    const reportItems = additionalData.reportItems.filter((reportItem) => reportItem.id !== consts.ReportBuilderIdsEnum.FattyLiver);

    return () => (
      <SectionCard class={style.additionalData} title={ /* 附加数据 */ t('additional_data') } border>
        {
          {
            default: () => (
              <table class={ style.table }>
                <tbody>
                  {
                    reportItems.map((reportObjectItem) => (
                      <tr>
                        <td class={ [style.td, style.tdBold] }>{ reportObjectItem.name }{ reportObjectItem.unit ? `(${reportObjectItem.unit})` : '' }</td>
                        <td class={ [style.td] }>{ reportObjectItem.value }</td>
                        <td class={ [style.td] }>
                          { reportObjectItem.boundaries.length > 0
                            ? `(${reportObjectItem.boundaries[0]}~${reportObjectItem.boundaries[1]})`
                            : ''
                          }
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            ),
          }
        }
      </SectionCard>
    );
  },
});
