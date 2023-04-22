import React from "react";
import { styled } from "../../stitches.confing";
import Text from "../Text/Text";

const AccordionContext = React.createContext();

export default function Accordion({ children }) {
  const [openItems, setOpenItems] = React.useState([]);
  return (
    <AccordionContext.Provider value={{ openItems, setOpenItems }}>
      <AccordionContainer>{children}</AccordionContainer>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ index, children }) {
  const { openItems, setOpenItems } = React.useContext(AccordionContext);
  const isOpen = openItems.includes(index);
  const handleToggle = () => {
    if (isOpen) {
      setOpenItems(openItems.filter((itemIndex) => itemIndex !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };
  return (
    <StyledAccordionItem>
      {React.Children.map(children, (child) => {
        if (child.type === AccordionItemTrigger) {
          return React.cloneElement(child, { onClick: handleToggle, isOpen });
        } else if (child.type === AccordionItemContent) {
          return isOpen ? child : null;
        } else {
          return child;
        }
      })}
    </StyledAccordionItem>
  );
}

function AccordionItemTrigger({ children, onClick, isOpen }) {
  return (
    <StyledAccordionTrigger onClick={onClick} active={isOpen && true}>
      {children}
    </StyledAccordionTrigger>
  );
}
function AccordionItemContent({ children }) {
  return <StyledAccordionContent>{children}</StyledAccordionContent>;
}
const AccordionContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const StyledAccordionTrigger = styled("button", {
  width: "100%",
  display: "flex",
  gap: "$xs",
  alignItems: "baseline",
  textAlign: "left",
  background: "none",
  border: "none",
  appearance: "none",
  cursor: "pointer",
  fontSize: "$s",
  fontWeight: "$medium",
  color: "#000",
  // letterSpacing: "-1px",
  lineHeight: "$m",
  variants: {
    active: {
      true: {
        // color: "#0055FE",
      },
    },
  },
});

const StyledAccordionItem = styled("div", {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  paddingX: "$xs",
  border: "none",
  borderBottom: "1px solid $colors$gray900",
  background: "none",
  "&:hover": {
    // background: "$gray100",
  },
});

const StyledAccordionContent = styled("div", {
  width: "100%",
  paddingBottom: "$s",
  visibility: "none",
});

AccordionItem.Trigger = AccordionItemTrigger;
AccordionItem.Content = AccordionItemContent;
