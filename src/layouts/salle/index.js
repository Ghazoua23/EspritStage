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

// Importer les composants nécessaires de Material-UI
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Data
import authorsTableData from "layouts/salle/data/authorsTableData";

// React and State Management
import React, { useState, useEffect } from "react";
import axios from "axios";
function Salles() {
  const [typeSalle, setTypeSalle] = useState("");
  const [nbrPlace, setNbrPlace] = useState("");
  const [equipements, setEquipements] = useState("");
  const [projection, setProjection] = useState("");
  const [dispoClima, setDispoClima] = useState("");
  const [salles, setSalles] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentSalle, setCurrentSalle] = useState({
    idSalle: null,
    typeSalle: "",
    nbrPlace: "",
    equipements: "",
    projection: "",
    dispoClima: "",
  });
  useEffect(() => {
    chargerSalles();
  }, []); // Appelé une seule fois après le montage du composant
  // Fonction pour charger les programmes de formation depuis l'API
  const chargerSalles = () => {
    axios
      .get("http://localhost:8081/api/salles/all")
      .then((response) => {
        setSalles(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des salles :", error);
      });
  };

  // Fonction pour gérer la soumission du formulaire d'ajout de salle
  const onSubmit = (event) => {
    event.preventDefault();
    const formData = {
      typeSalle,
      nbrPlace,
      equipements,
      projection,
      dispoClima,
    };

    const USER_ID = 3; // Remplacez par l'ID réel du userApp

    // Appel à l'API pour ajouter la salle
    axios
      .post(`http://localhost:8081/api/salles/add/${USER_ID}`, formData)
      .then((response) => {
        console.log("Salle ajoutée avec succès:", response.data);
        toast.success("Salle ajoutée avec succès!");
        // Réinitialisation des champs après l'ajout
        setTypeSalle("");
        setNbrPlace("");
        setEquipements("");
        setProjection("");
        setDispoClima("");
        // Recharger la liste des salles après l'ajout (si nécessaire)
        chargerSalles();
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la salle:", error);
      });
  };

  const handleEdit = (id) => {
    const salle = salles.find((s) => s.idSalle === id) || {
      id: null,
      typeSalle: "",
      nbrPlace: "",
      equipements: "",
      projection: "",
      dispoClima: "",
    };
    setCurrentSalle(salle);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    if (currentSalle.idSalle !== null) {
      axios
        .put(`http://localhost:8081/api/salles/update/${currentSalle.idSalle}`, currentSalle)
        .then((response) => {
          console.log("Salle modifiée avec succès:", response.data);
          toast.success("Modifié avec succès !");
          chargerSalles();
          handleClose();
        })
        .catch((error) => {
          console.error("Erreur lors de la modification du salle:", error);
          toast.error("Erreur lors de la modification.");
        });
    } else {
      toast.error("Erreur: Salle non définie.");
    }
  };

  const handleDelete = (id) => {
    if (!id) {
      console.error("Erreur: ID de salle non défini.");
      return;
    }
    // Logique pour la suppression d'une salle
    axios
      .delete(`http://localhost:8081/api/salles/delete/${id}`)
      .then(() => {
        toast.success("Salle supprimée avec succès !");
        chargerSalles(); // Recharger les salles après la suppression
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de la salle :", error);
        toast.error("Erreur lors de la suppression de la salle");
      });
  };

  // Utilisation de authorsTableData pour obtenir columns et rows
  const { columns, rows } = authorsTableData(salles, handleEdit, handleDelete);
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
                  Ajouter une salle
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
                              Type de salle
                            </label>
                            <div className="col-md-4">
                              <input
                                type="text"
                                className="form-control"
                                id="formrow-firstname-input"
                                name="typeSalle"
                                value={typeSalle}
                                onChange={(e) => setTypeSalle(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="mb-3 row">
                            <label
                              htmlFor="formrow-firstname-input"
                              className="col-md-2 col-form-label"
                              style={{ fontSize: "14px" }} // Taille de police personnalisée
                            >
                              Nombre de place
                            </label>
                            <div className="col-md-4">
                              <input
                                type="number"
                                className="form-control"
                                id="formrow-firstname-input"
                                name="nbrPlace"
                                value={nbrPlace}
                                onChange={(e) => setNbrPlace(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="mb-3 row">
                            <label
                              htmlFor="formrow-firstname-input"
                              className="col-md-2 col-form-label"
                              style={{ fontSize: "14px" }} // Taille de police personnalisée
                            >
                              Equipements
                            </label>
                            <div className="col-md-4">
                              <input
                                type="text"
                                className="form-control"
                                id="formrow-firstname-input"
                                name="equipements"
                                value={equipements}
                                onChange={(e) => setEquipements(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="mb-3 row">
                            <label
                              htmlFor="formrow-firstname-input"
                              className="col-md-2 col-form-label"
                              style={{ fontSize: "14px" }} // Taille de police personnalisée
                            >
                              Projection
                            </label>
                            <div className="col-md-4">
                              <input
                                type="text"
                                className="form-control"
                                id="formrow-firstname-input"
                                name="projection"
                                value={projection}
                                onChange={(e) => setProjection(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="mb-3 row">
                            <label
                              htmlFor="formrow-firstname-input"
                              className="col-md-2 col-form-label"
                              style={{ fontSize: "14px" }}
                            >
                              Disponibilité de climatiseur
                            </label>
                            <div className="col-md-4">
                              <FormControl fullWidth>
                                <InputLabel id="dispoClima-label">Disponibilité</InputLabel>
                                <Select
                                  labelId="dispoClima-label"
                                  id="dispoClima"
                                  value={dispoClima}
                                  onChange={(e) => setDispoClima(e.target.value)}
                                  label="Disponibilité"
                                >
                                  <MenuItem value="Disponible">Disponible</MenuItem>
                                  <MenuItem value="Non disponible">Non disponible</MenuItem>
                                </Select>
                              </FormControl>
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
                  Table des salles
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
        <DialogTitle>Modifier la salle</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="typeSalle"
            label="Type de salle"
            type="text"
            fullWidth
            value={currentSalle.typeSalle}
            onChange={(e) =>
              setCurrentSalle({
                ...currentSalle,
                typeSalle: e.target.value,
              })
            }
          ></TextField>
          <TextField
            autoFocus
            margin="dense"
            id="nbrPlace"
            label="Nombre de place"
            type="text"
            fullWidth
            value={currentSalle.nbrPlace}
            onChange={(e) =>
              setCurrentSalle({
                ...currentSalle,
                nbrPlace: e.target.value,
              })
            }
          ></TextField>
          <TextField
            margin="dense"
            id="equipements"
            label="Equipements"
            type="text"
            fullWidth
            variant="standard"
            value={currentSalle.equipements}
            onChange={(e) =>
              setCurrentSalle({
                ...currentSalle,
                equipements: e.target.value,
              })
            }
          />
          <TextField
            margin="dense"
            id="projection"
            label="Projection"
            type="text"
            fullWidth
            variant="standard"
            value={currentSalle.projection}
            onChange={(e) =>
              setCurrentSalle({
                ...currentSalle,
                projection: e.target.value,
              })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="dispoClima-label">Disponibilité de climatiseur</InputLabel>
            <Select
              labelId="dispoClima-label"
              id="dispoClima"
              value={currentSalle.dispoClima}
              onChange={(e) =>
                setCurrentSalle({
                  ...currentSalle,
                  dispoClima: e.target.value,
                })
              }
              label="Disponibilité de climatiseur"
            >
              <MenuItem value="Disponible">Disponible</MenuItem>
              <MenuItem value="Non disponible">Non disponible</MenuItem>
            </Select>
          </FormControl>
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

export default Salles;
