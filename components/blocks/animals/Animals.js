import { useTranslation } from "next-i18next";
import style from "./Animals.module.scss";

export default function Animals() {
    const { t } = useTranslation("block_index_animals");

    return (
        <div id="animals" className={style.content_block}>
            <div className={style.content_container}>
                <div className={style.title_wrapper}>
                    <div className={style.grid_wrapper}>
                        <p>02.</p>
                        <h3>{ t("title") }</h3>
                    </div>
                    <h2>{ t("subtitle") }</h2>
                </div>
                <div className={style.text_container}>
                    <p>{ t("text") }</p>
                </div>
            </div>
            <div className={style.content_container}>
                <div className={style.grid_container}>
                    <div className={style.img_wrapper}>
                        <img src="/images/funds/wwf" alt="" />
                    </div>
                    <div className={style.img_wrapper}>
                        <img src="/images/funds/navs" alt="" />
                    </div>
                    <div className={style.img_wrapper}>
                        <img src="/images/funds/ifaw" alt="" />
                    </div>
                    <div className={style.img_wrapper}>
                        <img src="/images/funds/cs" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}