import './style.css';
import {
  defineComponent, ref, DefineComponent, computed,
} from 'vue';
import { Swipe } from 'vant';
import { useChildren } from '@vant/use';
import createNamespace from '@/assets/utils/createNamespace';
import useExpose from '@/hooks/useExpose';
import { SWIPE_KEY } from './keys';

const { name, bem } = createNamespace('report-page-swipe');

export default defineComponent({
  name,
  setup(props, { slots }) {
    const { children, linkChildren } = useChildren(SWIPE_KEY);
    const count = computed(() => children.length);

    const refSwipe = ref<(typeof Swipe)>();
    const staticEvents = {
      prev() {
        refSwipe.value?.prev();
      },
      next() {
        refSwipe.value?.next();
      },
      swipeTo(num: number) {
        refSwipe.value?.swipeTo(num);
      },
      resize() {
        refSwipe.value?.resize();
      },
    };

    useExpose(staticEvents);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    linkChildren({ count, ...staticEvents });

    return () => (
      <Swipe
        ref={ refSwipe }
        showIndicators={ false }
        loop={ false }
        { ...props }
        class={ bem() }>
        { { ...slots } }
      </Swipe>
    );
  },
}) as typeof Swipe;
