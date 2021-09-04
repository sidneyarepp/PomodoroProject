# Pomodoro Timer (Built Using React)

![pomodoro-project-homepage](https://user-images.githubusercontent.com/56658340/132106208-bbc0f797-8a66-4c44-b5ff-3cd7893956ce.png)

When the user first comes to the site they have the following options:
- The focus duration can be decreased to five minutes or increased to sixty minutes.  This is done in five minute incriments.
- The break duration can be decreased to one minute or increased to fifteen minutes.  This is done in one minute incriments.

When the user has edited their focus and break duration times to their preference they can click the start button.

# Focus Session Started
![pomodoro-project-start](https://user-images.githubusercontent.com/56658340/132106337-c55d9269-5bda-4275-bec9-41f153adad3d.png)

When the timer is running:
- The focus duration and break duration buttons are disabled.
- The "play" button is changed to a "pause" button.
- The "stop" button is enabled.
- The status bar at the bottom of the page begins to fill.

*If the stop button is clicked the timer will stop and the focus/break duration buttons will be active again.

# Pause Focus Session
![pomodoro-project-paused](https://user-images.githubusercontent.com/56658340/132106391-46b546da-12de-4539-b9b2-975885ab2989.png)

When an active session has been started and a user clicks the "pause" button the focus and break duration buttons are still disabled.
The only difference the user sees is a notification that the timer has been paused, and the "pause" button turns back into a "play" button.


# Break Session
![pomodoro-project-break](https://user-images.githubusercontent.com/56658340/132106813-5e474d6f-1630-424a-882b-64bf1d1450cb.png)


When the focus timer runs down to zero the break session timer will start.

The following are all the same as the focus duration:
- Focus duration buttons
- Break duration buttons
- Play/pause button
- Duration status bar
