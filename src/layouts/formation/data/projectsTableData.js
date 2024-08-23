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

export default function projectsTableData(formationsPredefinies = []) {
  if (!Array.isArray(formationsPredefinies)) {
    console.error("formations is not an array:", formationsPredefinies);
    return { columns: [], rows: [] };
  }
  const rows = formationsPredefinies.map((formation) => {
    return {
      typeFormation: formation.typeFormation,
      propositionFormateur: formation.propositionFormateur,
      action: (
        <>
          <IconButton aria-label="edit" onClick={() => handleEdit(formation.idFormation)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => handleDelete(formation.idFormation)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    };
  });

  return {
    columns: [
      { Header: "Type de formation", accessor: "type", flex: 3 },
      { Header: "Proposition de formateur", accessor: "propositionFormateur", flex: 3 },
      { Header: "Action", accessor: "action", width: "10%", align: "center" },
    ],
    rows: rows,
  };
}
