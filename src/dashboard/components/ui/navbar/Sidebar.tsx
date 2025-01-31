import { SideNavigation } from "@cloudscape-design/components";

export const Sidebar = () => {
  return (
    <SideNavigation
      header={{
        href: "#",
        text: "Cloudscape",
      }}
      items={[
        { type: "link", text: `Inicio`, href: `/` },
        { type: "link", text: `Agregar`, href: `/agregar` },
        { type: "link", text: `Salir`, href: `/salir` },
      ]}
    />
  );
};
