import { About, Animals, Delimiter, Distribution, NFTCollection, Press, Roadmap, Team, Technology, Top } from "@/components/blocks";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { useTranslation } from "next-i18next";
import Head from "next/head";

export async function getServerSideProps({ locale }) {

    return {
        props: {
            ...await serverSideTranslations(locale, [
                "page_index",
                "block_index_about",
                "block_index_animals",
                "block_index_nftcollection",
                "block_index_distribution",
                "block_index_press",
                "block_index_roadmap",
                "block_index_team",
                "block_index_technology",
                "block_index_top",
            ])
        }
    };
}

export default function Index() {
    const { t } = useTranslation("page_index");

    return (<>
        <Head>
            <meta name="description" content={t("seo_description")} />
            <meta name="keywords" content={t("seo_keywords_1")} />
            <meta name="keywords" content={t("seo_keywords_2")} />
            <meta name="keywords" content={t("seo_keywords_3")} />
        </Head>
        <header>
            {<Header />}
        </header>
        <main>
            <Top />
            <About />
            <Technology />
            <Delimiter />
            <Animals />
            <NFTCollection />
            <Roadmap />
            <Team />
            <Press />
            <Distribution />
        </main>
        <footer>
            <Footer />
        </footer>
    </>);
}