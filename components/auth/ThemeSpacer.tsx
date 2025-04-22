type ThemeSpacer = {
  size: string;
};

const ThemeSpacer = ({ size }: ThemeSpacer) => {
  if (size === "unit") {
    return <div className="h-2 w-full"></div>;
  }

  if (size === "element") {
    return <div className="h-5 w-full"></div>;
  }

  if (size === "component") {
    return <div className="h-10 w-full"></div>;
  }

  if (size === "section") {
    return <div className="h-14 w-full"></div>;
  }
};

export default ThemeSpacer;
