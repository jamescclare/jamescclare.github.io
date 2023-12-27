import * as React from 'react';
import TerminalText, { TerminalTextProps } from './TerminalText';

type Props = { lines: TerminalTextProps[] }; 

const TerminalLines = ({ lines }: Props) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);

    const lineElements = lines
        .slice(0, currentIndex + 1)
        .map((props, index) => {
            const onComplete = () => {
                setCurrentIndex(index + 1);
                props.onComplete?.();
            };

            const isLastLine = index === lines.length - 1;
            const showCursor = currentIndex === index || isLastLine;
            
            return <TerminalText 
                key={index}
                {...props} 
                showCursor={showCursor}
                onComplete={onComplete} 
            />
        });

    return <>{...lineElements}</>;
};

export { TerminalLines };
export default TerminalLines;
