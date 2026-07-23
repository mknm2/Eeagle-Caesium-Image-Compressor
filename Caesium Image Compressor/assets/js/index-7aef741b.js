var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { r as ref, q as watchEffect, o as openBlock, c as createElementBlock, a as createBaseVNode, U as normalizeStyle, u as unref, C as renderSlot, t as inject, p as computed, W as reactive, e as onMounted, O as createBlock, P as withCtx, ad as createTextVNode, T as toDisplayString, R as createVNode, L as Fragment, aa as renderList, v as isRef, K as createCommentVNode, F as onUnmounted, S as withModifiers, M as normalizeClass, a8 as resolveComponent, bi as shallowReactive, w as watch, A as provide, a9 as resolveDirective, I as withDirectives, J as vShow, as as createApp, n as nextTick } from "./@vue-0eebc01a.js";
import { E as ElOption, a as ElSelect, b as ElButton, c as ElDialog, d as ElProgress, e as ElPopover, f as ElEmpty } from "./element-plus-2f5bc441.js";
import { C as ContextMenu } from "./@imengyu-1dadc161.js";
import { s as script$2 } from "./vue-virtual-scroller-672737a2.js";
import { q as queue } from "./async-f695ebb2.js";
import { V as VueTippy } from "./vue-tippy-cb89cc53.js";
import { V as VueMousetrapPlugin } from "./vue-mousetrap-4c5eceae.js";
import "./@element-plus-297660b7.js";
import "./@ctrl-ab5a38b7.js";
import "./@vueuse-9d6fe98e.js";
import "./@popperjs-8eb851c6.js";
import "./lodash-es-950acd6f.js";
import "./vue-5ea21888.js";
import "./vue-resize-c6d6f5ba.js";
import "./vue-observe-visibility-4ca4a959.js";
import "./mousetrap-7058277e.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const ImageVue_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$9 = { class: "image-vue" };
const _hoisted_2$7 = ["src", "alt"];
const _sfc_main$9 = {
  __name: "ImageVue",
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    src: {
      type: String,
      required: true
    },
    darkSrc: {
      type: String,
      required: false
    }
  },
  setup(__props) {
    const props = __props;
    const base_path = __dirname + "/images/";
    const THEME_SUPPORT2 = {
      Auto: !eagle.app.isDarkColors(),
      LIGHT: true,
      LIGHTGRAY: true,
      GRAY: false,
      DARK: false,
      BLUE: false,
      PURPLE: false
    };
    const uri = ref("");
    watchEffect(() => {
      uri.value = THEME_SUPPORT2[eagle.app.theme] ? props.src : props.darkSrc ?? props.src;
    });
    eagle.onThemeChanged((theme) => {
      uri.value = THEME_SUPPORT2[theme] ? props.src : props.darkSrc ?? props.src;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$9, [
        createBaseVNode("img", {
          style: normalizeStyle({
            width: props.width + "px",
            height: props.height + "px"
          }),
          src: base_path + unref(uri),
          alt: unref(uri),
          loading: "lazy"
        }, null, 12, _hoisted_2$7),
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
};
const t = (s, options) => {
  s = s == null ? void 0 : s.split(" ").map((s2, i) => i == 0 ? s2 : s2.charAt(0).toUpperCase() + s2.slice(1)).join("");
  return i18next.t(s, options);
};
function useContextMenu(items) {
  ContextMenu.showContextMenu({
    x: event.x,
    y: event.y,
    items
  });
}
const keyboard = (s) => {
  s = s.toLowerCase();
  const data = [
    ["ctrl", "⌘"],
    ["alt", "⌥"],
    ["shift", "⇧"]
  ];
  if (eagle.app.isMac) {
    for (let i of data) {
      s = s.replace(i[0], i[1]);
    }
  } else {
    for (let i of data) {
      s = s.replace(i[1], i[0]);
    }
  }
  return s;
};
const SettingDialogVue_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$8 = { class: "title" };
const _hoisted_2$6 = { class: "format" };
const _hoisted_3$6 = { class: "algorithm" };
const _hoisted_4$3 = { class: "quality" };
const _hoisted_5$3 = { class: "format" };
const _hoisted_6$1 = { class: "algorithm" };
const _hoisted_7$1 = { style: { "width": "75px" } };
const _hoisted_8$1 = { style: { "color": "var(--color-text-tertiary)" } };
const _hoisted_9 = { class: "quality" };
const _hoisted_10 = {
  key: 1,
  style: { "padding": "0 16px" }
};
const _sfc_main$8 = {
  __name: "SettingDialogVue",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const main2 = inject("main");
    const visible = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value)
    });
    const default_setting = reactive({
      jpg: {
        algorithm: localStorage.getItem(
          `eagle.plugin.${eagle.plugin.manifest.id}.setting.jpg.algorithm`
        ) ?? "MozJPEG",
        quality: localStorage.getItem(`eagle.plugin.${eagle.plugin.manifest.id}.setting.jpg.quality`) ?? 80
      },
      png: {
        algorithm: localStorage.getItem(
          `eagle.plugin.${eagle.plugin.manifest.id}.setting.png.algorithm`
        ) ?? "oxipng",
        quality: localStorage.getItem(`eagle.plugin.${eagle.plugin.manifest.id}.setting.png.quality`) ?? 80
      },
      gif: {
        algorithm: "gifski",
        quality: localStorage.getItem(`eagle.plugin.${eagle.plugin.manifest.id}.setting.gif.quality`) ?? 80
      },
      webp: {
        algorithm: localStorage.getItem(
          `eagle.plugin.${eagle.plugin.manifest.id}.setting.webp.algorithm`
        ) ?? "libwebp",
        quality: localStorage.getItem(`eagle.plugin.${eagle.plugin.manifest.id}.setting.webp.quality`) ?? 80
      },
      svg: {
        algorithm: "svgo"
      }
    });
    const setting = {
      jpg: {
        format: "JPEG",
        algorithm: {
          "MozJPEG": {
            lossy: true
          },
          "MozJPEG​": {
            lossy: false
          }
        }
      },
      png: {
        format: "PNG",
        algorithm: {
          "imagequant": {
            lossy: true
          },
          "oxipng": {
            lossy: false
          }
        }
      },
      gif: {
        format: "GIF",
        algorithm: {
          "gifski": {
            lossy: true
          }
        }
      },
      svg: {
        format: "SVG",
        algorithm: {
          "svgo": {
            lossy: false
          }
        }
      },
      webp: {
        format: "WEBP",
        algorithm: {
          "libwebp": {
            lossy: true
          },
          "libwebp​": {
            lossy: false
          }
        }
      }
    };
    const save = () => {
      for (let [key, value] of Object.entries(default_setting)) {
        for (let [k, v] of Object.entries(value)) {
          localStorage.setItem(`eagle.plugin.${eagle.plugin.manifest.id}.setting.${key}.${k}`, v);
          main2.setting[key][k] = v;
        }
      }
      visible.value = false;
      console.log("saved");
    };
    onMounted(() => {
      save();
    });
    return (_ctx, _cache) => {
      const _component_ImageVue = _sfc_main$9;
      const _component_el_option = ElOption;
      const _component_el_select = ElSelect;
      const _component_el_button = ElButton;
      const _component_el_dialog = ElDialog;
      return openBlock(), createBlock(_component_el_dialog, {
        modelValue: unref(visible),
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(visible) ? visible.value = $event : null),
        "append-to-body": "",
        "align-center": "",
        class: "setting-dialog-vue"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$8, [
            createTextVNode(toDisplayString(unref(t)("main.setting.title")) + " ", 1),
            createVNode(_component_ImageVue, {
              class: "icon close",
              width: "24",
              height: "24",
              src: "light/ic-dialog-close.svg",
              darkSrc: "dark/ic-dialog-close.svg",
              onClick: _cache[0] || (_cache[0] = ($event) => visible.value = false)
            })
          ]),
          createBaseVNode("table", null, [
            createBaseVNode("thead", null, [
              createBaseVNode("tr", null, [
                createBaseVNode("th", _hoisted_2$6, toDisplayString(unref(t)("main.setting.format")), 1),
                createBaseVNode("th", _hoisted_3$6, toDisplayString(unref(t)("main.setting.algorithm")), 1),
                createBaseVNode("th", _hoisted_4$3, toDisplayString(unref(t)("main.setting.quality")), 1)
              ])
            ]),
            createBaseVNode("tbody", null, [
              (openBlock(), createElementBlock(Fragment, null, renderList(setting, (value, key) => {
                return createBaseVNode("tr", { key }, [
                  createBaseVNode("td", _hoisted_5$3, toDisplayString(value.format), 1),
                  createBaseVNode("td", _hoisted_6$1, [
                    createVNode(_component_el_select, {
                      modelValue: default_setting[key].algorithm,
                      "onUpdate:modelValue": ($event) => default_setting[key].algorithm = $event,
                      placement: "bottom",
                      class: "is-input"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(value.algorithm, (data, algorithm) => {
                          return openBlock(), createBlock(_component_el_option, {
                            key: algorithm,
                            value: algorithm
                          }, {
                            default: withCtx(() => [
                              createBaseVNode("span", _hoisted_7$1, toDisplayString(algorithm), 1),
                              createBaseVNode("span", _hoisted_8$1, toDisplayString(data.lossy ? unref(t)("main.setting.lossy") : unref(t)("main.setting.noLossy")), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1032, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createBaseVNode("td", _hoisted_9, [
                    setting[key].algorithm[default_setting[key].algorithm].lossy ? (openBlock(), createBlock(_component_el_select, {
                      key: 0,
                      modelValue: default_setting[key].quality,
                      "onUpdate:modelValue": ($event) => default_setting[key].quality = $event,
                      placement: "bottom",
                      class: "is-input"
                    }, {
                      default: withCtx(() => [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(Array.from(
                          { length: (100 - 5) / 5 + 1 },
                          (_, i) => 5 + i * 5
                        ).reverse(), (quality) => {
                          return openBlock(), createBlock(_component_el_option, {
                            key: quality,
                            value: quality
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(quality), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1032, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createElementBlock("span", _hoisted_10, "-"))
                  ])
                ]);
              }), 64))
            ])
          ]),
          createVNode(_component_el_button, {
            type: "primary",
            class: "save",
            onClick: save
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(t)("main.setting.save")), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
};
const DialogVue_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$7 = { class: "dialog-container" };
const _hoisted_2$5 = { class: "main" };
const _hoisted_3$5 = { class: "title" };
const _hoisted_4$2 = { class: "description" };
const _hoisted_5$2 = { class: "action" };
const _sfc_main$7 = {
  __name: "DialogVue",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
      required: true
    },
    type: {
      type: String,
      default: "warning",
      required: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    showOkBtn: {
      type: Boolean,
      default: true
    }
  },
  emits: ["ok", "cancel", "update:modelValue"],
  setup(__props, { emit }) {
    const props = __props;
    const ok = () => {
      emit("ok");
      visible.value = false;
    };
    const cancel = () => {
      emit("cancel");
      visible.value = false;
    };
    const visible = computed({
      get: () => props.modelValue,
      set: (value) => {
        emit("update:modelValue", value);
      }
    });
    return (_ctx, _cache) => {
      const _component_ImageVue = _sfc_main$9;
      const _component_el_button = ElButton;
      const _component_el_dialog = ElDialog;
      return openBlock(), createBlock(_component_el_dialog, {
        modelValue: unref(visible),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(visible) ? visible.value = $event : null),
        class: "dialog-vue",
        "append-to-body": "",
        "align-center": "",
        onClose: cancel,
        "close-on-click-modal": props.closeOnClickModal
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$7, [
            createVNode(_component_ImageVue, {
              class: "dialog-icon",
              width: "36",
              height: "36",
              src: `light/base/dialog-${props.type}.png`,
              darkSrc: `dark/base/dialog-${props.type}.png`
            }, null, 8, ["src", "darkSrc"]),
            createBaseVNode("div", _hoisted_2$5, [
              createBaseVNode("div", _hoisted_3$5, [
                renderSlot(_ctx.$slots, "title", {}, () => [
                  createTextVNode("title")
                ])
              ]),
              createBaseVNode("div", _hoisted_4$2, [
                renderSlot(_ctx.$slots, "description", {}, () => [
                  createTextVNode("description")
                ])
              ]),
              createBaseVNode("div", _hoisted_5$2, [
                props.showCancelBtn ? (openBlock(), createBlock(_component_el_button, {
                  key: 0,
                  class: "cancel",
                  type: "",
                  onClick: cancel
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "cancel", {}, () => [
                      createTextVNode("cancel")
                    ])
                  ]),
                  _: 3
                })) : createCommentVNode("", true),
                props.showOkBtn ? (openBlock(), createBlock(_component_el_button, {
                  key: 1,
                  class: "ok",
                  type: "primary",
                  onClick: ok
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "ok", {}, () => [
                      createTextVNode("ok")
                    ])
                  ]),
                  _: 3
                })) : createCommentVNode("", true)
              ])
            ])
          ])
        ]),
        _: 3
      }, 8, ["modelValue", "close-on-click-modal"]);
    };
  }
};
const DropZoneVue_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$6 = ["onDragenter"];
const _hoisted_2$4 = ["onDragleave", "onDrop"];
const _hoisted_3$4 = { class: "tip" };
const _sfc_main$6 = {
  __name: "DropZoneVue",
  props: {
    style: {
      type: Boolean,
      default: true
    }
  },
  emits: ["drop"],
  setup(__props, { emit }) {
    const props = __props;
    const active = ref(false);
    const onDrop = (e) => {
      setInactive();
      const files = [...e.dataTransfer.files];
      emit("drop", files);
    };
    function setActive() {
      active.value = true;
    }
    function setInactive() {
      active.value = false;
    }
    const events = ["dragenter", "dragover", "dragleave", "drop"];
    function preventDefaults(e) {
      e.preventDefault();
    }
    onMounted(() => {
      events.forEach((eventName) => {
        document.body.addEventListener(eventName, preventDefaults);
      });
    });
    onUnmounted(() => {
      events.forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults);
      });
    });
    return (_ctx, _cache) => {
      const _component_ImageVue = _sfc_main$9;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["drop-zone-vue", {
          dropping: unref(active),
          "no-style": !props.style
        }]),
        onDragenter: withModifiers(setActive, ["prevent", "stop"])
      }, [
        renderSlot(_ctx.$slots, "default"),
        createBaseVNode("div", {
          class: "overlay",
          onDragleave: withModifiers(setInactive, ["prevent", "stop"]),
          onDrop: withModifiers(onDrop, ["prevent", "stop"])
        }, [
          createBaseVNode("div", _hoisted_3$4, [
            createVNode(_component_ImageVue, {
              width: "16",
              height: "16",
              src: "normal/base/ic-drop-zone-download.svg"
            }),
            createTextVNode(" " + toDisplayString(unref(t)("component.dropZone.tip")), 1)
          ])
        ], 40, _hoisted_2$4)
      ], 42, _hoisted_1$6);
    };
  }
};
const FooterVue_vue_vue_type_style_index_0_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$5 = {};
const _hoisted_1$5 = { class: "footer-vue" };
const _hoisted_2$3 = { class: "setting" };
const _hoisted_3$3 = { class: "action" };
function _sfc_render$1(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$5, [
    renderSlot(_ctx.$slots, "default"),
    createBaseVNode("div", _hoisted_2$3, [
      renderSlot(_ctx.$slots, "setting")
    ]),
    createBaseVNode("div", _hoisted_3$3, [
      renderSlot(_ctx.$slots, "action")
    ])
  ]);
}
const __unplugin_components_7 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$1]]);
const BodyVue_vue_vue_type_style_index_0_lang = "";
const _sfc_main$4 = {};
const _hoisted_1$4 = { class: "body-vue" };
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
const __unplugin_components_3 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render]]);
const VirtualTableVue_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$3 = { class: "v-table" };
const _hoisted_2$2 = { class: "v-thead" };
const _hoisted_3$2 = { class: "v-tr" };
const _sfc_main$3 = {
  __name: "VirtualTableVue",
  props: {
    header: {
      type: Object,
      default(rawProps) {
        return {
          name: "",
          minWidth: null,
          maxWidth: null,
          align: "start",
          fill: false,
          line: false
        };
      },
      required: true
    },
    data: { type: Array, required: true },
    autoScrollDelay: { type: Number, default: 10 }
  },
  setup(__props, { expose: __expose }) {
    const props = __props;
    let thead = [];
    Object.entries(props.header).forEach((item) => {
      const [key, value] = item;
      const width = measureText(value.name).width;
      thead.push({
        key,
        ...value,
        width: `${width}px`,
        minWidth: value.minWidth ? `${value.minWidth}px` : "auto",
        maxWidth: value.maxWidth ? `${value.maxWidth}px` : "auto"
      });
    });
    const list = computed(() => {
      const ar = [];
      for (let i = 0; i < props.data.length; i++) {
        ar.push({ id: i, data: props.data[i] });
      }
      return ar;
    });
    function measureText(pText) {
      let div = document.createElement("div");
      document.body.appendChild(div);
      div.style.position = "absolute";
      div.style.left = -1e3;
      div.style.top = -1e3;
      div.style.fontSize = "14px";
      div.textContent = pText;
      let result = {
        width: div.clientWidth,
        height: div.clientHeight
      };
      document.body.removeChild(div);
      div = null;
      return result;
    }
    const scrollerEl = ref(null);
    const currentDelay = ref(0);
    const onWheel = () => {
      currentDelay.value = props.autoScrollDelay;
    };
    onMounted(() => {
      setInterval(() => {
        if (currentDelay.value > 0)
          currentDelay.value--;
      }, 1e3);
    });
    const scroll = (index) => {
      const visibleLength = 6;
      if (index < visibleLength || index >= props.data.length)
        return;
      if (currentDelay.value <= 0) {
        scrollerEl.value.scrollToItem(index - visibleLength);
      }
    };
    __expose({
      scroll
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("div", _hoisted_3$2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(thead), (value, index) => {
              return openBlock(), createElementBlock("div", {
                class: normalizeClass(["v-td", { fill: value.fill, line: value.line }]),
                style: normalizeStyle({
                  width: value.width,
                  minWidth: value.minWidth,
                  maxWidth: value.maxWidth,
                  justifyContent: "flex-" + value.align
                }),
                key: index
              }, toDisplayString(value.name), 7);
            }), 128))
          ])
        ]),
        createVNode(unref(script$2), {
          class: "v-tbody",
          items: unref(list),
          "item-size": 41,
          buffer: 200,
          ref_key: "scrollerEl",
          ref: scrollerEl,
          "key-field": "id",
          onWheel
        }, {
          default: withCtx(({ item, index }) => [
            createBaseVNode("div", {
              class: normalizeClass(["v-tr", { striped: index % 2 == 1 }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(thead), (value) => {
                return openBlock(), createElementBlock("div", {
                  class: normalizeClass(["v-td", {
                    fill: value.fill
                  }]),
                  style: normalizeStyle({
                    width: value.width,
                    minWidth: value.minWidth,
                    maxWidth: value.maxWidth,
                    justifyContent: "flex-" + value.align
                  }),
                  key: value
                }, [
                  renderSlot(_ctx.$slots, value.key, {
                    row: item.data,
                    index
                  }, () => [
                    createTextVNode(toDisplayString(item.data[value.key]), 1)
                  ])
                ], 6);
              }), 128))
            ], 2)
          ]),
          _: 3
        }, 8, ["items"])
      ]);
    };
  }
};
const _hoisted_1$2 = { style: { "margin-right": "2px" } };
const _sfc_main$2 = {
  __name: "ThumbtackVue",
  setup(__props) {
    const mousetrap = inject("mousetrap");
    const isAlwaysOnTop = ref(false);
    const toggleAlwaysOnTop = async () => {
      isAlwaysOnTop.value = !isAlwaysOnTop.value;
      await eagle.window.setAlwaysOnTop(isAlwaysOnTop.value);
    };
    onMounted(async () => {
      mousetrap.bind(["shift+t"], toggleAlwaysOnTop);
      isAlwaysOnTop.value = await eagle.window.isAlwaysOnTop();
    });
    return (_ctx, _cache) => {
      const _component_ImageVue = _sfc_main$9;
      const _component_key = resolveComponent("key");
      const _component_tippy = resolveComponent("tippy");
      return openBlock(), createBlock(_component_tippy, {
        allowHTML: "",
        placement: "left",
        duration: "[200,0]"
      }, {
        default: withCtx(() => [
          createVNode(_component_ImageVue, {
            class: normalizeClass(["icon", {
              "icon-active": unref(isAlwaysOnTop)
            }]),
            width: "24",
            height: "24",
            src: unref(isAlwaysOnTop) ? "light/base/ic-thumbtack-pinned.svg" : "light/base/ic-thumbtack.svg",
            darkSrc: unref(isAlwaysOnTop) ? "dark/base/ic-thumbtack-pinned.svg" : "dark/base/ic-thumbtack.svg",
            onClick: toggleAlwaysOnTop
          }, null, 8, ["class", "src", "darkSrc"])
        ]),
        content: withCtx(() => [
          createBaseVNode("span", _hoisted_1$2, toDisplayString(unref(isAlwaysOnTop) ? unref(t)("header.thumbtack.isNotAlwaysOnTop") : unref(t)("header.thumbtack.isAlwaysOnTop")), 1),
          createVNode(_component_key, null, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(unref(keyboard)("Shift")), 1)
            ]),
            _: 1
          }),
          createVNode(_component_key, null, {
            default: withCtx(() => [
              createTextVNode("T")
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
const _imports_0 = "" + new URL("../../logo.png", import.meta.url).href;
const HeaderVue_vue_vue_type_style_index_0_lang = "";
const _hoisted_1$1 = { class: "header-vue" };
const _hoisted_2$1 = { class: "drag" };
const _hoisted_3$1 = /* @__PURE__ */ createBaseVNode("img", {
  class: "logo",
  src: _imports_0,
  alt: "logo"
}, null, -1);
const _hoisted_4$1 = { class: "title" };
const _hoisted_5$1 = { class: "action" };
const _sfc_main$1 = {
  __name: "HeaderVue",
  setup(__props) {
    const title = eagle.plugin.manifest.name;
    const closeDialog = reactive({
      visible: false,
      type: "warning",
      ok: () => {
        window.close();
      }
    });
    return (_ctx, _cache) => {
      const _component_ThumbtackVue = _sfc_main$2;
      const _component_ImageVue = _sfc_main$9;
      const _component_DialogVue = _sfc_main$7;
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("div", _hoisted_1$1, [
          createBaseVNode("div", _hoisted_2$1, [
            _hoisted_3$1,
            createBaseVNode("span", _hoisted_4$1, toDisplayString(unref(title)), 1)
          ]),
          createBaseVNode("div", _hoisted_5$1, [
            renderSlot(_ctx.$slots, "default"),
            createVNode(_component_ThumbtackVue),
            createVNode(_component_ImageVue, {
              class: "icon close",
              width: "24",
              height: "24",
              src: "light/base/ic-header-close.svg",
              darkSrc: "dark/base/ic-header-close.svg",
              onClick: _cache[0] || (_cache[0] = ($event) => unref(closeDialog).visible = true)
            })
          ])
        ]),
        createVNode(_component_DialogVue, {
          modelValue: unref(closeDialog).visible,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => unref(closeDialog).visible = $event),
          type: unref(closeDialog).type,
          onOk: unref(closeDialog).ok
        }, {
          title: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("header.dialog.exit.title")), 1)
          ]),
          description: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("header.dialog.exit.description")), 1)
          ]),
          cancel: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("header.dialog.exit.cancel")), 1)
          ]),
          ok: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("header.dialog.exit.ok")), 1)
          ]),
          _: 1
        }, 8, ["modelValue", "type", "onOk"])
      ], 64);
    };
  }
};
class Task {
  constructor(args) {
    this.id = args.id ?? crypto.randomUUID();
    this.name = args.name;
    this.ext = args.ext;
    this.size = args.size;
    this.filePath = args.filePath;
    this.result = {
      state: "waiting",
      message: "",
      data: null
    };
    this.is_eagle = args.is_eagle ?? true;
  }
  isWaiting() {
    return this.result.state === "waiting";
  }
  isProcessing() {
    return this.result.state === "processing";
  }
  isSuccess() {
    return this.result.state === "success";
  }
  isFailed() {
    return this.result.state === "failed";
  }
  waiting() {
    this.result.state = "waiting";
    this.result.message = "";
    this.result.data = null;
  }
  processing(process2 = 0) {
    this.result.state = "processing";
    this.result.message = "";
    this.result.data = process2;
  }
  success(data = null) {
    this.result.state = "success";
    this.result.message = "";
    this.result.data = data;
  }
  failed(message = "") {
    this.result.state = "failed";
    this.result.message = message;
    this.result.data = null;
  }
}
class Queue {
  constructor(data = []) {
    this.data = [];
    this.dataMap = {};
    this.type = ["success", "waiting", "failed"];
    for (let i of this.type) {
      this[i] = [];
    }
    this.queue = null;
    this.concurrency = 3;
    this.isWorking = false;
    this.enqueue(data);
  }
  get length() {
    return this.data.length;
  }
  get completed() {
    return [...this.success, ...this.failed];
  }
  enqueue(data, index = Infinity) {
    const ar = [data].flat(Infinity);
    for (let i = 0; i < ar.length; i++) {
      const task = new Task(ar[i]);
      if (this.dataMap[task.id])
        continue;
      this.dataMap[task.id] = task;
      this.data.splice(index + i, 0, task);
      this.waiting.splice(index + i, 0, task);
      if (this.queue)
        this.queue.push(task);
    }
  }
  dequeue(index = 0) {
    const task = this.data.splice(index, 1)[0];
    delete this.dataMap[task.id];
    for (let i of this.type) {
      const index2 = this[i].indexOf(task);
      if (index2 !== -1)
        this[i].splice(index2, 1);
    }
    if (this.queue) {
      this.queue.remove(({ data, priority }) => {
        return data.id === task.id;
      });
    }
    return task;
  }
  async start({
    onProcess = async () => {
    },
    onSuccess = async () => {
    },
    onFailed = async () => {
    }
  }) {
    this.isWorking = true;
    this.queue = queue(async (task, callback = () => {
    }) => {
      task.processing();
      const result = await onProcess(task);
      await onSuccess(result);
      await task.success(result);
      this.success.push(task);
      callback();
    }, this.concurrency);
    this.queue.error(async (err, task) => {
      err = err.message;
      await task.failed(err);
      this.failed.push(task);
    });
    this.queue.push(this.waiting.splice(0));
    await this.queue.drain();
    this.queue = null;
    this.isWorking = false;
  }
  clear(type = "data") {
    console.time("remove data : " + type);
    const set = new Set(this[type]);
    this.data = this.data.filter((task) => !set.has(task));
    this[type] = [];
    console.timeEnd("remove data : " + type);
  }
}
const { ImageCompressor } = require(`${__dirname}/modules`);
const fs = require("node:fs");
const utils$1 = require(`${__dirname}/modules/utils`);
class Main {
  constructor() {
    __publicField(this, "compareSize", (size, convertedSize) => {
      const diff = convertedSize / size * 100 - 100;
      return diff >= 0 ? Math.ceil(diff) : Math.floor(diff);
    });
    this.isLoading = false;
    this.currentProcessIndex = 0;
    this.flesh = -1;
    this.taskQueue = new Queue();
    this.tempFolder = `${__dirname}/temp/`;
    this.setting = {
      jpg: {
        algorithm: "MozJPEG",
        quality: 80
      },
      png: {
        algorithm: "oxipng",
        quality: 80
      },
      gif: {
        algorithm: "gifski",
        quality: 80
      },
      webp: {
        algorithm: "libwebp",
        quality: 80
      },
      svg: {
        algorithm: "svgo"
      }
    };
    this.tempFolder = `${__dirname}/temp/`;
    ImageCompressor.createTempFolder(this.tempFolder);
  }
  async loadData() {
    this.isLoading = true;
    const items = await eagle.item.getSelected();
    this.taskQueue.enqueue(items);
    this.isLoading = false;
  }
  async convert() {
    this.currentProcessIndex = 0;
    await this.taskQueue.start({
      onProcess: async (task) => {
        eagle.log.info(`start compressing #${task.id} : ${task.name}.${task.ext}`);
        this.currentProcessIndex++;
        const inputFilePath = task.filePath;
        try {
          if (!["gif", "jpg", "png", "webp", "svg", "jpeg"].includes(
            task.ext.toLowerCase()
          ))
            throw "file extension not supported";
          await utils$1.image.preVerify(inputFilePath, {
            checkSupportFileSize: true,
            checkSupportResolution: true
          });
          const id = task.id;
          const ext = {
            jpeg: "jpg",
            jpg: "jpg",
            png: "png",
            gif: "gif",
            "svg+xml": "svg",
            svg: "svg",
            webp: "webp"
          }[task.ext];
          const outputFilePath = require("path").normalize(
            `${this.tempFolder}/${id}.${ext}`
          );
          await ImageCompressor.compress(
            inputFilePath,
            outputFilePath,
            this.setting[ext],
            ext
          );
          await utils$1.image.postVerify(inputFilePath, outputFilePath, {
            checkEqualResolution: false,
            checkHistogramsAbnormality: false,
            checkFileSize: true
          });
          let convertedSize = fs.statSync(outputFilePath).size;
          let compareSize = this.compareSize(task.size, convertedSize);
          if (convertedSize >= task.size) {
            convertedSize = task.size;
            compareSize = 0;
          } else {
            if (task.is_eagle) {
              if(localStorage.getItem('eagle.plugin.1df3c39d-da57-497f-814d-1d48ce9bd666.setting.exportMode')!=='true')await (await eagle.item.getById(id)).replaceFile(outputFilePath);
            } else {
              await utils$1.file.replace(outputFilePath, inputFilePath);
            }
          }
          await utils$1.file.destroy(outputFilePath);
          return {
            convertedSize,
            compareSize
          };
        } catch (error) {
          eagle.log.error(`#${task.id} compressing error : ${error}`);
          throw error;
        } finally {
          eagle.log.info(`end compressing #${task.id}`);
        }
      }
    });
  }
}
const App_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = {
  key: 0,
  class: "compareSize"
};
const _hoisted_2 = {
  key: 0,
  style: { "color": "var(--color-warning)" }
};
const _hoisted_3 = {
  key: 1,
  style: { "color": "var(--color-positive)" }
};
const _hoisted_4 = {
  key: 2,
  style: { "color": "var(--color-text-primary)" }
};
const _hoisted_5 = { key: 1 };
const _hoisted_6 = { class: "convert" };
const _hoisted_7 = {
  key: 0,
  class: "progress-status"
};
const _hoisted_8 = ["innerHTML"];
const _sfc_main = {
  __name: "App",
  setup(__props) {
    inject("mousetrap");
    const main2 = reactive(new Main());
    const utils2 = require(`${__dirname}/modules/utils`);
    const successDialogVisible = ref(false);
    const settingDialogVisible = ref(false);
    const isSettingClickedHintVisible = ref(
      localStorage.getItem(`eagle.plugin.${eagle.plugin.manifest.id}.isSettingClickedHintVisible`) == "true"
    );
    const store = (key, value) => {
      localStorage.setItem(`eagle.plugin.${eagle.plugin.manifest.id}.${key}`, value);
    };
    const tableEl = ref(null);
    const table = shallowReactive({
      header: {
        status: { name: "", minWidth: 50 },
        name: {
          name: t("main.table.thead.name"),
          minWidth: 60,
          fill: true,
          line: true
        },
        ext: {
          name: t("main.table.thead.ext"),
          minWidth: 90,
          align: "end",
          line: true
        },
        size: {
          name: t("main.table.thead.size"),
          minWidth: 110,
          align: "end",
          line: true
        },
        convertedSize: {
          name: t("main.table.thead.convertedSize"),
          minWidth: 110,
          align: "end"
        },
        compareSize: { name: "", minWidth: 78, align: "end" },
        remove: { name: "", minWidth: 50, align: "end" }
      },
      contextMenu: [
        {
          label: t("main.table.contextMenu.deleteSuccessful"),
          onClick: async () => {
            main2.taskQueue.clear("success");
          }
        }
      ]
    });
    watch(
      () => main2.currentProcessIndex,
      (val) => {
        tableEl.value.scroll(val);
      }
    );
    eagle.onPluginRun(async () => {
      await main2.loadData();
      if (eagle.app.platform === "darwin")
        await utils2.time.sleep(600);
      const index = main2.taskQueue.data.indexOf(main2.taskQueue.waiting[0]);
      if (index && index !== -1)
        tableEl.value.scroll(index + 4);
    });
    const onDrop = (files) => {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const eagle_regex = new RegExp("(?<=\\images[\\\\\\/])(.*?)(?=\\.info)", "i");
        let id, name, is_eagle;
        if (eagle_regex.test(file.path)) {
          id = eagle_regex.exec(file.path)[0];
          name = file.name;
          is_eagle = true;
        } else {
          id = crypto.randomUUID();
          name = file.name.replace(/\.\w+$/, "");
          is_eagle = false;
        }
        main2.taskQueue.enqueue({
          id,
          name,
          ext: file.type.split("/")[1],
          size: file.size,
          filePath: file.path,
          is_eagle
        });
      }
    };
    provide("main", main2);
    return (_ctx, _cache) => {
      const _component_HeaderVue = _sfc_main$1;
      const _component_ImageVue = _sfc_main$9;
      const _component_VirtualTableVue = _sfc_main$3;
      const _component_BodyVue = __unplugin_components_3;
      const _component_el_progress = ElProgress;
      const _component_el_button = ElButton;
      const _component_el_popover = ElPopover;
      const _component_FooterVue = __unplugin_components_7;
      const _component_el_empty = ElEmpty;
      const _component_DropZoneVue = _sfc_main$6;
      const _component_DialogVue = _sfc_main$7;
      const _component_SettingDialogVue = _sfc_main$8;
      const _directive_tippy = resolveDirective("tippy");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_HeaderVue),
        !unref(main2).isLoading ? (openBlock(), createBlock(_component_DropZoneVue, {
          key: 0,
          onDrop
        }, {
          default: withCtx(() => [
            withDirectives(createVNode(_component_BodyVue, null, {
              default: withCtx(() => [
                createVNode(_component_VirtualTableVue, {
                  ref_key: "tableEl",
                  ref: tableEl,
                  class: "virtual-table",
                  header: unref(table).header,
                  data: unref(main2).taskQueue.data,
                  onContextmenu: _cache[0] || (_cache[0] = withModifiers(($event) => unref(useContextMenu)(unref(table).contextMenu), ["right", "prevent"]))
                }, {
                  status: withCtx((scope) => [
                    (openBlock(), createElementBlock(Fragment, null, renderList(["success", "processing", "waiting", "failed"], (icon) => {
                      return withDirectives(createVNode(_component_ImageVue, {
                        key: icon,
                        style: normalizeStyle([
                          scope.row.isProcessing() ? "animation: loading 2s infinite linear;" : ""
                        ]),
                        width: "16",
                        height: "16",
                        src: `light/status-${icon}.svg`,
                        darkSrc: `dark/status-${icon}.svg`
                      }, null, 8, ["style", "src", "darkSrc"]), [
                        [_directive_tippy, {
                          content: scope.row.isFailed() ? unref(t)(`error.${scope.row.result.message}`) : ""
                        }],
                        [vShow, scope.row.result.state === icon]
                      ]);
                    }), 64))
                  ]),
                  name: withCtx((scope) => [
                    createTextVNode(toDisplayString(scope.row.name), 1)
                  ]),
                  ext: withCtx((scope) => {
                    var _a;
                    return [
                      createBaseVNode("span", null, [
                        withDirectives((openBlock(), createElementBlock("span", {
                          style: normalizeStyle({
                            color: scope.row.isFailed() ? "var(--color-warning)" : ""
                          })
                        }, [
                          createTextVNode(toDisplayString((_a = scope.row.ext) == null ? void 0 : _a.replace("jpeg", "jpg")), 1)
                        ], 4)), [
                          [_directive_tippy, {
                            content: scope.row.isFailed() ? unref(t)(`error.${scope.row.result.message}`) : ""
                          }]
                        ])
                      ])
                    ];
                  }),
                  size: withCtx((scope) => [
                    createBaseVNode("span", null, toDisplayString(unref(utils2).file.formatSize(scope.row.size)), 1)
                  ]),
                  convertedSize: withCtx((scope) => [
                    scope.row.result.data ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      createTextVNode(toDisplayString(unref(utils2).file.formatSize(scope.row.result.data.convertedSize)), 1)
                    ], 64)) : createCommentVNode("", true)
                  ]),
                  compareSize: withCtx((scope) => [
                    scope.row.isSuccess() ? (openBlock(), createElementBlock("span", _hoisted_1, [
                      typeof scope.row.result.data.compareSize === "number" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                        scope.row.result.data.compareSize > 0 ? (openBlock(), createElementBlock("span", _hoisted_2, [
                          createTextVNode(toDisplayString(scope.row.result.data.compareSize) + "% ", 1),
                          createVNode(_component_ImageVue, {
                            width: "11",
                            height: "12",
                            src: "light/compare-arrow-up.svg",
                            darkSrc: "dark/compare-arrow-up.svg"
                          })
                        ])) : createCommentVNode("", true),
                        scope.row.result.data.compareSize < 0 ? (openBlock(), createElementBlock("span", _hoisted_3, [
                          createTextVNode(toDisplayString(Math.abs(scope.row.result.data.compareSize)) + "% ", 1),
                          createVNode(_component_ImageVue, {
                            width: "11",
                            height: "12",
                            src: "light/compare-arrow-down.svg",
                            darkSrc: "dark/compare-arrow-down.svg"
                          })
                        ])) : createCommentVNode("", true),
                        scope.row.result.data.compareSize === 0 ? (openBlock(), createElementBlock("span", _hoisted_4, toDisplayString(scope.row.result.data.compareSize) + "% ", 1)) : createCommentVNode("", true)
                      ], 64)) : createCommentVNode("", true)
                    ])) : (openBlock(), createElementBlock("span", _hoisted_5))
                  ]),
                  remove: withCtx((scope) => [
                    createVNode(_component_ImageVue, {
                      class: "remove",
                      width: "24",
                      height: "24",
                      src: "light/remove.svg",
                      darkSrc: "dark/remove.svg",
                      onClick: ($event) => unref(main2).taskQueue.dequeue(unref(main2).taskQueue.data.indexOf(scope.row))
                    }, null, 8, ["onClick"])
                  ]),
                  _: 1
                }, 8, ["header", "data"])
              ]),
              _: 1
            }, 512), [
              [vShow, unref(main2).taskQueue.data.length]
            ]),
            withDirectives(createVNode(_component_FooterVue, { class: "footer" }, {
              default: withCtx(() => [
                withDirectives(createVNode(_component_el_progress, {
                  class: "progress",
                  percentage: unref(main2).taskQueue.completed.length / unref(main2).taskQueue.data.length * 100,
                  "show-text": false
                }, null, 8, ["percentage"]), [
                  [vShow, unref(main2).taskQueue.isWorking]
                ])
              ]),
              setting: withCtx(() => [
                createBaseVNode("div", _hoisted_6, [
                  createVNode(_component_el_popover, {
                    placement: "top",
                    visible: !unref(main2).taskQueue.isWorking && unref(main2).taskQueue.data.length > 0 && !unref(isSettingClickedHintVisible)
                  }, {
                    reference: withCtx(() => [
                      createVNode(_component_el_button, {
                        type: "",
                        onClick: _cache[1] || (_cache[1] = () => {
                          settingDialogVisible.value = true;
                          store("isSettingClickedHintVisible", true);
                          isSettingClickedHintVisible.value = true;
                        })
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_ImageVue, {
                            width: "16",
                            height: "16",
                            src: "light/ic-btn-setting.svg",
                            darkSrc: "dark/ic-btn-setting.svg"
                          }),
                          createTextVNode(" " + toDisplayString(unref(t)("footer.setting.title")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)("footer.setting.hint")) + " ", 1)
                    ]),
                    _: 1
                  }, 8, ["visible"])
                ])
              ]),
              action: withCtx(() => [
                unref(main2).taskQueue.isWorking ? (openBlock(), createElementBlock("div", _hoisted_7, [
                  createBaseVNode("span", null, toDisplayString(unref(t)("footer.convert.isConverting")), 1),
                  createBaseVNode("span", null, toDisplayString(unref(main2).taskQueue.completed.length) + "/" + toDisplayString(unref(main2).taskQueue.data.length), 1)
                ])) : createCommentVNode("", true),
                createVNode(_component_el_button, {
                  type: "primary",
                  disabled: unref(main2).taskQueue.isWorking || unref(main2).taskQueue.waiting.length === 0,
                  loading: unref(main2).taskQueue.isWorking,
                  onClick: _cache[2] || (_cache[2] = async () => {
                    await unref(main2).convert();
                    successDialogVisible.value = true;
                  })
                }, {
                  default: withCtx(() => [
                    withDirectives(createVNode(_component_ImageVue, {
                      width: "16",
                      height: "16",
                      src: "normal/compress.svg"
                    }, null, 512), [
                      [vShow, !unref(main2).taskQueue.isWorking]
                    ]),
                    createTextVNode(" " + toDisplayString(unref(t)("footer.convert.title")), 1)
                  ]),
                  _: 1
                }, 8, ["disabled", "loading"])
              ]),
              _: 1
            }, 512), [
              [vShow, unref(main2).taskQueue.data.length]
            ]),
            withDirectives(createVNode(_component_el_empty, {
              description: unref(t)("main.empty.title")
            }, {
              image: withCtx(() => [
                createVNode(_component_ImageVue, {
                  width: "256",
                  height: "144",
                  src: "light/empty.png",
                  darkSrc: "dark/empty.png"
                })
              ]),
              default: withCtx(() => [
                createTextVNode(" " + toDisplayString(unref(t)("main.empty.content")), 1)
              ]),
              _: 1
            }, 8, ["description"]), [
              [vShow, !unref(main2).taskQueue.data.length]
            ])
          ]),
          _: 1
        })) : createCommentVNode("", true),
        createVNode(_component_DialogVue, {
          type: "success",
          modelValue: unref(successDialogVisible),
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => isRef(successDialogVisible) ? successDialogVisible.value = $event : null),
          showCancelBtn: false
        }, {
          title: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("main.dialog.success.title")), 1)
          ]),
          description: withCtx(() => [
            createBaseVNode("span", {
              innerHTML: unref(t)("main.dialog.success.description", { count: unref(main2).taskQueue.success.length })
            }, null, 8, _hoisted_8)
          ]),
          ok: withCtx(() => [
            createTextVNode(toDisplayString(unref(t)("main.dialog.success.ok")), 1)
          ]),
          _: 1
        }, 8, ["modelValue"]),
        createVNode(_component_SettingDialogVue, {
          modelValue: unref(settingDialogVisible),
          "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => isRef(settingDialogVisible) ? settingDialogVisible.value = $event : null)
        }, null, 8, ["modelValue"])
      ], 64);
    };
  }
};
const main = "";
const app = createApp(_sfc_main);
app.use(VueTippy);
app.use(VueMousetrapPlugin).provide("mousetrap", app.config.globalProperties.$mousetrap);
const utils = require(`${__dirname}/modules/utils`);
window.addEventListener("load", async () => {
  await utils.file.deleteFolder(`${__dirname}/temp`);
  await utils.file.createFolder(`${__dirname}/temp`);
});
window.addEventListener("unload", async () => {
  await utils.file.deleteFolder(`${__dirname}/temp`);
});
eagle.onPluginCreate(async (plugin) => {
  process.on("uncaughtException", (error) => {
    eagle.log.error("uncaughtException : " + error);
  });
  app.mount("#app");
  toggleTheme();
});
eagle.onThemeChanged(() => {
  toggleTheme();
});
const THEME_SUPPORT = {
  Auto: eagle.app.isDarkColors() ? "gray" : "light",
  LIGHT: "light",
  LIGHTGRAY: "lightgray",
  GRAY: "gray",
  DARK: "dark",
  BLUE: "blue",
  PURPLE: "purple"
};
async function toggleTheme() {
  const theme = eagle.app.theme;
  const themeName = THEME_SUPPORT[theme] ?? "dark";
  const htmlEl = document.querySelector("html");
  htmlEl.classList.add("no-transition");
  htmlEl.setAttribute("theme", themeName);
  htmlEl.setAttribute("platform", eagle.app.platform);
  await nextTick();
  htmlEl.classList.remove("no-transition");
}
