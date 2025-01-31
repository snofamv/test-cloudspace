import { Flashbar } from "@cloudscape-design/components";

export const NotificationComponent = () => {
  return (
    <Flashbar
      items={[
        {
          type: "info",
          dismissible: true,
          content: "This is an info flash message.",
          id: "message_1",
        },
      ]}
    />
  );
};
