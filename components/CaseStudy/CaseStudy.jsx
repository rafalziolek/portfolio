import React from "react";
import { styled } from "../../stitches.confing";
import Box from "../Box/Box";
import BackButton from "../BackButton/BackButton";
import Text from "../Text/Text";
import { StyledLink } from "../Link/Link";
import Stack from "../Stack/Stack";
import Image from "next/image";
import Thumbnail from "../../public/assets/projects/Watson/Thumbnail.png";
import CaseStudyHeader from "./CaseStudyHeader";
import CaseStudyFooter from "./CaseStudyFooter";
const CaseStudyGrid = styled("div", {
  display: "grid",
  width: "100%",
  gridTemplateColumns: "1fr ",
  height: "100%",
  gap: "$xl",
  //   paddingInline: "$m",
});

const StyledCaseStudy = styled("div", {
  padding: "$m",
});

const CaseStudySidebar = styled("aside", {
  display: "flex",
  position: "sticky",
  top: "80px",
  height: "fit-content",
  flexDirection: "column",
  fontSize: "$s",
  gap: "$m",
  marginInlineStart: "$l",
});

const CaseStudyContent = styled("main", {
  //   backgroundColor: "$gray600",
  height: "100%",
  marginBlock: "$l",
  "& p": {
    maxWidth: "70ch",
    fontSize: "24px",
  },
});

function CaseStudy({ headerText, headerImages, children, link }) {
  return (
    <StyledCaseStudy>
      <CaseStudyHeader images={headerImages}>
        <Text css={{ maxWidth: "55ch" }} type="heading">
          {headerText}
        </Text>

        {link && (
          <StyledLink href={link} css={{ fontSize: "$l" }}>
            Check it live
          </StyledLink>
        )}
      </CaseStudyHeader>
      <CaseStudyContent>{children}</CaseStudyContent>
      <CaseStudyFooter></CaseStudyFooter>
    </StyledCaseStudy>
  );
}

export default CaseStudy;

// <Stack direction="column" css={{ margin: "$m", height: "2000px" }}>
//   <BackButton css={{ position: "sticky", top: "24px" }}>
//     Back to projects
//   </BackButton>
//   <Stack direction="column" Gap="xl">
//     <Text type="heading" css={{ maxWidth: "50ch" }}>
//       {projectIntro}
//     </Text>
//     <Stack direction="column" Gap="xs" justifyContent="between">
//       {sidebarData &&
//         sidebarData.map(({ label, text, link }) => (
//           <Stack
//             direction="row"
//             justifyContent="start"
//             Gap="s"
//             key={label}
//             // css={{
//             //   width: "100%",
//             // }}
//           >
//             {label && (
//               <Text
//                 css={{
//                   fontSize: "$s",
//                   lineHeight: "$l",
//                   fontWeight: "$emphasis",
//                 }}
//               >
//                 {`${label}:`}
//               </Text>
//             )}
//             {link ? (
//               <StyledLink
//                 css={{ color: "white", fontSize: "$s", lineHeight: "$l" }}
//                 href={`https://${text}`}
//               >
//                 {text}
//               </StyledLink>
//             ) : (
//               <Text css={{ fontSize: "$s", lineHeight: "$l" }}>{text}</Text>
//             )}
//           </Stack>
//         ))}
//     </Stack>
//   </Stack>

//   <Image
//     style={{
//       width: "100%",
//       objectFit: "cover",
//       height: "70vh",
//       borderRadius: "var(--radius-s)",
//       marginBlock: "var(--space-l)",
//       //   opacity: "0.4",
//     }}
//     alt="something"
//     src={Thumbnail}
//   ></Image>

//   <CaseStudyGrid>
//     <CaseStudyContent>{children}</CaseStudyContent>
//     {/* <CaseStudySidebar> */}
//     {/* <Text type="heading">{projectName}</Text> */}
//     {/* <Stack direction="column" Gap="xs">
//         {sidebarData &&
//           sidebarData.map(({ label, text, link }) => (
//             <Stack
//               direction="row"
//               justifyContent="between"
//               Gap="s"
//               key={label}
//               css={{
//                 width: "100%",
//               }}
//             >
//               {label && (
//                 <Text
//                   css={{
//                     fontSize: "$s",
//                     lineHeight: "$l",
//                     color: "$gray700",
//                   }}
//                 >
//                   {`${label}:`}
//                 </Text>
//               )}
//               {link ? (
//                 <StyledLink
//                   css={{ color: "white", fontSize: "$s", lineHeight: "$l" }}
//                   href={`https://${text}`}
//                 >
//                   {text}
//                 </StyledLink>
//               ) : (
//                 <Text css={{ fontSize: "$s", lineHeight: "$l" }}>
//                   {text}
//                 </Text>
//               )}
//             </Stack>
//           ))}
//       </Stack> */}
//     {/* </CaseStudySidebar> */}
//   </CaseStudyGrid>
// </Stack>
