declare interface TypePageConfig {
  /**
   * 会注入到html的title标签中
   */
  title?: string;
  /**
   * 是否构建此页面
   */
  enable?: boolean;
  /**
   * rollupOptions.input的key名。默认为相对于src/views的目录路径
   */
  name?: string;
  /**
   * 模板文件是否禁止转换，默认false。默认会转换并在h5目录生成一个对应的模板文件
   */
  disableTemplateConvert?: boolean;
  /**
   * 模板文件。不指定则为项目根目录/template.html。@代表src目录
   */
  template?: string;
  /**
   * 入口文件。默认为当前config目录下的main.ts文件。@代表src目录
   */
  entry?: string;
}
