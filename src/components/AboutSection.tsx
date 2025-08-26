"use client";

import React, { useState } from "react";
import TimeDisplay from "./TimeDisplay";
import SpotifyAlbumCover from "./SpotifyAlbumCover";
import Button from "./Button";
import Text from "./Text";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import List from "./List";
import ListItem from "./ListItem";
import SimpleList from "./SimpleList";

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    // Force a small delay to ensure proper rendering
    setTimeout(() => {
      setIsExpanded(!isExpanded);
    }, 0);
  };

  return (
    <section
      className="w-[420px] bg-white overflow-hidden relative"
      style={{
        height: isExpanded ? "auto" : "82vh",
      }}
    >
      <div className="flex flex-col items-center justify-start p-12 gap-12 relative">
        {/* Hero Text */}
        <div className="flex flex-col gap-2 items-center justify-start w-full text-black text-center">
          <Text
            variant="lead"
            isUppercase
            font="sans"
            className="font-black tracking-tight leading-[1.1]"
          >
            RAFA DESIGNS THINGS
          </Text>
          <Text
            variant="body"
            className="text-sm tracking-tight leading-[1.2] font-medium"
          >
            Mostly software, but sometimes other things too
          </Text>
        </div>

        {/* Profile Image */}
        <div className="flex items-center justify-center relative">
          <div className="flex-none rotate-[4.226deg]">
            <Image
              src="/image 50.png"
              alt="Profile photo"
              width={133}
              height={170}
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div
          className="w-full relative"
          style={{
            maxHeight: isExpanded ? "none" : "calc(80vh - 150px)",
            overflow: isExpanded ? "visible" : "hidden",
          }}
        >
          <div className="flex flex-col gap-10">
            {/* Main Description */}
            <div className="flex flex-col gap-10 items-center justify-start w-full">
              <Text
                variant="body"
                className="text-sm text-black  leading-[1.33] tracking-tight font-medium"
              >
                I obsess over the pixels and the system they live in.
                <br />
                <br />
                Design should be honest—no dark patterns, no fluff—just stuff
                that works, feels right, and makes sense for both the person
                using it and the people building it.
              </Text>
            </div>

            {/* Additional Content Sections */}
            <div className="flex flex-col gap-16 items-center justify-start w-full">
              {/* Experience Section */}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <SectionHeading title="Experience" />
                <List>
                  <ListItem label="Docplanner" value="2019 – Now" />
                  <ListItem label="Semiflat" value="2021 – 2024" />
                  <ListItem label="Absolvent Group" value="2019" />
                  <ListItem label="INVO" value="2019" />
                </List>
              </div>

              {/* Learning Now */}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <SectionHeading title="I'm learning now" />
                <List>
                  <ListItem label="React Native" />
                  <ListItem
                    label="Japanese"
                    value="それは難しい"
                    valueClassName="text-neutral-500"
                  />
                  <ListItem label="Viennoiserie" />
                </List>
              </div>

              {/* I Like */}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <SectionHeading title="I like" />
                <SimpleList
                  items={[
                    {
                      text: "Star Wars",
                      href: "https://www.google.com/search?q=star+wars&sourceid=chrome&ie=UTF-8",
                      target: "_blank",
                      rel: "noopener noreferrer",
                    },
                    { text: "Cooking" },
                    { text: "Coffee" },
                    {
                      text: "To Pimp a Butterfly",
                      href: "https://music.apple.com/pl/album/to-pimp-a-butterfly/1440828886",
                      target: "_blank",
                      rel: "noopener noreferrer",
                    },
                    { text: "Bad bitches" },
                    {
                      text: "Cowboy Bebop",
                      href: "https://www.google.com/search?q=cowboy+bebop&oq=cowboy+bebop&sourceid=chrome&ie=UTF-8",
                      target: "_blank",
                      rel: "noopener noreferrer",
                    },
                    { text: "Working out" },
                  ]}
                />
              </div>

              {/* I Don't Like */}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <SectionHeading title="I don't like" />
                <SimpleList
                  items={[
                    { text: "Bad bitches" },
                    { text: "OKRs" },
                    { text: "Disco Polo" },
                  ]}
                />
              </div>

              {/* Connect */}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <SectionHeading title="Connect" />
                <List>
                  <ListItem
                    label="Instagram"
                    href="https://www.instagram.com/rafal.ziolek/"
                    target="_blank"
                    rel="noopener noreferrer"
                    isLabelLink
                  />
                  <ListItem
                    label="x.com"
                    href="https://x.com/rafal_ziolek"
                    target="_blank"
                    rel="noopener noreferrer"
                    isLabelLink
                  />
                  <ListItem
                    label="LinkedIn"
                    value="I am rarely there."
                    href="https://www.linkedin.com/in/rafal-ziolek/"
                    target="_blank"
                    rel="noopener noreferrer"
                    isLabelLink
                  />
                  <ListItem
                    label="Email"
                    href="mailto:rafal.k.ziolek@gmail.com"
                    isLabelLink
                  />
                </List>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay - only conditional part */}

      {/* Button - always sticky at bottom */}
      <div
        className={`sticky bottom-0 w-full flex justify-center pt-6 ${
          isExpanded ? "pb-6" : "pb-10"
        } px-12`}
        style={{
          background: isExpanded
            ? "transparent"
            : `linear-gradient(
        to bottom,
        hsla(0, 0%, 0%, 0) 0%,
        hsla(0, 0%, 0%, 0.013) 8.1%,
        hsla(0, 0%, 0%, 0.049) 15.5%,
        hsla(0, 0%, 0%, 0.104) 22.5%,
        hsla(0, 0%, 0%, 0.175) 29%,
        hsla(0, 0%, 0%, 0.259) 35.3%,
        hsla(0, 0%, 0%, 0.352) 41.2%,
        hsla(0, 0%, 0%, 0.45) 47.1%,
        hsla(0, 0%, 0%, 0.55) 52.9%,
        hsla(0, 0%, 0%, 0.648) 58.8%,
        hsla(0, 0%, 0%, 0.741) 64.7%,
        hsla(0, 0%, 0%, 0.825) 71%,
        hsla(0, 0%, 0%, 0.896) 77.5%,
        hsla(0, 0%, 0%, 0.951) 84.5%,
        hsla(0, 0%, 0%, 0.987) 91.9%,
        hsl(0, 0%, 0%) 100%
      )`,
        }}
      >
        <Button
          key={isExpanded ? "expanded" : "collapsed"}
          onClick={handleToggle}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </Button>
      </div>
    </section>
  );
}
