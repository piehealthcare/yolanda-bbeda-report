import {
  defineComponent, PropType, ref, toRefs,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { genPageTemplateModel } from '@yolanda-qn/eight-electrodes-report-lib';
import Swipe from '../../packages/swipe';
import SwipeItem from '../../packages/swipe-item';
import AnalysisTable from '../../packages/analysis-table';
import LevelTagsTable from '../../packages/level-tags-table';
import style from './style.module.css';
import VisfatLeftImage from '../../assets/images/visfat-left.png';
import VisfatRightImage from '../../assets/images/visfat-right.png';

export default defineComponent({
  name: 'QnReportPageComponentsObesityAnalysis',
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
    const { table: swipe1Table } = refTemplateModelData.value.obesityAnalysis.swipeItem1;
    const refSwipe1TableData = ref([
      {
        name: 'BMI',
        value: swipe1Table.bmi.value,
        levelIndex: swipe1Table.bmi.levelIndex,
        levelProgress: swipe1Table.bmi.levelProgress,
      },
      {
        // name: `脂肪量(${swipe1Table.bodyfatMass.unit})`,
        name: `${t('body_fat_mass')}(${swipe1Table.bodyfatMass.unit})`,
        value: swipe1Table.bodyfatMass.value,
        levelIndex: swipe1Table.bodyfatMass.levelIndex,
        levelProgress: swipe1Table.bodyfatMass.levelProgress,
      },
      {
        // name: '内脏脂肪等级',
        name: t('visfat'),
        value: swipe1Table.visfat.value,
        levelIndex: swipe1Table.visfat.levelIndex,
        levelProgress: swipe1Table.visfat.levelProgress,
      },
      {
        // name: '肥胖度',
        name: t('obesity_degree'),
        value: swipe1Table.obesity.value,
        levelIndex: swipe1Table.obesity.levelIndex,
        levelProgress: swipe1Table.obesity.levelProgress,
      },
    ]);
    // !SECTION table
    // !SECTION swipe1

    // SECTION swipe2
    const { bmi } = refTemplateModelData.value.obesityAnalysis.swipeItem2;
    const bmiTagsData = [
      {
        name: 'BMI',
        value: bmi.levelIndex,
        levels: [
          {
            order: 1,
            value: 0,
            // name: '低标准',
            name: t('under'),
          },
          {
            order: 0,
            value: 1,
            // name: '正常',
            name: t('normal'),
          },
          {
            order: 2,
            value: 2,
            // name: '过量',
            name: t('over_1'),
          },
          {
            order: 3,
            value: 3,
            // name: '严重过量',
            name: t('extremely__over'),
          },
        ],
      },
    ];

    // !SECTION swipe2
    // SECTION swipe3
    const { bodyfat } = refTemplateModelData.value.obesityAnalysis.swipeItem3;
    const bodyfaTagsData = [
      {
        // name: '体脂率',
        name: t('bodyfat_rate'),
        value: bodyfat.levelIndex,
        levels: [
          {
            value: 0,
            // name: '正常',
            name: t('normal'),
            activeColor: '#1CCDAA',
          },
          {
            value: 1,
            // name: '轻度肥胖',
            name: t('mild_obesity'),
            activeColor: '#FFC53D',
          },
          {
            value: 2,
            // name: '肥胖',
            name: t('obesity'),
            activeColor: '#FF7A45',
          },
        ],
      },
    ];
    // !SECTION swipe3
    // SECTION swipe4
    const { visfat } = refTemplateModelData.value.obesityAnalysis.swipeItem4;
    const visfatTagsData = [
      {
        // name: '内脏脂肪等级',
        name: t('visfat'),
        value: visfat.levelIndex,
        levels: [
          {
            value: 0,
            // name: '标准',
            name: t('standard'),
            activeColor: '#1CCDAA',
          },
          {
            value: 1,
            // name: '超标准',
            name: t('over'),
            activeColor: '#FFC53D',
          },
          {
            value: 2,
            // name: '严重超标',
            name: t('seriously_over'),
            activeColor: '#FF7A45',
          },
        ],
      },
    ];
    // !SECTION swipe4

    return () => (
      <section class="qn-report-page__section">
        <Swipe>
          <>
          <SwipeItem title={ /* 肥胖分析 */ t('obesity_diagnosis') }>
              <div class={ style.swipe1 }>
                <div class={ style.swipe1Table }>
                  <AnalysisTable data={ refSwipe1TableData.value } />
                </div>
              </div>
            </SwipeItem>
            <SwipeItem title={ /* 肥胖分析 */ t('obesity_diagnosis') }>
            <div class={ style.swipe2 }>
              <div>
                <LevelTagsTable data={ bmiTagsData } />
              </div>
              <div>
                <table class={ style.dataTable }>
                  <thead>
                    <tr>
                      <th class={ [style.dataTableTd, style.dataTableTh] }></th>
                      <th class={ [style.dataTableTd, style.dataTableTh] }>{ /* 标准范围 */ t('standard_scope') }</th>
                      <th class={ [style.dataTableTd, style.dataTableTh] }>{ /* 超重 */ t('over_weight') }</th>
                      <th class={ [style.dataTableTd, style.dataTableTh]}>{ /* 肥胖 */ t('obesity') }</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class={ style.dataTableTd }>{ /* 标准 */ t('standard') }</td>
                      <td class={ style.dataTableTd }>{ bmi.boundaries[0] }-{ bmi.boundaries[1] }</td>
                      <td class={ style.dataTableTd }>{ Number(bmi.boundaries[1]) + 0.1 }-{ bmi.boundaries[2] }</td>
                      <td class={ style.dataTableTd }>&gt;{bmi.boundaries[2]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            </SwipeItem>
            <SwipeItem title={ /* 肥胖分析 */ t('obesity_diagnosis') }>
            <div class={ style.swipe3 }>
              <div>
                <LevelTagsTable data={ bodyfaTagsData } />
              </div>
              <div>
                <table class={ style.dataTable }>
                  <thead>
                    <tr>
                      <th class={ [style.dataTableTd, style.dataTableTh] }></th>
                      <th class={ [style.dataTableTd, style.dataTableTh] }>{ /* 男 */ t('male') }</th>
                      <th class={ [style.dataTableTd, style.dataTableTh]}>{ /* 女 */ t('female') }</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class={ [style.dataTr, style.dataTrWhite] }>
                      <td class={ style.dataTableTd }>{ /* 标准范围 */ t('standard_scope') }</td>
                      <td class={ style.dataTableTd }>10-20%</td>
                      <td class={ style.dataTableTd }>18-28%</td>
                    </tr>
                    <tr class={ style.dataTr }>
                      <td class={ style.dataTableTd }>{ /* 理想值 */ t('ideal_value') }</td>
                      <td class={ style.dataTableTd }>15%</td>
                      <td class={ style.dataTableTd }>23%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            </SwipeItem>
            <SwipeItem title={ /* 肥胖分析 */ t('obesity_diagnosis') }>
              <div class={ style.swipe4 }>
                <div>
                  <LevelTagsTable data={ visfatTagsData } />
                </div>
                <div class={ style.swipe4Block2 }>
                  <div>
                    <img src={ VisfatLeftImage } alt="" class={ style.visfatImg } />
                    <p class={ style.visfatImgName }>{ /* 内脏脂肪型肥胖 */ t('visceral_fat_obesity') }</p>
                  </div>
                  <div style="position: relative">
                    <div class={ [style.narraText, style.narraText1] }>{ /* 皮下脂肪 */ t('subcutaneous_fat') }</div>
                    <div class={ [style.narraText, style.narraText2] }>{ /* 腹部肌肉 */ t('abdominal_muscles') }</div>
                    <div class={ [style.narraText, style.narraText3] }>{ /* 内脏脂肪 */ t('visceral_fat') }</div>
                  </div>
                  <div>
                    <img src={ VisfatRightImage } alt="" class={ style.visfatImg } />
                    <p class={ style.visfatImgName }>{ /* 皮下脂肪型肥胖 */ t('subcutaneous_fat_obesity') }</p>
                  </div>
                </div>
                <p class={ style.tipText }>
                  {/* 从医学上来讲，进行CT拍片可得出内脏脂肪实测值超过100cm²时，容易引起糖尿病，高血压，高血脂等疾病，等级10相当于100cm²的内脏脂肪 */}
                  { t('obesity_analysis_tip') }
                </p>
              </div>
            </SwipeItem>
          </>
        </Swipe>
      </section>
    );
  },
});
