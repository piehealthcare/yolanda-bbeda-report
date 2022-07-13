# 八电极pdf打印报告展示页

[查看线上DEMO](https://qnplus-preview.yolanda.hk/h5-business-demo/eight-electrodes-report-views-public/h5/pdf.html?measureData=%7B"name":"张三","local_updated_at":"2021-08-31%2015:53","score":90,"gender":1,"birthday":"1994-08-08","height":170,"weight":"65.449997","bmi":"22.600000","bodyfat":"21.799999","bodyfat_left_arm":"1.08","bodyfat_left_leg":"3.62","bodyfat_right_arm":"1.15","bodyfat_right_leg":"3.86","bodyfat_trunk":"9.32","subfat":"19.900000","visfat":"6","water":"57.799999","bmr":"1475","body_age":"27","muscle":"42.933498","bone":"3.100000","sinew":"48.099998","sinew_left_arm":"2.50","sinew_left_leg":"7.37","sinew_right_arm":"2.81","sinew_right_leg":"8.63","sinew_trunk":"23.09","protein":"15.737200","lbm":"51.200001"%7D&config=%7B"lang":"zh_CN","fallbackLang":"en","weightUnit":"kg"%7D)

基于指标库[@yolanda-qn/eight-electrodes-report-lib](https://www.npmjs.com/package/@yolanda-qn/eight-electrodes-report-lib)

## 运行
```sh
yarn dev
```
在浏览器中打开 `http://localhost:3000/h5/pdf.html`

## 示例
```
http://localhost:3000/h5/pdf.html?measureData=%7B"name":"张三","local_updated_at":"2021-08-31 15:53","score":90,"gender":1,"birthday":"1994-08-08","height":170,"weight":"65.449997","bmi":"22.600000","bodyfat":"21.799999","bodyfat_left_arm":"1.08","bodyfat_left_leg":"3.62","bodyfat_right_arm":"1.15","bodyfat_right_leg":"3.86","bodyfat_trunk":"9.32","subfat":"19.900000","visfat":"6","water":"57.799999","bmr":"1475","body_age":"27","muscle":"42.933498","bone":"3.100000","sinew":"48.099998","sinew_left_arm":"2.50","sinew_left_leg":"7.37","sinew_right_arm":"2.81","sinew_right_leg":"8.63","sinew_trunk":"23.09","protein":"15.737200","lbm":"51.200001"%7D&config=%7B"lang":"zh_CN","fallbackLang":"en","weightUnit":"kg"%7D
```

## 地址栏所需参数
### measureData

|名称|类型|必须|说明|单位|
|:--|:--|:--:|:--|:--|
|name|string|Y|用户名|
|local_updated_at|string,number|Y|数据记录时间|
|gender |1和0 |Y|性别。1：男性，0：女性||
|birthday |string |Y|生日。例如：2021-06-17||
|height |number |Y|身体高度|cm|
|bmi |number |Y|BMI|kg/m²|
|bmr |number |Y|基础代谢量|kcal|
|body_age |number |Y|体年龄|岁|
|bodyfat |number |Y|体脂率|%|
|bodyfat_left_arm |number |Y|体脂率(左上肢)|%|
|bodyfat_left_leg |number |Y|体脂率(左下肢)|%|
|bodyfat_right_arm |number |Y|体脂率(右上肢)|%|
|bodyfat_right_leg |number |Y|体脂率(右下肢)|%|
|bodyfat_trunk |number |Y|体脂率(躯干)|%|
|bone|number |Y|骨量(又称无机盐)|kg|
|lbm|number|Y|去脂体重|kg|
|muscle |number |Y|骨骼肌率|%|
|protein |number |Y|蛋白质|%|
|subfat |number |Y|皮下脂肪|%|
|visfat |number |Y|内脏脂肪||
|water |number |Y|体水分|%|
|weight |number |Y|体重|kg|
|sinew |number |Y|肌肉量|kg|
|sinew_left_arm |number |Y|肌肉量(左上肢)|kg|
|sinew_left_leg |number |Y|肌肉量(左下肢)|kg|
|sinew_right_arm |number |Y|肌肉量(右上肢)|kg|
|sinew_right_leg |number |Y|肌肉量(右下肢)|kg|
|sinew_trunk |number |Y|肌肉量(躯干)|kg|
|score|number|Y|健康评分||

### config
|名称|类型|必须|默认值|说明|
|:--|:--|:--:|:--|:--|
|weightUnit|[WeightUnitEnum](#WeightUnitEnum)|N|kg|重量单位|
|lengthUnit|[LengthUnitEnum](#LengthUnitEnum)|N|cm|长度单位（用于用户信息那的身高展示，注意传入的身高一定要是cm单位的）|
|lang|[LangsEnum](#LangsEnum)|N|en|语言|
|fallbackLang|[LangsEnum](#LangsEnum)|N|en|回退语言|

### logoUrl
logo图标建议大小为 40x40
+ type: string
+ required: false

## WeightUnitEnum
重量单位枚举

|名称|值|说明|
|:--|:--|:--|
|kg|kg|
|lb|lb|
|st|st|对应海外版st_only标识
|st_lb|st_lb|对应海外版st标识
|jin|jin|斤

## LengthUnitEnum
长度单位枚举

|名称|值|说明|
|:--|:--|:--|
|cm|cm|
|inch|inch|
|ft|ft|英尺英寸展示方式，一般为 5'6"或者5'foot6"inch|
## LangsEnum
语种枚举。`建议只使用中文和英语`

|名称|值|说明|
|:--|:--|:--|
|zh_CN|zh_CN|简体中文|
|en|en|英语|
|zh_TW|zh_TW|繁体中文|
|ko|ko|韩语|
|jp|jp|日语|
|de|de|德语|
|fa|fa|法语|
|rus|rus|俄语|
|es|es|西班牙语|
|pt|pt|葡萄牙语|
|ar|ar|阿拉伯语|
|csy|csy|捷克语|
|it|it|意大利语|
|tr|tr|土耳其语|
|ro|ro|罗马尼亚语|
|hu|hu|匈牙利语|
|pl|pl|波兰语|
|sk|sk|斯洛伐克语|
|th|th|泰语|
|nl|nl|荷兰语|