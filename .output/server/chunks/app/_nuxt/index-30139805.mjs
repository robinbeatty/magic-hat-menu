import { _ as __nuxt_component_0 } from './nuxt-link-51152821.mjs';
import { u as useRoute, a as useNuxtApp } from '../server.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const normalizeString = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036F]/g, "") : "";
const titleCase = (string) => string.charAt(0).toUpperCase() + string.slice(1);
const cleanParagraphs = (html) => {
  if (!html) {
    return null;
  }
  const cleanedHtml = html.replaceAll("\n<p>", "<p>").replaceAll("	", "").replaceAll("<p></p>", "").replaceAll("<br /></p>", "</p>");
  return normalizeString(cleanedHtml);
};
const craftLinkToRel = (string) => {
  return string.replace("https://app.hl.is", "");
};
const redactor = (html) => {
  var _a;
  if (html) {
    const text = (_a = cleanParagraphs(craftLinkToRel(html))) == null ? void 0 : _a.replace("<p>", '<p class="redactor">');
    if (text) {
      return text;
    }
  }
  return "";
};
const unique = (arr) => {
  return [...new Set(arr)];
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a;
    let __temp, __restore;
    const { $craft } = useNuxtApp();
    const route = useRoute();
    const { data: entries } = ([__temp, __restore] = withAsyncContext(() => $craft.query.menus()), __temp = await __temp, __restore(), __temp);
    const { data: globalSet } = ([__temp, __restore] = withAsyncContext(() => $craft.query.globalSet.magicHatMenu()), __temp = await __temp, __restore(), __temp);
    const getMostRecentMenuDate = (entries2) => {
      const dates = entries2.map((entry) => new Date(entry.date).getTime());
      const mostRecentDate = Math.max(...dates);
      return new Date(mostRecentDate).toISOString().split("T")[0];
    };
    const getTodayAsString = () => {
      const today = /* @__PURE__ */ new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      return yyyy.toString() + "-" + mm.toString() + "-" + dd.toString();
    };
    let targetDateString = getTodayAsString();
    const isDate = (date) => {
      return !isNaN(Date.parse(date));
    };
    const getDateFromDdMmYyyy = (date) => {
      const parts = date.split("-");
      return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    };
    if (route.query["date"]) {
      let date = new Date(route.query["date"]);
      if (!isDate(route.query["date"])) {
        console.warn("Invalid date provided in query string, reformatting...");
        date = getDateFromDdMmYyyy(route.query["date"]);
      }
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      targetDateString = yyyy.toString() + "-" + mm.toString() + "-" + dd.toString();
    } else {
      targetDateString = getMostRecentMenuDate(entries.value || []);
    }
    const getDateString = (dateString) => {
      const segments = dateString.split("-");
      let yyyy = segments[0];
      let mm = segments[1];
      let dd = segments[2];
      if (segments[2].length > 2) {
        yyyy = segments[2];
        dd = segments[0];
      }
      return (/* @__PURE__ */ new Date(`${yyyy}-${mm}-${dd}`)).toLocaleDateString("en-GB", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
    };
    const menu = ((_a = entries.value) == null ? void 0 : _a.find((entry) => {
      const menuDate = new Date(entry.date).getTime();
      const targetDate = new Date(targetDateString).getTime();
      return menuDate === targetDate;
    })) || null;
    const mostRecentMenuDate = getMostRecentMenuDate(entries.value || []);
    const getOpeningHoursForDate = (date) => {
      var _a2, _b;
      const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayName = (_a2 = daysOfTheWeek[new Date(date).getDay()]) == null ? void 0 : _a2.toLowerCase();
      const openingHours = (_b = globalSet.value) == null ? void 0 : _b.openingHours.find((row) => {
        return row.day == dayName;
      });
      if (openingHours) {
        return {
          day: titleCase(dayName),
          open: new Date(openingHours.openFrom).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
          close: new Date(openingHours.openTo).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
        };
      }
      return null;
    };
    const getOpeningHoursString = (date) => {
      const openingHours = getOpeningHoursForDate(date);
      if (openingHours) {
        return `Kitchen Open ${openingHours.open} - ${openingHours.close}`;
      }
      return `Kitchen Closed`;
    };
    const getComplianceString = (string) => {
      if (string.toLowerCase() == "vegan")
        return "ve";
      if (string.toLowerCase() == "vegetarian")
        return "v";
      return string;
    };
    const getAllergensString = (allergens) => {
      return `Contains ${allergens.map((allergen) => {
        return allergen.title;
      }).join(", ")}`;
    };
    const aggregatedMenu = computed(() => {
      var _a2;
      if (!menu)
        return [];
      const persistentMenuItems = ((_a2 = globalSet.value) == null ? void 0 : _a2.menuItems) || [];
      const getCategoryTitle = (category) => {
        return category.length ? category[0].title : "";
      };
      const getMenuCategoryDescription = (menu2, title) => {
        var _a3;
        return ((_a3 = menu2.menuItems.map((menuItem) => menuItem.menu).flat().find((menu3) => menu3.title == title)) == null ? void 0 : _a3.description) || "";
      };
      const menuTypes = unique([
        ...menu.menuItems.map((item) => getCategoryTitle(item.menu)),
        ...persistentMenuItems.map((item) => getCategoryTitle(item.menu))
      ].flat()).filter((item) => item.length);
      return menuTypes.map((menuType) => {
        var _a3;
        const menuItems = menu.menuItems.filter((item) => getCategoryTitle(item.menu) == menuType).map((item) => {
          return {
            ...item,
            type: "menu"
          };
        });
        const persistentMenuItems2 = ((_a3 = globalSet.value) == null ? void 0 : _a3.menuItems.filter((item) => getCategoryTitle(item.menu) == menuType).map((item) => {
          return {
            ...item,
            type: "persistent"
          };
        })) || [];
        return {
          menuType,
          menuDescription: getMenuCategoryDescription(menu, menuType),
          items: [...menuItems, ...persistentMenuItems2]
        };
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "font-mono p-3 md:p-10 bg-white" }, _attrs))}>`);
      if (unref(menu)) {
        _push(`<main class="w-full lg:max-h-screen lg:flex-center"><div><div class="text-center w-full py-5"><h1 class="xl:text-5xl">Magic Hat</h1><div class="uppercase text-lg md:text-3xl xl:text-2xl mt-3"> Coffee \\ Kitchen \\ Events </div><div class="uppercase text-lg mt-5">${ssrInterpolate(getOpeningHoursString(unref(targetDateString)))}</div></div><div class="border-y-2 border-black w-full min-h-6"><div class="uppercase text-sm text-center p-3">${ssrInterpolate(getDateString(unref(targetDateString)))}</div></div><section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-12 text-left"><!--[-->`);
        ssrRenderList(unref(aggregatedMenu), (menu2) => {
          _push(`<div class="border-b-2 border-black pt-5 pb-6 xl:pt-10 xl:pb-10"><h2 class="text-2xl leading-none">${ssrInterpolate(menu2.menuType)} `);
          if (menu2.menuDescription) {
            _push(`<span class="text-xs">${ssrInterpolate(menu2.menuDescription)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</h2><div class="grid grid-cols-1 gap-5 mt-5"><!--[-->`);
          ssrRenderList(menu2.items, (item) => {
            var _a3, _b2;
            _push(`<div class="flex gap-5 justify-between items-baseline"><div class="max-w-lg space-y-1"><div class="text-lg leading-tight uppercase"><h4 class="mr-2 font-normal font-mono inline">${ssrInterpolate(item.itemName)}</h4><!--[-->`);
            ssrRenderList(item.dietaryCompliance, (label) => {
              _push(`<span class="text-2xs uppercase rounded-sm border border-black font-medium font-sans size-5 text-black inline-flex items-center justify-center leading-[0] align-top mt-0"><span>${ssrInterpolate(getComplianceString(label))}</span></span>`);
            });
            _push(`<!--]--></div><div class="text-sm lowercase">${ssrInterpolate(item.description)}</div><div class="leading-none">`);
            if (item.allergens.length) {
              _push(`<span><span class="text-2xs">${ssrInterpolate(getAllergensString(item.allergens))}</span>`);
              if ((_a3 = item.notes) == null ? void 0 : _a3.length) {
                _push(`<br>`);
              } else {
                _push(`<!---->`);
              }
              if ((_b2 = item.notes) == null ? void 0 : _b2.length) {
                _push(`<span class="text-2xs">${ssrInterpolate(item.notes)}</span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div><div class="text-sm justify-end items-baseline">${ssrInterpolate(item.price)}</div></div>`);
          });
          _push(`<!--]--></div></div>`);
        });
        _push(`<!--]--><div class="hidden xl:block col-span-2"></div>`);
        if ((_a2 = unref(globalSet)) == null ? void 0 : _a2.body) {
          _push(`<div class="md:col-span-2 xl:col-span-2 space-y-3"><div class="mt-5 space-y-3 text-xs [&amp;&gt;h2]:text-2xl">${unref(redactor)((_b = unref(globalSet)) == null ? void 0 : _b.body)}</div><div>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "https://www.themagichatcafe.co.uk/",
            external: true,
            class: "underline"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`themagichatcafe.co.uk`);
              } else {
                return [
                  createTextVNode("themagichatcafe.co.uk")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</section></div></main>`);
      } else {
        _push(`<section class="h-screen w-screen flex-center"><div class="space-y-5"><div class="text-2xl">No menu found for <br>${ssrInterpolate(getDateString(unref(targetDateString)))}</div><div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/?date=${unref(mostRecentMenuDate)}`,
          external: true,
          class: "button border-2 border-black hover:text-white hover:bg-black"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`View most recent menu`);
            } else {
              return [
                createTextVNode("View most recent menu")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div></section>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-30139805.mjs.map
