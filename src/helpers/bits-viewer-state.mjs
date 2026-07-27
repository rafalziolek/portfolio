export const initialBitsViewerState = {
  phase: "closed",
  activeIndex: null,
};

export function bitsViewerReducer(state, event) {
  switch (event.type) {
    case "open-requested":
      return {
        phase: "opening",
        activeIndex: event.index,
      };

    case "switch-requested":
      return {
        phase: "switching",
        activeIndex: event.index,
      };

    case "settled":
      if (state.phase !== "opening" && state.phase !== "switching") {
        return state;
      }

      return {
        phase: "open",
        activeIndex: state.activeIndex,
      };

    case "close-requested":
      return {
        phase: "closing",
        activeIndex: state.activeIndex,
      };

    case "exit-completed":
      return initialBitsViewerState;

    default:
      throw new Error(`Unsupported Bits viewer event: ${event.type}`);
  }
}
