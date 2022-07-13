import {
  defineComponent, PropType, toRef,
} from 'vue';
import { useI18n } from 'vue-i18n';
import bodyManPng from '@/views/pdf/assets/images/body-man.png';
import line1Image from '@/views/pdf/assets/images/line1.svg';
import line2Image from '@/views/pdf/assets/images/line2.svg';
import line3Image from '@/views/pdf/assets/images/line3.svg';
import line4Image from '@/views/pdf/assets/images/line4.svg';
import line5Image from '@/views/pdf/assets/images/line5.svg';
import style from './style.module.css';

type TypeDataItem = {
  percent: {
    value: string;
    unit: string;
  },
  mass: {
    value: string;
    unit: string;
  },
  levelIndex: number;
};

export default defineComponent({
  name: 'QnPdfPageComponentsDiagramLayout',
  props: {
    data: {
      type: Object as PropType<Record<'leftArm' | 'rightArm' | 'leftLeg' | 'rightLeg' | 'trunk', TypeDataItem>>,
      default: () => null,
    },
  },
  setup(props) {
    const { value: data } = toRef(props, 'data');
    const { t } = useI18n();
    const levelNameMapping = {
      0: /* '低标准' */ t('under'),
      1: /* '标准' */ t('standard'),
      2: /* '超标准' */ t('over'),
    };

    return () => (
      <div class={ style.diagramLayout }>
        <div class={ style.dataContent }>
          <img src={ bodyManPng } alt="" class={ style.bodyImage } />
          <img src={ line1Image } alt="" class={ style.leftArmLine } />
          <img src={ line2Image } alt="" class={ style.rightArmLine } />
          <img src={ line3Image } alt="" class={ style.trunkLine } />
          <img src={ line4Image } alt="" class={ style.leftLegLine } />
          <img src={ line5Image } alt="" class={ style.rightLegLine } />
          <div class={ [style.floatedDataBox, style.floatedDataBoxLeftArm] }>
            <p>{ data?.leftArm.mass.value }<span class={ style.unitText } >{ data?.leftArm.mass.unit }</span></p>
            <div class={ style.dashedLine }></div>
            <p>{ data?.leftArm.percent.value }<span class={ style.unitText } >{ data?.leftArm.percent.unit }</span></p>
            <div class={ style.dashedLine }></div>
            {/* @ts-ignore */}
            <p>{ levelNameMapping[data?.leftArm.levelIndex] }</p>
          </div>
          <div class={ [style.floatedDataBox, style.floatedDataBoxRightArm] }>
            <p>{ data?.rightArm.mass.value }<span class={ style.unitText } >{ data?.rightArm.mass.unit }</span></p>
            <div class={ style.dashedLine }></div>
            <p>{ data?.rightArm.percent.value }<span class={ style.unitText } >{ data?.rightArm.percent.unit }</span></p>
            <div class={ style.dashedLine }></div>
            {/* @ts-ignore */}
            <p>{ levelNameMapping[data?.rightArm.levelIndex] }</p>
          </div>
          <div class={ [style.floatedDataBox, style.floatedDataBoxTrunk] }>
            <p>{ data?.trunk.mass.value }<span class={ style.unitText } >{ data?.trunk.mass.unit }</span></p>
            <div class={ style.dashedLine }></div>
            <p>{ data?.trunk.percent.value }<span class={ style.unitText } >{ data?.trunk.percent.unit }</span></p>
            <div class={ style.dashedLine }></div>
            {/* @ts-ignore */}
            <p>{ levelNameMapping[data?.trunk.levelIndex] }</p>
          </div>
          <div class={ [style.floatedDataBox, style.floatedDataBoxLeftLeg] }>
            <p>{ data?.leftLeg.mass.value }<span class={ style.unitText } >{ data?.leftLeg.mass.unit }</span></p>
            <div class={ style.dashedLine }></div>
            <p>{ data?.leftLeg.percent.value }<span class={ style.unitText } >{ data?.leftLeg.percent.unit }</span></p>
            <div class={ style.dashedLine }></div>
            {/* @ts-ignore */}
            <p>{ levelNameMapping[data?.leftLeg.levelIndex] }</p>
          </div>
          <div class={ [style.floatedDataBox, style.floatedDataBoxRightLeg] }>
            <p>{ data?.rightLeg.mass.value }<span class={ style.unitText } >{ data?.rightLeg.mass.unit }</span></p>
            <div class={ style.dashedLine }></div>
            <p>{ data?.rightLeg.percent.value }<span class={ style.unitText } >{ data?.rightLeg.percent.unit }</span></p>
            <div class={ style.dashedLine }></div>
            {/* @ts-ignore */}
            <p>{ levelNameMapping[data?.rightLeg.levelIndex] }</p>
          </div>
        </div>
      </div>
    );
  },
});
