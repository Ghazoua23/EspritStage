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
import { format, parse } from "date-fns";

// Data
import authorsTableData from "layouts/formation/data/authorsTableData";
import projectsTableData from "layouts/formation/data/projectsTableData";

// React and State Management
import React, { useState, useEffect } from "react";
import axios from "axios";

const initialFormation = {
  idFormation: null,
  type: "",
  responsableFormation: "",
  organismeFormation: "",
  cout: "",
  competenceAcquises: "",
  etat: "",
  dateDebut: "",
  dateFin: "",
  salle: "",
  seances: "",
};

function Formations() {
  const [type, setType] = useState("");
  const [responsableFormation, setResponsableFormation] = useState("");
  const [organismeFormation, setOrganismeFormation] = useState("");
  const [cout, setCout] = useState("");
  const [etat, setEtat] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [errors, setErrors] = useState({});
  const [seances, setSeances] = useState("");
  const [availableSalles, setAvailableSalles] = useState([]);
  const [selectedSalle, setSelectedSalle] = useState("");
  const [formations, setFormations] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentFormation, setCurrentFormation] = useState(initialFormation);
  useEffect(() => {
    // Charger les formations au premier rendu du composant
    chargerFormations();
    // Lorsque dateDebut ou dateFin change, envoyer la requête
    if (dateDebut && dateFin) {
      fetchAvailableSalles(dateDebut, dateFin);
    }
  }, [dateDebut, dateFin]);
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
  // Fonction pour charger les programmes de formation depuis l'API
  const chargerFormations = () => {
    axios
      .get("http://localhost:8081/api/formations")
      .then((response) => {
        setFormations(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des formations :", error);
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = {
      type,
      responsableFormation,
      organismeFormation,
      cout,
      etat,
      dateDebut,
      dateFin,
    };

    // Réinitialiser les erreurs
    setErrors({});

    const today = new Date().toISOString().split("T")[0]; // Date système au format YYYY-MM-DD
    let formErrors = {};

    // Contrôle de la dateDebut
    if (dateDebut < today) {
      formErrors.dateDebut = "La date de début ne peut pas être antérieure à la date actuelle.";
    }

    // Contrôle de la dateFin
    if (dateFin && dateDebut && dateFin < dateDebut) {
      formErrors.dateFin = "La date de fin ne peut pas être antérieure à la date de début.";
    }

    console.log("Données de formation:", formData);

    const USER_ID = 1; // Remplacez par l'ID réel du userApp

    // Appel à l'API pour ajouter la salle
    axios
      .post(`http://localhost:8081/api/formations/add/${USER_ID}`, formData)
      .then((response) => {
        console.log("Formation ajoutée avec succès:", response.data);
        toast.success("Formation ajoutée avec succès!");
        // Réinitialisation des champs après l'ajout
        setType("");
        setResponsableFormation("");
        setOrganismeFormation("");
        setCout("");
        setEtat("");
        setDateDebut("");
        setDateFin("");
        // Recharger la liste des salles après l'ajout (si nécessaire)
        chargerFormations();
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la formation:", error);
      });

    // Si des erreurs existent, les afficher et ne pas soumettre le formulaire
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
  };

  const handleEdit = (id) => {
    const formation = formations.find((f) => f.idFormation === id) || {
      id: null,
      type: "",
      responsableFormation: "",
      organismeFormation: "",
      cout: "",
      etat: "",
      dateDebut: "",
      dateFin: "",
    };
    setCurrentFormation(formation);
    setDateDebut(formation.dateDebut);
    setDateFin(formation.dateFin);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (currentFormation.idFormation !== null) {
      axios
        .put(
          `http://localhost:8081/api/formations/${currentFormation.idFormation}`,
          currentFormation
        )
        .then((response) => {
          console.log("Formation modifiée avec succès:", response.data);
          toast.success("Modifié avec succès !");
          chargerFormations();
          handleClose();
        })
        .catch((error) => {
          console.error("Erreur lors de la modification du formation:", error);
          toast.error("Erreur lors de la modification.");
        });
    } else {
      toast.error("Erreur: Formation non définie.");
    }
  };

  const handleDelete = (id) => {
    if (!id) {
      console.error("Erreur: ID de formation non défini.");
      return;
    }
    // Logique pour la suppression d'une salle
    axios
      .delete(`http://localhost:8081/api/formations/${id}`)
      .then(() => {
        toast.success("Formation supprimée avec succès !");
        chargerFormations(); // Recharger les salles après la suppression
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la formation :", error);
        toast.error("Erreur lors de la suppression de la formation");
      });
  };

  // Utilisation de authorsTableData pour obtenir columns et rows
  const { columns, rows } = authorsTableData(formations, handleEdit, handleDelete);

  const etats = ["PLANIFIEE", "EN_COURS", "ANNULEE", "ACHEVEE"];

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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Modifier la formation</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="type"
            label="Type de formation"
            type="text"
            fullWidth
            value={currentFormation.type}
            onChange={(e) =>
              setCurrentFormation({
                ...currentFormation,
                type: e.target.value,
              })
            }
          ></TextField>
          <TextField
            autoFocus
            margin="dense"
            id="responsableFormation"
            label="Responsable de formation"
            type="text"
            fullWidth
            value={currentFormation.responsableFormation}
            onChange={(e) =>
              setCurrentFormation({
                ...currentFormation,
                responsableFormation: e.target.value,
              })
            }
          ></TextField>
          <TextField
            autoFocus
            margin="dense"
            id="organismeFormation"
            label="Organisme de formation"
            type="text"
            fullWidth
            value={currentFormation.organismeFormation}
            onChange={(e) =>
              setCurrentFormation({
                ...currentFormation,
                organismeFormation: e.target.value,
              })
            }
          ></TextField>
          <TextField
            autoFocus
            margin="dense"
            id="cout"
            label="Cout de formation"
            type="text"
            fullWidth
            value={currentFormation.cout}
            onChange={(e) =>
              setCurrentFormation({
                ...currentFormation,
                cout: e.target.value,
              })
            }
          ></TextField>
          <TextField
            autoFocus
            margin="dense"
            id="etat"
            label="Etat"
            type="text"
            fullWidth
            value={currentFormation.etat}
            onChange={(e) =>
              setCurrentFormation({
                ...currentFormation,
                etat: e.target.value,
              })
            }
          ></TextField>
          <TextField
            autoFocus
            margin="dense"
            id="dateDebut"
            label="Date de début"
            type="date"
            fullWidth
            value={currentFormation.dateDebut}
            onChange={(e) =>
              setCurrentFormation({
                ...currentFormation,
                dateDebut: e.target.value,
              })
            }
          ></TextField>
          <TextField
            autoFocus
            margin="dense"
            id="dateFin"
            label="Date de fin"
            type="date"
            fullWidth
            value={currentFormation.dateFin}
            onChange={(e) =>
              setCurrentFormation({
                ...currentFormation,
                dateFin: e.target.value,
              })
            }
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSave} color="primary">
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Formations;
