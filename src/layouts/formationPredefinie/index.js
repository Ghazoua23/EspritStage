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
import authorsTableData from "layouts/formationPredefinie/data/authorsTableData";

// React and State Management
import React, { useState, useEffect } from "react";
import axios from "axios";

function FormationsPredefinies() {
  const [typeFormation, setTypeFormation] = useState("");
  const [propositionFormateur, setPropositionFormateur] = useState("");
  const [openView, setOpenView] = useState(false);
  const [formationsPredefiniesByPhase, setFormationsPredefiniesByPhase] = useState([]);
  const [expandedPhaseId, setExpandedPhaseId] = useState(null);
  const [selectedPhaseFormations, setSelectedPhaseFormations] = useState([]);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [phases, setPhases] = useState([]);
  const [phaseId, setPhaseId] = useState(null);
  const [editingFormation, setEditingFormation] = useState(null);
  useEffect(() => {
    chargerPhases();
  }, []);

  const chargerPhases = () => {
    axios
      .get("http://localhost:8081/api/phases/all")
      .then((response) => {
        setPhases(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des phases:", error);
      });
  };

  const handleAddFormationPredefinie = (phaseId) => {
    setPhaseId(phaseId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTypeFormation("");
    setPropositionFormateur("");
  };

  const handleSubmit = () => {
    const newFormationPredefinie = {
      typeFormation: typeFormation,
      propositionFormateur: propositionFormateur,
    };

    axios
      .post(`http://localhost:8081/api/formation-predefinie/add/${phaseId}`, newFormationPredefinie)
      .then((response) => {
        toast.success("Formation prédefinie ajoutée avec succès!");
        console.log(response.data);
        chargerPhases();
        handleClose();
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la formation prédefinie:", error);
        toast.error("Erreur lors de l'ajout de la formation prédefinie.");
      });
  };

  const handleViewFormations = (phaseId) => {
    if (expandedPhaseId === phaseId) {
      setExpandedPhaseId(null);
    } else {
      axios
        .get(
          `http://localhost:8081/api/formation-predefinie/phases/${phaseId}/formationsPredefinies`
        )
        .then((response) => {
          setFormationsPredefiniesByPhase((prev) => ({
            ...prev,
            [phaseId]: response.data,
          }));
          setExpandedPhaseId(phaseId);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des formations prédefinies:", error);
        });
    }
  };

  const handleClose2 = () => {
    setOpenView(false);
    setSelectedPhaseFormations([]);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setTypeFormation("");
    setPropositionFormateur("");
    setEditingFormation(null);
  };

  const handleSubmitEdit = () => {
    const updatedFormationPredefinie = {
      typeFormation: typeFormation,
      propositionFormateur: propositionFormateur,
    };

    axios
      .put(
        `http://localhost:8081/api/formation-predefinie/${editingFormation.idFormationPred}`,
        updatedFormationPredefinie
      )
      .then((response) => {
        toast.success("Formation prédefinie modifiée avec succès!");
        console.log(response.data);
        chargerPhases();
        handleCloseEdit();
      })
      .catch((error) => {
        console.error("Erreur lors de la modification de la formation prédefinie:", error);
        toast.error("Erreur lors de la modification de la formation prédefinie.");
      });
  };

  const handleEditFormationPredefinie = (formationId) => {
    // Chargez les détails de la formation pour l'édition
    axios
      .get(`http://localhost:8081/api/formation-predefinie/${formationId}`)
      .then((response) => {
        console.log(response.data);
        setEditingFormation(response.data);
        setOpenEdit(true);
        setTypeFormation(response.data.typeFormation);
        setPropositionFormateur(response.data.propositionFormateur);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de la formation prédefinie:", error);
      });
  };

  const handleDeleteFormationPredefinie = (formationId) => {
    axios
      .delete(`http://localhost:8081/api/formation-predefinie/${formationId}`)
      .then(() => {
        toast.success("Formation prédefinie supprimée avec succès!");
        setFormationsPredefiniesByPhase((prev) => ({
          ...prev,
          [expandedPhaseId]: prev[expandedPhaseId].filter(
            (formation) => formation.idFormationPred !== formationId
          ),
        }));
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la formation prédefinie:", error);
        toast.error("Erreur lors de la suppression de la formation prédefinie.");
      });
  };

  // Utilisation de authorsTableData pour obtenir columns et rows
  const { columns, rows } = authorsTableData(
    phases,
    handleAddFormationPredefinie,
    handleViewFormations,
    expandedPhaseId,
    formationsPredefiniesByPhase,
    handleEditFormationPredefinie,
    handleDeleteFormationPredefinie
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
                  Table des phases
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter une formation prédefinie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Type de la formation"
            fullWidth
            variant="standard"
            value={typeFormation}
            onChange={(e) => setTypeFormation(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Proposition d'un formateur"
            fullWidth
            variant="standard"
            value={propositionFormateur}
            onChange={(e) => setPropositionFormateur(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit}>Ajouter</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Modifier une formation prédefinie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Type de la formation"
            fullWidth
            variant="standard"
            value={typeFormation}
            onChange={(e) => setTypeFormation(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Proposition d'un formateur"
            fullWidth
            variant="standard"
            value={propositionFormateur}
            onChange={(e) => setPropositionFormateur(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Annuler</Button>
          <Button onClick={handleSubmitEdit}>Modifier</Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </DashboardLayout>
  );
}

export default FormationsPredefinies;
