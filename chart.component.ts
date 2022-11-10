import { LitElement, html, css, customElement, property } from 'lit-element';
// import {
//   LitElement,
//   html,
//   css,
//   customElement,
//   property,
// } from 'lit-element/lit-element';
// import { LitElement/*,  customElement, property */ } from 'lit';
// import {css, customElement, property, state, query} from 'lit/decorators';
// import { customElement, property } from 'lit/decorators';
// import * as echart from 'echarts';

@customElement('app-chart')
export class AppChartElement extends LitElement {
  @property({ type: Array, attribute: 'chartData' }) public chartData: any[] =
    [];

  static styles = css``;

  // @property()
  // option = {
  //   xAxis: {
  //     type: 'category',
  //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //   },
  //   yAxis: {
  //     type: 'value',
  //   },
  //   series: [
  //     {
  //       data: [120, 200, 150, 80, 70, 110, 130],
  //       type: 'bar',
  //       showBackground: true,
  //       backgroundStyle: {
  //         color: 'rgba(180, 180, 180, 0.2)',
  //       },
  //     },
  //   ],
  // };

  protected render() {
    return html`
      <div class="d-flex w-100 p-5 chart-container" style="height: 100%">Hello there!</div>
    `;
  }
}
