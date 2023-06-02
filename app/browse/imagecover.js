import Image from 'next/image';
import styles from "./css/imagecover.module.css";

export default function ImageCover({ src, title, subtitle }) {
    return (
        <div style={{width: '100%', height: '100%', position: 'relative'}}>
            <p className={styles.title}>{title}</p>
            <div style={{width: '100%', height: '100%', position: 'relative'}}>
                <Image
                    loading="lazy"
                    src={src}
                    fill
                    style={{objectFit: "cover"}}
                />
            </div>
            <p className={styles.subtitle}>{subtitle}</p>
        </div>
    )
}