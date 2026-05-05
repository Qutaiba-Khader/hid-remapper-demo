# HID Remapper - Android TV Remote Edition

A customized fork of [jfedor2/hid-remapper](https://github.com/jfedor2/hid-remapper) tailored for Android TV remote control remapping.

## Live Config Tool

**[Open Configuration Tool](https://qutaiba-khader.github.io/hid-remapper-demo/)**

Use Chrome or a Chromium-based browser (WebHID required).

## What This Fork Adds

- **Dark theme UI** optimized for readability
- **Categorized Android TV usages** (Power, Navigation, Media, Volume, Apps, System)
- **Quick Actions tab** with one-click common mappings (Remap Voice Control, Macro Combos)
- **Layer Switcher** - interactive UI to create layer toggle (2 layers, Sticky) or layer cycle (3+ layers) with any key
- **Drag-and-drop reorder** for mappings
- **Improved UX** for Sticky/Tap/Hold with clear help text and tooltips
- **Android TV HID descriptor** (firmware) with Consumer Control outputs for all standard remote keys

## How It Works

This is a USB HID remapper that sits between your remote's USB receiver and the Android TV device. It intercepts HID input events and remaps them according to your configuration — entirely in hardware, no host software needed.

## Quick Start

1. Flash the appropriate firmware to your RP2040-based board (see [original docs](https://github.com/jfedor2/hid-remapper#how-to-make-the-device))
2. Open the [config tool](https://qutaiba-khader.github.io/hid-remapper-demo/)
3. Click **Open device** to connect via WebHID
4. Use the **Quick Actions** tab for common Android TV mappings
5. Use the **Layer Switcher** to set up profile switching (e.g., Power toggles between normal and media layers)
6. Click **Save to device** when done

## Acknowledgments

This project is built upon the excellent work of **[Jacek Fedorynski](https://github.com/jfedor2)** and the [HID Remapper](https://github.com/jfedor2/hid-remapper) project. The original HID Remapper provides a robust, well-engineered hardware remapping platform with support for multiple RP2040 and nRF52840 boards, comprehensive HID protocol handling, and a powerful expression engine. Without that solid foundation, this Android TV-focused customization would not be possible.

For full documentation on hardware setup, firmware compilation, and the complete feature set, please visit the original project at [remapper.org](https://www.remapper.org/).

## License

The software in this repository is licensed under the [MIT License](LICENSE), unless stated otherwise.

The hardware designs in this repository are licensed under the Creative Commons Attribution 4.0 International license ([CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)), unless stated otherwise.
