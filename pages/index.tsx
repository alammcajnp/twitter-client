import Image from "next/image";
import { BsBookmark, BsPersonFillGear, BsTwitter } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import React, { useCallback } from "react";
import { BiBell, BiBookBookmark, BiMoney } from "react-icons/bi";
import { GoogleLogin } from "@react-oauth/google";
import { SlEnvolope, SlOptions } from "react-icons/sl";
import FeedCard from "@/components/FeedCard";
import toast from "react-hot-toast";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";

interface TwitterSideBarButton {
  title: string;
  icon: React.ReactNode;
}

const sideBarMenuItems: TwitterSideBarButton[] = [
  {
    title: "Home",
    icon: <IoMdHome />
  },
  {
    title: "Explore",
    icon: <FaHashtag />
  },
  {
    title: "Notification",
    icon: <BiBell />
  },
  {
    title: "Messages",
    icon: <SlEnvolope />
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />
  },
  {
    title: "Profile",
    icon: <BsPersonFillGear />
  },
  {
    title: "More Options",
    icon: <SlOptions />
  }
];

export default function Home() {
  const handleLoginWithGoogle = useCallback(async (cred: any) => {
    const googleToken = cred.credential;
    if (!googleToken) return toast.error("Google token not found");
    const { verifyGoogleToken } = await graphQLClient.request(
      verifyUserGoogleTokenQuery,
      {
        token: googleToken
      }
    );

    toast.success("success");
    console.log(verifyGoogleToken);
    if (verifyGoogleToken)
      window.localStorage.setItem("__twitter_token", verifyGoogleToken);
  }, []);
  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen px-16">
        <div className="col-span-3  pt-1 ml-28">
          <div className="text text-2xl h-fit w-fit hover:bg-gray-800 rounded-full pt-4 cursor-pointer transition-all">
            <BsTwitter />
          </div>
          <div className="mt-1 pr-4">
            <ul>
              {sideBarMenuItems.map((item) => (
                <li
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-3 py-2 w-fit cursor-pointer mt-2"
                  key={item.title}
                >
                  <span>{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
              <button className="bg-[#1d9bf0] py-1 px-1 rounded-full w-full">
                Tweet
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-6 border-r-[1px] border-l-[1px] h-scren overflow-scroll border border-gray-600">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          <h1 className="text-2xl"> New To Twitter</h1>
          <div className="p-5 border bg-slate-500 rounded-lg text-center">
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        </div>
      </div>
    </div>
  );
}
