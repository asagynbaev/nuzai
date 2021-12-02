export function getServerSideProps({ res }) {
    res.status(200);
    res.write("User-agent: *\r\n");

    if(process.env.npm_config_noindex) {
        res.write("Disallow: /");
    } else {
        res.write("Allow: /\r\n");
        res.write("Disallow: /api/\r\n");
        res.write("# Sitemap: http://nuzai.finance/sitemap.xml");
    }
    
    res.end();

    return { props: {} };
}

export default function RobotsTxt() { return null; }