/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
export default function authorsTableData(formations = []) {
  if (!Array.isArray(formations)) {
    console.error("formations is not an array:", formations);
    return { columns: [], rows: [] };
  }
  const rows = formations.map((formation) => {
    const participants = formation.participants
      .map((participant) => `${participant.nomEnseignant} ${participant.prenomEnseignant}`)
      .join(", ");

    return {
      formationPredefinie:
        formation.formationPredefinie?.typeFormation || "Aucune formation prédéfinie associée",
      type: formation.type,
      dateDebut: new Date(formation.dateDebut).toLocaleString(),
      dateFin: new Date(formation.dateFin).toLocaleString(),
      participants: participants || "Aucun participant",
    };
  });

  return {
    columns: [
      { Header: "Formation Prédefinie", accessor: "formationPredefinie", width: "25%" },
      { Header: "Nom de la formation", accessor: "type", width: "20%" },
      { Header: "Date de Début", accessor: "dateDebut", width: "20%" },
      { Header: "Date de Fin", accessor: "dateFin", width: "20%" },
      { Header: "Les participants", accessor: "participants", width: "15%" },
    ],
    rows: rows,
  };
}
