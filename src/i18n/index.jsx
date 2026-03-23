import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { load, save } from '../storage.js';
import ko from './ko.json';
import en from './en.json';

var LOCALES = { ko: ko, en: en };
var LOCALE_KEY = "bis-locale";
var LocaleContext = createContext();

export function LocaleProvider({ children }) {
  var [locale, setLocaleState] = useState(function() {
    var saved = load(LOCALE_KEY);
    if (saved) return saved;
    var lang = (navigator.language || navigator.userLanguage || "ko").toLowerCase();
    return lang.indexOf("ko") === 0 ? "ko" : "en";
  });

  var setLocale = useCallback(function(loc) {
    setLocaleState(loc);
    save(LOCALE_KEY, loc);
  }, []);

  var strings = LOCALES[locale] || LOCALES.ko;

  var t = useCallback(function(key, params) {
    var parts = key.split(".");
    var val = strings;
    for (var i = 0; i < parts.length; i++) {
      val = val && val[parts[i]];
    }
    if (val === undefined) return key;
    if (params) {
      Object.keys(params).forEach(function(k) {
        val = val.replace("{" + k + "}", params[k]);
      });
    }
    return val;
  }, [strings]);

  var itemName = useCallback(function(item) {
    return locale === "ko" ? (item.ko || item.en) : item.en;
  }, [locale]);

  var value = useMemo(function() {
    return { locale: locale, setLocale: setLocale, t: t, itemName: itemName };
  }, [locale, setLocale, t, itemName]);

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
