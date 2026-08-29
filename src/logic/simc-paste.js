import { parseSimC } from '../data/shared.js';

/**
 * What a paste into the SimC box should do.
 *
 * The box selects itself on focus, so the ordinary import — click, paste a
 * fresh /simc dump — arrives as a paste over the whole value. That is the
 * case the old handler was written for, and it took the clipboard as the new
 * value outright. Anywhere else that was wrong: a caret placed mid-text, a
 * few characters selected, a line fixed by hand — every one of them threw the
 * rest of the box away.
 *
 * A paste that replaces the whole value is the only one read as a profile.
 * Not because a partial paste cannot parse — a profile dropped mid-text keeps
 * its gear lines and parses fine — but because reading it as an import is the
 * same overreach in a quieter form: the box is a textarea, and a paste that
 * leaves text either side of it is an edit, whatever the clipboard held.
 *
 * @returns {{ next: string, action: "import"|"warn"|"edit", parsed?: Object }}
 *   `import` — a profile with gear. Take it and run the import.
 *   `warn`   — it names a character and carries no gear line. Let the paste
 *              land natively and say so; the box is the only way in, so
 *              swallowing it would leave the user with no signal at all.
 *   `edit`   — hands off. The browser does what a textarea does.
 */
export function pasteAction(value, selStart, selEnd, clipboard) {
  var v = value || "";
  if (!clipboard || !clipboard.trim()) return { next: v, action: "edit" };
  var start = selStart == null ? v.length : selStart;
  var end = selEnd == null ? start : selEnd;
  var next = v.slice(0, start) + clipboard + v.slice(end);
  if (start !== 0 || end !== v.length) return { next: next, action: "edit" };
  var parsed = parseSimC(next);
  if (parsed.cnt > 0) return { next: next, action: "import", parsed: parsed };
  if (parsed.ci.className || parsed.ci.spec) return { next: next, action: "warn", parsed: parsed };
  return { next: next, action: "edit", parsed: parsed };
}
