import styles from './Avatar.module.css'

export function Avatar({ hasBorder = true, src }) { //delacro que por padrão o hasBorder é true
    return (
            <img 
            className={hasBorder ? styles.avatarWithBorder : styles.avatar} //if hasBorder(que é true por padrão) então aplique o style.avatarWithBorder(com a borda) else aplique sem borda styles.avatar
            src={src} 
            />
    )
}