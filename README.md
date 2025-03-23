# Resume Auto-filler

A Chrome extension designed to automatically fill in resume or personal details on web forms. It identifies form fields by scanning various attributes (such as `id`, `name`, `placeholder`, etc.) and populates them with predefined personal details. This extension supports both English and Hebrew values, making it useful for multilingual forms.

## Features

- **Automatic Field Detection:** Scans input and textarea fields for keywords in various attributes.
- **Multi-language Support:** Fills in both English and Hebrew names depending on field identification.
- **Simulated Typing:** Uses a simulated typing effect for fields (e.g., for ID) to mimic natural user input.
- **Manifest V3:** Built using the latest Chrome extension APIs with a service worker background script.

## How It Works

1. **Extension Activation:**  
   When the extension icon is clicked, the background script checks if the current tab's URL is valid (non-chrome://) and injects the `content.js` script.

2. **Field Identification and Filling:**  
   The content script searches for input fields using multiple attributes (like `id`, `name`, `placeholder`, `aria-label`, etc.) and compares them against an array of keywords for both English and Hebrew. If a match is found and the field is empty, it populates the field with the corresponding personal detail.

3. **Simulated Typing:**  
   For certain fields (such as the ID), the script simulates typing by dispatching keyboard events to mimic human input.

## Installation

### Prerequisites

- [Google Chrome](https://www.google.com/chrome/) (or any Chromium-based browser that supports Manifest V3)

### Steps

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/resume-auto-filler.git
   cd resume-auto-filler
