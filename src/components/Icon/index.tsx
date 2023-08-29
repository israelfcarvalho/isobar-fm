import styles from './Icon.module.scss'
import React, { ButtonHTMLAttributes, MouseEventHandler, useMemo } from 'react'
import { className as cn } from '../../utils/hooks/classname'

type IconType = 'presentational' | 'button' | 'link'
type IconName = 'search' | 'close' | 'chevron_left' | 'radio'

interface IconPropsBase<IT extends IconType> {
    type: IT
    icon: IconName
    size?: 'inherit'
    className?: string
}

type IconPresentationalProps = IconPropsBase<'presentational'>

interface IconClickableProps {
    ariaLabel?: string
    ariaLabelledBy?: string
}

interface IconButtonProps extends IconPropsBase<'button'>, IconClickableProps {
    onClick: MouseEventHandler<HTMLButtonElement>
    buttonType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
}

interface IconLinkProps extends IconPropsBase<'link'>, IconClickableProps {
    href: string
}

export type IconProps = IconPresentationalProps | IconButtonProps | IconLinkProps

function getTagProps<T extends keyof JSX.IntrinsicElements>(
    tag: T,
    attr?: JSX.IntrinsicElements[T]
): [T, object] | [T, JSX.IntrinsicElements[T]] {
    if (!attr) {
        return [tag, {}]
    }

    return [tag, attr]
}

const Icon: React.FC<IconProps> = ({ icon, size, className = '', ...props }) => {
    const [Tag, tagProps] = useMemo(() => {
        switch (props.type) {
            case 'button': {
                const { onClick, ariaLabel, ariaLabelledBy, buttonType: type } = props

                return getTagProps('button', {
                    'aria-label': ariaLabel,
                    'aria-labelledby': ariaLabelledBy,
                    onClick,
                    type,
                })
            }

            case 'link': {
                const { href, ariaLabel, ariaLabelledBy } = props

                return getTagProps('a', { 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy, href })
            }

            default:
                return getTagProps('span')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.type])

    return (
        <Tag
            className={cn('material-symbols-outlined', styles.icon, className)}
            style={{ fontSize: size }}
            {...tagProps}
        >
            {icon}
        </Tag>
    )
}

export default Icon
