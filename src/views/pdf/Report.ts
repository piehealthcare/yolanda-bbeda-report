import { TypedConfig } from '@yolanda-qn/eight-electrodes-report-lib/dist/types/src/typings.d';
import { TypeReportItemObject } from '@yolanda-qn/eight-electrodes-report-lib/dist/types/src/ReportItem.d';
import getMeasureReports, { consts, ReportItem } from '@yolanda-qn/eight-electrodes-report-lib';
import { deepClone } from '@huyk/utils/dist/esm/helper';
import { TypeMeasureData } from '@/types/biz';

const { ReportBuilderIdsEnum } = consts;

export default class Report {
  readonly ReportBuilderIdsEnum = ReportBuilderIdsEnum;

  config!: TypedConfig;

  measureData!: TypeMeasureData;

  reportItems: Array<ReportItem> = [];

  constructor(measureData: TypeMeasureData, config: TypedConfig) {
    this.measureData = measureData;
    this.config = config;

    this.reportItems = getMeasureReports(measureData, this.config);
  }

  /**
   * 获取原始的ReportItem数组，请不要去改变里面的数据
   * @param {Array<ReportBuilderIdsEnum>} builderIds
   */
  pickRaw(builderIds: Array<consts.ReportBuilderIdsEnum>) {
    const ret: Array<ReportItem> = [];

    builderIds.forEach((builderId) => {
      const reportItem = this.reportItems.find((report) => report.getId() === (builderId as unknown as string));
      if (reportItem) {
        ret.push(reportItem);
      }
    });

    return ret;
  }

  pick(builderIds: Array<consts.ReportBuilderIdsEnum>): Array<TypeReportItemObject> {
    return deepClone(this.pickRaw(builderIds).map((item) => item.toObject()));
  }
}
