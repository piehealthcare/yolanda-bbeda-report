/**
 * 人体成分分析
 */

import {
  defineComponent, PropType, toRef,
} from 'vue';
import { useI18n } from 'vue-i18n';
import style from './style.module.css';
import SectionCard from '../../packages/section-card';
import Report from '../../Report';

export default defineComponent({
  name: 'QnPdfPageComponentsBodyCompositionAnalysis',
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
    const rows = report.pick([
      report.ReportBuilderIdsEnum.WaterMass,
      report.ReportBuilderIdsEnum.ProteinMass,
      report.ReportBuilderIdsEnum.Bone,
      report.ReportBuilderIdsEnum.BodyfatMass,
    ]);
    const columns = report.pick([
      report.ReportBuilderIdsEnum.WaterMass,
      report.ReportBuilderIdsEnum.SinewMass,
      report.ReportBuilderIdsEnum.LBM,
      report.ReportBuilderIdsEnum.Weight,
    ]);

    return () => (
      <SectionCard class={style.bodyCompositionAnalysis} title={ /* "人体成分分析" */ t('body_composition_analysis')}>
        {
          {
            default: () => (
              <table class={ style.table }>
                <thead>
                  <tr>
                    <th scope="col" class={ [style.th] }></th>
                    <th scope="col" class={ [style.th] }>{ /* 测量值 */ t('values')}</th>
                    <th scope="col" class={ [style.th] }>{ /* 体水分 */ t('body_water')}</th>
                    <th scope="col" class={ [style.th] }>{ /* 肌肉量 */ t('muscle_mass')}</th>
                    <th scope="col" class={ [style.th] }>{ /* 去脂体重 */ t('fat_free_mass')}</th>
                    <th scope="col" class={ [style.th] }>{ /* 体重 */ t('weight')}</th>
                    <th scope="col" class={ [style.th, style.bgGreen] }>{ /* 正常范围 */ t('normal_range')}</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    rows.map((row, rowIdx) => {
                      const cols = [
                        // 第一列
                        (
                          <td class={ style.td }>{ row.name }{ row.unit ? `(${row.unit})` : ''}</td>
                        ),
                        // 测量值
                        (
                          <td class={ style.td }>{ row.value }</td>
                        ),
                      ];

                      if (rowIdx === 0) {
                        cols.push(...columns.map((col, idx) => (
                          <td class={ style.td } rowspan={ idx + 1 }>{ col.value }</td>
                        )));
                      } else {
                        // 仅仅作为结构填充的cell
                        for (let i = 0; i < rowIdx; i += 1) {
                          cols.push((<td class={ style.tdBorderRightNone }></td>));
                        }
                      }

                      // 正常值范围的cell
                      cols.push((
                        <td class={ style.td }>{
                          row.boundaries.length > 0
                            ? `${row.boundaries[0]}~${row.boundaries[1]}`
                            : ''
                        }</td>
                      ));

                      return (
                        <tr class={ style.tr }>{ cols }</tr>
                      );
                    })
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
