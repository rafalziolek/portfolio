import React from "react";
// import { getExperimentData } from '@/lib/data/experiments'; // Example data fetching

// This page will render at the route /works/experiments
// It automatically uses the layout defined in src/app/works/(gallery)/layout.jsx
export default function ExperimentsPage() {
  // const experimentItems = await getExperimentData();

  return (
    <div>
      <h2>Experiments Section</h2>
      {/* Map through experimentItems and display them using the grid layout components */}
      <p>
        This content is specific to the experiments page and uses the
        Gallery/Grid Layout.
      </p>
    </div>
  );
}
