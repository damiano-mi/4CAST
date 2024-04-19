import { useState, ReactNode } from 'react'
import "../assets/styles/popover.css"

interface PopoverProps {
    content: string;
    children: ReactNode;
}

const Popover: React.FC<PopoverProps> = ({ content, children }) => {

    const [showPopover, setShowPopover] = useState(false);

    return (
        <div className="popover-container"
            onMouseLeave={() => setShowPopover(false)}
            onMouseEnter={() => setShowPopover(true)} 
            onTouchEnd={() => setShowPopover(false)}
            onTouchStart={() => setShowPopover(true)} 
        >
            {showPopover && <div className="card popover-content">{content}</div>}
            {children}
        </div>
    );
};

export default Popover;