/**
 * Theme Script - SSR-safe theme initialization
 * 
 * This component renders an inline script that runs before React hydration
 * to prevent FOUC (Flash of Unstyled Content). It applies the theme
 * to the DOM immediately based on stored preference or system preference.
 */

import { THEME_STORAGE_KEY, SYSTEM_THEME_QUERY } from '../lib/theme'

/**
 * Theme Script Component
 * 
 * Renders an inline script that:
 * 1. Checks localStorage for saved theme
 * 2. Falls back to system preference
 * 3. Applies theme to DOM immediately
 * 4. Works before React hydration
 */
export function ThemeScript(): JSX.Element {
  // Create the theme initialization script as a string
  const themeScript = `
    (function() {
      try {
        // Theme constants
        var STORAGE_KEY = '${THEME_STORAGE_KEY}';
        var QUERY = '${SYSTEM_THEME_QUERY}';
        
        // Get stored theme
        function getStoredTheme() {
          try {
            var stored = localStorage.getItem(STORAGE_KEY);
            return stored === 'light' || stored === 'dark' ? stored : null;
          } catch (e) {
            return null;
          }
        }
        
        // Get system theme
        function getSystemTheme() {
          try {
            return window.matchMedia && window.matchMedia(QUERY).matches ? 'dark' : 'light';
          } catch (e) {
            return 'light';
          }
        }
        
        // Apply theme to DOM
        function applyTheme(theme) {
          var root = document.documentElement;
          if (theme === 'dark') {
            root.classList.add('dark');
            root.style.colorScheme = 'dark';
          } else {
            root.classList.remove('dark');
            root.style.colorScheme = 'light';
          }
        }
        
        // Resolve and apply theme
        var theme = getStoredTheme() || getSystemTheme();
        applyTheme(theme);
        
        // Store resolved theme if it wasn't stored
        if (!getStoredTheme()) {
          try {
            localStorage.setItem(STORAGE_KEY, theme);
          } catch (e) {
            // Ignore storage errors
          }
        }
      } catch (e) {
        // If anything fails, ensure we have a light theme
        document.documentElement.classList.remove('dark');
        document.documentElement.style.colorScheme = 'light';
      }
    })();
  `

  return (
    <script
      dangerouslySetInnerHTML={{ __html: themeScript }}
      suppressHydrationWarning
    />
  )
}

/**
 * Noscript fallback for theme
 * 
 * Provides CSS-based theme detection when JavaScript is disabled.
 * Uses CSS media queries to apply dark theme based on system preference.
 */
export function ThemeNoScript(): JSX.Element {
  const noScriptStyles = `
    @media (prefers-color-scheme: dark) {
      html {
        color-scheme: dark;
      }
      html.light {
        color-scheme: light;
      }
    }
  `

  return (
    <noscript>
      <style dangerouslySetInnerHTML={{ __html: noScriptStyles }} />
    </noscript>
  )
}