import React, { useState, useEffect, useRef } from "react";

export const Path = ({ path }) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // This is crucial for 24-hour format
    };
  return (
    <div className="p-4  bg-gray-700  divide-y divide-gray-400">
      {path?.map((train) => (
        <div>
          {train.name} -&gt; Starting from {train.sourcePoint.name} -&gt;
          {new Date(train.sourcePoint.depatureTime).toLocaleTimeString(
            "en-GB",
            options
          )}
          ; reaching {train.destinationPoint.name} -&gt;{" "}
          {new Date(train.destinationPoint.depatureTime).toLocaleTimeString(
            "en-GB",
            options
          )}
          -&gt;
          {train.distanceFromPreviousStop}kms, price -&gt;Rs
          {train.distance * 1.25}
        </div>
      ))}
    </div>
  );
};
