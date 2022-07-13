/**
 * 体重控制
 */

import {
  defineComponent, PropType, toRef,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { genPageTemplateModel } from '@yolanda-qn/eight-electrodes-report-lib';
import style from './style.module.css';
import SectionCard from '../../packages/section-card';
import Report from '../../Report';

export default defineComponent({
  name: 'QnPdfPageComponentsWeightControl',
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
    const { weightControl } = genPageTemplateModel(report.measureData, report.config);
    const { table } = weightControl.swipeItem1;

    return () => (
      <SectionCard class={style.weightControl} title={ /* "体重控制" */ t('weight_control')} border>
        {
          {
            default: () => (
              <table class={ style.table }>
                <tbody>
                  <tr>
                    <td class={ [style.td, style.tdBold] }>{ /* 标准体重 */ t('standard_weight')}</td>
                    <td class={ [style.td] }>{ table.standardWeight.value }{ table.standardWeight.unit }</td>
                  </tr>
                  <tr>
                    <td class={ [style.td, style.tdBold] }>{ /* "体重控制" */ t('weight_control')}</td>
                    <td class={ [style.td] }>{ table.weightControl.value }{ table.weightControl.unit }</td>
                  </tr>
                  <tr>
                    <td class={ [style.td, style.tdBold] }>{ /* 脂肪控制 */ t('fat_control')}</td>
                    <td class={ [style.td] }>{ table.fatControl.value }{ table.fatControl.unit }</td>
                  </tr>
                  <tr>
                    <td class={ [style.td, style.tdBold] }>{ /* 肌肉控制 */ t('muscle_control')}</td>
                    <td class={ [style.td] }>{ table.muscleControl.value }{ table.muscleControl.unit }</td>
                  </tr>
                </tbody>
              </table>
            ),
          }
        }
      </SectionCard>
    );
  },
});
