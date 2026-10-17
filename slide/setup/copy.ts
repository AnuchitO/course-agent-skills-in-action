import type { Directive, DirectiveBinding } from 'vue'

/**
 * v-copy — adds a small "copy" button to an element, shown only on hover,
 * so participants can paste prompts straight into Claude.
 * It floats on the element's corner and never changes the element's own styling.
 *
 *   <div v-copy>…</div>                          copies the element's text
 *   <div v-copy="'exact text'">…</div>           copies the given text instead
 *   <div v-copy="{ selector: 'td:first-child', texts: ['a', 'b'] }">
 *                                                adds a button to each matching child
 *   v-copy="false"                               does nothing (handy in v-for)
 */

type CopySpec = string | false | null | undefined | { selector: string, texts?: (string | undefined)[] }

const ICON_COPY = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>'
const ICON_DONE = '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'

async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  }
  catch {
    // Fallback for browsers / iframes without the async clipboard API
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try { ok = document.execCommand('copy') }
    catch { ok = false }
    ta.remove()
    return ok
  }
}

function visibleText(el: HTMLElement): string {
  const clone = el.cloneNode(true) as HTMLElement
  clone.querySelectorAll('.copy-btn, [data-copy-ignore]').forEach(n => n.remove())
  return (clone.textContent || '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^[“"]+|[”"]+$/g, '') // drop decorative quotes around prompts
}

interface Bound extends HTMLElement {
  __copyText?: () => string
}

function attach(el: Bound, getText: () => string) {
  el.__copyText = getText
  if (el.querySelector(':scope > .copy-btn'))
    return

  // Anchor the floating button without touching layout
  if (getComputedStyle(el).position === 'static')
    el.style.position = 'relative'
  el.classList.add('has-copy')

  const btn = document.createElement('button')
  btn.type = 'button'
  btn.className = 'copy-btn'
  btn.title = 'Copy'
  btn.setAttribute('aria-label', 'Copy to clipboard')
  btn.innerHTML = ICON_COPY

  let timer: ReturnType<typeof setTimeout> | undefined
  btn.addEventListener('pointerdown', e => e.stopPropagation())
  btn.addEventListener('click', async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const ok = await writeClipboard(el.__copyText?.() ?? visibleText(el))
    // Give focus back to the deck: Slidev ignores arrow/space keys while a button is focused
    btn.blur()
    btn.classList.toggle('done', ok)
    btn.classList.toggle('fail', !ok)
    btn.innerHTML = ok ? ICON_DONE : ICON_COPY
    btn.title = ok ? 'Copied!' : 'Copy failed — select the text instead'
    clearTimeout(timer)
    timer = setTimeout(() => {
      btn.classList.remove('done', 'fail')
      btn.innerHTML = ICON_COPY
      btn.title = 'Copy'
    }, 1500)
  })
  el.appendChild(btn)
}

function apply(el: HTMLElement, binding: DirectiveBinding<CopySpec>) {
  const spec = binding.value
  if (spec === false || spec === null)
    return

  if (spec && typeof spec === 'object') {
    el.querySelectorAll<HTMLElement>(spec.selector).forEach((child, i) => {
      const fixed = spec.texts?.[i]
      attach(child, () => fixed ?? visibleText(child))
    })
    return
  }

  attach(el, () => (typeof spec === 'string' && spec.length ? spec : visibleText(el)))
}

export const copyDirective: Directive<HTMLElement, CopySpec> = {
  mounted: apply,
  updated: apply,
}
