class Tools { }
namespace Singleton {
  init() {
    console.log(123);
  }
}
class DebugManager extends Singleton { }
class EventManager extends DebugManager { }
class DataManager extends EventManager { }
class ModManager extends DataManager { }
export class Engine extends ModManager { }
