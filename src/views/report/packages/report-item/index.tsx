import './style.css';
import {
  defineComponent, PropType, toRefs, ref, watch, computed, nextTick,
} from 'vue';
// Composables
import { raf, doubleRaf } from '@vant/use';
import { ReportItem } from '@yolanda-qn/eight-electrodes-report-lib';
import createNamespace from '@/assets/utils/createNamespace';
import DownArrow from '../../assets/icons/down-arrow.svg';

const { name, bem } = createNamespace('report-page-report-item');

export default defineComponent({
  name,
  props: {
    data: {
      type: Object as PropType<ReturnType<typeof ReportItem.prototype.toObject>>,
      required: true,
    },
    // 是否展开
    modelValue: {
      type: Boolean as PropType<boolean>,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const refWrapper = ref<HTMLElement>();
    const refContent = ref<HTMLElement>();
    const { modelValue: refModelValue, data: refData } = toRefs(props);
    const refExpand = ref(refModelValue.value);
    const refShow = ref(refExpand.value);

    watch(refModelValue, (newVal) => {
      refExpand.value = newVal;
    });

    watch(refExpand, () => {
      emit('update:modelValue', refExpand.value);
    });

    const onMainZoneClicked = () => {
      refExpand.value = !refExpand.value;
    };

    const computedLevelMeta = computed(() => refData.value.levels[refData.value.levelIndex]);

    const onTransitionEnd = () => {
      if (!refExpand.value) {
        refShow.value = false;
      } else if (refWrapper.value) {
        refWrapper.value.style.height = '';
      }
    };

    watch(refExpand, (value, oldValue) => {
      if (oldValue === null) {
        return;
      }

      if (value) {
        refShow.value = true;
      }

      // Use raf: flick when opened in safari
      // Use nextTick: closing animation failed when set `user-select: none`
      const tick = value ? nextTick : raf;

      tick(() => {
        if (!refContent.value || !refWrapper.value) {
          return;
        }

        const { offsetHeight } = refContent.value;
        if (offsetHeight) {
          const contentHeight = `${offsetHeight}px`;
          refWrapper.value.style.height = value ? '0' : contentHeight;

          // use double raf to ensure animation can start
          doubleRaf(() => {
            if (refWrapper.value) {
              refWrapper.value.style.height = value ? contentHeight : '0';
            }
          });
        } else {
          onTransitionEnd();
        }
      });
    });

    const renderCollapseContentVNodes = () => (
      <div
        v-show={ refShow.value }
        ref={ refWrapper }
        class={ bem('collapse-wrap') }
        onTransitionend={ onTransitionEnd }>
        <div ref={ refContent } class={ bem('collapse-content') }>
          {
            refData.value.processBarVisible
              ? (
                <div class={ [bem('levels', { mb: !!(refData.value.desc || refData.value.intro) })] }>
                  <div class={ bem('levels-wrapper') }>
                    { refData.value.levels.map((l) => (<span class={ bem('level-name') }>{ l.name }</span>)) }
                  </div>
                  <div class={ bem('line') }>
                    <div class={ bem('line-background') }></div>
                    <div
                      class={ bem('line-active') }
                      style={ {
                        width: `${refData.value.displayProgress}%`,
                        backgroundColor: computedLevelMeta.value?.color,
                      }}></div>
                    <div class={ bem('scales') }>
                      <i></i>
                      { refData.value.boundaries.map(() => (<i class={ bem('scale-point') }></i>)) }
                      <i></i>
                    </div>
                  </div>
                  <div class={ bem('boundaries') }>
                    <span class={ bem('boundary-value') }></span>
                    { refData.value.boundaries.map((l) => (<span class={ bem('boundary-value') }>{ l }</span>)) }
                    <span class={ bem('boundary-value') }></span>
                  </div>
                </div>
              )
              : null
          }
          { refData.value.desc ? <p class={ bem('desc') } innerHTML={ refData.value.desc }></p> : null }
          { refData.value.intro ? <p class={ bem('intro', { mt: !!refData.value.desc }) } innerHTML={ refData.value.intro }></p> : null }
        </div>
      </div>
    );

    return () => (
      <div class={ bem() }>
        <div onClick={ onMainZoneClicked } class={ bem('main') }>
          <div class={ bem('main-content') }>
            <span class={ bem('name') }>{ refData.value.name }</span>
            {
              refData.value.processBarVisible
                ? <span class={ bem('level-tag') } style={ { backgroundColor: computedLevelMeta.value?.color } }>{ computedLevelMeta.value?.name }</span>
                : null
            }
          </div>
          <div class={ bem('value') }>
            <span class={ bem('value-num') }>{ refData.value.value }</span>
            <span class={ bem('unit') }>{ refData.value.unit }</span>
          </div>
          <img src={ DownArrow } class={ bem('icon', { expand: refExpand.value }) } />
        </div>
        { renderCollapseContentVNodes() }
      </div>
    );
  },
});
