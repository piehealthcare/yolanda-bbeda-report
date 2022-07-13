import './style.css';
import { defineComponent, PropType, toRefs } from 'vue';
import Color from 'color';
import createNamespace from '@/assets/utils/createNamespace';
import CheckedIcon from '../../assets/icons/checked.svg';

const { name, bem } = createNamespace('report-page-level-tags');

export type TypeTagDataItem = {
  // flex order 排序 越小则越靠前
  order?: number;
  value: number;
  name?: string;
  activeColor?: string;
  defaultColor?: string;
};

export function genDefaultColorSet() {
  return {
    default: '#CCC',
    0: '#4FB1FB',
    1: '#1CCDAA',
    2: '#FFC53D',
    3: '#FF7A45',
  };
}

export default defineComponent({
  name,
  props: {
    value: {
      type: Number as PropType<number>,
      required: true,
    },
    data: {
      type: Array as PropType<Array<TypeTagDataItem>>,
      default: () => [
        {
          value: 0,
        },
        {
          value: 1,
        },
        {
          value: 2,
        },
      ],
    },
  },
  setup(props) {
    const {
      value: refValue,
      data: refData,
    } = toRefs(props);

    const defaultColorSet = genDefaultColorSet();
    const renderTagVNodes = () => refData.value.map((tag) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const activeColor = tag.activeColor || defaultColorSet[tag.value];
      const defaultColor = tag.defaultColor || defaultColorSet.default;
      const lightenDefaultColor = Color(defaultColor).alpha(0.2).toString();
      const lightenActiveColor = activeColor ? Color(activeColor).alpha(0.2).toString() : lightenDefaultColor;
      const isActive = tag.value === refValue.value;
      const lBg = isActive ? lightenActiveColor : lightenDefaultColor;
      const rBg = isActive ? activeColor : defaultColor;

      return (
        <div class={ bem('item', { active: isActive }) } style={ { order: tag.order || 0 } }>
          <div class={ bem('item-wrap') }>
            <span class={ bem('name', { active: isActive }) } style={ { backgroundColor: lBg } }>{ tag.name || '' }</span>
            <span class={ bem('check-span') } style={ { backgroundColor: rBg } }>
              <img src={ CheckedIcon } alt="" class={ bem('icon') } />
            </span>
          </div>
        </div>
      );
    });

    return () => (
      <div class={ bem() }>
        { renderTagVNodes() }
      </div>
    );
  },
});
