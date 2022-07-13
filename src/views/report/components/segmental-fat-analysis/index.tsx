import {
  defineComponent, PropType, toRefs,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { genPageTemplateModel } from '@yolanda-qn/eight-electrodes-report-lib';
import { TypedUserGender } from '@yolanda-qn/eight-electrodes-report-lib/dist/types/src/typings.d';
import Swipe from '../../packages/swipe';
import SwipeItem from '../../packages/swipe-item';
import BodyDiagram from '../body-balance/components/body-diagram';
import style from './style.module.css';

export default defineComponent({
  name: 'QnReportPageComponentsSegmentalFatAnalysis',
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
    const { segmentalFatAnalysis } = refTemplateModelData.value;

    return () => (
      <section class="qn-report-page__section">
        <Swipe>
          <>
            <SwipeItem title={ /* 节段脂肪分析 */ t('segmental_lean__analysis') }>
              <div class={ style.swipe1 }>
                <BodyDiagram legendText={ /* 脂肪量 */ t('body_fat_mass') } gender={ refGender.value } data={ segmentalFatAnalysis } />
              </div>
            </SwipeItem>
          </>
        </Swipe>
      </section>
    );
  },
});
