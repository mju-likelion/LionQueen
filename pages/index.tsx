import type { NextPage } from "next";
import Head from "next/head";
import Button from "../DesignSystem/Button/Button";

const Home: NextPage = () => {
  return (
    <div className="p-20">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-primary-skyblue">text-primary-skyblue</h1>
        <h1 className="text-primary-brown">text-primary-brown</h1>
        <h1 className="text-primary-yellow">text-primary-yellow</h1>
        <h1 className="text-primary-orange">text-primary-orange</h1>
        <h1 className="text-primary-brown">text-primary-brown</h1>
        <h1 className="text-primary-green">text-primary-green</h1>
        <h1 className="text-primary-lightgreen">text-primary-lightgreen</h1>
        <h1 className="text-text">text-text</h1>
        <h1 className="text-placeholder">text-placeholder</h1>

        <Button
          type="button"
          color="primary-orange"
          size="large"
          className="border-2 w-full text-green-700"
        >
          버튼
        </Button>
        <button className="w-[400px] border-primary-orange border-2">
          버튼
        </button>
      </main>
    </div>
  );
};

export default Home;
