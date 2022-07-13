// 上传指定项目文件到七牛云
// 需要 @yolanda-qn/qiniu-upload-cli 库

module.exports = {
  // 七牛云的ACCESS_KEY；required:true；type:string
  // ak不要暴露出去。只在命令行中输入 -A xxxx
  accessKey: '',
  // 七牛云的SECRET_KEY；required:true；type:string
  // sk不要暴露出去。只在命令行中输入 -S xxxx
  secretKey: '',
  // 要上传的存储空间；required:true；type:string
  bucket: 'qnplus-preview',
  // 区域服务器。可选：华东 | 华北 | 华南 | 北美；required:true；type:string
  zone: '华南',
  // 文件名。可使用 $(key)指代原文件名。例如：docs/$(key)；required:false；type:string
  key: 'h5-business-demo/eight-electrodes-report-views-public/$(key)',
  // 服务器域名；required:false；type:string
  domain: 'https://qnplus-preview.yolanda.hk',
  // 目标文件。支持glob路径。使用,隔开多个路径；required:true；type:string
  files: 'dist-demo/**,index.html',
  // 基路径；required:false；type:string
  baseUrl: 'dist-demo',
  // 是否需要刷新 CDN；required:false；type:boolean
  isRefreshCDN: true,
  // 七牛配置；required:false；type:
  // qiniuConfig: undefined,
  // 显示详细信息；required:false；type:boolean
  verbose: true,
  // 是否覆盖已存在的文件；required:false；type:boolean
  coverFileIfExist: true,
  // 是否与命令行进行确认交互；required:false；type:boolean
  interactive: true,
  // 是否自动重发失败的文件；required:false；type:boolean
  autoRetry: true,
  // 重新尝试次数；required:false；type:number
  retryTimes: 3,
  // 配置文件。默认为当前目录下的 qiniuupload.config.js；required:false；type:string
  // config: undefined,
};
