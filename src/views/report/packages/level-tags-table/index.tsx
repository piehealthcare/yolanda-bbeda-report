import './style.css';
import { defineComponent, PropType, toRef } from 'vue';
import createNamespace from '@/assets/utils/createNamespace';
import LevelTags, { TypeTagDataItem } from '../level-tags';

const { name, bem } = createNamespace('report-page-level-tags-table');

export type TypeTableRowData = {
  name: string;
  value: number;
  levels?: Array<TypeTagDataItem>;
};

export default defineComponent({
  name,
  props: {
    data: {
      type: Array as PropType<Array<TypeTableRowData>>,
      default: () => [],
    },
  },
  setup(props) {
    const refData = toRef(props, 'data');
    const renderTrVNodes = () => refData.value.map((row) => (
      <div class={ bem('row') }>
        <div class={ [bem('cell'), bem('cell-1')] }>{ row.name }</div>
        <div class={ [bem('cell'), bem('cell-2')] }>
          <LevelTags value={ row.value } data={ row.levels } />
        </div>
      </div>
    ));

    return () => (
      <div class={ bem() }>
        <div class={ bem('wrap') }>
          { renderTrVNodes() }
        </div>
      </div>
    );
  },
});
