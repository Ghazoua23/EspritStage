import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
export default function authorsTableData(
  formations,
  handleAddSeance,
  handleViewSeances,
  seances,
  expandedFormations,
  handleDeleteSeance,
  handleEditSeance
) {
  if (!Array.isArray(formations)) {
    console.error("formations is not an array:", formations);
    return { columns: [], rows: [] };
  }

  const rows = formations.flatMap((formation) => {
    const seancesRows = seances[formation.id] || [];
    const isExpanded = expandedFormations.includes(formation.id);

    const formationRow = {
      type: formation.type,
      responsableFormation: formation.responsableFormation,
      dateDebut: formation.dateDebut,
      dateFin: formation.dateFin,
      action: (
        <>
          <IconButton onClick={() => handleAddSeance(formation.idFormation)} color="primary">
            <AddIcon />
          </IconButton>
          <IconButton onClick={() => handleViewSeances(formation.idFormation)} color="primary">
            <VisibilityIcon />
          </IconButton>
        </>
      ),
    };

    const seanceRows = isExpanded
      ? seancesRows.map((seance) => ({
          type: "",
          responsableFormation: "",
          dateDebut: `Séance: ${new Date(seance.dateDebut).toLocaleString()}`,
          dateFin: `à ${new Date(seance.dateFin).toLocaleString()}`,
          action: (
            <>
              <IconButton onClick={() => handleEditSeance(seance.idSeance)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDeleteSeance(seance.idSeance)} color="primary">
                <DeleteIcon />
              </IconButton>
            </>
          ),
          isSeance: true,
        }))
      : [];

    return [formationRow, ...seanceRows];
  });

  return {
    columns: [
      { Header: "Type de formation", accessor: "type", flex: 3 },
      { Header: "Responsable de formation", accessor: "responsableFormation", flex: 3 },
      { Header: "Date de début", accessor: "dateDebut", flex: 3 },
      { Header: "Date de fin", accessor: "dateFin", flex: 3 },
      { Header: "Action", accessor: "action", width: "10%", align: "center" },
    ],
    rows: rows,
  };
}
