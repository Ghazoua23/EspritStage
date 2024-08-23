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

import axios from "axios";
import React from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function authorsTableData(salles, handleEdit, handleDelete) {
  console.log("Salles:", salles);
  const rows = salles.map((salle) => {
    console.log("Salle ID:", salle.idSalle); // Vérifiez chaque ID de salle

    return {
      typeSalle: salle.typeSalle,
      nbrPlace: salle.nbrPlace,
      equipements: salle.equipements,
      projection: salle.projection,
      dispoClima: salle.dispoClima,
      action: (
        <>
          <IconButton aria-label="edit" onClick={() => handleEdit(salle.idSalle)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(salle.idSalle)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    };
  });

  return {
    columns: [
      { Header: "Type de salle", accessor: "typeSalle", flex: 3 },
      { Header: "Nombre de place", accessor: "nbrPlace", flex: 3 },
      { Header: "Equipements", accessor: "equipements", flex: 3 },
      { Header: "Projection", accessor: "projection", flex: 3 },
      { Header: "Disponibilité de climatisation", accessor: "dispoClima", flex: 3 },
      { Header: "Action", accessor: "action", width: "10%", align: "center" },
    ],
    rows: rows,
  };
}
