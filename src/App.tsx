import * as React from "react";
import { ThemeProvider } from "@emotion/react";
import { Button } from "./Components/Button";

import "./styles.css";

// TODO
// - [x] Support comma
// - [] Add memo

const customTheme = {
  Button: {
    borderRadius: "4px",

    // span: {
    //   fontWeight: "bold"
    // },

    ".variant_primary.size_small": {
      color: "yellow"
    },
    ".variant_primary, variant_secondary": {
      color: "red"
    },
    [Button.get("variant", "secondary").and.get("size", "big")]: {
      background: "white"
    }
  }
};

export default function App() {
  const [id, setId] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => setId(id + 1), 1000);
  }, [id]);

  return (
    <div className="App">
      <ThemeProvider theme={customTheme}>
        <Button variant="primary" id={id}>
          Primary
        </Button>
        <Button variant="primary" size="small" id={id}>
          Primary small
        </Button>
        <Button variant="secondary" id={id}>
          Secondary
        </Button>
      </ThemeProvider>
    </div>
  );
}
