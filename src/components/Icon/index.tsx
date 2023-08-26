import './Icon.module.scss'

type IconName = 'search' | 'close'

interface IconProps {
    icon: IconName
    size?: 'inherit'
}

const Icon: React.FC<IconProps> = ({ icon, size }) => {
    return (
        <span style={{ fontSize: size }} className="material-symbols-outlined">
            {icon}
        </span>
    )
}

export default Icon
