import './style.css';
import {
  defineComponent, PropType, toRefs, computed, DefineComponent,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { SwipeItem } from 'vant';
import { useParent } from '@vant/use';
import createNamespace from '@/assets/utils/createNamespace';
import Button from '../button';
import { SWIPE_KEY } from '../swipe/keys';
import LeftArrowIcon from '../../assets/icons/left-arrow.png';
import RightArrowIcon from '../../assets/icons/right-arrow.png';
import SectionHeader from '../section-header';

const { name, bem } = createNamespace('report-page-swipe-item');
const { bem: headerBem } = createNamespace(bem('header'), { prefix: '' });

export default defineComponent({
  name,
  props: {
    title: {
      type: String as PropType<string>,
    },
  },
  setup(props, { slots }) {
    const { t } = useI18n();
    const { parent, index } = useParent(SWIPE_KEY);

    if (!parent) {
      console.error('[Vant] <SwipeItem> must be a child component of <Swipe>.');

      return null;
    }

    const {
      title: refTitle,
    } = toRefs(props);

    const computedBackToFisrtItemButtonVisible = computed(() => (parent.count.value > 1) && (index.value === (parent.count.value - 1)));
    const computedPrevButtonVisible = computed(() => (parent.count.value > 1) && (index.value > 0) && !computedBackToFisrtItemButtonVisible.value);
    const computedNextButtonVisible = computed(() => (parent.count.value > 1) && !computedBackToFisrtItemButtonVisible.value);

    const prev = () => {
      parent?.prev();
    };
    const next = () => {
      parent?.next();
    };
    const backToFirstItem = () => {
      parent?.swipeTo(0);
    };

    const leftArrow = (
      <img src={ LeftArrowIcon } alt="" class={ bem('icon') } />
    );
    const rightArrow = (
      <img src={ RightArrowIcon } alt="" class={ bem('icon') } />
    );

    const slotVNodes = {
      default() {
        return (
          <>
            <div class={ headerBem() }>
              <SectionHeader
                title={ refTitle.value }
                v-slots={
                  {
                    controls() {
                      return (
                        <>
                          {
                            computedBackToFisrtItemButtonVisible.value ? <Button onClick={ backToFirstItem }>{ leftArrow }</Button> : null
                          }
                          {
                            computedPrevButtonVisible.value ? <Button onClick={ prev }>{ leftArrow }</Button> : null
                          }
                          {
                            computedNextButtonVisible.value ? <Button onClick={ next }>
                              <span>{ (index.value === 0) ? /* '分析' */ t('analysis_1') : /* '下一页' */ t('next_page') }</span>
                              { rightArrow }
                            </Button> : null
                          }
                        </>
                      );
                    },
                  }
                }
              />
            </div>
            <div class={ bem('body') }>
              { slots.default?.() }
            </div>
          </>
        );
      },

    };

    return () => (
      <SwipeItem { ...props } class={ bem() } v-slots={ slotVNodes } />
    );
  },
}) as typeof SwipeItem & DefineComponent<{ title: string }>;
