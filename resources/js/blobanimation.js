import { spline } from '@georgedoescode/spline';
import { createNoise2D } from 'simplex-noise';

//Blob animation
const leftBlob = document.getElementById('left-blob')
const rightBlob = document.getElementById('right-blob')

function createPoints() {
    const points = []
    const numPoints = 6
    const angleStep = (Math.PI * 2) / numPoints
    const rad = 90

    for (let i = 1; i <= numPoints; i++) {
        const theta = i * angleStep

        const x = 100 + Math.cos(theta) * rad
        const y = 100 + Math.sin(theta) * rad

        points.push({
            x: x,
            y: y,
            originX: x,
            originY: y,
            noiseOffsetX: Math.random() * 1000,
            noiseOffsetY: Math.random() * 1000,
        })
    }
    return points
}

const points = createPoints()

function map(n, start1, end1, start2, end2) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2
}

const simplex = new createNoise2D()

let noiseStep = 0.003;

function noise(x, y) {
  return simplex(x, y);
};

(function animate() {
    leftBlob.setAttribute('d', spline(points, 1, true));
    rightBlob.setAttribute('d', spline(points, 1, true));
    
    requestAnimationFrame(animate)

    for (let i = 0; i < points.length; i++) {
        const point = points[i]

        const nX= noise(point.noiseOffsetX, point.noiseOffsetX)
        const nY= noise(point.noiseOffsetY, point.noiseOffsetY)

        const x = map(nX, -1, 1, point.originX - 10, point.originX + 10)
        const y = map(nY, -1, 1, point.originY - 10, point.originY + 10)

        point.x = x
        point.y = y

        point.noiseOffsetX += noiseStep
        point.noiseOffsetY += noiseStep
    }
})()
//End of animation