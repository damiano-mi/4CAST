import { useEffect, useState } from "react"

type SvgIconProps = {
    name: string,
    alt: string,
    style: object
}

export const SvgIcon = ({ name, alt, style }: SvgIconProps) => {
    const [icon, setIcon] = useState<React.JSX.Element | null>(null);

    useEffect(() => {
        if (name) {
            setIcon(
            <img 
                className="m-auto"
                src={require(`./../assets/images/${name}.svg`)}
                alt={alt}
                style={style}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src="./../assets/images/not-available.svg";
                }}
            />)
        }
    }, [name, alt, style])

    return icon;
}