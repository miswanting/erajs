<template lang="pug">
.zdog-container
  canvas.zdog(width="150", height="150")
</template>
<script>
import Zdog from "zdog";
export default {
  props: { data: Object },
  mounted() {
    // let illo = new Zdog.Illustration({
    //   element: ".zdog",
    //   zoom: 3,
    // });
    const shapeList = {
      illo: new Zdog.Illustration({
        element: ".zdog",
        zoom: 3,
      }),
    };
    for (let i = 0; i < this.data.data.cmds.length; i++) {
      const cmd = this.data.data.cmds[i];
      // if (cmd.type==='Shape'){
      //   shapeList[cmd.name] = ZdogShape(cmd.data);
      // }
      // console.log(cmd);
      if (Object.hasOwnProperty.call(cmd.data, "addTo")) {
        cmd.data.addTo = shapeList[cmd.data.addTo];
      }
      // console.log(Zdog);
      // console.log(Zdog[cmd.type]);
      // const func = eval("Zdog[cmd.type]");
      // shapeList[cmd.name] = func(cmd.data);
      // console.log(func);
      shapeList[cmd.name] = new Zdog[cmd.type](cmd.data);
    }
    // let hips = new Zdog.Shape({
    //   addTo: illo,
    //   path: [{ x: -3 }, { x: 3 }],
    //   stroke: 4,
    //   color: "#636",
    // });
    // var leg = new Zdog.Shape({
    //   addTo: hips,
    //   path: [{ y: 0 }, { y: 12 }],
    //   translate: { x: -3 },
    //   rotate: { z: Zdog.TAU / 21 },
    //   color: "#636",
    //   stroke: 4,
    // });
    // var foot = new Zdog.RoundedRect({
    //   addTo: leg,
    //   width: 2,
    //   height: 4,
    //   cornerRadius: 1,
    //   translate: { y: 14, z: 2 },
    //   rotate: { x: Zdog.TAU / 4 },
    //   color: "#C25",
    //   fill: true,
    //   stroke: 4,
    // });
    // var standLeg = leg.copy({
    //   translate: { x: 3 },
    //   rotate: { z: -Zdog.TAU / 21 },
    // });
    // foot.copy({
    //   addTo: standLeg,
    //   // rotate: { x: -Zdog.TAU / 8 },
    // });
    // var spine = new Zdog.Anchor({
    //   addTo: hips,
    //   // rotate: { x: Zdog.TAU / 8 },
    // });
    // var chest = new Zdog.Shape({
    //   addTo: spine,
    //   path: [{ x: -1.5 }, { x: 1.5 }],
    //   translate: { y: -6.5 },
    //   stroke: 9,
    //   color: "#C25",
    // });

    // var head = new Zdog.Shape({
    //   addTo: chest,
    //   stroke: 12,
    //   translate: { y: -9.5 },
    //   color: "#EA0",
    // });

    // var eye = new Zdog.Ellipse({
    //   addTo: head,
    //   diameter: 2,
    //   quarters: 2,
    //   translate: { x: -2, y: 1, z: 4.5 },
    //   rotate: { z: -Zdog.TAU / 4 },
    //   color: "#636",
    //   stroke: 0.5,
    //   backface: false,
    // });
    // eye.copy({
    //   translate: { x: 2, y: 1, z: 4.5 },
    // });
    // // smile
    // new Zdog.Ellipse({
    //   addTo: head,
    //   diameter: 3,
    //   quarters: 2,
    //   translate: { y: 2.5, z: 4.5 },
    //   rotate: { z: Zdog.TAU / 4 },
    //   closed: true,
    //   color: "#FED",
    //   stroke: 0.5,
    //   fill: true,
    //   backface: false,
    // });
    // var upperArm = new Zdog.Shape({
    //   addTo: chest,
    //   path: [{ y: 0 }, { y: 6 }],
    //   translate: { x: -5, y: -2 },
    //   rotate: { z: Zdog.TAU / 6 },
    //   color: "#636",
    //   stroke: 4,
    // });

    // var forearm = new Zdog.Shape({
    //   addTo: upperArm,
    //   path: [{ y: 0 }, { y: 6 }],
    //   translate: { y: 6 },
    //   // rotate: { x: Zdog.TAU / 8 },
    //   color: "#EA0",
    //   stroke: 4,
    // });

    // // hand
    // new Zdog.Shape({
    //   addTo: forearm,
    //   translate: { z: 1, y: 6 },
    //   stroke: 6,
    //   color: "#EA0",
    // });

    // // arm on right
    // upperArm.copyGraph({
    //   translate: { x: 5, y: -2 },
    //   rotate: { z: -Zdog.TAU / 6 },
    // });

    function animate() {
      shapeList["illo"].rotate.y += 0.03;
      shapeList["illo"].updateRenderGraph();
      requestAnimationFrame(animate);
    }
    animate();
  },
};
</script>
<style lang="stylus" scoped>
.zdog-container
  text-align center

  .zdog
    height 150px !important
    width 150px !important
</style>