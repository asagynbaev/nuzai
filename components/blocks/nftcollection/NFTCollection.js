import style from "./NFTCollection.module.scss";
import { useTranslation } from "next-i18next";
import { useState } from "react";
import cn from "classnames";

const _shirt = "/images/nft/_shirt";
const NFTs = {
    maximilyan: {
        name: "maximilyan",
        image: "/images/nft/maximilyan",
        description: "",
        artist: "venkman",
        enabled: true,
        available: true,
        link: "https://scv.finance/nft/bsc/0xf4b915E4Db1D4FB2027b9386B560e5d3a796A8e1/0"
    },
    cossandra: {
        name: "cossandra",
        image: "/images/nft/cossandra",
        description: "",
        artist: "avedevamari",
        enabled: true,
        available: true,
        link: "https://scv.finance/nft/bsc/0xf4b915E4Db1D4FB2027b9386B560e5d3a796A8e1/1"
    },
    snake: {
        name: "snake",
        image: "/images/nft/pikachu",
        description: "",
        artist: "",
        enabled: false,
        available: false,
        link: ""
    }
};

export default function NFTCollection() {
    const { t } = useTranslation("block_index_nftcollection");

    const [usedSide, setUsedSide] = useState(0);
    const [activeNFT, setActiveNFT] = useState(NFTs.maximilyan);
    const changeNFT = nft => {
        if(nft.name === activeNFT.name) return;

        setCurrentNFTImage(activeNFT.enabled ? activeNFT.image : _shirt);
        setNewNFTImage(nft.enabled ? nft.image : _shirt);
        setActiveNFT(nft);
        setUsedSide(prev => 1 - prev);
    };

    const [currentNFTImage, setCurrentNFTImage] = useState(activeNFT.image);
    const [newNFTImage, setNewNFTImage] = useState(activeNFT.image);

    return (
        <div id="nft" className={style.content_block}>
            <div className={style.top_title}>
                <div className={style.delimiter}/>
                <h2>{ t("title") }</h2>
                <h3>{ t("collection") }</h3>
            </div>
            <div className={style.content}>
                <div className={style.container}>
                    <div className={style.card_container}>
                        <div id="card" className={cn(style.card, { [style.active]: usedSide })}>
                            <div className={cn(style.side1)}>
                                <img src={usedSide ? currentNFTImage : newNFTImage} />
                            </div>
                            <div className={cn(style.side2)}>
                                <img src={usedSide ? newNFTImage : currentNFTImage} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.container}>
                    <div className={style.nft_wrapper}>
                        <p>{ t("description") }</p>
                        <div className={style.nft_preview}>
                            {
                                Object.values(NFTs).map(nft => (
                                    <NFTButton
                                        key={nft.name}
                                        active={activeNFT.name === nft.name}
                                        changeNFT={changeNFT}
                                        { ...nft }
                                    />
                                ))
                            }
                        </div>
                        <div className={style.nft_details}>
                            <li className={style.details_item}>
                                <p className={style.details_title}>{ t("artist") }</p>
                            </li>
                            <li className={style.details_item}>
                                {
                                    activeNFT.enabled
                                        ? (<a target="_blank" href={`http://instagram.com/${activeNFT.artist}`} className={style.details}>@{ activeNFT.artist }</a>)
                                        : "???"
                                }
                            </li>
                            <li className={style.details_item}>
                                <p className={style.details_title}>{ t("standard") }</p>
                            </li>
                            <li className={style.details_item}>
                                <p className={style.details}>BEP-721</p>
                            </li>
                            <li className={style.details_item}>
                                <p className={style.details_title}>{ t("price") }</p>
                            </li>
                            <li className={style.details_item}>
                                <p className={style.details}>{ t("from") } 1 BNB</p>
                            </li>
                        </div>
                        <div className={style.button_wrapper}>
                            <a 
                                target="_blank"
                                href={activeNFT.available ? activeNFT.link : undefined} 
                                className={cn(style.buy_button, { [style.disabled]: !activeNFT.available })}
                            >
                                { t(activeNFT.available ? "buy" : "soon")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NFTButton ({ active, name, image, description, enabled, changeNFT }) {
    return (
        <div
            className={cn(style.nft_preview_item, { [style.active]: active })}
            onClick={() => changeNFT(NFTs[name])}
        >
            <img src={enabled ? image : _shirt} alt={description} />
        </div>
    );
}