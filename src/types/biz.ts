import { genPageTemplateModel } from '@yolanda-qn/eight-electrodes-report-lib';
import { TypedScaleData } from '@yolanda-qn/eight-electrodes-report-lib/dist/types/src/typings.d';

export type TypeMeasureData = TypedScaleData & {
  name: string;
  local_updated_at: number | string;
}

export type TypeReportPageTemplateModel = ReturnType<typeof genPageTemplateModel>;
