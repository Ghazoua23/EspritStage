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
import AddIcon from "@mui/icons-material/Add";
// Define function to fetch data from API
const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:8081/api/programmeFormation/afficher");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export default function authorsTableData(
  handleEdit,
  handleDelete,
  handleAddPhase,
  programmesFormation
) {
  const rows = programmesFormation.map((programme) => ({
    nomProgramme: programme.nomProgramme,
    // Ajoutez d'autres propriétés si nécessaire
  }));
  return {
    columns: [
      { Header: "Nom du Programme", accessor: "nomProgramme", flex: 3 },
      { Header: "Action", accessor: "action", width: "10%", align: "center" },

      // Add other columns as needed
    ],
    rows: Array.isArray(programmesFormation)
      ? programmesFormation.map((programme) => ({
          nomProgramme: programme.nomProgramme,
          action: (
            <div>
              <IconButton onClick={() => handleEdit(programme.id)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(programme.id)} color="secondary">
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => handleAddPhase(programme.id)} color="primary">
                <AddIcon />
              </IconButton>
            </div>
          ),
        }))
      : [],
  };
}
