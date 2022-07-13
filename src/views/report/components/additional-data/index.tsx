import {
  defineComponent, PropType, toRefs,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { genPageTemplateModel } from '@yolanda-qn/eight-electrodes-report-lib';
import Swipe from '../../packages/swipe';
import SwipeItem from '../../packages/swipe-item';
import ReportItem from '../../packages/report-item';
import style from './style.module.css';

export default defineComponent({
  name: 'QnReportPageComponentsAdditionalData',
  props: {
    templateModelData: {
      type: Object as PropType<ReturnType<typeof genPageTemplateModel>>,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const { templateModelData: refTemplateModelData } = toRefs(props);
    const { reportItems } = refTemplateModelData.value.additionalData;

    return () => (
      <section class="qn-report-page__section">
        <Swipe>
          <>
            <SwipeItem title={ /* 附加数据 */ t('additional_data') }>
              <div class={ style.swipe1 }>
                { reportItems.map((report) => (<ReportItem data={ report } modelValue={ false } />)) }
              </div>
            </SwipeItem>
          </>
        </Swipe>
      </section>
    );
  },
});
