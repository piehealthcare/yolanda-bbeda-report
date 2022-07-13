import './style.css';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import getReports, { consts } from '@yolanda-qn/eight-electrodes-report-lib';
import { TypedConfig } from '@yolanda-qn/eight-electrodes-report-lib/dist/types/src/typings.d';
// 引入所有语言
import locales from '@yolanda-qn/eight-electrodes-report-lib/dist/locales';
import { UnitEnum as TransformUnitEnum } from '@yolanda-qn/unit-transform';
/**
 * 获取页面地址参数对象的工具函数，客户可自己去实现
 */
import { getUrlQuery } from '@huyk/utils/dist/esm/helper';
import { isNumeric } from '@huyk/utils/dist/esm/types';
import createNamespace from '@/assets/utils/createNamespace';
// import LogoImage from '@/assets/images/logo.svg';
import { TypeMeasureData } from '../../types/biz';
import Report from './Report';
import Userinfo from './components/userinfo';
// 营养评估
import NutritionalEvaluation from './components/nutritional-evaluation';
// 肥胖分析
import ObesityDiagnosis from './components/obesity-diagnosis';
// 肌肉均衡
import BodyBalance from './components/body-balance';
// 身体力量
import BodyStrength from './components/body-strength';
// 健康评分
import FitnessScore from './components/fitness-score';
// 体重控制
import WeightControl from './components/weight-control';
// 附加数据
import AdditionalData from './components/additional-data';
// 肌肉均衡图表
import BodyBalanceChartDiagram from './components/body-balance-diagram';
// 阶段脂肪分析
import SegmentalFatAnalysis from './components/segmental-fat-analysis';
// 肥胖分析表格
import ObesityDiagnosisChart from './components/obesity-diagnosis-chart';
// 肌肉脂肪分析表格
import MuscleFatAnalysis from './components/muscle-fat-analysis';
// 人体成分分析
import BodyCompositionAnalysis from './components/body-composition-analysis';

// 设置所有语言。默认只有简体中文和英语
getReports.i18n.setLangPack(locales);
// 设置回退语言
getReports.i18n.setFallbackLang('en');

const { name, bem } = createNamespace('pdf-page');

export default defineComponent({
  name,
  setup() {
    const queries = getUrlQuery(window.location.href);
    const { logoUrl } = queries;

    let measureData: TypeMeasureData;
    try {
      measureData = JSON.parse(queries.measureData);
    } catch (error) {
      alert((error as unknown as Error).message);
      throw error;
    }

    // SECTION mock data
    // measureData = {
    //   name: '张三',
    //   birthday: '1994-08-08',
    //   local_updated_at: '2021-08-25',
    //   bmi: '18',
    //   bmr: '1475',
    //   body_age: '27',
    //   bodyfat: '21.799999',
    //   bodyfat_left_arm: '1.08',
    //   bodyfat_left_leg: '3.62',
    //   bodyfat_right_arm: '1.15',
    //   bodyfat_right_leg: '3.86',
    //   bodyfat_trunk: '9.32',
    //   bone: '3.100000',
    //   gender: 1,
    //   height: 170,
    //   lbm: '51.200001',
    //   muscle: '42.933498',
    //   protein: '15.737200',
    //   sinew: '48.099998',
    //   sinew_left_arm: '2.50',
    //   sinew_left_leg: '7.37',
    //   sinew_right_arm: '2.81',
    //   sinew_right_leg: '8.63',
    //   sinew_trunk: '23.09',
    //   subfat: '19.900000',
    //   visfat: '10',
    //   water: '57.799999',
    //   weight: '65.449997',
    //   score: 90,
    // } as unknown as TypeMeasureData;

    // measureData = {
    //   birthday: '1993-10-26',
    //   bmi: 20,
    //   bmr: 1160.0,
    //   body_age: 24,
    //   bodyfat: 31.7,
    //   bodyfat_left_arm: 1.2256872799999998,
    //   bodyfat_left_leg: 2.87775184,
    //   bodyfat_right_arm: 2.8781699200000004,
    //   bodyfat_right_leg: 1.15003624,
    //   bodyfat_trunk: 7.66511624,
    //   bone: 2.12,
    //   gender: 1,
    //   height: 80.0,
    //   lbm: 36.6,
    //   muscle: 34.5,
    //   name: 'Ggg',
    //   protein: 13.5,
    //   score: 87.3709696,
    //   sinew: 0.0,
    //   sinew_left_arm: 1.63253,
    //   sinew_left_leg: 5.87423,
    //   sinew_right_arm: 1.72649,
    //   sinew_right_leg: 5.89554,
    //   sinew_trunk: 16.58478,
    //   subfat: 59.14,
    //   visfat: 7.0,
    //   water: 94.78,
    //   weight: 53.6,
    // } as unknown as TypeMeasureData;
    // !SECTION

    // 转为数字
    Object.entries(measureData).forEach(([k, v]) => {
      if (isNumeric(v)) {
        Object.assign(measureData, { [k]: Number(v) });
      }
    });
    const config: TypedConfig & {
      lengthUnit: string;
    } = {
      lang: consts.LangsEnum.zh_CN,
      fallbackLang: consts.LangsEnum.en,
      weightUnit: consts.WeightUnitEnum.kg,
      lengthUnit: TransformUnitEnum.CM,
      ...JSON.parse(queries.config || '{}'),
    };

    /**
     * SECTION 设置vue-i18n
     */
    const { t, locale, fallbackLocale } = useI18n({ useScope: 'global' });
    locale.value = config.lang as string;
    fallbackLocale.value = config.fallbackLang as string;
    /* !SECTION */

    console.log('measureData', measureData, 'config', config);
    const report = new Report(measureData, config);

    return () => (
      <article class={ bem() }>
        <header class={ bem('header') }>
          <h1 class={ bem('title') }>
            {/* 人体成分分析报告 */}
            { t('body_composition_analysis') }
          </h1>
          {
            logoUrl && (
              <div class={ bem('logo') }>
              <img src={ logoUrl } alt="" />
            </div>
            )
          }
        </header>
        {/* 个人信息 */}
        <Userinfo measureData={ measureData } lengthUnit={ config.lengthUnit } />
        <section class={ bem('body') }>
          <section class={ bem('body-column') }>
            {/* 人体成分分析 */}
            <BodyCompositionAnalysis report={ report } />
            {/* 肌肉脂肪分析 */}
            <MuscleFatAnalysis report={ report } />
            {/* 肥胖分析表格 */}
            <ObesityDiagnosisChart report={ report } />
            <div class="g-display-flex">
              {/* 肌肉均衡图表 */}
              <BodyBalanceChartDiagram report={ report } class="g-flex-1" />
              {/* 阶段脂肪分析 */}
              <SegmentalFatAnalysis report={ report } class="g-flex-1" style="margin-left: 0;" />
            </div>
          </section>
          <section class={ bem('body-column') }>
            {/* 营养评估 */}
            <NutritionalEvaluation report={ report } />
            {/* 附加数据 */}
            <AdditionalData report={ report } />
            {/* 肥胖分析 */}
            <ObesityDiagnosis report={ report } />
            {/* 肌肉均衡 */}
            <BodyBalance report={ report } />
            {/* 身体力量 */}
            <BodyStrength report={ report } />
            {/* 健康评分 */}
            <FitnessScore score={ measureData.score } />
            {/* 体重控制 */}
            <WeightControl report={ report } />
          </section>
        </section>
      </article>
    );
  },
});
