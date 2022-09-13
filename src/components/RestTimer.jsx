import React, { useEffect, useState } from 'react';
import IconDisplay from './IconDisplay';

export default function RestTimer(props) {
    const [presetId, totalMinutes, presetTitle] = props.presets[props.selectedPresetIndex];
    const [state, setState] = useState({
        minutesLeft: totalMinutes,
    });

    useEffect(() => {
        document.title = props.config.translations.appTitle;
    });

    return (
        <div>
            <IconDisplay
                minified={false}
                icons={props.config.icons}
                translations={props.config.translations}
                timeLeftLevel={100}
            />
        </div>
    );
}
