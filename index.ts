// import { LitElement, html, customElement } from 'lit-element';
// import './chart.component.ts';

import { ScalePayload } from './src/interfaces/scale-payload.interface';
import { ScalePayloadItemHandler } from './src/utils/scale.util';

// @customElement('app-root')
// export class AppElement extends LitElement {
//   private data: any[] = [1, 2, 3, 4];

//   render() {
//     return html`
//       <link
//         rel="stylesheet"
//         href="/node_modules/bootstrap/dist/css/bootstrap.min.css"
//       />
//       <div class="d-flex w-100 p-3">
//         <app-chart .chartData=${this.data}></app-chart>
//       </div>
//     `;
//   }
// }

import * as echarts from 'echarts';

const formatLength = 8760;
const threshold = 5000;
const payload: ScalePayload[] = [
  // {
  //   type: 'hour',
  //   target: 712,
  //   factor: 0.5,
  // },
  // {
  //   type: 'hour',
  //   value: 5,
  //   factor: 0.5,
  // },
  // {
  //   type: 'hour',
  //   from: 12,
  //   to: 14,
  //   factor: 0.75,
  // },
  // {
  //   type: 'hour',
  //   recurrent: true,
  //   from: 21,
  //   to: 23,
  //   factor: 0.1,
  // },
  // {
  //   type: 'day',
  //   target: 5,
  //   factor: 0.1,
  // },
  // {
  //   type: 'day',
  //   value: 5,
  //   factor: 0.25,
  // },
  // {
  //   type: 'day',
  //   from: 1,
  //   to: 2,
  //   factor: 0.25,
  // },
  {
    type: 'day',
    recurrent: true,
    from: 3,
    to: 7,
    factor: 0.25,
  },
];

function createRawData() {
  return Array.from({ length: formatLength }, () => threshold);
}

const rawData = createRawData();

for (let item of payload) {
  const result = ScalePayloadItemHandler.createHandler(item).build(rawData);

  console.log(`[result]`, result);

  // option.series = [{...option.series[0], data: rawData}];

  // initializeChart();
}

type EChartsOption = echarts.EChartsOption;

const chartDom: HTMLDivElement = document.querySelector('.chart-container')!;
const myChart = echarts.init(chartDom);
let option: EChartsOption;

option = {
  xAxis: {
    type: 'category',
    data: Array.from({ length: threshold }, (_, i) => i),
    // type: 'value',
    // position: 'top',
    // splitLine: {
    //   lineStyle: {
    //     type: 'dashed'
    //   }
    // }
  },
  yAxis: {
    type: 'value',
    data: rawData,
    // type: 'category',
    // axisLine: { show: false },
    // axisLabel: { show: false },
    // axisTick: { show: false },
    // splitLine: { show: false },
    // data: [
    //   'ten',
    //   'nine',
    //   'eight',
    //   'seven',
    //   'six',
    //   'five',
    //   'four',
    //   'three',
    //   'two',
    //   'one'
    // ]
  },
  series: [
    {
      data: rawData,
      // data: [
      //   { value: -0.07, /* label: labelRight */ },
      //   { value: -0.09, /* label: labelRight */ },
      //   0.2,
      //   0.44,
      //   { value: -0.23, /* label: labelRight */ },
      //   0.08,
      //   { value: -0.17, /* label: labelRight */ },
      //   0.47,
      //   { value: -0.36, /* label: labelRight */ },
      //   0.18
      // ],
      type: 'bar',
      barWidth: '60%',
      // barWidth: '60px',
      // showBackground: true,
      // backgroundStyle: {
      //   color: 'rgba(180, 180, 180, 0.2)',
      // },
    },
  ],
};

function initializeChart() {
  myChart.setOption(option);
}

// initializeChart();
