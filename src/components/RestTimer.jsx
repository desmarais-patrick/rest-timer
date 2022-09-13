import React, { useEffect } from 'react';

export default function RestTimer(props) {
    useEffect(() => {
        document.title = props.config.translations.appTitle;
    });

    return (
        <div>{props.config.translations.appTitle}</div>
    );
}
