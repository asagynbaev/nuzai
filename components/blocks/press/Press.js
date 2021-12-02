import { useTranslation } from "next-i18next";
import style from "./Press.module.scss";

export default function Press() {
    const { t } = useTranslation("block_index_press");

    return (
        <div id="press" className={style.content_block}>
            <div className={style.title_wrapper}>
                <div className={style.grid_wrapper}>
                    <p>05.</p>
                    <h3>{ t("title") }</h3>
                </div>
                <h2>
                    { t("subtitle-1") }
                    <br />
                    { t("subtitle-2") }
                </h2>
            </div>
            <div className={style.content}>
                <PressElement
                    image="/images/press/cointelegraph"
                    date="25.08.2021"
                    title={t("description_cointelegraph")}
                    href="https://cointelegraph.com/press-releases/how-nuzai-network-makes-a-revolution-with-nfts"
                />
                <PressElement
                    image="/images/press/bsc"
                    date="23.08.2021"
                    title={t("description_bsc")}
                    href="https://www.bsc.news/post/nuzai-network-revolutionizing-augmented-reality"
                />
                <PressElement
                    image="/images/press/bic"
                    date="30.08.2021"
                    title={t("description_beincrypto")}
                    href="https://beincrypto.com/nuzai-network-solutions/"
                />
                <PressElement
                    image="/images/press/medium"
                    date="21.08.2021"
                    title={t("description_medium")}
                    href="https://medium.com/coinmonks/nft-and-nuzai-network-394430909b23"
                />
            </div>
        </div>
    );
}

function PressElement({ image, date, title, description, href }) {
    return (
        <a target="_blank" className={style.press_elem} href={href}>
            <div className={style.photo_wrapper}>
                <img src={image} alt={description ?? ""} />
            </div>
            <div className={style.press_details}>
                <p className={style.date}>{date}</p>
                <p className={style.title}>{title}</p>
            </div>
        </a>
    );
}