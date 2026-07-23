import { m as mousetrap } from "./mousetrap-7058277e.js";
const VueMousetrapPlugin = {
  install(app) {
    app.config.globalProperties.$mousetrap = mousetrap;
  }
};
export {
  VueMousetrapPlugin as V
};
