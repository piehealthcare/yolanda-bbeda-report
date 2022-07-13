import './style.css';
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import getReports, { consts, genPageTemplateModel } from '@yolanda-qn/eight-electrodes-report-lib';
import type { TypedConfig } from '@yolanda-qn/eight-electrodes-report-lib/dist/types/src/typings.d';
// 引入所有语言
import locales from '@yolanda-qn/eight-electrodes-report-lib/dist/locales';
import { getUrlQuery } from '@huyk/utils/dist/esm/helper';
import { isNumeric } from '@huyk/utils/dist/esm/types';
import createNamespace from '@/assets/utils/createNamespace';
import type { TypeMeasureData } from '../../types/biz';
// 人体成分分析
import BodyCompositionAnalysis from './components/body-composition-analysis';
// 肌肉脂肪分析
import MuscleFatAnalysis from './components/muscle-fat-analysis';
// 肥胖分析
import ObesityAnalysis from './components/obesity-analysis';
// 体重控制
import WeightControl from './components/weight-control';
// 肌肉均衡
import BodyBalance from './components/body-balance';
// 阶段脂肪分析
import SegmentalFatAnalysis from './components/segmental-fat-analysis';
// 附加数据
import AdditionalData from './components/additional-data';

// 设置所有语言。默认只有简体中文和英语
getReports.i18n.setLangPack(locales);
// 设置回退语言
getReports.i18n.setFallbackLang('en');

const { name, bem } = createNamespace('report-page');

export default defineComponent({
  name,
  setup() {
    const queries = getUrlQuery(window.location.href);
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
    const config: TypedConfig = {
      lang: consts.LangsEnum.zh_CN,
      fallbackLang: consts.LangsEnum.en,
      weightUnit: consts.WeightUnitEnum.kg,
      ...JSON.parse(queries.config || '{}'),
    };

    /**
     * SECTION 设置vue-i18n
     */
    const { locale, fallbackLocale, t } = useI18n({ useScope: 'global' });
    locale.value = config.lang as string;
    fallbackLocale.value = config.fallbackLang as string;
    /* !SECTION */

    console.log('measureData', measureData, 'config', config);
    const templateModelData = genPageTemplateModel(measureData, config);
    console.log('templateModelData', templateModelData);

    // SECTION 设置主题颜色
    let { themeColor } = queries;

    if (themeColor) {
      const isHexColor = /^\w{6}$/.test(themeColor);
      themeColor = isHexColor ? `#${themeColor}`.replace(/#+/g, '#') : themeColor;

      document.body.style.setProperty('--theme-color', themeColor);
    }
    // !SECTION

    return () => (
      <article class={ bem() }>
        {/* 人体成分分析 */}
        <BodyCompositionAnalysis templateModelData={ templateModelData } gender={ measureData.gender } />
        {/* 肌肉脂肪分析 */}
        <MuscleFatAnalysis templateModelData={ templateModelData } />
        {/* 肥胖分析 */}
        <ObesityAnalysis templateModelData={ templateModelData } />
        {/* 体重控制 */}
        <WeightControl templateModelData={ templateModelData } />
        {/* 肌肉均衡 */}
        <BodyBalance templateModelData={ templateModelData } gender={ measureData.gender } />
        {/* 节段脂肪分析 */}
        <SegmentalFatAnalysis templateModelData={ templateModelData } gender={ measureData.gender } />
        {/* 附加数据 */}
        <AdditionalData templateModelData={ templateModelData } />
        <p class={ bem('impedance-tip') }>
          {/* *所有指标均是通过设备（脂肪秤）测量人体生物电阻抗后，结合人体成分组成得出，数值仅作为控制体型和长期健身参考使用，不作为医疗诊断的依据 */}
          *{ t('impedance_tip') }
        </p>
      </article>
    );
  },
});
