import "./globals.css";
import Context from "./utils/Context";
import Nav from "./Components/nav";

export const metadata = {
  title: "Quiz",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <Context>
    <html lang="en">
      <body>
        <Nav></Nav>
        {children}
      </body>
    </html>
    </Context>
  );
}
