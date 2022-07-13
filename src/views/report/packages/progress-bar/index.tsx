import './style.css';
import { defineComponent, PropType, toRefs } from 'vue';
import createNamespace from '@/assets/utils/createNamespace';

const { name, bem } = createNamespace('report-page-progress-bar');

export default defineComponent({
  name,
  props: {
    progress: {
      type: Number as PropType<number>,
      default: 0,
    },
    levelIndex: {
      type: Number as PropType<number>,
      required: true,
    },
    colors: {
      type: Object as PropType<Record<string | number, string>>,
      default: () => ({
        0: '#4FB1FB',
        1: '#1CCDAA',
        2: '#FFC53D',
      }),
    },
  },
  setup(props) {
    const {
      progress: refProgress,
      levelIndex: refLevelIndex,
      colors: refColors,
    } = toRefs(props);

    return () => (
      <div class={ bem() }>
        <div class={ bem('inner') }>
          <div class={ bem('fill') } style={ { width: `${Number.parseFloat(`${refProgress.value}`)}%`, backgroundColor: refColors.value[refLevelIndex.value] } }></div>
        </div>
      </div>
    );
  },
});
