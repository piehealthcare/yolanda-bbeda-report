import './style.css';
import { defineComponent, toRef, PropType } from 'vue';
import createNamespace from '@/assets/utils/createNamespace';

const { name, bem } = createNamespace('report-page-section-header');

export default defineComponent({
  name,
  props: {
    title: {
      type: String as PropType<string>,
    },
  },
  setup(props, { slots }) {
    const refTitle = toRef(props, 'title');

    return () => (
      <div class={ bem() }>
        <span class={ bem('title-decorator') }></span>
        <h2 class={ bem('title') }>{ slots.default?.() || refTitle.value }</h2>
        <div class={ bem('controls') }>
          { slots.controls?.() }
        </div>
      </div>
    );
  },
});
