import {
  defineComponent, PropType, toRefs, watchEffect, ref,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { util, consts } from '@yolanda-qn/eight-electrodes-report-lib';
import style from './style.module.css';
import LineSegImage from '../../../../assets/images/muscle-line-seg.png';
import LineTrunkImage from '../../../../assets/images/muscle-line-trunk.png';
import LUIcon from '../../../../assets/icons/left-upper-limp.png';
import RUIcon from '../../../../assets/icons/right-upper-limp.png';
import LLIcon from '../../../../assets/icons/left-lower-limp.png';
import RLIcon from '../../../../assets/icons/right-lower-limp.png';
import TrunkIcon from '../../../../assets/icons/middle-limp.png';

export type TypeDataMeta = {
  percent: {
    value: string;
    unit: string;
  };
  mass: {
    value: string;
    unit: string;
  };
};

export default defineComponent({
  name: 'QnReportPageComponentsBodyBalanceDiagram',
  props: {
    legendText: {
      type: String as PropType<string>,
      default: '',
    },
    gender: {
      type: [String, Number] as PropType<string | number>,
      required: true,
    },
    data: {
      type: Object as PropType<{
        // 左上肢
        leftArm: TypeDataMeta;
        // 右上肢
        rightArm: TypeDataMeta;
        // 左下肢
        leftLeg: TypeDataMeta;
        // 右下肢
        rightLeg: TypeDataMeta;
        // 躯干
        trunk: TypeDataMeta;
      }>,
      required: true,
    },
  },
  setup(props) {
    const {
      legendText: refLegendText,
      gender: refGender,
      data: refData,
    } = toRefs(props);
    const refBodyImage = ref('');
    const { t } = useI18n();

    watchEffect(() => {
      if (util.sealGenderParam(refGender.value) === consts.UserGenderEnum.male) {
        import('../../../../assets/images/male-body-1.png').then((m) => {
          refBodyImage.value = m.default;
        });
      } else {
        import('../../../../assets/images/female-body-1.png').then((m) => {
          refBodyImage.value = m.default;
        });
      }
    });

    const renderCubeVNodes = () => ([
      {
        // name: '左上肢',
        name: t('left_arm'),
        icon: LUIcon,
        classList: [style.dataLTCube],
        data: refData.value.leftArm,
      },
      {
        // name: '右上肢',
        name: t('right_arm'),
        icon: RUIcon,
        classList: [style.dataRTCube],
        data: refData.value.rightArm,
      },
      {
        // name: '左下肢',
        name: t('left_leg'),
        icon: LLIcon,
        classList: [style.dataLBCube],
        data: refData.value.leftLeg,
      },
      {
        // name: '右下肢',
        name: t('right_leg'),
        icon: RLIcon,
        classList: [style.dataRBCube],
        data: refData.value.rightLeg,
      },
      {
        // name: '躯干',
        name: t('trunk'),
        icon: TrunkIcon,
        classList: [style.dataTrunkCube],
        data: refData.value.trunk,
      },
    ] as Array<{
      name: string;
      icon: string;
      classList?: string[];
      data: TypeDataMeta;
    }>).map((item) => (
      <div class={ [style.dataCube, ...(item.classList || [])] }>
        <div class={ style.dataCubeR1 }>
          <img src={ item.icon } alt="" class={ style.reportIcon } />
          { item.name }
        </div>
        <div class={ style.dataCubeR2 }>
          <div class={ style.dataCubeR2Wrap }>
            <span class={ style.legendIconSquare }></span>
            { item.data.percent.value }{ item.data.percent.unit }
          </div>
        </div>
        <div class={ style.dataCubeR3 }>
          <span class={ style.legendIconRound }></span>
          { item.data.mass.value }{ item.data.mass.unit }
        </div>
      </div>
    ));

    return () => (
      <div>
        <div class={ style.legends }>
          <div class={ style.legend }>
            <span class={ style.legendIconSquare }></span>
            {/* 与标准比 */ t('ratio_to_standard') }
          </div>
          <div class={ style.legend }>
            <span class={ style.legendIconRound }></span>
            { refLegendText.value }
          </div>
        </div>
        <div class={ style.bodyWrap }>
          <img src={ refBodyImage.value } alt="" class={ style.bodyImage } />
          <img src={ LineSegImage } alt="" class={ [style.lineSegImage, style.lineLTSegImage] } />
          <img src={ LineSegImage } alt="" class={ [style.lineSegImage, style.lineRTSegImage] } />
          <img src={ LineSegImage } alt="" class={ [style.lineSegImage, style.lineLBSegImage] } />
          <img src={ LineSegImage } alt="" class={ [style.lineSegImage, style.lineRBSegImage] } />
          <img src={ LineTrunkImage } alt="" class={ style.lineTrunkImage } />
          { renderCubeVNodes() }
        </div>
      </div>
    );
  },
});
