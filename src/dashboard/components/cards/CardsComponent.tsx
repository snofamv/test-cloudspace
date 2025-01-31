import * as React from "react";
import TextFilter from "@cloudscape-design/components/text-filter";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import Pagination from "@cloudscape-design/components/pagination";
import CollectionPreferences from "@cloudscape-design/components/collection-preferences";
import { RefAttributes, useEffect } from "react";
import { Link } from "react-router";

export const CardsComponent = ({ persons }: any) => {
  const [selectedItems, setSelectedItems] = React.useState([]);
  const [filteredItems, setFilteredItems] = React.useState(persons);
  const [filterText, setFilterText] = React.useState("");

  // Función para filtrar los datos
  const filterData = (text: string) => {
    setFilterText(text);
    setFilteredItems(
      persons.filter(
        (person: any) =>
          person.nombres.toLowerCase().includes(text.toLowerCase()) ||
          person.paterno.toLowerCase().includes(text.toLowerCase()) ||
          person.materno.toLowerCase().includes(text.toLowerCase()) ||
          person.telefono.includes(text) ||
          (person.rut && person.rut.includes(text))
      )
    );
  };
  useEffect(() => {
    setFilteredItems(persons);
  }, [persons]);
  return (
    <>
      {/* Tarjetas de personas */}
      <Cards
        filter={
          <TextFilter
            filteringPlaceholder="Buscar persona"
            filteringText={filterText}
            onChange={({ detail }) => filterData(detail.filteringText)}
          />
        }
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail?.selectedItems ?? [])
        }
        selectedItems={selectedItems}
        cardDefinition={{
          header: (item) => (
            <Link style={{ textDecoration: "none" }} to={`/actualizar/${item.id}`}>
              {item.nombres} {item.paterno} {item.materno}
            </Link>
          ),
          sections: [
            {
              id: "direccion",
              header: "Dirección",
              content: (item) => item.direccion?.direccion || "No especificada",
            },
            {
              id: "telefono",
              header: "Teléfono",
              content: (item) => item.telefono || "No disponible",
            },
            {
              id: "rut",
              header: "RUT",
              content: (item) =>
                item.rut ? `${item.rut}-${item.dv}` : "No disponible",
            },
            {
              id: "fecnac",
              header: "Fecha de Nacimiento",
              content: (item) => item.fecnac || "No especificada",
            },
            {
              id: "genero",
              header: "Género",
              content: (item) =>
                item.genero === "M" ? "Masculino" : "Femenino",
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
        // entireCardClickable
        items={filteredItems}
        loadingText="Cargando personas..."
        selectionType="multi"
        trackBy="id"
        visibleSections={["direccion", "telefono", "rut", "fecnac", "genero"]}
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No hay personas registradas</b>
              <Button>Agregar Persona</Button>
            </SpaceBetween>
          </Box>
        }
        header={
          <Header
            counter={
              selectedItems?.length ? `(${selectedItems.length})` : "(0)"
            }
          >
            Lista de Personas
          </Header>
        }
        pagination={<Pagination currentPageIndex={1} pagesCount={2} />}
        preferences={
          <CollectionPreferences
            title="Preferencias"
            confirmLabel="Confirmar"
            cancelLabel="Cancelar"
            preferences={{
              pageSize: 6,
              visibleContent: [
                "direccion",
                "telefono",
                "rut",
                "fecnac",
                "genero",
              ],
            }}
            pageSizePreference={{
              title: "Tamaño de página",
              options: [
                { value: 6, label: "6 personas" },
                { value: 12, label: "12 personas" },
              ],
            }}
            visibleContentPreference={{
              title: "Seleccionar información visible",
              options: [
                {
                  label: "Datos de contacto",
                  options: [
                    { id: "direccion", label: "Dirección" },
                    { id: "telefono", label: "Teléfono" },
                  ],
                },
                {
                  label: "Datos personales",
                  options: [
                    { id: "rut", label: "RUT" },
                    { id: "fecnac", label: "Fecha de Nacimiento" },
                    { id: "genero", label: "Género" },
                  ],
                },
              ],
            }}
          />
        }
      />
    </>
  );
};
