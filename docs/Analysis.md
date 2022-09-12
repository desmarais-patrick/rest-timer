# Analysis

## Motivation

This project originates from practicing using the popular React front-end library.
As Dave Ceddia's article about learning this learning suggests,
I aimed at working on a throw-away project by reproducing an existing app.
I chose the tomato timer app found online.
Here is a screen capture of its main user interface:

![Screenshot of Toptal's TomatoTimer](assets/Toptal_tomato_timer_2022-09-09.png)

My goal is not to reproduce this timer app in its entirety,
but to create a simpler alternative with its main features such as:

- Initialize a timer with a default preset value
- Three action buttons: start/pause, reset
- Time left on timer updating...
  - Every minute or so when above 5 minutes
  - Every 10 seconds or so when between 1 and 5 minutes
  - Every second or so when below 1 minute
- Text displaying timer state, i.e. "Started", "Paused", "Ready" (and its selected preset once started or paused)
- Text displaying current time of day
- Display notification when timer is up!
- Play audio tone when timer is up!
- Display three preset timer buttons: big (ex. 30 minutes; default), medium (ex. 15 minutes), small (ex. 3 minutes)
- Customize timer preset values
- Customize labels for preset value buttons
- Space bar shortcut to toggle play-pause state

## Inspirations

**Apple Clock timer**

| Setup                                                                   | Running                                                                   |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| ![Screenshot of Apple's Clock timer (setup)](assets/Apple_timer_01.PNG) | ![Screenshot of Apple's Clock timer (running)](assets/Apple_timer_02.PNG) |

- Initial state displays the input for setting the amount of time
- Timing state displays progress using a depleting circle
- "Cancel" is used instead of "Stop" or "Pause"
- Color is used between "Start" / "Pause" button states

**Apple Music player**

| Paused                                                             | Playing                                                             |
| ------------------------------------------------------------------ | ------------------------------------------------------------------- |
| ![Apple's Music player (paused)](assets/Apple_music_player_01.PNG) | ![Apple's Music player (playing)](assets/Apple_music_player_02.PNG) |

- Playing state zooms in on the cover when transitioning from paused state.
- Progress bar is linear with small indicator minus sign (-2:36)

**Audible player**

| Paused                                                     | Playing                                                     | Settings overlay                                                   | Settings menu                                                   |
| ---------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------- |
| ![Audible's player (paused)](assets/Audible_player_01.PNG) | ![Audible's player (playing)](assets/Audible_player_02.PNG) | ![Audible's player settings overlay](assets/Audible_player_03.PNG) | ![Audible's player settings menu](assets/Audible_player_04.PNG) |

**Dribble _timer_ tag**

- Watch in background, displaying a timer as if in a lense over it
- Encouraging thoughts with emojis
- "Start" and "end" actions instead of "Start" and "stop"
- End frame when timer is up! "End" button to choose next timer.
- Nice, glowy and vibrant center animation when timer is running.
- Sliding numbers vertically as countdown.
- Setup a workflow with what's coming next (similar to Nike Training Club app)
- Timer can also be for days

Further considerations:

- Use SVG animations to transition between times
- Integrate cues using songs (or voice/book recordings) for a day at work: warm up, longer focus, admin time, meeting time, chat break, walk break, lunch break, tea break, cooldown, study session, night session
- Build calendar templates with event types tying to the song cues
- Randomly suggest a stretching exercise for posture hygiene
- Display an inspiring personal photo or picture, front and center for starting the day
- Design cool SVG icons to transition between timers (consider SVG animations)
- See current and upcoming calendar events
- Load applications initially, cached later
- Count number of timers from each type played (stats)
- Whether or not to automatically the next preset timer
- Cue a timer playlist, select next timer
- Timer themes with backgrounds
- Display time left in the browser's tab (document.title)
- Display desktop notification
- Choose sound volume
- Customize sound per preset (ex. paper to garbage, coffee ready, call from The Rock or famous movie quote)

## Analysis

Features:

- Initialize a timer with a default preset value
- Three action buttons: start/pause/resume, cancel
- Time left on timer updating...
  - Every minute or so
- Icon translating timer state, i.e. "Started", "Paused", "Ready" (and its selected preset once started or paused)
- Play audio tone when timer is up!
- Display three preset timer buttons: big (ex. 30 minutes; default), medium (ex. 15 minutes), small (ex. 3 minutes)
- Customize timer preset values
- Customize labels for preset value buttons
- Space bar shortcut to toggle play-pause state

Functionality:

- Reactive user interface
- No network communication after first load
- Play sound
- Flexible user interface (mobile to 4K)
- Form inputs for customizations
- Locally store settings in browser when changed

## Project plan

1. User interface design
1. Architecture design
1. Write test cases
1. Tooling setup (ex. time tracking, dev env)
1. Code static prototype
1. Prepare and integrate assets (icons, media, etc.)
1. Code rest of features
1. Review test cases and test
1. Fix bugs
1. Tag version 1
1. Retrospective
