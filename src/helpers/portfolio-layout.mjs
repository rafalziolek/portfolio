export const portfolioHeaderPaddingY = 24;
export const portfolioMenuItemStep = 27;
export const portfolioMenuRowHeight = 26;
export const portfolioNavLinkCount = 2;

export const portfolioNavTop =
  portfolioHeaderPaddingY +
  (portfolioNavLinkCount - 1) * portfolioMenuItemStep;
export const portfolioHeaderPaddingX = portfolioNavTop;

export const portfolioActiveRowTop = portfolioNavTop;

export const portfolioContentTop =
  portfolioNavTop + portfolioMenuRowHeight + portfolioHeaderPaddingY;

export function getScrollDistance(from, to) {
  return Math.hypot(to.x - from.x, to.y - from.y);
}
