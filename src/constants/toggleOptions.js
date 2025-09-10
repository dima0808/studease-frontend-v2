import GridIcon from "@/components/icons/GridIcon";
import TableIcon from "@/components/icons/TableIcon";

export const VIEW_OPTIONS = [
  { value: "grid", content: <GridIcon />, dataTitle: "Grid view" },
  { value: "table", content: <TableIcon />, dataTitle: "Table view" }
];

export const ACTION_OPTIONS = [
  { value: "select", content: "Select", dataTitle: "Select action" },
  { value: "view", content: "View", dataTitle: "View action" }
];
