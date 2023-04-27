import React from "react";
import { styled } from "../../stitches.confing";
import Box from "../Box/Box";
import Text from "../Text/Text";
import BackButton from "../BackButton/BackButton";
import { MDXProvider } from "@mdx-js/react";
import { StyledLink } from "../Link/Link";

const StyledCaseStudy = styled("div", {
  padding: "$m",
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

export const StyledImg = styled("img", {
  maxWidth: "100%",
  height: "auto",
  objectFit: "cover",
});

const StyledH1 = styled("h1", {
  fontSize: "$5",
  fontWeight: "$regular",
  lineHeight: "$heading",
  maxWidth: "63ch",
  letterSpacing: "-0.5px",
  marginBottom: "$m",
  marginTop: "$m",
});
const StyledH2 = styled("h2", {
  fontSize: "$5",
  fontWeight: "$regular",
  lineHeight: "$heading",
  maxWidth: "63ch",
  letterSpacing: "-0.5px",
  marginBottom: "$m",
  marginTop: "$xl",
});
const StyledH3 = styled("h3", {
  fontSize: "$5",
  fontWeight: "$regular",
  lineHeight: "$heading",
  maxWidth: "63ch",
  letterSpacing: "-0.5px",
  marginBottom: "$xs",
});

const StyledP = styled("p", {
  fontSize: "$5",
  color: "$gray500",
  fontWeight: "$regular",
  lineHeight: "$heading",
  maxWidth: "63ch",
  letterSpacing: "-0.5px",
  marginBottom: "$6",
});

const components = {
  h1: StyledH1,
  h2: StyledH2,
  h3: StyledH3,
  p: StyledP,
  img: StyledImg,
  a: StyledLink,
};

function CaseStudyLayout({ children }) {
  return (
    <MDXProvider components={components}>
      <StyledCaseStudy>
        <BackButton />
        {children}
      </StyledCaseStudy>
    </MDXProvider>
  );
}

export default CaseStudyLayout;

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
