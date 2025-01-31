import { CardsComponent } from "../components/cards/CardsComponent";
import { usePersonas } from "../hooks/usePersonas";
import { DashboardLayout } from "../layout/DashboardLayout";

export const PersonasPage = () => {
  const { personas } = usePersonas();

  return (
    <DashboardLayout>
      <CardsComponent persons={personas} />
    </DashboardLayout>
  );
};
