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
import AddIcon from "@mui/icons-material/Add";

export default function authorsTableData(formations = [], handleAddFormationClick) {
  if (!Array.isArray(formations)) {
    console.error("formations is not an array:", formations);
    return { columns: [], rows: [] };
  }
  const rows = formations.map((formation) => {
    return {
      typeFormation: formation.typeFormation,
      propositionFormateur: formation.propositionFormateur,
      action: (
        <>
          <IconButton
            onClick={() => handleAddFormationClick(formation.idFormationPred)}
            color="primary"
          >
            <AddIcon />
          </IconButton>
        </>
      ),
    };
  });

  return {
    columns: [
      { Header: "Type de formation", accessor: "typeFormation", flex: 3 },
      { Header: "Proposition de formateur", accessor: "propositionFormateur", flex: 3 },
      { Header: "Action", accessor: "action", width: "10%", align: "center" },
    ],
    rows: rows,
  };
}
