import { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { load, save } from '../storage.js';
import ko from './ko.json';
import en from './en.json';
import enItems from './items/en.json';

var UI_STRINGS = { ko: ko, en: en };
var LOCALE_KEY = "bis-locale";
var LocaleContext = createContext();

// Lazy-load item name files and UI string files via Vite glob
var itemLoaders = import.meta.glob('./items/*.json');
var uiLoaders = import.meta.glob('./*.json');

// Locale metadata: display name, Wowhead API code, Wowhead URL path
export var LOCALE_META = {
  en:   { name: "\ud83c\uddfa\ud83c\uddf8 English",      wh: 0,  whPath: "",    htmlLang: "en",    ogLocale: "en_US" },
  ko:   { name: "\ud83c\uddf0\ud83c\uddf7 \ud55c\uad6d\uc5b4",        wh: 1,  whPath: "/ko", htmlLang: "ko",    ogLocale: "ko_KR" },
  fr:   { name: "\ud83c\uddeb\ud83c\uddf7 Fran\u00e7ais",     wh: 2,  whPath: "/fr", htmlLang: "fr",    ogLocale: "fr_FR" },
  de:   { name: "\ud83c\udde9\ud83c\uddea Deutsch",      wh: 3,  whPath: "/de", htmlLang: "de",    ogLocale: "de_DE" },
  zhCN: { name: "\ud83c\udde8\ud83c\uddf3 \u7b80\u4f53\u4e2d\u6587",  wh: 4,  whPath: "/cn", htmlLang: "zh-CN", ogLocale: "zh_CN" },
  es:   { name: "\ud83c\uddea\ud83c\uddf8 Espa\u00f1ol",      wh: 6,  whPath: "/es", htmlLang: "es",    ogLocale: "es_ES" },
  ru:   { name: "\ud83c\uddf7\ud83c\uddfa \u0420\u0443\u0441\u0441\u043a\u0438\u0439",  wh: 7,  whPath: "/ru", htmlLang: "ru",    ogLocale: "ru_RU" },
  pt:   { name: "\ud83c\udde7\ud83c\uddf7 Portugu\u00eas",    wh: 8,  whPath: "/pt", htmlLang: "pt",    ogLocale: "pt_BR" },
  it:   { name: "\ud83c\uddee\ud83c\uddf9 Italiano",     wh: 9,  whPath: "/it", htmlLang: "it",    ogLocale: "it_IT" },
  zhTW: { name: "\ud83c\uddf9\ud83c\uddfc \u7e41\u9ad4\u4e2d\u6587",  wh: 10, whPath: "/tw", htmlLang: "zh-TW", ogLocale: "zh_TW" },
};

export var LOCALE_KEYS = Object.keys(LOCALE_META);

function detectLocale() {
  // Check ?lang= query param first (for SEO crawlers)
  var params = new URLSearchParams(window.location.search);
  var langParam = params.get("lang");
  if (langParam && LOCALE_META[langParam]) return langParam;

  var lang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
  if (lang.indexOf("ko") === 0) return "ko";
  if (lang.indexOf("fr") === 0) return "fr";
  if (lang.indexOf("de") === 0) return "de";
  if (lang.indexOf("es") === 0) return "es";
  if (lang.indexOf("pt") === 0) return "pt";
  if (lang.indexOf("ru") === 0) return "ru";
  if (lang.indexOf("it") === 0) return "it";
  if (lang.indexOf("zh") === 0) {
    if (lang.indexOf("tw") > 0 || lang.indexOf("hant") > 0) return "zhTW";
    return "zhCN";
  }
  return "en";
}

function updateDocumentMeta(localeKey) {
  var meta = LOCALE_META[localeKey];
  if (!meta) return;
  // Update <html lang>
  document.documentElement.lang = meta.htmlLang;
  // Update og:locale
  var ogLocale = document.querySelector('meta[property="og:locale"]');
  if (ogLocale) ogLocale.setAttribute("content", meta.ogLocale);
  // Update JSON-LD inLanguage
  var ldScript = document.querySelector('script[type="application/ld+json"]');
  if (ldScript) {
    try {
      var ld = JSON.parse(ldScript.textContent);
      ld.inLanguage = meta.htmlLang;
      ldScript.textContent = JSON.stringify(ld);
    } catch (e) { /* ignore parse errors */ }
  }
}

function loadItemNames(localeKey) {
  var path = "./items/" + localeKey + ".json";
  var loader = itemLoaders[path];
  if (!loader) return Promise.resolve(enItems);
  return loader().then(function(mod) { return mod.default || mod; });
}

function loadUiStrings(localeKey) {
  var path = "./" + localeKey + ".json";
  var loader = uiLoaders[path];
  if (!loader) return Promise.resolve(null);
  return loader().then(function(mod) { return mod.default || mod; });
}

export function LocaleProvider({ children }) {
  var [locale, setLocaleState] = useState(function() {
    var saved = load(LOCALE_KEY);
    if (saved && LOCALE_META[saved]) return saved;
    return detectLocale();
  });

  var [itemNamesMap, setItemNamesMap] = useState(enItems);
  var [extraStrings, setExtraStrings] = useState(null);

  var setLocale = useCallback(function(loc) {
    setLocaleState(loc);
    save(LOCALE_KEY, loc);
  }, []);

  // Update document-level SEO meta tags when locale changes
  useEffect(function() {
    updateDocumentMeta(locale);
  }, [locale]);

  // Load item names and UI strings for current locale
  useEffect(function() {
    if (locale === "en") {
      setItemNamesMap(enItems);
      setExtraStrings(null);
      return;
    }
    loadItemNames(locale)
      .then(function(names) { setItemNamesMap(names); })
      .catch(function() { setItemNamesMap(enItems); });

    // en/ko are statically imported; others are lazy-loaded
    if (UI_STRINGS[locale]) {
      setExtraStrings(null);
    } else {
      loadUiStrings(locale)
        .then(function(strings) { setExtraStrings(strings); })
        .catch(function() { setExtraStrings(null); });
    }
  }, [locale]);

  // UI strings: static (en/ko) → lazy-loaded → fallback to English
  var strings = UI_STRINGS[locale] || extraStrings || UI_STRINGS.en;

  var t = useCallback(function(key, params) {
    var parts = key.split(".");
    var val = strings;
    for (var i = 0; i < parts.length; i++) {
      val = val && val[parts[i]];
    }
    // Fallback to English if key not found in current locale
    if (val === undefined && strings !== UI_STRINGS.en) {
      val = UI_STRINGS.en;
      for (var j = 0; j < parts.length; j++) {
        val = val && val[parts[j]];
      }
    }
    if (val === undefined) return key;
    if (params) {
      Object.keys(params).forEach(function(k) {
        val = val.replace("{" + k + "}", params[k]);
      });
    }
    return val;
  }, [strings]);

  var knownItemName = useCallback(function(id) {
    return itemNamesMap[id] || enItems[id] || null;
  }, [itemNamesMap]);

  var value = useMemo(function() {
    return { locale: locale, setLocale: setLocale, t: t, knownItemName: knownItemName };
  }, [locale, setLocale, t, knownItemName]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
