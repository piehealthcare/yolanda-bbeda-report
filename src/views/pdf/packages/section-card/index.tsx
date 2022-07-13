/**
 * 内容包裹卡片
 * @slots
 * title
 * headerRight
 * default
 */

import './style.css';
import { defineComponent, PropType, toRef } from 'vue';

import createNamespace from '@/assets/utils/createNamespace';

const { name, bem } = createNamespace('pdf-page-section-card');

export default defineComponent({
  name,
  props: {
    title: {
      type: String as PropType<string>,
      default: '',
    },
    /**
     * 内容区块是否显示上下边框
     */
    border: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
  },
  setup(props, { slots }) {
    const refTitle = toRef(props, 'title');
    const refBorder = toRef(props, 'border');

    return () => (
      <div class={ bem() }>
        <div class={ bem('header') }>
          <span class={ bem('header-left-border') }></span>
          <div class={ bem('title') }>{ slots.title?.() || refTitle.value }</div>
          <div class={ bem('right') }>{ slots.headerRight?.() }</div>
        </div>
        <div class={ [bem('content', { border: refBorder.value })] }>
          { slots.default?.() }
        </div>
      </div>
    );
  },
});
