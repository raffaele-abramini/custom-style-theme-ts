import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import { Button } from "./Components/Button";

import "./styles.css";

/*
  Try adding custom rules here!
*/
const customTheme = {
  Button: {
    borderRadius: "4px",

    // String sytanx
    ".variant_primary.size_small": {
      fontStyle: "italic"
    },
    ".variant_primary, variant_secondary": {
      fontWeight: "bold"
    },

    // Helper syntax
    [Button.get("variant", "secondary").and.get("size", "big")]: {
      background: "lightgreen"
    },
    [Button.get("variant", "primary").and.get("disabled", "true")]: {
      background: "tomato"
    }
  }
};

export default function App() {
  const [id, setId] = React.useState(0);

  // Just stress testing performance
  React.useEffect(() => {
    setTimeout(() => setId(id + 1), 1000);
  }, [id]);

  return (
    <div className="App">
      <ThemeProvider theme={customTheme}>
        <Button variant="primary" id={id} disabled={false}>
          Primary
        </Button>
        <Button variant="primary" size="small" id={id}>
          Primary small
        </Button>
        <Button variant="secondary" id={id}>
          Secondary
        </Button>
        <Button variant="primary" id={id} disabled>
          Primary disabled
        </Button>
      </ThemeProvider>
    </div>
  );
}
