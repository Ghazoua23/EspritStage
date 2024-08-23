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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { format, parse } from "date-fns";

// Data
import authorsTableData from "layouts/liste/data/authorsTableData";

// React and State Management
import React, { useState, useEffect } from "react";
import axios from "axios";

function Listes() {
  const [formations, setFormations] = useState([]);
  useEffect(() => {
    // Charger les formations au premier rendu du composant
    chargerFormations();
  });
  // Fonction pour charger les programmes de formation depuis l'API
  const chargerFormations = () => {
    axios
      .get("http://localhost:8081/api/formations")
      .then((response) => {
        setFormations(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des formations :", error);
      });
  };

  // Fonction pour télécharger le tableau sous forme de fichier Excel
  const telechargerExcel = () => {
    const { columns, rows } = authorsTableData(formations);

    // Transformer les données pour être compatible avec Excel
    const data = rows.map((row) => {
      const rowData = {};
      columns.forEach((col) => {
        rowData[col.Header] = row[col.accessor];
      });
      return rowData;
    });

    // Créer une nouvelle feuille de travail
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Créer un nouveau classeur et ajouter la feuille de travail
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Formations");

    // Générer un fichier Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Sauvegarder le fichier
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, "formations.xlsx");
  };

  // Utilisation de authorsTableData pour obtenir columns et rows
  const { columns, rows } = authorsTableData(formations);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                borderRadius="lg"
                coloredShadow="info"
                style={{
                  backgroundColor: "#c62828",
                  borderRadius: "12px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              >
                <MDTypography variant="h6" color="white">
                  Table des détails
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
              <MDBox px={2} pb={2}>
                <Button
                  variant="contained"
                  className="btn btn-danger w-md"
                  onClick={telechargerExcel}
                >
                  Télécharger le fichier
                </Button>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Listes;
