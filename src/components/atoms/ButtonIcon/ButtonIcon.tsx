type ButtonIconProps = {
    children: any,
    onClick: any
}

const ButtonIcon = ({children, onClick}: ButtonIconProps) => {
    return (
        <button onClick={onClick}> {children}</button>
    )
}

export default ButtonIcon;