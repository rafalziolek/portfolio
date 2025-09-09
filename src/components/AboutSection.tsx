"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import Text from "./Text";
import SectionHeading from "./SectionHeading";
import ListItem from "./ListItem";
import { SizeIcon } from "@radix-ui/react-icons";

export default function AboutSection({ className }: { className?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={` text-white w-full h-[95vh] overflow-hidden fixed ${className}`}
    >
      <div className="flex flex-col items-center justify-start">
        <div className="max-w-[640px] w-full flex flex-col gap-2 items-start justify-center pt-0 px-0 sticky top-0">
          <div className="flex-1 flex gap-2 justify-start pt-12 sticky top-0">
            <div className="flex-1 h-full flex flex-col gap-14 justify-start px-0 py-12 sticky top-0">
              {/* Hero Section */}
              <div className="flex flex-col gap-8 items-start justify-start w-full">
                {/* Hero Text */}
                <div className="flex flex-col justify-start w-full">
                  <Text variant="heading">Rafa designs things.</Text>
                  <Text variant="body">
                    Mostly software, but sometimes other things too.
                  </Text>
                </div>

                {/* Image and Description Block */}
                <div className="flex flex-col gap-8 items-start justify-start w-full">
                  {/* Profile Image */}
                  <div className="h-[248px] w-full relative">
                    <Image
                      src="/test-portrait.png"
                      alt="Portrait of Rafa"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 border-[0.5px] border-white/20" />
                  </div>

                  {/* Main Description */}
                  <div className="flex flex-col items-start w-full gap-6 text-pretty">
                    <Text variant="body">
                      I obsess over the pixels and the system they live in.
                    </Text>
                    <Text variant="body">
                      Design should be honest—no dark patterns, no fluff—just
                      stuff that works, feels right, and makes sense for both
                      the person using it and the people building it.
                    </Text>
                  </div>
                </div>
              </div>

              {/* Horizontal Divider */}
              <div className=" h-0 -mx-[50vw]">
                <div className="border-b border-dotted border-white/15" />
              </div>

              {/* Content Sections */}
              <div className="flex flex-col gap-14 items-center justify-start w-full">
                {/* Experience Section */}
                <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                  <SectionHeading title="Experience" />
                  <div className="flex flex-col items-start justify-start w-full">
                    <ListItem label="Docplanner" value="2019 – Now" />
                    <ListItem label="Semiflat" value="2021 – 2024" />
                    <ListItem label="Absolvent Group" value="2019" />
                    <ListItem label="INVO" value="2019" />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                  <SectionHeading title="I'm learning now" />
                  <div className="flex flex-col items-start justify-center w-full">
                    <Text variant="body">React Native</Text>
                    <div className="flex gap-2 items-baseline justify-start w-full">
                      <Text variant="body">Japanese</Text>
                      <Text variant="body" color="rgba(255,255,255,0.46)">
                        それは難しい
                      </Text>
                    </div>
                    <Text variant="body">Viennoiserie</Text>
                  </div>
                </div>
                {/* I Like */}
                <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                  <SectionHeading title="I like" />
                  <div className="flex flex-col items-start justify-start w-full">
                    <Text variant="body">Star Wars</Text>
                    <Text variant="body">Cooking</Text>
                    <Text variant="body">Coffee</Text>
                    <Text variant="body">To Pimp a Butterfly</Text>
                    <Text variant="body">Bad bitches</Text>
                    <Text variant="body">Cowboy Bebop</Text>
                    <Text variant="body">Uncut Gems</Text>
                    <Text variant="body">Fitness</Text>
                  </div>
                </div>

                {/* I Don't Like */}
                <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                  <SectionHeading title="I don't like" />
                  <div className="flex flex-col items-start justify-center w-full">
                    <Text variant="body">Bad bitches</Text>
                    <Text variant="body">OKRs</Text>
                    <Text variant="body">Small talk</Text>
                    <Text variant="body">Disco Polo</Text>
                  </div>
                </div>

                {/* Connect */}
                <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                  <SectionHeading title="Connect" />
                  <div className="flex flex-col items-start justify-center w-full">
                    <Text
                      variant="body"
                      as="a"
                      href="https://www.instagram.com/rafal.ziolek/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-white/30 underline-offset-[14.5%]"
                    >
                      Instagram
                    </Text>
                    <Text
                      variant="body"
                      as="a"
                      href="https://x.com/rafal_ziolek"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-white/30 underline-offset-[14.5%]"
                    >
                      x.com
                    </Text>
                    <Text
                      variant="body"
                      as="a"
                      href="mailto:rafal.k.ziolek@gmail.com"
                      className="underline decoration-white/30 underline-offset-[14.5%]"
                    >
                      Email
                    </Text>
                  </div>
                </div>

                {/* I'm Learning Now */}
              </div>
            </div>
          </div>

          {/* Bottom Button Container */}
          <div
            className="sticky w-full bottom-0 flex h-32 pb-8 flex-col items-center justify-end"
            style={{
              background:
                "linear-gradient(to bottom, hsla(0, 0%, 0%, 0) 0%, hsla(0, 0%, 0%, 0.013) 8.1%, hsla(0, 0%, 0%, 0.049) 15.5%, hsla(0, 0%, 0%, 0.104) 22.5%, hsla(0, 0%, 0%, 0.175) 29%, hsla(0, 0%, 0%, 0.259) 35.3%, hsla(0, 0%, 0%, 0.352) 41.2%, hsla(0, 0%, 0%, 0.45) 47.1%, hsla(0, 0%, 0%, 0.55) 52.9%, hsla(0, 0%, 0%, 0.648) 58.8%, hsla(0, 0%, 0%, 0.741) 64.7%, hsla(0, 0%, 0%, 0.825) 71%, hsla(0, 0%, 0%, 0.896) 77.5%, hsla(0, 0%, 0%, 0.951) 84.5%, hsla(0, 0%, 0%, 0.987) 91.9%, hsl(0, 0%, 0%) 100%)",
            }}
          >
            <Button
              onClick={handleToggle}
              variant="inverted"
              trailingIcon={
                <SizeIcon
                  width={15}
                  height={15}
                  color="black"
                  className="mt-[0.09375rem] will-change-transform"
                />
              }
            >
              Information
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
