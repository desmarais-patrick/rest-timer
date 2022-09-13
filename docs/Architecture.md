# Code architecture

- User interface components
- Supporting modules
- Supporting algorithms

## Components

- App
  - Main
    - IconDisplay
      - TimerIcon (SVG, styles, animation)
    - TimeDisplay
      - DownIndicator (SVG, styles, animation)
      - Time
  - Controls
    - ControlsDisplay
      - Play
      - Pause
      - Resume
      - Cancel
    - PresetDisplay
      - Title
      - EditAction
      - PresetA
      - PresetB
      - PresetC
  - Settings
    - Form
      - Title
      - CancelAction
      - SaveAction
      - PresetList
        - PresetInput
          - TimeInput (number)
          - LabelInput (text, optional)

## Modules

- Components (see above)
- Timer
- Notification
  - Sound notification
- Persistence
  - Local storage
- Config
  - DefaultPresets
  - Translations

## Assets

- TimerIcon.svg
  - Full
  - Pct90
  - Pct50
  - Pct10
  - Empty
- DownIndicator.svg
- Play.svg
- Pause.svg
- Reset.svg
- Edit.svg
- Sound.mp3
- Styles.css

## Algorithms

### RefreshTimer

```
Initial: default time = PresetA's
 -> Start(presetX?, 0)
 -> Reset(presetX)
 -> Resume()

Start(preset?, durationLeft?):
 - If no preset, choose default
 - Reset(preset)
 - Remember (startTime, durationLeft || timerDuration)
 - RefreshRunningTimer() in 60 seconds

Reset(preset):
 - Update time with preset.time

RefreshTimer()
 - Compute minutesLeft
   from (startTime, timerDuration) and currentTime
 - Update timer display, if necessary
 - Check if minutesLeft > 0
   - RefreshRunningTimer()
     in X milliseconds before next minute + 1 ms,
     from (currentTime)
 - If minutesLeft <= 0,
   - Notify 'TIMER ENDED'

Pause:
 - Cancel recall for RefreshTimer()
 - Remember (pausedPresetId, pausedTimeLeft)

Resume:
 - Start(pausedPresetId, pausedTimeLeft)

Cancel:
 - Cancel recall for RefreshTimer()
 - Reset(pausedPresetId?)
```

Compute refresh delay:

```
s: startTime
t: timerDuration

s + t = u: endTime

now() = c: currentTime
u - c = l: timeLeft

1 minute = m: oneMinute
m - (c % m) = n: untilNextMinute

5 milliseconds = x: extraShaveMillis
n + x = d: delayBeforeNextRefresh
```

### First load

1. Initially, we display a full timer with default values.
1. Load LocalStorage values, update UI if needed (fading animation)
1. Load sound MP3

### State

```
App (presets)

- Selected preset (or default): string ('a', 'b', 'c')
- Initializing: boolean (default: true)
- ShowingSettings: boolean (default: false)


Main (minified: bool, onClick: fn)


Icon (minified: bool, state: string, timeLeftLevel: number)


Timer (minified: bool, action, presetId, onTimerEnd)

- minutesLeft: number
- state: string ('ready', 'running', 'paused', 'done')


Controls (state: string, onAction: fn, labels: {string: string})


Presets (presets: [[string, number, string]], selectedPresetId: string, labels: {string: string}, onEdit: fn, onSelect: fn)


Settings (presets: [[string, number, string]], labels: {string: string}, onCancel, onSave)

- newPresets: [[string, number, string]]
```

### Settings form validation:

- Max time: 720 (minutes) or 12 hours
- Max label: 120 characters

If user enters t > 720, 999 for example for the time,
onBlur resets to 720.

If user enters t <= 0, -100 for example for the time,
onBlur resets to 1.

if user enters "001",
onBlur removes spaces and extra zeroes.

## Programming

1. Code setup: run empty app locally
1. Skeleton of components (static)
1. Adapt styles for various resolutions
1. Specifics:
   - TimerIcon animation when timer is running
   - DownIndicator animation when timer is running
   - CSS classes for transitioning timer states
   - CSS variables for themes
   - Language detection
   - Local storage access and save
   - Play sound in the browser
   - Configs, default values and translations
1. Interactivity:
   - Player controls
   - Edit action
   - Form inputs
   - Form cancel and save actions
   - App state affecting components
1. RefreshTimer algorithm and use cases
1. Refactoring
1. Testing:
   - Features in Chrome
   - Other browsers on macOS and iOS
   - Disable JavaScript
   - Disable LocalStorage
