import * as React from 'react'
// import { Chart } from 'chart.js'

// /**
//  * 行
//  */
// export default class EButton extends React.Component<{ data: any }, {}> {
//     render() {
//         return <canvas id={this.props.data.hash}
//             width={this.props.data.width + 'px'}
//             height={this.props.data.height + 'px'}
//         />
//     }
//     componentDidMount() {
//         var canvas: any = document.getElementById(this.props.data.hash);
//         var ctx = canvas.getContext("2d");
//         var myRadarChart = new Chart(ctx, {
//             type: this.props.data.type,
//             data: this.props.data.data,
//             options: {
//                 legend: {
//                     position: 'right'
//                 },
//                 scales: {
//                     ticks: {
//                         beginAtZero: true,
//                         min: 0,
//                         max: 5
//                     }
//                 }
//             }
//         });
//     }
// }