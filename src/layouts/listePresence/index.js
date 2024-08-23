import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver"; // Importez file-saver
import "react-toastify/dist/ReactToastify.css";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import authorsTableData from "layouts/listePresence/data/authorsTableData";
import axios from "axios";

function ListePresences() {
  const [formations, setFormations] = useState([]);
  const [presenceState, setPresenceState] = useState({});
  const [shownButtons, setShownButtons] = useState({}); // État pour gérer les boutons cliqués
  const [presenceText, setPresenceText] = useState({}); // État pour gérer le texte de présence
  const [allButtonsHidden, setAllButtonsHidden] = useState(false);

  useEffect(() => {
    // Récupérer les formations
    axios
      .get("http://localhost:8081/api/formations")
      .then((response) => {
        console.log("Formations data:", response.data);
        if (Array.isArray(response.data)) {
          setFormations(response.data);
        } else {
          console.error("Les données reçues ne sont pas un tableau.");
        }
      })
      .catch((error) => {
        console.error("Il y a eu une erreur lors de la récupération des formations !", error);
      });
  }, []); // Dépendance vide pour ne s'exécuter qu'au montage

  const handlePresenceChange = (participantId, formationId, seanceId) => {
    const key = `${participantId}-${formationId}-${seanceId}`;

    axios
      .get(`http://localhost:8081/api/presences/${seanceId}/${participantId}`)
      .then((response) => {
        let presenceStatus;
        if (response.data && response.data.present !== undefined) {
          presenceStatus = response.data.present ? "Présent" : "Absent";
        } else {
          presenceStatus = "Aucune présence";
        }
        setPresenceState((prev) => ({
          ...prev,
          [key]: presenceStatus,
        }));
        setShownButtons((prev) => ({
          ...prev,
          [key]: false, // Cacher le bouton après avoir cliqué
        }));
        setPresenceText((prev) => ({
          ...prev,
          [key]: presenceStatus,
        }));
        checkAllButtonsHidden();
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de la présence:", error);
        setPresenceText((prev) => ({
          ...prev,
          [key]: "Aucune présence",
        }));
        setShownButtons((prev) => ({
          ...prev,
          [key]: false, // Cacher le bouton même en cas d'erreur
        }));
        checkAllButtonsHidden();
      });
  };

  const checkAllButtonsHidden = () => {
    const allHidden =
      Object.keys(shownButtons).length > 0 &&
      Object.values(shownButtons).every((hidden) => hidden === false);
    setAllButtonsHidden(allHidden);
  };

  const handleDownload = () => {
    // Créer une feuille de calcul
    const worksheet = XLSX.utils.json_to_sheet(
      rows.map((row) => ({
        ...row,
        presence: row.presence || "Aucune présence",
      }))
    );

    // Créer un classeur et ajouter la feuille de calcul
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Présences");

    // Convertir le classeur en fichier binaire et déclencher le téléchargement
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "presences.xlsx");
  };

  // Utilisation de authorsTableData pour obtenir columns et rows
  const { columns, rows } = authorsTableData(
    formations,
    handlePresenceChange,
    shownButtons,
    presenceText
  );

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
                  Liste des présences
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{
                    columns,
                    rows,
                  }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                  // Appliquer des styles au tableau
                  sx={{
                    "& .MuiTable-root": {
                      borderCollapse: "separate",
                      borderSpacing: "0px",
                      border: "5px solid #c62828", // Bordure extérieure du tableau
                    },
                    "& .MuiTableCell-root": {
                      borderBottom: "5px solid #c62828", // Bordure des cellules
                    },
                    "& .MuiTableHead-root": {
                      borderBottom: "5px solid #c62828", // Bordure de l'en-tête
                    },
                  }}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ListePresences;
