/**
 * 健康评分
 */

import {
  defineComponent, PropType, toRef,
} from 'vue';
import { useI18n } from 'vue-i18n';
import style from './style.module.css';
import SectionCard from '../../packages/section-card';

export default defineComponent({
  name: 'QnPdfPageComponentsFitnessScore',
  props: {
    score: {
      type: Number as PropType<number>,
      default: 0,
    },
  },
  setup(props) {
    const { value: score } = toRef(props, 'score');
    const { t } = useI18n();

    return () => (
      <SectionCard class={style.fitnessScore} title={ /* "健康评分" */ t('health_score')} border>
        {
          {
            default: () => (
              <div>{ /* 您的评分 */ t('your_score')}：
                <span class={ style.score }>
                  <span class={ style.scoreNum }>{ score }</span>
                  <span>/100</span>
                </span>
              </div>
            ),
          }
        }
      </SectionCard>
    );
  },
});
