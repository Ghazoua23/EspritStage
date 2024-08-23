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
import authorsTableData from "layouts/programmeformation/data/authorsTableData";

// React and State Management
import React, { useState, useEffect } from "react";
import axios from "axios";

function TableFormations() {
  const [nomProgramme, setNomProgramme] = useState("");
  const [programmesFormation, setProgrammesFormation] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAddPhase, setOpenAddPhase] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentProgramme, setCurrentProgramme] = useState({ id: null, nomProgramme: "" });
  const [currentProgrammeId, setCurrentProgrammeId] = useState(null);
  const [nomPhase, setNomPhase] = useState("");
  const [description, setDescription] = useState("");

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
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = {
      nomProgramme,
    };
    console.log("Données de formation:", formData);

    const USER_ID = 2;

    // Envoyer les données à une API
    axios
      .post(`http://localhost:8081/api/programmeFormation/ajouterProgrammeF/${USER_ID}`, formData)
      .then((response) => {
        console.log("Form submitted successfully:", response.data);
        toast.success("Ajouté avec succès !");
        // Réinitialiser les champs du formulaire après soumission
        setNomProgramme("");
        chargerProgrammesFormation(); // Recharger la liste après l'ajout
      })
      .catch((error) => {
        console.error("There was an error submitting the form!", error);
        toast.error("Erreur lors de l'ajout.");
      });
  };

  const handleEdit = (id) => {
    const programme = programmesFormation.find((p) => p.id === id);
    setCurrentProgramme(programme);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:8081/api/programmeFormation/${currentProgramme.id}`, currentProgramme)
      .then((response) => {
        console.log("Programme modifié avec succès:", response.data);
        toast.success("Modifié avec succès !");
        chargerProgrammesFormation(); // Recharger la liste après la modification
        handleClose();
      })
      .catch((error) => {
        console.error("Erreur lors de la modification du programme:", error);
        toast.error("Erreur lors de la modification.");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8081/api/programmeFormation/${id}`)
      .then((response) => {
        console.log("Programme supprimé avec succès:", response.data);
        toast.success("Supprimé avec succès !");
        chargerProgrammesFormation(); // Recharger la liste après la suppression
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du programme:", error);
        toast.error("Erreur lors de la suppression.");
      });
  };

  const handleAddPhase = (id) => {
    setCurrentProgrammeId(id);
    setOpenAddPhase(true);
  };

  const handleCloseAddPhase = () => {
    setOpenAddPhase(false);
  };

  const handleSaveAddPhase = () => {
    const phaseData = {
      nomPhase,
      description,
    };

    console.log("Données de formation:", phaseData);

    const USER_ID = 2; // Remplacez par l'ID réel du userApp

    axios
      .post(`http://localhost:8081/api/phases/add/${currentProgrammeId}/${USER_ID}`, phaseData)
      .then((response) => {
        console.log("Phase ajoutée avec succès:", response.data);
        toast.success("Phase ajoutée avec succès !");
        chargerProgrammesFormation(); // Recharger la liste après l'ajout
        handleCloseAddPhase();
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la phase:", error);
        toast.error("Erreur lors de l'ajout de la phase.");
      });
  };

  // Utilisation de authorsTableData pour obtenir columns et rows
  const { columns, rows } = authorsTableData(
    handleEdit,
    handleDelete,
    handleAddPhase,
    programmesFormation
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
                bgColor="#c62828"
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
                  Ajouter un programme de formation
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <Card>
                      <MDBox p={3}>
                        <h4 className="card-title mb-4">Ajouter les détails</h4>
                        <form onSubmit={onSubmit}>
                          <div className="mb-3 row">
                            <label
                              htmlFor="formrow-firstname-input"
                              className="col-md-2 col-form-label"
                              style={{ fontSize: "14px" }} // Taille de police personnalisée
                            >
                              Nom de programme
                            </label>
                            <div className="col-md-4">
                              <input
                                type="text"
                                className="form-control"
                                id="formrow-firstname-input"
                                name="nomProgramme"
                                value={nomProgramme}
                                onChange={(e) => setNomProgramme(e.target.value)}
                              />
                            </div>
                          </div>
                          <div>
                            <button type="submit" className="btn btn-outline-danger">
                              Ajouter
                            </button>
                          </div>
                        </form>
                      </MDBox>
                    </Card>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
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
                  Table des programmes de formations
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
        <DialogTitle>Modifier le programme de formation</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nomProgramme"
            label="Nom du programme"
            type="text"
            fullWidth
            value={currentProgramme.nomProgramme}
            onChange={(e) =>
              setCurrentProgramme({
                ...currentProgramme,
                nomProgramme: e.target.value,
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
      <Dialog open={openAddPhase} onClose={handleCloseAddPhase}>
        <DialogTitle>Ajouter une Phase</DialogTitle>
        <DialogContent>
          <TextField
            type="text"
            label="Nom de la Phase"
            value={nomPhase}
            onChange={(event) => setNomPhase(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogContent>
          <TextField
            type="text"
            label="Description de la Phase"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddPhase} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSaveAddPhase} color="primary">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default TableFormations;
