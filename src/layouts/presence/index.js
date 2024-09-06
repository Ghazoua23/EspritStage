import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import authorsTableData from "layouts/presence/data/authorsTableData";
import axios from "axios";

function Presences() {
  const [formations, setFormations] = useState([]);
  const [showFormTable, setShowFormTable] = useState(false);
  const [selectedSeanceId, setSelectedSeanceId] = useState(null);
  const [presenceState, setPresenceState] = useState({});

  useEffect(() => {
    const USER_ID = 2;
    axios
      .get(`http://localhost:8081/api/formations/formateur/${USER_ID}`)
      .then((response) => {
        console.log(response.data); // Vérifiez ici la structure des données
        if (Array.isArray(response.data)) {
          setFormations(response.data);
        } else {
          console.error("Les données reçues ne sont pas un tableau.");
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the formations!", error);
      });
  }, []);

  const handlePresenceChange = (participantId, formationId, seanceId, presenceType) => {
    const key = `${participantId}-${formationId}-${seanceId}`;
    setPresenceState((prev) => ({
      ...prev,
      [key]: presenceType,
    }));
    setSelectedSeanceId(seanceId); // Met à jour l'ID de la séance sélectionnée
  };

  const submitPresences = () => {
    // Préparez les données de présence pour l'envoi
    const presencesToSend = Object.entries(presenceState).reduce((acc, [key, presenceType]) => {
      const [participantId, formationId, seanceId] = key.split("-").map(Number);
      if (presenceType) {
        acc[participantId] = presenceType === "present";
      }
      return acc;
    }, {});

    const formateurId = 2;

    axios
      .post(
        `http://localhost:8081/api/presences/marquer/${formateurId}/${selectedSeanceId}`,
        presencesToSend
      )
      .then(() => {
        console.log("Présences enregistrées avec succès.");
      })
      .catch((error) => {
        console.error("Erreur lors de l'enregistrement des présences :", error);
      });
  };

  // Utilisation de authorsTableData pour obtenir columns et rows
  const { columns, rows } = authorsTableData(formations, handlePresenceChange);

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
                  Marquer la présence
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
              <MDBox pt={3} px={2}>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "#c62828", // Couleur rouge
                    color: "white", // Texte en blanc
                    marginTop: "16px", // Espace en haut
                    marginLeft: "16px",
                  }}
                  onClick={submitPresences}
                >
                  Enregistrer les présences
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

export default Presences;
