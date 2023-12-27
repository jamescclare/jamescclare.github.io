import * as React from 'react';
// TODO: Get css-modules type importing working.
import styles from './TerminalText.module.css';

type Props = {
    text: string,
    typeCharPerSec?: number,
    showCursor?: boolean,
    onComplete?: () => void
};

const TerminalText = ({ text, typeCharPerSec = 1, onComplete = () => {}, showCursor = true }: Props) => {
    const [isCursorOn, setIsCursorOn] = React.useState(showCursor);
    const [currentText, setCurrentText] = React.useState('');

    React.useEffect(() => {
        setCurrentText('');

        let snipIndex = 1;

        const intervalId = setInterval(() => {
            setCurrentText(text.substring(0, snipIndex));
            if (snipIndex === text.length) {
                clearInterval(intervalId);
                onComplete();
            };
            snipIndex++;
        }, typeCharPerSec * 1000);

        
        return () => clearTimeout(intervalId);
    }, [text]);

    // TODO: Do the cursor blinking in a CSS animation.
    React.useEffect(() => {
        if (!showCursor) return;
        
        const timeoutId = setTimeout(() => {
            setIsCursorOn(!isCursorOn);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [isCursorOn, showCursor]);

    const cursor = showCursor 
        ? isCursorOn 
            ? '█' 
            : '_' 
        : '';

    return <div className={styles.terminal}>{`> ${currentText}${cursor}`}</div>;
};

export { TerminalText, Props as TerminalTextProps };
export default TerminalText;
