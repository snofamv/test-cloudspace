import {
  AppLayout,
  BreadcrumbGroup,
  ContentLayout,
  Header,
  Link,
} from "@cloudscape-design/components";
import { Sidebar } from "../components/ui/navbar/Sidebar";
export const DashboardLayout = ({ children }: any) => {
  return (
    <AppLayout
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Home", href: "#" },
            { text: "Service", href: "#" },
          ]}
        />
      }
      navigationOpen={true}
      navigation={<Sidebar />}
      // notifications={<NotificationComponent />}
      toolsHide
      content={
        <ContentLayout
          header={
            <Header variant="h1" info={<Link variant="info">Info</Link>}>
              Inicio
            </Header>
          }
        >
          {children}
        </ContentLayout>
      }
    />
  );
};
