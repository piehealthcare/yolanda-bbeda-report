import './style.css';
import { defineComponent, PropType, toRef } from 'vue';
import { useI18n } from 'vue-i18n';
import { ReportItem } from '@yolanda-qn/eight-electrodes-report-lib';
import createNamespace from '@/assets/utils/createNamespace';
import Ruler from './components/ruler';
import ProgressBar from './components/progress-bar';

const { name, bem } = createNamespace('pdf-page-analysis-table');

export default defineComponent({
  name,
  props: {
    reportItems: {
      type: Array as PropType<Array<ReportItem>>,
      default: () => [],
    },
    // 展示与标准值的百分比
    displayRatioOverStdValue: {
      type: Boolean as PropType<boolean>,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const refReportItems = toRef(props, 'reportItems');
    const refDisplayRatioOverStdValue = toRef(props, 'displayRatioOverStdValue');

    function getLevelProgress(levelSet: number, activeLevel: number, levelProgress: number) {
      if (levelSet === activeLevel) {
        // 为了视觉上好看，这里默认给5%
        return levelProgress <= 0 ? 5 : levelProgress;
      }

      if (activeLevel > levelSet) {
        return 100;
      }

      return 0;
    }

    return () => (
       <div class={ bem() }>
          <table class={ bem('table') }>
            <thead>
              <tr>
                <th scope="col" class={ [bem('table-th'), bem('table-name-col')] }></th>
                <th scope="col" class={ [bem('table-th'), bem('table-th', { low: true })] }>{ /* 低标准 */ t('under')}</th>
                <th scope="col" class={ [bem('table-th'), bem('table-th', { standard: true })] }>{ /* 标准 */ t('standard')}</th>
                <th scope="col" class={ [bem('table-th'), bem('table-th', { high: true })] }>{ /* 超标准 */ t('over')}</th>
                <th scope="col" class={ [bem('table-th'), bem('table-th', { normalRange: true })] }>{ /* 正常范围 */ t('normal_range')}</th>
              </tr>
            </thead>
            <tbody>
              {
                refReportItems.value.map((reportItem, idx) => {
                  const reportObjectItem = reportItem.toObject();
                  const notLastTr = idx < refReportItems.value.length - 1;
                  return (
                    <tr class={ bem('table-tr') }>
                      <td class={ bem('table-td') }>{ reportObjectItem.name }{ reportObjectItem.unit ? `(${reportObjectItem.unit})` : '' }</td>
                      <td class={ [bem('table-td'), bem('table-levels-td'), bem('table-td', { noRBorder: true, noBBorder: notLastTr })] }>
                        {/* 低标准 */}
                        <Ruler
                          startValue={ reportItem.getMin() }
                          startValueVisible={ true }
                          endValue={ reportItem.getBoundaries()[0] }
                          unit={ reportItem.getUnitValue() }
                          fixed={ reportItem.getFixed() }
                          paddingLeft={ true }
                          split={ 1 }
                          displayStdValue={ refDisplayRatioOverStdValue.value }
                          stdValue={ reportItem.getStdValue() }
                          displayRatioOverStdValue={ refDisplayRatioOverStdValue.value }
                        />
                        <ProgressBar
                          level={ 0 }
                          levelProgress={ getLevelProgress(0, reportObjectItem.levelIndex, reportObjectItem.levelProgress) }
                          paddingLeft={ true }
                          displayValue={ reportObjectItem.levelIndex === 0 }
                          value={ reportObjectItem.value }
                        />
                      </td>
                      <td class={ [bem('table-td'), bem('table-levels-td'), bem('table-td', { noRBorder: true, noBBorder: notLastTr })] }>
                        {/* 标准 */}
                        <Ruler
                          startValue={ reportItem.getBoundaries()[0] }
                          endValue={ reportItem.getBoundaries()[1] }
                          unit={ reportItem.getUnitValue() }
                          fixed={ reportItem.getFixed() }
                          split={ 1 }
                          displayStdValue={ refDisplayRatioOverStdValue.value }
                          stdValue={ reportItem.getStdValue() }
                          displayRatioOverStdValue={ refDisplayRatioOverStdValue.value }
                        />
                        <ProgressBar
                          level={ 1 }
                          levelProgress={ getLevelProgress(1, reportObjectItem.levelIndex, reportObjectItem.levelProgress) }
                          displayValue={ reportObjectItem.levelIndex === 1 }
                          value={ reportObjectItem.value }
                        />
                      </td>
                      <td class={ [bem('table-td'), bem('table-levels-td'), bem('table-td', { noBBorder: notLastTr })] }>
                        {/* 超标准 */}
                        <Ruler
                          startValue={ reportItem.getBoundaries()[1] }
                          endValue={ reportItem.getMax() }
                          unit={ reportItem.getUnitValue() }
                          paddingRight={ true }
                          fixed={ reportItem.getFixed() }
                          split={ 4 }
                          displayStdValue={ refDisplayRatioOverStdValue.value }
                          stdValue={ reportItem.getStdValue() }
                          displayRatioOverStdValue={ refDisplayRatioOverStdValue.value }
                          isLastItem={ true }
                        />
                        <ProgressBar
                          level={ 2 }
                          levelProgress={ getLevelProgress(2, reportObjectItem.levelIndex, reportObjectItem.levelProgress) }
                          paddingRight={ true }
                          displayValue={ reportObjectItem.levelIndex === 2 }
                          value={ reportObjectItem.value }
                        />
                      </td>
                      <td class={ bem('table-td') }>
                        {
                          reportObjectItem.boundaries.length > 0
                            ? `${reportObjectItem.boundaries[0]}~${reportObjectItem.boundaries[1]}`
                            : ''
                        }
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
       </div>
    );
  },
});
