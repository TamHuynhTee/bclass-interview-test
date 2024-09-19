import React from "react";

type Props = {
  children: React.ReactNode;
};

const MainLayout = (props: Props) => {
  return <div className="container">{props.children}</div>;
};

export default MainLayout;
