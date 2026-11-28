/*:
 * @target MZ
 * @plugindesc v1.0 [4] Fixes RPG Maker MZ troop events leaking across troops by hard-binding pages to their troop ID.
 * @author Cynthia Tools
 *
 * @help
 * ============================================================================
 * [4] CT_TroopEventIsolation
 * ============================================================================
 * 
 * This plugin fixes a core RPG Maker MZ engine flaw where troop event pages
 * defined in one troop can activate in other troops if conditions match
 * (e.g. same Turn, HP, or Span).
 *
 * Once enabled:
 * - Each troop event page is permanently bound to its original troop ID
 * - Page conditions will FAIL if the active troop does not match
 * - No setup, parameters, or event edits required
 *
 * Recommended placement:
 *   [1] CT_DevModeManager
 *   [4] CT_TroopEventIsolation   <-- this plugin
 *   [5+] Battle / Boss / UI plugins
 *
 * 
 * 
 * This plugin is an engine behavior correction and should be placed
 * before any plugin that relies on troop events.
 *
 * Safe for existing projects.
 * visit: https://cynthiatool.itch.io/ for more plugins and tools
 * ============================================================================
 */

(() => {
  "use strict";

  // -------------------------------------------------------------------------
  // PART 1 — Inject bound troopId into every troop event page at database load
  // -------------------------------------------------------------------------
  const _DataManager_onLoad = DataManager.onLoad;
  DataManager.onLoad = function(object) {
    _DataManager_onLoad.call(this, object);

    if (object === $dataTroops) {
      for (let troopId = 1; troopId < object.length; troopId++) {
        const troop = object[troopId];
        if (!troop || !troop.pages) continue;

        troop.pages.forEach(page => {
          page._ctBoundTroopId = troopId;
        });
      }
    }
  };

  // -------------------------------------------------------------------------
  // PART 2 — Enforce troop ID match during page condition evaluation
  // -------------------------------------------------------------------------
  const _Game_Troop_meetsConditions =
    Game_Troop.prototype.meetsConditions;

  Game_Troop.prototype.meetsConditions = function(page) {
    // Hard isolation: page only belongs to its original troop
    if (
      page._ctBoundTroopId !== undefined &&
      page._ctBoundTroopId !== this._troopId
    ) {
      return false;
    }

    return _Game_Troop_meetsConditions.call(this, page);
  };

})();
