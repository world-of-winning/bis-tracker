// Death Knight
import * as bloodDk from './blood-dk.js';
import * as frostDk from './frost-dk.js';
import * as unholyDk from './unholy-dk.js';
// Demon Hunter
import * as havocDh from './havoc-dh.js';
import * as devourerDh from './devourer-dh.js';
import * as vengDh from './veng-dh.js';
// Druid
import * as balanceDruid from './balance-druid.js';
import * as feralDruid from './feral-druid.js';
import * as guardianDruid from './guardian-druid.js';
import * as restoDruid from './resto-druid.js';
// Evoker
import * as devEvoker from './dev-evoker.js';
import * as presEvoker from './pres-evoker.js';
import * as augEvoker from './aug-evoker.js';
// Hunter
import * as bmHunter from './bm-hunter.js';
import * as mmHunter from './mm-hunter.js';
import * as survHunter from './surv-hunter.js';
// Mage
import * as arcaneMage from './arcane-mage.js';
import * as fireMage from './fire-mage.js';
import * as frostMage from './frost-mage.js';
// Monk
import * as brewMonk from './brew-monk.js';
import * as wwMonk from './ww-monk.js';
import * as mwMonk from './mw-monk.js';
// Paladin
import * as holyPaladin from './holy-paladin.js';
import * as protPaladin from './prot-paladin.js';
import * as retPaladin from './ret-paladin.js';
// Priest
import * as discPriest from './disc-priest.js';
import * as holyPriest from './holy-priest.js';
import * as shadowPriest from './shadow-priest.js';
// Rogue
import * as assaRogue from './assa-rogue.js';
import * as outlawRogue from './outlaw-rogue.js';
import * as subRogue from './sub-rogue.js';
// Shaman
import * as eleShaman from './ele-shaman.js';
import * as enhShaman from './enh-shaman.js';
import * as restoShaman from './resto-shaman.js';
// Warlock
import * as affLock from './aff-lock.js';
import * as demoLock from './demo-lock.js';
import * as destroLock from './destro-lock.js';
// Warrior
import * as armsWarrior from './arms-warrior.js';
import * as furyWarrior from './fury-warrior.js';
import * as protWarrior from './prot-warrior.js';

export var SPECS = [
  // Death Knight
  bloodDk, frostDk, unholyDk,
  // Demon Hunter
  havocDh, devourerDh, vengDh,
  // Druid
  balanceDruid, feralDruid, guardianDruid, restoDruid,
  // Evoker
  devEvoker, presEvoker, augEvoker,
  // Hunter
  bmHunter, mmHunter, survHunter,
  // Mage
  arcaneMage, fireMage, frostMage,
  // Monk
  brewMonk, wwMonk, mwMonk,
  // Paladin
  holyPaladin, protPaladin, retPaladin,
  // Priest
  discPriest, holyPriest, shadowPriest,
  // Rogue
  assaRogue, outlawRogue, subRogue,
  // Shaman
  eleShaman, enhShaman, restoShaman,
  // Warlock
  affLock, demoLock, destroLock,
  // Warrior
  armsWarrior, furyWarrior, protWarrior,
];

export function getSpec(key) {
  return SPECS.find(function(s) { return s.SPEC_KEY === key; }) || SPECS[0];
}

export function findSpecBySimC(className, specName) {
  return SPECS.find(function(s) {
    return s.SIMC_CLASS === className && s.SIMC_SPEC === specName;
  }) || null;
}

