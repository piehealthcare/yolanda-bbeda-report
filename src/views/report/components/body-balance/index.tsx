import {
  defineComponent, PropType, toRefs,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { genPageTemplateModel } from '@yolanda-qn/eight-electrodes-report-lib';
import type { TypedUserGender } from '@yolanda-qn/eight-electrodes-report-lib/dist/types/src/typings.d';
import Swipe from '../../packages/swipe';
import SwipeItem from '../../packages/swipe-item';
import LevelTagsTable from '../../packages/level-tags-table';
import BodyDiagram from './components/body-diagram';
import SectionHeader from '../../packages/section-header';
import style from './style.module.css';

export default defineComponent({
  name: 'QnReportPageComponentsBodyBalance',
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
    const { swipeItem1 } = refTemplateModelData.value.muscleBalance;

    // SECTION swipe2
    const { muscleBalance, bodyStrength } = refTemplateModelData.value.muscleBalance.swipeItem2;
    const muscleBalanceLevesDef = [
      {
        value: 0,
        // name: '均衡',
        name: t('balanced'),
        activeColor: '#1CCDAA',
      },
      {
        value: 1,
        // name: '轻度不均',
        name: t('slightly_unbalanced'),
        activeColor: '#FFC53D',
      },
      {
        value: 2,
        // name: '重度不均',
        name: t('extremely_unbalanced'),
        activeColor: '#FF7A45',
      },
    ];
    const muscleBalanceTagsData = [
      {
        // name: '上肢',
        name: t('upper'),
        value: muscleBalance.arm.levelIndex,
        levels: muscleBalanceLevesDef,
      },
      {
        // name: '下肢',
        name: t('lower'),
        value: muscleBalance.leg.levelIndex,
        levels: muscleBalanceLevesDef,
      },
      {
        // name: '上下肢',
        name: t('upper_lower'),
        value: muscleBalance.armLeg.levelIndex,
        levels: muscleBalanceLevesDef,
      },
    ];

    const bodyStrengthLevesDef = [
      {
        value: 0,
        // name: '不足',
        name: t('weak'),
        order: 3,
        activeColor: '#FF7A45',
      },
      {
        value: 1,
        // name: '正常',
        name: t('normal'),
        activeColor: '#1CCDAA',
      },
      {
        value: 2,
        // name: '发达',
        name: t('developed'),
        activeColor: '#4FB1FB',
      },
    ];
    const bodyStrengthTagsData = [
      {
        // name: '上肢',
        name: t('upper'),
        value: bodyStrength.arm.levelIndex,
        levels: bodyStrengthLevesDef,
      },
      {
        // name: '下肢',
        name: t('lower'),
        value: bodyStrength.leg.levelIndex,
        levels: bodyStrengthLevesDef,
      },
      {
        // name: '肌肉',
        name: t('muscle'),
        value: bodyStrength.muscle.levelIndex,
        levels: bodyStrengthLevesDef,
      },
    ];
    // !SECTION swipe2

    return () => (
      <section class="qn-report-page__section">
        <Swipe>
          <>
            <SwipeItem title={ /* 肌肉均衡 */ t('body_balance') }>
              <div class={ style.swipe1 }>
                <BodyDiagram legendText={ /* 肌肉量 */ t('muscle_mass') } gender={ refGender.value } data={ swipeItem1 } />
              </div>
            </SwipeItem>
            <SwipeItem title={ /* 肌肉均衡 */ t('body_balance') }>
              <div class={ style.swipe2 }>
                <LevelTagsTable data={ muscleBalanceTagsData } />
                <p class={ style.tipText }>
                  {/* 营养评估主要基于测试者蛋白质，脂肪，和无机盐的测量结果。这三种物质是构成人体的主要成分，且也是每天从食物中所摄取的营养物质 */}
                  { t('muscle_report_tip') }
                </p>
                <SectionHeader title={ /* 身体力量 */ t('body_strength') } />
                <LevelTagsTable data={ bodyStrengthTagsData } />
              </div>
            </SwipeItem>
          </>
        </Swipe>
      </section>
    );
  },
});
