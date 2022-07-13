import {
  defineComponent, PropType, toRef, computed,
} from 'vue';
import dayjs from 'dayjs';
import { useI18n } from 'vue-i18n';
import { util, consts } from '@yolanda-qn/eight-electrodes-report-lib';
import { transform, UnitEnum } from '@yolanda-qn/unit-transform';
import { TypeMeasureData } from '@/types/biz';
import style from './style.module.css';

const { UserGenderEnum } = consts;
const { calcAgeWithBirthday, getNewDateInstance, sealGenderParam } = util;

export default defineComponent({
  props: {
    measureData: {
      type: Object as PropType<TypeMeasureData>,
      default: () => ({}),
    },
    lengthUnit: {
      type: String,
      default: UnitEnum.CM,
    },
  },
  setup(props) {
    const { t } = useI18n();
    const refMeasureData = toRef(props, 'measureData');
    const {
      height,
      local_updated_at,
      name,
      birthday,
      gender,
    } = refMeasureData.value;
    const refLengthUnit = toRef(props, 'lengthUnit');
    const genderText = computed(() => {
      if (sealGenderParam(gender) === UserGenderEnum.male) {
        return /* '男' */ t('male');
      }

      return /* '女' */ t('female');
    });

    function formatHeight(height: number) {
      switch (refLengthUnit.value) {
        case UnitEnum.CM:
          return transform({
            value: height, from: UnitEnum.CM, to: UnitEnum.CM, fmt: '{0}cm',
          }).text;
        case UnitEnum.INCH:
          return transform({
            value: height, from: UnitEnum.CM, to: UnitEnum.INCH, fmt: '{0}inch',
          }).text;
        case UnitEnum.FT:
          return transform({
            value: height, from: UnitEnum.CM, to: UnitEnum.FT, fmt: '{0}\'{1}"',
          }).text;
        default:
          return height;
      }
    }

    return () => (
      <section class={style.userinfo}>
        <span>{/* 用户 */}{ t('user') }:{ name }</span>
        <span>{/* 身高 */}{ t('height') }:{ formatHeight(height) }</span>
        {
          false ? <span>{/* 年龄 */}{ t('age') }:{ calcAgeWithBirthday(getNewDateInstance(birthday)) }</span> : null
        }
        <span>{/* 生日  */}{ t('birthday') }: {birthday}</span>
        <span>{/* 性别 */}{ t('gender') }:{ genderText.value }</span>
        <span>{ dayjs(local_updated_at).format('YYYY/MM/DD HH:mm:ss') }</span>
      </section>
    );
  },
});
