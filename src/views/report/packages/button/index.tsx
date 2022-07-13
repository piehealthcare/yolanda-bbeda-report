import './style.css';
import { defineComponent } from 'vue';
import createNamespace from '@/assets/utils/createNamespace';

const { name, bem } = createNamespace('report-page-button');

export default defineComponent({
  name,
  setup(props, { slots }) {
    return () => (
      <button { ...props } class={ bem() }>
        <div class={ bem('wrap') }>
          { slots.default?.() }
        </div>
      </button>
    );
  },
});
