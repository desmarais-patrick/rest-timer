import React, { useEffect } from 'react';
import ControlsDisplay from './ControlsDisplay.jsx';
import IconDisplay from './IconDisplay.jsx';
import PresetsDisplay from './PresetsDisplay.jsx';
import SettingsDisplay from './SettingsDisplay.jsx';
import TimeDisplay from './TimeDisplay.jsx';

export default function RestTimer(props) {
    useEffect(() => {
        document.title = props.config.translations.appTitle;
    });

    return (
        <div className="rest-timer">
            <div className="main">
                <IconDisplay
                    minified={false}
                    icons={props.config.icons}
                    translations={props.config.translations}
                    timeLeftLevel={100}
                />
                <TimeDisplay
                    icons={props.config.icons}
                    minutesLeft={30}
                />
            </div>
            <div className="actions">
                <ControlsDisplay
                    icons={props.config.icons}
                    translations={props.config.translations}
                />
                <PresetsDisplay
                    icons={props.config.icons}
                    translations={props.config.translations}
                    presets={props.presets}
                />
            </div>
            <SettingsDisplay
                icons={props.config.icons}
                translations={props.config.translations}
                presets={props.presets}
            />
        </div>
    );
}
