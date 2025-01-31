import { ContentLayout, Header } from "@cloudscape-design/components";
import styles from "../theme/auth.module.css"; // Import corregido

export const AuthLayout = ({ children }: any) => {
  return (
    <ContentLayout
      defaultPadding
      headerBackgroundStyle="linear-gradient(135deg, rgb(86, 137, 181) 3%, rgb(56, 90, 148) 44%, rgb(19, 63, 101) 69%)"
      headerVariant="high-contrast"
      maxContentWidth={500}
      header={
        <Header variant="h1" className={styles.layoutHeader}>
          Header Application X
        </Header>
      }
    >
      <br />
      {children}
    </ContentLayout>
  );
};
