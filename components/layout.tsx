import Alert from "./alert";
import Container from "./container";
import Meta from "./meta";
import * as React from "react";

type Props = {
  preview?: boolean;
  children: React.ReactNode;
};

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <footer className="bg-neutral-50 border-t border-neutral-200">
        <Container>
          <div className="py-28 flex flex-col lg:flex-row items-center"></div>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
