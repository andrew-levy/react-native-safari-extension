---
sidebar_position: 5
title: "API"
---

### `isSafariExtension`

Returns if the app is running in a Safari Extension. Use this to conditionally render components that should only be rendered in the extension.

```ts
function isSafariExtension(): boolean;
```

Example:

```tsx
import { isSafariExtension } from "react-native-safari-extension";

function App() {
  if (isSafariExtension()) {
    return <ExtensionContent />;
  }
  return <AppContent />;
}
```
