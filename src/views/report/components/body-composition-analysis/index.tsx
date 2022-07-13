import {
  defineComponent, PropType, ref, watchEffect, toRefs,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { genPageTemplateModel, consts, util } from '@yolanda-qn/eight-electrodes-report-lib';
import { TypedUserGender } from '@yolanda-qn/eight-electrodes-report-lib/dist/types/src/typings.d';
import Swipe from '../../packages/swipe';
import SwipeItem from '../../packages/swipe-item';
import AnalysisTable from '../../packages/analysis-table';
import LevelTagsTable from '../../packages/level-tags-table';
import style from './style.module.css';

export default defineComponent({
  name: 'QnReportPageComponentsBodyCompositionAnalysis',
  props: {
    templateModelData: {
      type: Object as PropType<ReturnType<typeof genPageTemplateModel>>,
      required: true,
    },
    gender: {
      type: [Number, String] as PropType<TypedUserGender>,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const { gender: refGender, templateModelData: refTemplateModelData } = toRefs(props);
    // 注意这里并不是相应式的数据
    // 如果想要响应式，必需在父级使用 reactive 将 templateModelData 每个属性变成响应式数据
    // 而且这里不能使用对象解构，需要使用toRef或computed来保证响应式
    const { diagram } = refTemplateModelData.value.bodyAnalysis.swipeItem1;

    // SECTION swipe1
    // SECTION diagram
    const refBodyImage = ref('');
    const diagramTableItemsArr = [
      {
        // name: '无机盐',
        name: t('mineral_salt'),
        prop: 'bonePercent',
      },
      {
        // name: '蛋白质',
        name: t('protein'),
        prop: 'proteinPercent',
      },
      {
        // name: '脂肪',
        name: t('bodyfat'),
        prop: 'bodyfatPercent',
      },
      {
        // name: '水分',
        name: t('water'),
        prop: 'waterPercent',
      },
    ];
    const renderBodyValueVNodes = () => diagramTableItemsArr.map((item, idx) => (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      <p class={ [style.bodyValue, style[`bodyValue${idx + 1}`]] }>{ diagram[item.prop].value }{ diagram[item.prop].unit }</p>
    ));

    const renderBodyNameVNodes = () => diagramTableItemsArr.map((item, idx) => (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    <p class={ [style.bodyName, style[`bodyName${idx + 1}`]] }>{ item.name }</p>
    ));

    watchEffect(() => {
      if (util.sealGenderParam(refGender.value) === consts.UserGenderEnum.male) {
        import('../../assets/images/male-body.png').then((m) => {
          refBodyImage.value = m.default;
        });
      } else {
        import('../../assets/images/female-body.png').then((m) => {
          refBodyImage.value = m.default;
        });
      }
    });
    // !SECTION diagram
    // SECTION table
    const { table: swipe1Table } = refTemplateModelData.value.bodyAnalysis.swipeItem1;
    const refTableData = ref([
      {
        // name: `蛋白质(${swipe1Table.proteinMass.unit})`,
        name: `${t('protein')}(${swipe1Table.proteinMass.unit})`,
        value: swipe1Table.proteinMass.value,
        levelIndex: swipe1Table.proteinMass.levelIndex,
        levelProgress: swipe1Table.proteinMass.levelProgress,
      },
      {
        // name: `无机盐(${swipe1Table.boneMass.unit})`,
        name: `${t('mineral_salt')}(${swipe1Table.boneMass.unit})`,
        value: swipe1Table.boneMass.value,
        levelIndex: swipe1Table.boneMass.levelIndex,
        levelProgress: swipe1Table.boneMass.levelProgress,
      },
      {
        // name: `脂肪量(${swipe1Table.bodyfatMass.unit})`,
        name: `${t('body_fat_mass')}(${swipe1Table.bodyfatMass.unit})`,
        value: swipe1Table.bodyfatMass.value,
        levelIndex: swipe1Table.bodyfatMass.levelIndex,
        levelProgress: swipe1Table.bodyfatMass.levelProgress,
      },
      {
        // name: `水分(${swipe1Table.waterMass.unit})`,
        name: `${t('water')}(${swipe1Table.waterMass.unit})`,
        value: swipe1Table.waterMass.value,
        levelIndex: swipe1Table.waterMass.levelIndex,
        levelProgress: swipe1Table.waterMass.levelProgress,
      },
    ]);
    // !SECTION table
    // !SECTION swipe1

    // SECTION swiipe2
    const { table: swipe2Table } = refTemplateModelData.value.bodyAnalysis.swipeItem2 as { table: typeof swipe1Table };
    const refSwipe2TableData = ref([
      {
        // name: '蛋白质',
        name: t('protein'),
        value: swipe2Table.proteinMass.levelIndex,
      },
      {
        // name: '无机盐',
        name: t('mineral_salt'),
        value: swipe2Table.boneMass.levelIndex,
      },
      {
        // name: '脂肪量',
        name: t('body_fat_mass'),
        value: swipe2Table.bodyfatMass.levelIndex,
      },
      {
        // name: '水分',
        name: t('water'),
        value: swipe2Table.waterMass.levelIndex,
      },
    ]);

    // !SECTION swiipe2

    return () => (
      <section class="qn-report-page__section">
        <Swipe>
          <>
            <SwipeItem title={ /* 人体成分分析 */ t('body_composition_analysis_1') }>
              <div class={ style.swipe1 }>
                <div class={ style.swipe1Diagram }>
                  <img src={ refBodyImage.value } alt="" class={ style.bodyImg } />
                  { renderBodyValueVNodes() }
                  { renderBodyNameVNodes() }
                </div>
                <div class={ style.swipe1Table }>
                  <AnalysisTable data={ refTableData.value } />
                </div>
              </div>
            </SwipeItem>
            <SwipeItem title={ /* 营养分析 */ t('nutritional_analysis') }>
              <div>
                <LevelTagsTable data={ refSwipe2TableData.value } />
              </div>
              <p class={ style.des }>
                {/* 营养评估主要基于测试者水分，蛋白质，脂肪，和无机盐的测量结果。这三种物质是构成人体的主要成分，且也是每天从食物中所摄取的营养物质 */}
                { t('nutritional_analysis_tip') }
              </p>
            </SwipeItem>
          </>
        </Swipe>
      </section>
    );
  },
});
