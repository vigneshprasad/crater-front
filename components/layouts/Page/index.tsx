import Head from "next/head";

interface IProps {
  title: string;
}

const Page: React.FC<IProps> = ({ children, title }) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
    </Head>
    {children}
  </>
);

export default Page;
