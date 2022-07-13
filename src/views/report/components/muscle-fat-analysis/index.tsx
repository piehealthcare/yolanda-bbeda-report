import {
  defineComponent, PropType, ref, toRefs,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { genPageTemplateModel } from '@yolanda-qn/eight-electrodes-report-lib';
import Swipe from '../../packages/swipe';
import SwipeItem from '../../packages/swipe-item';
import AnalysisTable, { getDefaultColumnsSet } from '../../packages/analysis-table';
import { BodyShapeEnum } from '../../enums/body-shape.enum';
import style from './style.module.css';

function getBodyShapeInfo(bodyShapeType: number) {
  let analysis = '';
  let suggestion = '';
  let bodyTypeWeight = '';
  let bodyType = '';

  switch (bodyShapeType) {
    case BodyShapeEnum.OVER_WEIGHT_WEAK:
      analysis = /* '您的肌肉量保持不错在正常水平，但是体重和脂肪都是高标准了' */ 'muscle_fat_analysis_1008';
      suggestion = /* '需要注意在平时减脂的时候也不要忘记增肌哦' */ 'muscle_fat_analysis_1009';
      bodyTypeWeight = /* '超体重' */ 'muscle_fat_analysis_1001';
      bodyType = /* '虚弱型' */ 'muscle_fat_analysis_1002';
      break;
    case BodyShapeEnum.OVER_WEIGHT_MUSCLE:
      analysis = /* '您的身材可以媲美运动员了，体脂在标准以内，骨骼肌和体重均为高标准' */ 'muscle_fat_analysis_1010';
      suggestion = /* '虽然BMI可能会显示超标，但您无需减重，请继续保持身材吧' */ 'muscle_fat_analysis_1011';
      bodyTypeWeight = /* '超体重' */ 'muscle_fat_analysis_1001';
      bodyType = /* '肌肉型' */ 'muscle_fat_analysis_1003';
      break;
    case BodyShapeEnum.OVER_WEIGHT_FAT:
      analysis = /* '您属于高脂肪，高骨骼肌，高体重的“三高”体型' */ 'muscle_fat_analysis_1012';
      suggestion = /* '建议您需要开始减重了，为了您的健康也可以适度的接受肥胖治疗' */ 'muscle_fat_analysis_1013';
      bodyTypeWeight = /* '超体重' */ 'muscle_fat_analysis_1001';
      bodyType = /* '肥胖型' */ 'muscle_fat_analysis_1004';
      break;
    case BodyShapeEnum.STANDARD_WEIGHT_WEAK:
      analysis = /* '您的体重和脂肪都正常的，但是肌肉量有所欠缺' */ 'muscle_fat_analysis_1014';
      suggestion = /* '建议您多进行运动，增加肌肉，饮食上多食用蛋白质含量高的食物' */ 'muscle_fat_analysis_1015';
      bodyTypeWeight = /* '标准体重' */ 'muscle_fat_analysis_1005';
      bodyType = /* '虚弱型' */ 'muscle_fat_analysis_1002';
      break;
    case BodyShapeEnum.STANDARD_WEIGHT_FAT:
      analysis = /* '您的体重虽然正常，但脂肪是高标准，属于隐藏肥胖人群' */ 'muscle_fat_analysis_1016';
      suggestion = /* '开启减脂增肌之路吧' */ 'muscle_fat_analysis_1017';
      bodyTypeWeight = /* '标准体重' */ 'muscle_fat_analysis_1005';
      bodyType = /* '肥胖型' */ 'muscle_fat_analysis_1004';
      break;
    case BodyShapeEnum.STANDARD_WEIGHT_MUSCLE:
      analysis = /* '您处于最理想的身材状态，体重和脂肪均控制在标准范围内，肌肉量是高标准的' */ 'muscle_fat_analysis_1018';
      suggestion = /* '为了保持您现有的完美身材，还需要定期测量监测哦' */ 'muscle_fat_analysis_1019';
      bodyTypeWeight = /* '标准体重' */ 'muscle_fat_analysis_1005';
      bodyType = /* '肌肉型' */ 'muscle_fat_analysis_1003';
      break;
    case BodyShapeEnum.STANDARD_WEIGHT_HEALTH:
      analysis = /* '您的体重，脂肪，骨骼肌都是均衡的，在标准范围内' */ 'muscle_fat_analysis_1020';
      suggestion = /* '要注意肌肉会随着年龄增加而流失哦' */ 'muscle_fat_analysis_1021';
      bodyTypeWeight = /* '标准体重' */ 'muscle_fat_analysis_1005';
      bodyType = /* '健康型' */ 'muscle_fat_analysis_1006';
      break;
    case BodyShapeEnum.LOW_WEIGHT_WEAK:
      analysis = /* '您的体重，脂肪，骨骼肌均为低标准，属于“三低”体型' */ 'muscle_fat_analysis_1022';
      suggestion = /* '建议您保持体脂肪不再降低的基础上增加肌肉量' */ 'muscle_fat_analysis_1023';
      bodyTypeWeight = /* '低体重' */ 'muscle_fat_analysis_1007';
      bodyType = /* '虚弱型' */ 'muscle_fat_analysis_1002';
      break;
    case BodyShapeEnum.LOW_WEIGHT_MUSCLE:
      analysis = /* '您的体重和脂肪标准都比较低，但肌肉量保持不错' */ 'muscle_fat_analysis_1024';
      suggestion = /* '您要注意增加体重，同时确保体脂量不再减少' */ 'muscle_fat_analysis_1025';
      bodyTypeWeight = /* '低体重' */ 'muscle_fat_analysis_1007';
      bodyType = /* '肌肉型' */ 'muscle_fat_analysis_1003';
      break;
    default:
      break;
  }

  return {
    analysis, suggestion, bodyTypeWeight, bodyType,
  };
}

export default defineComponent({
  name: 'QnReportPageComponentsMuscleFatAnalysis',
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
    const { table: swipe1Table } = refTemplateModelData.value.muscleFatAnalysis.swipeItem1;
    const refSwipe1TableData = ref([
      {
        // name: `体重(${swipe1Table.weight.unit})`,
        name: `${t('weight')}(${swipe1Table.weight.unit})`,
        value: swipe1Table.weight.value,
        levelIndex: swipe1Table.weight.levelIndex,
        levelProgress: swipe1Table.weight.levelProgress,
      },
      {
        // name: `脂肪量(${swipe1Table.bodyfatMass.unit})`,
        name: `${t('body_fat_mass')}(${swipe1Table.bodyfatMass.unit})`,
        value: swipe1Table.bodyfatMass.value,
        levelIndex: swipe1Table.bodyfatMass.levelIndex,
        levelProgress: swipe1Table.bodyfatMass.levelProgress,
      },
      {
        // name: `骨骼肌(${swipe1Table.muscleMass.unit})`,
        name: `${t('skeletal_muscle')}(${swipe1Table.muscleMass.unit})`,
        value: swipe1Table.muscleMass.value,
        levelIndex: swipe1Table.muscleMass.levelIndex,
        levelProgress: swipe1Table.muscleMass.levelProgress,
      },
    ]);
    // !SECTION table
    // !SECTION swipe1

    // SECTION swipe2
    const { table: swipe2Table, muscleBodyfatAnalysisType } = refTemplateModelData.value.muscleFatAnalysis.swipeItem2 as {
      table: typeof swipe1Table;
      muscleBodyfatAnalysisType: number;
    };
    const refSwipe2TableData = ref([
      {
        // name: '体重',
        name: t('weight'),
        value: swipe2Table.weight.value,
        levelIndex: swipe2Table.weight.levelIndex,
        levelProgress: swipe2Table.weight.levelProgress,
      },
      {
        // name: '脂肪量',
        name: t('body_fat_mass'),
        value: swipe2Table.bodyfatMass.value,
        levelIndex: swipe2Table.bodyfatMass.levelIndex,
        levelProgress: swipe2Table.bodyfatMass.levelProgress,
      },
      {
        // name: '骨骼肌',
        name: t('skeletal_muscle'),
        value: swipe2Table.muscleMass.value,
        levelIndex: swipe2Table.muscleMass.levelIndex,
        levelProgress: swipe2Table.muscleMass.levelProgress,
      },
    ]);
    const swipe2TableColumnsSet = getDefaultColumnsSet();
    swipe2TableColumnsSet[1].name = '低';
    swipe2TableColumnsSet[1].nameI18n = 'low';
    swipe2TableColumnsSet[2].name = '中';
    swipe2TableColumnsSet[2].nameI18n = 'middle';
    swipe2TableColumnsSet[3].name = '高';
    swipe2TableColumnsSet[3].nameI18n = 'high';
    // 移除最后一列
    swipe2TableColumnsSet.splice(4, 1);

    const {
      analysis, suggestion, bodyTypeWeight, bodyType,
    } = getBodyShapeInfo(muscleBodyfatAnalysisType);

    // !SECTION swipe2

    return () => (
      <section class="qn-report-page__section">
        <Swipe>
          <>
            <SwipeItem title={ /* 肌肉脂肪分析 */ t('muscle_fat_analysis') }>
              <div class={ style.swipe1 }>
                <div class={ style.swipe1Table }>
                  <AnalysisTable data={ refSwipe1TableData.value } />
                </div>
              </div>
            </SwipeItem>
            <SwipeItem title={ /* 肌肉脂肪分析 */ t('muscle_fat_analysis') }>
            <div class={ style.swipe2 }>
              <div class={ style.swipe2Column }>
                <div class={ style.bodyTypeBlock }>
                  <div class={ style.bodyTypeText }>{ t(bodyTypeWeight) } · { t(bodyType) }</div>
                </div>
                <AnalysisTable data={ refSwipe2TableData.value } columns={ swipe2TableColumnsSet } />
              </div>
              <div class={ [style.swipe2Column, style.swipe2Column2] }>
                <div>
                  <h4 class={ style.tipHeading }>{ /* 分析 */ t('analysis') }：</h4>
                  <p class={ style.tipText }>{ t(analysis) }</p>
                </div>
                <div class={ style.suggesstionBlock }>
                  <h4 class={ style.tipHeading }>{ /* 建议 */ t('suggestion') }：</h4>
                  <p class={ style.tipText }>{ t(suggestion) }</p>
                </div>
              </div>
            </div>
          </SwipeItem>
          </>
        </Swipe>
      </section>
    );
  },
});
