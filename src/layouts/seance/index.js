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
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import "react-toastify/dist/ReactToastify.css";

// Data
import authorsTableData from "layouts/seance/data/authorsTableData";

// React and State Management
import React, { useState, useEffect } from "react";
import axios from "axios";

function TableSeances() {
  const [seances, setSeances] = useState([]);
  const [formations, setFormations] = useState([]);
  const [expandedFormations, setExpandedFormations] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedSeance, setSelectedSeance] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [selectedFormationId, setSelectedFormationId] = useState(null);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [salle, setSalle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [openViewSeancesDialog, setOpenViewSeancesDialog] = useState(false);
  const [salles, setSalles] = useState([]);
  const [selectedSalle, setSelectedSalle] = useState("");
  const [availableSalles, setAvailableSalles] = useState([]);
  useEffect(() => {
    chargerFormations();
    // Lorsque dateDebut ou dateFin change, envoyer la requête
    if (dateDebut && dateFin) {
      fetchAvailableSalles(dateDebut, dateFin);
    }
  }, [dateDebut, dateFin]);

  // Fonction pour charger les programmes de formation depuis l'API
  const chargerFormations = () => {
    axios
      .get("http://localhost:8081/api/formations")
      .then((response) => {
        const formationsAvecSeances = response.data.map((formation) => {
          return {
            ...formation,
            seances: [],
          };
        });
        setFormations(formationsAvecSeances);
        console.log(formationsAvecSeances);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des formations :", error);
      });
  };

  const fetchAvailableSalles = async (dateDebut, dateFin) => {
    try {
      const response = await axios.get("http://localhost:8081/api/salles/available", {
        params: {
          dateDebut: new Date(dateDebut).toISOString(),
          dateFin: new Date(dateFin).toISOString(),
        },
      });
      setAvailableSalles(response.data);
    } catch (error) {
      console.error("Error fetching available salles:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
    }
  };

  const handleDateDebutChange = (e) => {
    setDateDebut(e.target.value);
    fetchAvailableSalles(); // Met à jour les salles disponibles
  };

  const handleDateFinChange = (e) => {
    setDateFin(e.target.value);
    fetchAvailableSalles(); // Met à jour les salles disponibles
  };
  // Fonction pour ajouter une séance
  const handleAddSeance = (formation) => {
    setSelectedFormation(formation);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setDateDebut("");
    setDateFin("");
    setAlertMessage("");
  };

  const handleSaveSeance = () => {
    console.log(selectedFormation);
    if (!selectedFormation) {
      setAlertMessage("Aucune formation sélectionnée.");
      return;
    }

    if (
      new Date(dateDebut) < new Date(selectedFormation.dateDebut) ||
      new Date(dateFin) > new Date(selectedFormation.dateFin)
    ) {
      setAlertMessage(
        "Les dates de la séance doivent être comprises dans les dates de la formation."
      );
      return;
    }
    const newSeance = {
      dateDebut: dateDebut,
      dateFin: dateFin,
      salle: { idSalle: parseInt(salle) },
    };

    const USER_ID = 2;

    axios
      .post(`http://localhost:8081/api/seances/add/${USER_ID}/${selectedFormation}`, newSeance)
      .then((response) => {
        console.log("Séance ajoutée avec succès :", response.data);
        handleCloseDialog();
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la séance :", error);
      });
  };

  const handleViewSeances = (formationId) => {
    if (expandedFormations.includes(formationId)) {
      setExpandedFormations(expandedFormations.filter((id) => id !== formationId));
    } else {
      axios
        .get(`http://localhost:8081/api/seances/formation/${formationId}`)
        .then((response) => {
          setSeances((prevSeances) => ({
            ...prevSeances,
            [formationId]: response.data,
          }));
          setExpandedFormations([...expandedFormations, formationId]);
        })
        .catch((error) => {
          console.error("Erreur lors du chargement des séances :", error);
        });
    }
  };

  // Fonction pour supprimer une séance
  const handleDeleteSeance = (seanceId, formationId) => {
    axios
      .delete(`http://localhost:8081/api/seances/${seanceId}`)
      .then(() => {
        console.log("Seance supprimée avec succès:");
        setSeances((prevSeances) => {
          // Vérifiez que le tableau des séances pour cette formation existe
          if (prevSeances[formationId]) {
            const updatedSeances = prevSeances[formationId].filter(
              (seance) => seance.id !== seanceId
            );
            return {
              ...prevSeances,
              [formationId]: updatedSeances,
            };
          }
          // Si le tableau des séances n'existe pas, retournez les séances telles qu'elles sont
          return prevSeances;
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la séance :", error);
      });
  };

  const handleEditSeance = (seance) => {
    setSelectedSeance(seance);
    setOpenEditModal(true);
  };

  const handleSaveChanges = () => {
    axios
      .put(`http://localhost:8081/api/seances/${selectedSeance.id}`, selectedSeance)
      .then((response) => {
        setSeances((prevSeances) => {
          const updatedSeances = prevSeances[selectedSeance.formationId].map((seance) =>
            seance.id === selectedSeance.id ? selectedSeance : seance
          );
          return {
            ...prevSeances,
            [selectedSeance.formationId]: updatedSeances,
          };
        });
        setOpenEditModal(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la modification de la séance :", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedSeance({ ...selectedSeance, [name]: value });
  };

  // Utilisation de authorsTableData pour obtenir columns et rows
  const { columns, rows } = authorsTableData(
    formations,
    handleAddSeance,
    handleViewSeances,
    seances,
    expandedFormations,
    handleDeleteSeance,
    handleEditSeance
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
                  Table des formations
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
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Ajouter une séance</DialogTitle>
        <DialogContent>
          {alertMessage && <Alert severity="error">{alertMessage}</Alert>}
          <TextField
            autoFocus
            margin="dense"
            label="Date de début"
            type="datetime-local"
            fullWidth
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Date de fin"
            type="datetime-local"
            fullWidth
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Salle"
            select
            fullWidth
            value={salle}
            onChange={(e) => setSalle(e.target.value)}
            SelectProps={{
              native: true,
            }}
          >
            <option value="" disabled>
              Sélectionnez une salle
            </option>
            {availableSalles.map((salle) => (
              <option key={salle.idSalle} value={salle.idSalle}>
                <div style={{ marginBottom: "8px" }}>
                  <strong>
                    {salle.typeSalle} - {salle.equipements} - {salle.projection} -{salle.dispoClima}
                  </strong>
                </div>
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSaveSeance} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
      {/* Modal pour modifier la séance */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <MDTypography variant="h6" color="primary" mb={2}>
            Modifier la séance
          </MDTypography>
          <TextField
            label="Date de début"
            type="datetime-local"
            name="dateDebut"
            value={selectedSeance ? selectedSeance.dateDebut : ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date de fin"
            type="datetime-local"
            name="dateFin"
            value={selectedSeance ? selectedSeance.dateFin : ""}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <Box mt={3}>
            <Button variant="contained" color="primary" onClick={handleSaveChanges} fullWidth>
              Enregistrer les modifications
            </Button>
          </Box>
        </Box>
      </Modal>
    </DashboardLayout>
  );
}

export default TableSeances;
