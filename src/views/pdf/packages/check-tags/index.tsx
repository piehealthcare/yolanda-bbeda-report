import './style.css';
import { defineComponent, PropType, toRefs } from 'vue';

import createNamespace from '@/assets/utils/createNamespace';

const { name, bem } = createNamespace('pdf-page-check-tags');

type TypeData = Array<{
  label: string;
  options: Array<{
    name: string;
    value: string | number;
    // 此属性将会设置css的order属性
    order?: number;
  }>;
}>;

export default defineComponent({
  name,
  props: {
    data: {
      type: Array as PropType<TypeData>,
      default: () => ([] as TypeData),
    },
    /**
     * 使用 v-model
     * 对应data每一行所选中的值
     */
    modelValue: {
      type: Array as PropType<Array<string | number>>,
      default: () => ([]),
    },
  },
  setup(props) {
    const { data: refData, modelValue: refModelValue } = toRefs(props);

    return () => (
       <div class={ bem() }>
         {
           refData.value.map((row, rowIdx) => (
             <div class={ bem('row') }>
               <span class={ bem('row-label') }>{ row.label }</span>
               <div class={ bem('row-options') }>
                 {
                   row.options.map((option) => (
                     <span
                      class={ bem('row-option', { checked: refModelValue.value[rowIdx] === option.value }) }
                      style={ { order: option.order || 1 } }>
                      <span class={ bem('checkbox') }></span>
                      <span class={ bem('name') }>{ option.name }</span>
                    </span>
                   ))
                 }
               </div>
             </div>
           ))
         }
       </div>
    );
  },
});
