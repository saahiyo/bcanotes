"use client";

import { Databuddy } from '@databuddy/sdk/react';

export function DatabuddyWidget() {
  return (
    <Databuddy 
      clientId="b7218828-e14d-440d-8702-8c8fbf7c37bb" 
      trackPerformance={true}
      trackWebVitals={true}
      trackErrors={true}
      trackOutgoingLinks={true}
      apiUrl="/api/databuddy"
    />
  );
}
