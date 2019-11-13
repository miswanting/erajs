import * as React from 'react'
import { Delaunay } from "d3-delaunay"
import * as d3 from 'd3'
import SimplexNoise from 'simplex-noise'
// function generateMap(size: [number, number], n: number) {
//     var points: [number, number][] = randomPoints(size, n) // 随机点
//     points = relaxPoints(points, 10, size) // 分散点
//     var nodes: object[] = generateNoise(points)
// }
// function randomPoints(size: [number, number], n: number) {
//     var points: [number, number][] = []
//     for (let i = 0; i < n; i++) {
//         let x = Math.random() * size[0]
//         let y = Math.random() * size[1]
//         points.push([x, y])
//     }
//     return points
// }
// function relaxPoints(points: [number, number][], n: number, size: [number, number]) {
//     for (let i = 0; i < n; i++) {
//         const delaunay = Delaunay.from(points);
//         const voronoi = delaunay.voronoi([0, 0, size[0], size[1]])
//         for (let j = 0; j < points.length; j++) {
//             var cvt: [number, number][] = []
//             for (let k = 0; k < voronoi.cellPolygon(j).length; k++) {
//                 var [x, y] = voronoi.cellPolygon(j)[k]
//                 cvt.push([x, y])
//             }
//             [points[j][0], points[j][1]] = d3.polygonCentroid(cvt);
//         }
//     }
//     return points
// }
// function generateNoise(points: [number, number][]) {
//     var nodes: object[]
//     const delaunay = Delaunay.from(points);
//     var simplex = new SimplexNoise()
//     for (let i = 0; i < points.length; i++) {
//         var node = {
//             i: i,
//             x: 0,
//             y: 0,
//             h: 0,
//             n: []
//         }
//         node.i = delaunay.points[2 * i]
//         node.x = delaunay.points[2 * i]
//         node.y = delaunay.points[2 * i + 1]
//         node.h = simplex.noise2D(node.x * 0.003, node.y * 0.003)
//         var n = delaunay.neighbors(i)
//         while (true) {
//             var next = n.next()
//             if (!next.done) {
//                 node.n.push(next.value)
//             } else {
//                 break
//             }
//         }
//         nodes.push(node)
//     }
//     return nodes
// }
export default class Map extends React.Component<{ data: any }, {}> {
    constructor(props: any) {
        super(props)
    }
    componentDidMount() {
        // 初始化
        const n = 5000
        const points = []
        document.getElementById('root').style.overflow = 'hidden'
        // 主流程
        randomPoints() // 随机点
        relaxPoints(10) // 分散点
        svgRender()
        //函数
        function randomPoints() {
            for (let i = 0; i < n; i++) {
                let x = Math.random() * window.innerWidth
                let y = Math.random() * window.innerHeight
                points.push([x, y])
            }
        }
        function relaxPoints(n) {
            for (let i = 0; i < n; i++) {
                const delaunay = Delaunay.from(points);
                const voronoi = delaunay.voronoi([0, 0, window.innerWidth, window.innerHeight])
                for (let j = 0; j < points.length; j++) {
                    var cvt: [number, number][] = []
                    for (let k = 0; k < voronoi.cellPolygon(j).length; k++) {
                        var [x, y] = voronoi.cellPolygon(j)[k]
                        cvt.push([x, y])
                    }
                    [points[j][0], points[j][1]] = d3.polygonCentroid(cvt);
                }
            }
        }
        function svgRender() {
            var simplex: any = new SimplexNoise()
            const delaunay = Delaunay.from(points);
            const voronoi = delaunay.voronoi([0, 0, window.innerWidth, window.innerHeight]);
            var zoom = d3.zoom().on('zoom', zoomed)
            function zoomed() {
                var transform = d3.zoomTransform(this);
                d3.select('#viewport').attr("transform", transform.toString())
            }
            var new_points = []
            var node = delaunay.hull
            for (let i = 0; i < delaunay.points.length / 2; i++) {
                var point = {
                    i: i,
                    x: delaunay.points[2 * i],
                    y: delaunay.points[2 * i + 1],
                    h: 0,
                    n: [],
                }
                var rate = simplex.noise2D(point.x * 0.003, point.y * 0.003)
                rate = (rate + 1) / 2
                let maxDis = (window.innerWidth + window.innerHeight) / 2
                let relDis = Math.abs(point.x - window.innerWidth / 2) + Math.abs(point.y - window.innerHeight / 2)
                let disRate = 100 - (1 - relDis / maxDis) * 99
                rate = Math.pow(rate, 1 / 10 * disRate)
                point.h = rate * 10000 - 2000 // [-2000, 8000]
                var tmp = delaunay.neighbors(i)
                while (true) {
                    var n = tmp.next()
                    if (n.done) { break }
                    point.n.push(n.value)
                }
                new_points.push(point)
                console.log(node.next);
            }

            d3.select('#root')
                .append('svg')
                .attr('id', 'svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight)
                .call(zoom)
                .append('g')
                .attr('id', 'viewport')
                .append('g')
                .attr('id', 'background')
                .append('rect')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight)
                .attr('fill', `rgb(60,81,195)`)
            d3.select('#viewport')
                .append('g')
                .attr('id', 'cells')
            d3.select('#svg')
                .append('g')
                .attr('id', 'ui')


            for (let i = 0; i < new_points.length; i++) {
                // if (value / 256 > 0.9) { // 白
                //     r = g = b = (value / 256 - 0.9) * 10 * 128 + 128
                // } else if (value / 256 > 0.8) { // 灰
                //     r = g = b = 50
                // } else if (value / 256 > 0.6) { // 深绿
                //     r = 27, g = 122, b = 34
                // } else if (value / 256 > 0.4) { // 浅绿
                //     r = 31, g = 192, b = 42
                // } else if (value / 256 > 0.2) { // 黄
                //     r = 243, g = 245, b = 65
                // } else if (value / 256 > 0.1) { // 浅蓝
                //     r = 60, g = 81, b = 195
                // } else { // 深蓝
                //     r = 25, g = 35, b = 93
                // }
                var r, g, b = 0
                if (new_points[i].h > 6000) { // 白
                    r = g = b = (new_points[i].h - 6000) / 2000 * 256 / 4 * 3 + 64
                } else if (new_points[i].h > 5000) { // 灰
                    r = g = b = 64
                } else if (new_points[i].h > 4000) { // 深绿
                    r = 27, g = 122, b = 34
                } else if (new_points[i].h > 1000) { // 浅绿
                    r = 31, g = 192, b = 42
                } else if (new_points[i].h > 0) { // 黄
                    r = 243, g = 245, b = 65
                } else if (new_points[i].h > -1000) { // 浅蓝
                    r = 60, g = 81, b = 195
                } else { // 深蓝
                    r = 25, g = 35, b = 93
                }
                if (new_points[i].h > 0) {
                    d3.select('#cells')
                        .append('g')
                        .append('path')
                        .attr('d', voronoi.renderCell(i))
                        .attr('fill', `rgb(${r},${g},${b})`)
                }
            }
        }
    }
    componentWillUnmount() {
        d3.select('svg').remove()
        document.getElementById('root').style.overflow = ''
    }
    render() {
        return <></>
    }
}