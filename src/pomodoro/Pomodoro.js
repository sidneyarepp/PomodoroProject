import React, { useState } from 'react';
import useInterval from "../utils/useInterval";
import FocusDuration from './FocusDuration';
import BreakDuration from './BreakDuration';
import PlayPauseStop from './PlayPauseStop';
import CurrentSession from './CurrentSession';


function Pomodoro() {

    // These functions are defined outside of the component to insure they do not have access to state
    // and are, therefore more likely to be pure.

    /**
     * Update the session state with new state after each tick of the interval.
     * @param prevState
     *  the previous session state
     * @returns
     *  new session state with timing information updated.
     */
    function nextTick(prevState) {
        const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
        return {
            ...prevState,
            timeRemaining,
        };
    }

    /**
     * Higher order function that returns a function to update the session state with the next session type upon timeout.
     * @param focusDuration
     *    the current focus duration
     * @param breakDuration
     *    the current break duration
     * @returns
     *  function to update the session state.
     */

    function nextSession(focusDuration, breakDuration) {
        /**
         * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
         */
        return (currentSession) => {
            if (currentSession.label === "Focusing") {
                return {
                    label: "On Break",
                    timeRemaining: breakDuration.time * 60,
                };
            }
            return {
                label: "Focusing",
                timeRemaining: focusDuration.time * 60,
            };
        };
    }

    // Timer starts out paused
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    // The current session - null where there is no session running
    const [session, setSession] = useState(null);

    // ToDo: Allow the user to adjust the focus and break duration.
    const [focusDuration, setFocusDuration] = useHandleTime({ time: 25, min: 5, max: 60, changeQuantity: 5 });
    const [breakDuration, setBreakDuration] = useHandleTime({ time: 5, min: 1, max: 15, changeQuantity: 1 });

    /**
     * Custom hook that invokes the callback function every second
     *
     * NOTE: You will not need to make changes to the callback function
     */
    useInterval(() => {
        if (session.timeRemaining === 0) {
            new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
            return setSession(nextSession(focusDuration, breakDuration));
        }
        return setSession(nextTick);
    },
        isTimerRunning ? 1000 : null
    );

    /**
     * Called whenever the play/pause button is clicked.
     */
    function playPause() {
        setIsTimerRunning((prevState) => {
            const nextState = !prevState;
            if (nextState) {
                setSession((prevStateSession) => {
                    // If the timer is starting and the previous session is null,
                    // start a focusing session.
                    if (prevStateSession === null) {
                        return {
                            label: "Focusing",
                            timeRemaining: focusDuration.time * 60,
                        };
                    }
                    return prevStateSession;
                });
            }
            return nextState;
        });
    }

    //Custom hook to handle clicking the increase/decrease time buttons.
    function useHandleTime(initialValue) {
        const [state, setState] = useState(initialValue);

        function countChange(e) {
            const returnValue = e.target.dataset.testid ? e.target.dataset.testid : e.target.parentNode.dataset.testid

            returnValue.includes('increase')

                ?

                setState({ ...state, 'time': (Math.min(state.max, Math.max(state.min, state.time + state.changeQuantity))) })

                :

                setState({ ...state, 'time': (Math.min(state.max, Math.max(state.min, state.time - state.changeQuantity))) })

        }
        return [state, countChange];

    }

    //Function to handle the stop button when a session is running.
    function stopTimer() {
        setIsTimerRunning(false)
        setSession(null)
    }

    return (

        <div className="pomodoro">
            <div className="row">
                <FocusDuration session={session} focusDuration={focusDuration} setFocusDuration={setFocusDuration} isTimerRunning={isTimerRunning} />
                <BreakDuration session={session} breakDuration={breakDuration} setBreakDuration={setBreakDuration} isTimerRunning={isTimerRunning} />
            </div>

            <div className="row">
                <PlayPauseStop stopTimer={stopTimer} isTimerRunning={isTimerRunning} playPause={playPause} />
            </div>

            <CurrentSession session={session} breakDuration={breakDuration} focusDuration={focusDuration} isTimerRunning={isTimerRunning} />
        </div>
    )
}

export default Pomodoro;