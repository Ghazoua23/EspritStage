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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function authorsTableData(
  phases = [],
  handleAddFormationPredefinie,
  handleViewFormations,
  expandedPhaseId,
  formationsPredefiniesByPhase,
  handleEditFormationPredefinie,
  handleDeleteFormationPredefinie
) {
  if (!Array.isArray(phases)) {
    return { columns: [], rows: [] };
  }
  const rows = phases.flatMap((phase) => {
    const baseRow = {
      nomPhase: phase.nomPhase,
      description: phase.description,
      action: (
        <>
          <IconButton onClick={() => handleAddFormationPredefinie(phase.idPhase)} color="primary">
            <AddIcon />
          </IconButton>
          <IconButton onClick={() => handleViewFormations(phase.idPhase)} color="secondary">
            <VisibilityIcon />
          </IconButton>
        </>
      ),
    };

    if (expandedPhaseId === phase.idPhase) {
      const formationsRows = formationsPredefiniesByPhase[phase.idPhase] || [];
      const formationRows = formationsRows.map((formation) => ({
        nomPhase: formation.typeFormation,
        description: formation.propositionFormateur,
        action: (
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => handleEditFormationPredefinie(formation.idFormationPred)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDeleteFormationPredefinie(formation.idFormationPred)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      }));

      return [baseRow, ...formationRows];
    }

    return [baseRow];
  });

  return {
    columns: [
      { Header: "Nom de la phase", accessor: "nomPhase", flex: 3 },
      { Header: "Description", accessor: "description", flex: 3 },
      { Header: "Action", accessor: "action", width: "10%", align: "center" },
    ],
    rows: rows,
  };
}
