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
import Collapse from "@mui/material/Collapse";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Data
import authorsTableData from "layouts/phase/data/authorsTableData";

// React and State Management
import React, { useState, useEffect } from "react";
import axios from "axios";

function TablePhases() {
  const [nomProgramme, setNomProgramme] = useState("");
  const [programmesFormation, setProgrammesFormation] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAddPhase, setOpenAddPhase] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentProgramme, setCurrentProgramme] = useState({ id: null, nomProgramme: "" });
  const [currentPhase, setCurrentPhase] = useState({ id: null, nomPhase: "", description: "" });
  const [currentProgrammeId, setCurrentProgrammeId] = useState(null);
  const [nomPhase, setNomPhase] = useState("");
  const [description, setDescription] = useState("");
  const [phases, setPhases] = useState([]);
  const [openPhasesDialog, setOpenPhasesDialog] = useState(false);
  const [phasesParProgramme, setPhasesParProgramme] = useState({});
  const [visiblePhases, setVisiblePhases] = useState({});

  useEffect(() => {
    chargerProgrammesFormation();
  }, []); // Appelé une seule fois après le montage du composant
  // Fonction pour charger les programmes de formation depuis l'API
  const chargerProgrammesFormation = () => {
    axios
      .get("http://localhost:8081/api/programmeFormation/afficher")
      .then((response) => {
        setProgrammesFormation(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des programmes de formation :", error);
      });
  };

  const togglePhases = (programmeId) => {
    if (visiblePhases[programmeId]) {
      setVisiblePhases((prev) => ({ ...prev, [programmeId]: false }));
    } else {
      if (!phasesParProgramme[programmeId]) {
        axios
          .get(`http://localhost:8081/api/phases/programmeFormation/${programmeId}`)
          .then((response) => {
            console.log(response.data);
            setPhasesParProgramme((prev) => ({ ...prev, [programmeId]: response.data }));
            setVisiblePhases((prev) => ({ ...prev, [programmeId]: true }));
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              setPhasesParProgramme((prev) => ({ ...prev, [programmeId]: [] }));
              setVisiblePhases((prev) => ({ ...prev, [programmeId]: true }));
            } else {
              console.error("Erreur lors du chargement des phases :", error);
            }
          });
      } else {
        setVisiblePhases((prev) => ({ ...prev, [programmeId]: true }));
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenPhasesDialog(false);
    setOpenEdit(false);
  };

  const handleEdit = (idPhase) => {
    const phaseToEdit = Object.values(phasesParProgramme)
      .flat()
      .find((phase) => phase.idPhase === idPhase);
    setCurrentPhase(phaseToEdit);
    setOpenEdit(true);
  };

  const handleDelete = (idPhase) => {
    axios
      .delete(`http://localhost:8081/api/phases/delete/${idPhase}`)
      .then(() => {
        toast.success("Phase supprimée avec succès !");
        chargerProgrammesFormation();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la phase :", error);
        toast.error("Erreur lors de la suppression de la phase.");
      });
  };

  const handleUpdatePhase = () => {
    axios
      .put(`http://localhost:8081/api/phases/update/${currentPhase.idPhase}`, currentPhase)
      .then(() => {
        toast.success("Phase mise à jour avec succès !");
        setOpenEdit(false);
        chargerProgrammesFormation();
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de la phase :", error);
        toast.error("Erreur lors de la mise à jour de la phase.");
      });
  };

  // Utilisation de authorsTableData pour obtenir columns et rows
  const { columns, rows } = authorsTableData(programmesFormation);

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
                  Les phases associés à chaque programme
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                {programmesFormation.map((programme) => (
                  <div key={programme.id}>
                    <MDBox display="flex" justifyContent="space-between" alignItems="center" p={2}>
                      <MDTypography variant="h6">{programme.nomProgramme}</MDTypography>
                      <IconButton onClick={() => togglePhases(programme.id)} color="primary">
                        <VisibilityIcon />
                      </IconButton>
                    </MDBox>
                    <Collapse in={visiblePhases[programme.id]}>
                      <MDBox p={2} ml={4} mb={2}>
                        {phasesParProgramme[programme.id] &&
                        phasesParProgramme[programme.id].length > 0 ? (
                          phasesParProgramme[programme.id].map((phase) => (
                            <MDBox key={phase.idPhase} display="flex" alignItems="center">
                              <MDTypography variant="subtitle1" component="div">
                                <strong>Nom de la phase :</strong>
                                <MDTypography variant="subtitle2" component="span">
                                  {phase.nomPhase}
                                </MDTypography>
                              </MDTypography>
                              <IconButton onClick={() => handleEdit(phase.idPhase)} color="primary">
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDelete(phase.idPhase)}
                                color="secondary"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </MDBox>
                          ))
                        ) : (
                          <MDTypography>Aucune phase disponible.</MDTypography>
                        )}
                      </MDBox>
                    </Collapse>
                  </div>
                ))}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
      <Dialog open={openEdit} onClose={handleClose}>
        <DialogTitle>Modifier la phase</DialogTitle>
        <DialogContent>
          <TextField
            label="Nom de la phase"
            value={currentPhase.nomPhase}
            onChange={(e) => setCurrentPhase({ ...currentPhase, nomPhase: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogContent>
          <TextField
            label="Description de la phase"
            value={currentPhase.description}
            onChange={(e) => setCurrentPhase({ ...currentPhase, description: e.target.value })}
            fullWidth
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleUpdatePhase} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default TablePhases;
