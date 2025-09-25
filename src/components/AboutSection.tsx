"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import Text from "./Text";
import SectionHeading from "./SectionHeading";
import ListItem from "./ListItem";
import {
  ArrowRightIcon,
  ArrowTopRightIcon,
  SizeIcon,
} from "@radix-ui/react-icons";

export default function AboutSection({ className }: { className?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`text-white w-full  ${
        !isExpanded ? "h-[95vh] sticky top-0" : "h-fit"
      } overflow-hidden  ${className}`}
    >
      <div className="flex flex-col items-center justify-start">
        <div className="max-w-[480px] w-full flex flex-col gap-2 items-start justify-center pt-0 px-0 sticky top-0">
          <div className="flex-1 flex gap-2 justify-start pt-24 sticky top-0">
            <div className="flex-1 h-full flex flex-col gap-14 justify-start px-0 py-12 sticky top-0">
              {/* Hero Section */}
              <div className="flex flex-col gap-7 items-start justify-start">
                {/* Hero Text */}
                <div className="flex flex-col justify-start w-full">
                  <Text
                    variant="lead"
                    className="single-story-a tracking-[-0.03em] text-white  mb-2"
                  >
                    Rafa designs things.{" "}
                    <span className="text-balance">
                      Mostly software, sometimes other stuff.
                    </span>
                  </Text>
                </div>

                {/* Image and Description Block */}

                {/* Main Description */}

                <div className="flex flex-col gap-8 items-start justify-start w-full mb-2">
                  {/* Profile Image */}
                  <div className="h-[260px] self-stretch relative">
                    <Image
                      src="/test-portrait.png"
                      alt="Portrait of Rafa"
                      fill
                      className="object-cover object-top rounded-xs"
                    />
                    <div className="absolute inset-0 border-[0.5px] border-white/20" />
                  </div>
                </div>
                <div className="flex flex-col items-start w-full gap-5 text-pretty">
                  <Text variant="body">
                    He’s currently building design systems at{" "}
                    <a
                      className="text-blue-400 underline decoration-white/20 underline-offset-[14.5%] inline-flex items-center gap-0.5"
                      href="https://docplanner.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      DocPlanner
                      <ArrowTopRightIcon width={15} height={15} />
                    </a>
                  </Text>
                  <Text variant="body">
                    Rafał believes good design happens where systems,
                    usefulness, and beauty overlap—and when those align, the
                    outcome is something that lasts.
                  </Text>
                </div>
              </div>

              {/* Horizontal Divider */}
              <div className=" h-0 -mx-[50vw]">
                <div className="border-b border-dotted border-white/10" />
              </div>

              {/* Content Sections */}
              <div className="flex flex-col gap-8 items-start justify-start ">
                {/* Experience Section */}
                <div className="col-span-1 flex flex-col gap-1 items-start justify-start w-full">
                  <SectionHeading title="Previously" />
                  <div className="flex flex-col items-start justify-start w-full">
                    <ListItem label="Semiflat" />
                    <ListItem label="Absolvent Group" />
                    <ListItem label="INVO" />
                  </div>
                </div>

                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <SectionHeading title="I'm learning now" />
                  <div className="flex flex-col items-start justify-start w-full">
                    <ListItem label="React Native" />
                    <ListItem label="Japanese" value="それは難しい" />
                    <ListItem label="Viennoiserie" />
                  </div>
                </div>
                {/* I Like */}
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <SectionHeading title="I like" />
                  <div className="flex flex-col items-start justify-start w-full">
                    <ListItem
                      label="Star Wars"
                      isLabelLink={true}
                      href="https://en.wikipedia.org/wiki/Star_Wars"
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={<ArrowTopRightIcon width={15} height={15} />}
                    />
                    <ListItem label="Cooking" />
                    <ListItem label="Coffee" />
                    <ListItem label="Coke Zero" />
                    <ListItem
                      isLabelLink={true}
                      href="https://music.apple.com/pl/album/to-pimp-a-butterfly/1440828886"
                      target="_blank"
                      rel="noopener noreferrer"
                      label="To Pimp a Butterfly"
                      icon={<ArrowTopRightIcon width={15} height={15} />}
                    />
                    <ListItem label="Bad bitches" />
                    <ListItem
                      label="Cowboy Bebop"
                      isLabelLink={true}
                      href="https://en.wikipedia.org/wiki/Cowboy_Bebop"
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={<ArrowTopRightIcon width={15} height={15} />}
                    />
                    <ListItem
                      isLabelLink={true}
                      href="https://en.wikipedia.org/wiki/Uncut_Gems"
                      target="_blank"
                      rel="noopener noreferrer"
                      label="Uncut Gems"
                      icon={<ArrowTopRightIcon width={15} height={15} />}
                    />
                    <ListItem label="Fitness" />
                  </div>
                </div>

                {/* I Don't Like */}
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <SectionHeading title="I don't like" />
                  <div className="flex flex-col items-start justify-start w-full">
                    <ListItem label="Bad bitches" />
                    <ListItem label="OKRs" />
                    <ListItem label="Small talk" />
                    <ListItem label="Disco Polo" />
                  </div>
                </div>

                {/* Connect */}
                <div className="flex flex-col gap-1 items-start justify-start w-full">
                  <SectionHeading title="Connect" />
                  <div className="flex flex-col items-start justify-start w-full">
                    <ListItem
                      label="Instagram"
                      href="https://www.instagram.com/rafal.ziolek/"
                      target="_blank"
                      rel="noopener noreferrer"
                      isLabelLink={true}
                    />
                    <ListItem
                      label="x.com"
                      href="https://x.com/rafal_ziolek"
                      target="_blank"
                      rel="noopener noreferrer"
                      isLabelLink={true}
                    />
                    <ListItem
                      label="Email"
                      href="mailto:rafal.k.ziolek@gmail.com"
                      isLabelLink={true}
                    />
                  </div>
                </div>

                {/* I'm Learning Now */}
              </div>
            </div>
          </div>

          {/* Bottom Button Container */}
          <div
            className="sticky -mx-8 self-stretch bottom-0 flex h-32 pb-3 flex-col items-center justify-end"
            style={{
              background:
                "linear-gradient(to bottom, hsla(0, 0%, 0%, 0) 0%, hsla(0, 0%, 0%, 0.013) 8.1%, hsla(0, 0%, 0%, 0.049) 15.5%, hsla(0, 0%, 0%, 0.104) 22.5%, hsla(0, 0%, 0%, 0.175) 29%, hsla(0, 0%, 0%, 0.259) 35.3%, hsla(0, 0%, 0%, 0.352) 41.2%, hsla(0, 0%, 0%, 0.45) 47.1%, hsla(0, 0%, 0%, 0.55) 52.9%, hsla(0, 0%, 0%, 0.648) 58.8%, hsla(0, 0%, 0%, 0.741) 64.7%, hsla(0, 0%, 0%, 0.825) 71%, hsla(0, 0%, 0%, 0.896) 77.5%, hsla(0, 0%, 0%, 0.951) 84.5%, hsla(0, 0%, 0%, 0.987) 91.9%, hsl(0, 0%, 0%) 100%)",
            }}
          >
            <Button
              onClick={handleToggle}
              trailingIcon={
                <SizeIcon
                  width={15}
                  height={15}
                  color="white"
                  className=" will-change-transform"
                />
              }
            >
              Expand
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
