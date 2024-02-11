import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactElement, useEffect, useState } from "react"

interface IProps {
    children: ReactElement;
}

const MoreOptionButton = ({ children }: IProps) => {
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        document.addEventListener("click", closeShowOptions);

        return () => {
            document.removeEventListener("click", closeShowOptions);
        }
    }, [])

    const closeShowOptions = (event: React.MouseEvent | MouseEvent) => {
        event.stopPropagation();
        setShowOptions(false);
    }

    const toggleShowOptions = (event: React.MouseEvent | MouseEvent) => {
        event.stopPropagation();
        setShowOptions((prevShowOptions) => !prevShowOptions);
    }

    return (
        <span className="elipsis-container" onClick={(e) => toggleShowOptions(e)}>
            <FontAwesomeIcon
                className="fa-elipsis"
                icon={faEllipsisVertical}
            />
            {showOptions && (
                <div className="options">
                    {children}
                </div>
            )}
        </span>
    )
}

export default MoreOptionButton