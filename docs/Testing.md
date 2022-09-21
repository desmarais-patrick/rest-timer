# Testing

## A. Functionality

### A.1. Controls

**TC-A.1.1. Play (or start)**

Preconditions:

- Access to web application server

Steps:

1. Open web app in browser
1. Play (or start)

Observations:

- Web app loads without errors
- Play or start button become Pause
- Cancel button is enabled
- Down indicator appears next to time left
- Timer started and countdown is activated
- Waiting for timer to end,
  - a sound is played
  - timer icon changes to empty state
  - down indicator disappears
  - Pause button becomes play or start button again
  - Cancel button is disabled

**TC-A.1.2. Pause and resume**

Preconditions:

- Same as TC-A.1.1

Steps:

1. Follow steps of TC-A.1.1
1. Pause
1. Resume
1. Pause
1. Cancel

Observations:

- Pause button transitions to Resume when activated
- Resume button transitions to Pause when activated
- Cancel button transitions becomes disabled when activated
- Cancel button resets timer according to selected preset when activated
- Pause button changes down indicator to a disabled state
- Resume button changes down indicator back to active state
- Resume button restarts timer countdown until the end

### A.2. Presets

**TC-A.2.1. Select preset while timer off**

Preconditions:

- No timer has been started

Steps:

1. Select neighbouring preset
1. Follow TC-A.1.1

Observations:

- Preset is applied to timer countdown
- Waiting for timer end matches the selected preset's time

**TC-A.2.2. Select preset while timer on**

Preconditions:

- No timer has been started

Steps:

1. Play (or start)
1. Select same preset
1. Play (or start)
1. Select neighbouring preset

Observations:

- Play is interrupted by preset selection
- Play can be activated after preset selection

**TC-A.2.3. Settings**

Preconditions:

- Same as A.1.1.

Steps:

1. Open settings thought Edit action
1. Change values
1. Choose Cancel or Save

Observations:

- Cancel doesn't apply changes, but keeps last values
- Save applies changes
- Save updates current timer
- Save interrupts timer
- Save saves settings in browser for next reload

## B. Environment

### B.1. Browsers

**TC-B.1.1. General functionality in browsers**

Preconditions:

- Access to the necessary browsers for testing
- Reset local storage in browser before testing

Steps:

1. Repeat TC-A.2.3. and TC-A.1.2. in the following browsers:
   - Chrome, macOS, desktop 2560x1440 (using Dev Tools)
   - Chrome, macOS, simulating tablet (portrait) 820x1180 (using Dev Tools)
   - Chrome, macOS, simulating tablet (landscape) 820x1180 (using Dev Tools)
   - Safari, macOS, desktop 1366x768
   - Firefox, macOS, desktop 1920x1080 (using Dev Tools)
   - Safari, iOS, mobile portrait, 360x640
   - Safari, iOS, mobile landscape, 360x640

Observations:

- First load in browser gives selected preset
- App do not display error in the console
- Settings are saved in the browser once modified

**TC-B.1.2. JavaScript disabled**

Preconditions:

- Browser feature for JavaScript is disabled
  - Chrome: chrome://settings/content/javascript

Steps:

1. Open web app
1. Activate button, if any

Observations:

- ~~Message is displayed to explain app state~~
  - App is white, leaving as is for now, given general good experience with JavaScript on.
    No need to reduce experience for the majority, given a small set of users.

**TC-B.1.3. Local storage disabled**

Preconditions:

- Browser feature for local storage is disabled
  - Chrome: chrome://settings/cookies (choose block all cookies)

Steps:

1. Follow TC-A.2.3.
1. Refresh page

Observations:

- Settings are not saved after refreshing page
