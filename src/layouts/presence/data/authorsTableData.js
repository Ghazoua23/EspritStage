import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";

export default function authorsTableData(
  formations = [],
  handlePresenceChange,
  presencesBySeance = {}
) {
  if (!Array.isArray(formations)) {
    console.error("Les données de formations ne sont pas un tableau.");
    return { columns: [], rows: [] };
  }

  // Créez un état pour stocker la présence sélectionnée par participant, séance et formation
  const [presenceState, setPresenceState] = useState({});
  const [selectedSeanceId, setSelectedSeanceId] = useState(null);

  const handleSelection = (participantId, formationId, seanceId, presenceType) => {
    setSelectedSeanceId(seanceId); // Met à jour l'ID de la séance sélectionnée
    const key = `${participantId}-${formationId}-${seanceId}`;
    setPresenceState((prev) => ({
      ...prev,
      [key]: presenceType,
    }));
    handlePresenceChange(participantId, formationId, seanceId, presenceType);
  };

  // Utilisez un tableau pour les lignes formatées
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
        formattedRows.push({
          type: formationType,
          seance: (
            <div key={seance.idSeance}>
              <div>Début: {new Date(seance.dateDebut).toLocaleString()}</div>
              <div>Fin: {new Date(seance.dateFin).toLocaleString()}</div>
            </div>
          ),
          participants: participantsList,
          presence:
            formation.participants.length > 0
              ? formation.participants.map((participant) => {
                  const key = `${participant.idEnseignant}-${formation.idFormation}-${seance.idSeance}`;
                  const selectedPresence = presenceState[key] || "";

                  return (
                    <div key={participant.idEnseignant}>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedPresence === "present"}
                                onChange={() =>
                                  handleSelection(
                                    participant.idEnseignant,
                                    formation.idFormation,
                                    seance.idSeance,
                                    "present"
                                  )
                                }
                              />
                            }
                            label="Présent"
                          />
                        </Grid>
                        <Grid item>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedPresence === "absent"}
                                onChange={() =>
                                  handleSelection(
                                    participant.idEnseignant,
                                    formation.idFormation,
                                    seance.idSeance,
                                    "absent"
                                  )
                                }
                              />
                            }
                            label="Absent"
                          />
                        </Grid>
                      </Grid>
                    </div>
                  );
                })
              : "Aucun participant trouvé", // Message affiché si aucun participant n'est trouvé
        });
      });
    } else {
      // Si aucune séance n'est trouvée
      formattedRows.push({
        type: formationType,
        seance: "Aucune séance trouvée",
        participants: participantsList,
        presence: "Aucune séance trouvée", // Message affiché si aucune séance n'est trouvée
      });
    }
  });

  return {
    columns: [
      { Header: "Type de formation", accessor: "type", flex: 2 },
      { Header: "Séance", accessor: "seance", width: "40%", align: "center" },
      { Header: "Participants", accessor: "participants", width: "30%", align: "center" },
      { Header: "Présence", accessor: "presence", width: "30%", align: "center" }, // Ajustez la largeur si nécessaire
    ],
    rows: formattedRows,
    selectedSeanceId, // Ajoutez l'ID de la séance sélectionnée dans le retour
  };
}
