import {
  defineComponent, PropType, toRefs,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { genPageTemplateModel } from '@yolanda-qn/eight-electrodes-report-lib';
import Swipe from '../../packages/swipe';
import SwipeItem from '../../packages/swipe-item';
import style from './style.module.css';

export default defineComponent({
  name: 'QnReportPageComponentsWeightControl',
  props: {
    templateModelData: {
      type: Object as PropType<ReturnType<typeof genPageTemplateModel>>,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const { templateModelData: refTemplateModelData } = toRefs(props);
    // SECTION swipe1
    // SECTION table
    const { table: swipe1Table } = refTemplateModelData.value.weightControl.swipeItem1;
    // !SECTION table
    // !SECTION swipe1

    return () => (
      <section class="qn-report-page__section">
        <Swipe>
          <>
            <SwipeItem title={ /* 体重控制 */ t('weight_control') }>
              <div class={ style.swipe1 }>
                <table class={ style.dataTable }>
                  <tbody>
                    <tr class={ style.dataTableTr }>
                      <td class={ style.dataTableTd }>{ /* 标准体重 */ t('standard_weight') }</td>
                      <td class={ style.dataTableTd }>{ swipe1Table.standardWeight.value }{ swipe1Table.standardWeight.unit }</td>
                    </tr>
                    <tr class={ style.dataTableTr }>
                      <td class={ style.dataTableTd }>{ /* 体重控制 */ t('weight_control') }</td>
                      <td class={ style.dataTableTd }>{ swipe1Table.weightControl.value }{ swipe1Table.weightControl.unit }</td>
                    </tr>
                    <tr class={ style.dataTableTr }>
                      <td class={ style.dataTableTd }>{ /* 脂肪控制 */ t('fat_control') }</td>
                      <td class={ style.dataTableTd }>{ swipe1Table.fatControl.value }{ swipe1Table.fatControl.unit }</td>
                    </tr>
                    <tr class={ style.dataTableTr }>
                      <td class={ style.dataTableTd }>{ /* 肌肉控制 */ t('muscle_control') }</td>
                      <td class={ style.dataTableTd }>{ swipe1Table.muscleControl.value }{ swipe1Table.muscleControl.unit }</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </SwipeItem>
            <SwipeItem title={ /* 体重控制 */ t('weight_control') }>
              <div class={ style.swipe2 }>
                <p class={ style.desc }>{ /* 体重控制根据测试者的身体测量状态提供一个最优的人体成分控制方案，而并非仅仅是建议测试者增加或减少体重 */ t('weight_control_1001') }</p>
                <p class={ style.desc }>{ /* “＋”号表示该指标的重量应该增加，“－”号则表示该指标的重量应该减少 */ t('weight_control_1002') }</p>
              </div>
            </SwipeItem>
            <SwipeItem title={ /* 体重控制 */ t('weight_control') }>
              <div class={ style.swipe3 }>
              <table class={ style.dataTable }>
                  <tbody>
                    <tr>
                      <td class={ style.dataTableTd }>&lt;=70</td>
                      <td class={ [style.dataTableTd, style.dataTableTdWhite] }>{ /* 瘦弱型，肥胖型(需要锻炼和饮食控制) */ t('weight_control_1003') }</td>
                    </tr>
                    <tr>
                      <td class={ style.dataTableTd }>70-90</td>
                      <td class={ [style.dataTableTd, style.dataTableTdWhite] }>{ /* 正常，健康型 */ t('weight_control_1004') }</td>
                    </tr>
                    <tr>
                      <td class={ style.dataTableTd }>&gt;=90</td>
                      <td class={ [style.dataTableTd, style.dataTableTdWhite] }>{ /* 强壮型(肌肉发达) */ t('weight_control_1005') }</td>
                    </tr>
                  </tbody>
                </table>
                <p class={ style.tipText }>{ /* 健康评分指标能够让受试者对自己的体成分状况有一个综合的理解 */ t('weight_control_1006') }</p>
              </div>
            </SwipeItem>
          </>
        </Swipe>
      </section>
    );
  },
});
