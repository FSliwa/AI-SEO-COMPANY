'use client';

import { Component } from 'react';

/**
 * Keeps a failing 3D scene from taking the page down with it.
 *
 * The scene is a 34 MB file on a third-party origin, and the Spline runtime
 * surfaces a failed download by rethrowing during render. Without a boundary
 * of its own that throw travels all the way up to Next's global handler, which
 * replaces the whole document with <html id="__next_error__"> — no title, no
 * lang, no content. PageSpeed caught exactly that on 23.08.2026: two
 * ERR_CONNECTION_FAILED on prod.spline.design, a "TypeError: Failed to fetch"
 * from the runtime's load(), and an audited page that was Next's error screen
 * rather than the site. Anyone behind a firewall, a DNS filter or a tracker
 * blocker that stops that origin was getting the same thing.
 *
 * Decoration must never be able to do that. This boundary catches the throw,
 * renders whatever still-life the caller passes instead, and tells the caller
 * so it can stop waiting for a first frame that will never arrive — the hero
 * copy is gated on the scene's onLoad, so without that signal the text would
 * stay hidden until its 15 s failsafe expired.
 *
 * Errors are swallowed rather than reported: this is scenery, the visitor can
 * do nothing about it, and the console entry from the runtime is already there
 * for anyone debugging.
 */
export default class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    if (typeof this.props.onFail === 'function') this.props.onFail();
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
