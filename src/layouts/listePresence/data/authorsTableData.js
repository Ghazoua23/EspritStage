import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

export default function authorsTableData(
  formations = [],
  handlePresenceChange,
  shownButtons,
  presenceText
) {
  if (!Array.isArray(formations)) {
    console.error("Les données de formations ne sont pas un tableau.");
    return { columns: [], rows: [] };
  }

  const formattedRows = [];

  formations.forEach((formation) => {
    const formationType = formation.type || "N/A";
    const participantsList =
      formation.participants.length > 0
        ? formation.participants.map((participant) => (
            <div key={participant.idEnseignant}>
              {participant.nomEnseignant} {participant.prenomEnseignant}
            </div>
          ))
        : "Aucun participant trouvé";

    if (formation.seances.length > 0) {
      formation.seances.forEach((seance) => {
        const presenceButtons = formation.participants.map((participant) => {
          const key = `${participant.idEnseignant}-${formation.id}-${seance.idSeance}`;

          return (
            <Grid item xs={12} key={key}>
              {shownButtons[key] !== false ? (
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#c62828",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#b71c1c",
                    },
                    marginBottom: "8px",
                  }}
                  onClick={() =>
                    handlePresenceChange(participant.idEnseignant, formation.id, seance.idSeance)
                  }
                >
                  Afficher
                </Button>
              ) : (
                <div>{presenceText[key]}</div>
              )}
            </Grid>
          );
        });

        formattedRows.push({
          type: formationType,
          seance: (
            <div key={seance.idSeance}>
              <div>Début: {new Date(seance.dateDebut).toLocaleString()}</div>
              <div>Fin: {new Date(seance.dateFin).toLocaleString()}</div>
            </div>
          ),
          participants: participantsList,
          presence: (
            <Grid container direction="column">
              {presenceButtons}
            </Grid>
          ),
        });
      });
    } else {
      formattedRows.push({
        type: formationType,
        seance: "Aucune séance trouvée",
        participants: participantsList,
        presence: "Aucun bouton disponible",
      });
    }
  });

  return {
    columns: [
      { Header: "Type de formation", accessor: "type", flex: 2 },
      { Header: "Séance", accessor: "seance", width: "40%", align: "center" },
      { Header: "Participants", accessor: "participants", width: "30%", align: "center" },
      { Header: "Présence", accessor: "presence", width: "30%", align: "center" },
    ],
    rows: formattedRows,
  };
}
