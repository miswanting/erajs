import MapWorker from 'worker-loader!../workers/map.js';
import { EventEmitter } from 'events'

export default class MapWorkerManager extends EventEmitter {
  constructor() {
    super()
    this.mapWorker = new MapWorker();
  }

  generate(data) {
    this.mapWorker.postMessage({
      type: 'generate',
      data: data
    });
    this.mapWorker.addEventListener('message', pkg => {
      pkg = pkg.data
      if (pkg.type === 'PLANET_GENERATED') {
        this.emit(pkg.type, pkg)
      }
    })
  }
}