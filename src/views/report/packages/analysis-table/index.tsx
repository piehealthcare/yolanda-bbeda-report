import './style.css';
import {
  defineComponent, PropType, toRefs, ref, watch,
} from 'vue';
import { useI18n } from 'vue-i18n';
import createNamespace from '@/assets/utils/createNamespace';
import ProgressBar from '../progress-bar';

const { name, bem } = createNamespace('report-page-analysis-table');

type TypeColumn = {
  prop?: string;
  name: string;
  nameI18n?: string;
  thClassList?: [],
  tdClassList?: string[];
  render?(payload: { row: any; rowIndex: number; colIndex: number; }): JSX.Element | null;
};

export function getDefaultColumnsSet(): Array<TypeColumn> {
  return [
    {
      prop: '',
      name: '',
      tdClassList: [bem('td', { left: true })],
      render({ row }) {
        return (row.name);
      },
    },
    {
      prop: '',
      name: '低标准',
      nameI18n: 'under',
      tdClassList: ['no-r-border', 'no-padding'],
      render({ row }) {
        if (row.levelIndex === 0) {
          // 小于等于0则给一个默认值，视觉上好看点
          return (<ProgressBar levelIndex={ 0 } progress={ row.levelProgress <= 0 ? 5 : row.levelProgress } />);
        }

        if (row.levelIndex > 0) {
          return (<ProgressBar levelIndex={ 0 } progress={ 100 } />);
        }

        return null;
      },
    },
    {
      prop: '',
      name: '标准',
      nameI18n: 'standard',
      tdClassList: ['no-r-border', 'no-padding'],
      render({ row }) {
        if (row.levelIndex === 1) {
          // 小于等于0则给一个默认值，视觉上好看点
          return (<ProgressBar levelIndex={ 1 } progress={ row.levelProgress <= 0 ? 5 : row.levelProgress } />);
        }

        if (row.levelIndex > 1) {
          return (<ProgressBar levelIndex={ 1 } progress={ 100 } />);
        }

        return null;
      },
    },
    {
      prop: '',
      name: '超标准',
      nameI18n: 'over',
      tdClassList: ['no-padding'],
      render({ row }) {
        if (row.levelIndex === 2) {
          // 小于等于0则给一个默认值，视觉上好看点
          return (<ProgressBar levelIndex={ 2 } progress={ row.levelProgress <= 0 ? 5 : row.levelProgress } />);
        }

        return null;
      },
    },
    {
      prop: '',
      name: '',
      render({ row }) {
        return row.value;
      },
    },
  ];
}

export default defineComponent({
  name,
  props: {
    columns: {
      type: Array as PropType<Array<TypeColumn>>,
    },
    data: {
      type: Array as PropType<Array<any>>,
      default: () => [],
    },
  },
  setup(props) {
    const { t } = useI18n();
    const { columns, data: refData } = toRefs(props);
    const refColumns = ref<Array<TypeColumn>>(columns.value || getDefaultColumnsSet());
    watch(columns, (newVal) => {
      refColumns.value = newVal || getDefaultColumnsSet();
    });

    const renderTHeadVNodes = () => refColumns.value.map((item, colIndex) => (
      <th class={ [bem('th'), bem(`th-${colIndex + 1}`), ...item.thClassList || []] }>
        { item.nameI18n ? t(item.nameI18n) : item.name }
      </th>
    ));
    const renderTBodyVNodes = () => refData.value.map((row, rowIndex) => {
      const tdVNodes = (refColumns.value as Array<TypeColumn>)
        .map((col, colIndex) => (
          <td class={ [bem('td'), ...col.tdClassList || []] }>
            { col.render?.({ row, rowIndex, colIndex }) || row[col.prop as string] }
          </td>
        ));

      return (<tr class={ bem('tr') }>{ tdVNodes }</tr>);
    });

    return () => (
      <table class={ bem() }>
        <thead>
          <tr class={ [bem('tr'), bem('thead-tr')] }>
            { renderTHeadVNodes() }
          </tr>
        </thead>
        <tbody>
          { renderTBodyVNodes() }
        </tbody>
      </table>
    );
  },
});
