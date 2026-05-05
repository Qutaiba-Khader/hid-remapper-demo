# Changelog

## Android TV Remote Edition - v1.0 (2026-05-05)

### Config Tool Web UI
- Dark theme with custom CSS variables (`--bg-primary`, `--accent`, etc.)
- Categorized Android TV usages in source/target modals (Power, Navigation, Media, Volume, Apps, System)
- Quick Actions tab with one-click mappings:
  - Remap Voice Control (Google Assistant to custom key)
  - Macro combos (Home+Back, double-tap Home, etc.)
  - Layer Switcher: interactive layer toggle/cycle creation
- Layer Switcher feature:
  - Checkbox UI to select layers (0-3)
  - 2 layers: creates Sticky toggle mapping
  - 3+ layers: creates non-Sticky cycle (each layer points to next)
  - Opens source modal to pick trigger key, auto-creates mappings
- Drag-and-drop reorder mode for mappings (toggle button, grip handles)
- Improved Sticky/Tap/Hold help text:
  - Sticky labeled as "Layer targets only"
  - Tap & Hold labeled as "work with any mapping"
  - Column header tooltips with clear descriptions
- Layer help section with step-by-step example
- Added Layer 0 to target usages for cycle mappings

### Firmware
- Custom HID descriptor (`our_descriptor.cc`) with Android TV Consumer Control outputs

### Deployment
- Root `index.html` redirects to `config-tool-web/` for GitHub Pages
