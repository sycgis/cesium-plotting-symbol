import Polyline from './Polyline'
import Cesium from 'cesium/Source/Cesium.js'
import * as mu from '../mapUtil.js'
import * as turf from '@turf/turf'

export default class LineArc extends Polyline {
  maxPointNum = 3

  calcuteShape (points, time) {
    if (points.length === 2) {
      return []
    }
    let ctls = points.map((p) => {
      let longLat = mu.cartesian2lonlat(p.position.getValue(time))
      return turf.point(longLat)
    })

    let b1 = turf.bearing(ctls[0], ctls[1])
    let b2 = turf.bearing(ctls[0], ctls[2])
    

    let d1 = turf.distance(ctls[0], ctls[1], {units: 'kilometers'})
    let d2 = turf.distance(ctls[0], ctls[2], {units: 'kilometers'})
    let radius = d1 > d2 ? d1 : d2
    let linestr = turf.lineArc(ctls[0], radius, b1, b2)
    let geometry = linestr.geometry.coordinates
    return geometry.map((p) => mu.lonlat2Cartesian(p))
  }
}