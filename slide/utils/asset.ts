/**
 * Resolve a file in public/ against the deploy base (e.g. /<repo>/ on GitHub Pages).
 * Slidev rewrites paths in markdown images only; component props must go through this.
 */
export const asset = (p: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + (p.startsWith('/') ? p : `/${p}`)
