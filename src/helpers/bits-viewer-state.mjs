export const initialBitsViewerState = {
  phase: "closed",
  activeIndex: null,
  targetIndex: null,
};

export function bitsViewerReducer(state, event) {
  switch (event.type) {
    case "open-requested":
      return event.ready
        ? {
            phase: "opening",
            activeIndex: event.index,
            targetIndex: null,
          }
        : {
            phase: "preparing-open",
            activeIndex: null,
            targetIndex: event.index,
          };

    case "switch-requested":
      return event.ready
        ? {
            phase: "switching",
            activeIndex: event.index,
            targetIndex: null,
          }
        : {
            phase: "switching",
            activeIndex: state.activeIndex,
            targetIndex: event.index,
          };

    case "image-ready":
      if (state.targetIndex !== event.index) return state;

      return {
        phase: state.phase === "preparing-open" ? "opening" : "switching",
        activeIndex: event.index,
        targetIndex: null,
      };

    case "settled":
      if (state.phase !== "opening" && state.phase !== "switching") {
        return state;
      }

      return {
        phase: "open",
        activeIndex: state.activeIndex,
        targetIndex: null,
      };

    case "close-requested":
      return {
        phase: "closing",
        activeIndex: state.activeIndex,
        targetIndex: null,
      };

    case "exit-completed":
      return initialBitsViewerState;

    default:
      throw new Error(`Unsupported Bits viewer event: ${event.type}`);
  }
}
