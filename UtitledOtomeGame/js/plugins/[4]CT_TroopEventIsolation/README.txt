[4]CT_TroopEventIsolation
Version: 1.0
Placement: [4]
Engine: RPG Maker MZ
Author: Cynthia Tools
License: Free (personal & commercial use allowed)
What is this?
CT_TroopEventIsolation is a core engine fix for RPG Maker MZ.

It prevents troop battle events defined in one troop from
incorrectly triggering in other troops when event conditions match
(e.g. Turn, HP, Span).

This behavior is undocumented in the engine and can silently break
boss mechanics, phase systems, and advanced battle logic.

What problem does this fix?
In vanilla RPG Maker MZ:

Troop Event Pages are not strictly bound to their troop ID

If two troops share similar event conditions:

Turn X

HP threshold

Battle / Turn span

An event defined in Troop A can activate in Troop B

This can cause:

Boss mechanics firing in normal battles

Turn logic triggering unexpectedly

Extremely hard-to-debug battle behavior

What does this plugin do?
This plugin fixes the issue at the engine logic level by:

Binding each troop event page to its original troop ID

Preventing page evaluation if the active troop does not match

Enforcing correct behavior before event execution

Avoiding interpreter hacks or abort tricks

Once installed, troop battle events behave as most developers expect.

Key features
✅ Engine-level correctness fix

✅ No setup or configuration

✅ No parameters

✅ Safe for existing projects

✅ No performance impact

✅ Compatible with other battle plugins

Recommended plugin order
css
Copy code
[1] CT_DevModeManager (if used)
[4] CT_TroopEventIsolation   ← REQUIRED POSITION
[5+] Battle / Boss / UI plugins
⚠️ Do not place this plugin below battle or boss plugins.

Why is this plugin free?
This is a core correctness fix, not a gameplay feature.

It exists to prevent invisible bugs that can waste hours of development
time when building advanced battle systems.

Compatibility notes
RPG Maker MZ only

Does not modify save data

Safe to add mid-project

Can be bundled with other Cynthia Tools plugins

visit: https://cynthiatool.itch.io/ for more plugins and tools