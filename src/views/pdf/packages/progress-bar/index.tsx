/**
 * 进度条
 */

import './style.css';
import { defineComponent, PropType, toRef } from 'vue';

import createNamespace from '@/assets/utils/createNamespace';

const { name, bem } = createNamespace('pdf-page-progress-bar');

export default defineComponent({
  name,
  props: {
    /**
     * 这里预设 低标准，标准，超标准三个等级
     * 根据表头的 70px, 62px, 200px 宽度进行分配
     */
    levels: {
      type: Array as PropType<Array<{ color: string; width: string; }>>,
      default: () => ([
        {
          color: '#4FB1FB',
          width: '19.2%',
        },
        {
          color: '#1CCDAA',
          width: '21.2%',
        },
        {
          color: '#328FDE',
          width: '59.6%',
        },
      ]),
    },
    /**
     * 当前等级进度。例如20，达标20%
     */
    levelProgress: {
      required: true,
      type: Number as PropType<number>,
      default: 0,
    },
    leveIndex: {
      required: true,
      type: Number as PropType<number>,
      default: 0,
    },
    // 单位转换后的值
    value: {
      required: true,
      type: String as PropType<string>,
      default: '',
    },
  },
  setup(props) {
    const { value: levels } = toRef(props, 'levels');
    const { value: levelProgress } = toRef(props, 'levelProgress');
    const { value: leveIndex } = toRef(props, 'leveIndex');
    const refValue = toRef(props, 'value');

    return () => (
      <div class={ bem() }>
        {
          levels.map((item, idx) => {
            if (idx > leveIndex) {
              return null;
            }

            const p = `${leveIndex > idx ? 100 : levelProgress}%`;
            return (
              <div class={ bem('item') } style={ { width: item.width } }>
                <div class={ bem('item-wrap') }>
                  <div
                    class={ bem('item-inner') }
                    style={
                      {
                        width: p,
                        backgroundColor: item.color,
                      }
                    }>
                    </div>
                    {
                      leveIndex === idx
                        ? (<span class={ bem('value') }>{ refValue.value }</span>)
                        : null
                    }
                </div>
              </div>
            );
          })
        }
      </div>
    );
  },
});
