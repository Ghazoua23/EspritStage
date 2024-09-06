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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";

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
import authorsTableData from "layouts/formationPred/data/authorsTableData";

// React and State Management
import React, { useState, useEffect } from "react";
import axios from "axios";

function Formations() {
  const [formations, setFormations] = useState([]);
  const [showForm, setShowForm] = useState(false); // État pour afficher/masquer le formulaire
  const [selectedFormationId, setSelectedFormationId] = useState(null);
  const [formationPredefinieId, setFormationPredefinieId] = useState(null);
  const [type, setType] = useState("");
  const [responsableFormation, setResponsableFormation] = useState("");
  const [organismeFormation, setOrganismeFormation] = useState("");
  const [cout, setCout] = useState("");
  const [etat, setEtat] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const etats = ["PLANIFIEE", "EN_COURS", "ANNULEE", "ACHEVEE"]; // Exemple d'états possibles

  useEffect(() => {
    // Requête API pour récupérer les formations
    axios
      .get("http://localhost:8081/api/formation-predefinie/all")
      .then((response) => {
        setFormations(response.data); // Stocke les données dans l'état
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des formations predefinies:", error);
      });

    // Récupérer les utilisateurs
    axios
      .get("http://localhost:8081/api/enseignants")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des utilisateurs:", error));
  }, []);

  const handleAddFormationClick = (formationPredefinieId) => {
    setSelectedFormationId(formationPredefinieId);
    setShowForm((prevShowForm) => !prevShowForm); // Bascule l'affichage du formulaire
  };

  const handleAddFormationSubmit = (e) => {
    e.preventDefault();
    // Préparer les données de la formation
    const formData = {
      type,
      responsableFormation,
      organismeFormation,
      cout,
      etat,
      dateDebut,
      dateFin,
      participants: selectedUsers,
    };
    // Réinitialiser les erreurs
    setErrors({});
    // Vérifier la dateDebut
    const today = new Date().toISOString().split("T")[0]; // Date actuelle au format YYYY-MM-DD
    let formErrors = {};
    if (dateDebut < today) {
      formErrors.dateDebut = "La date de début ne peut pas être antérieure à la date actuelle.";
    }
    // Vérifier la dateFin
    if (dateFin && dateDebut && dateFin < dateDebut) {
      formErrors.dateFin = "La date de fin ne peut pas être antérieure à la date de début.";
    }
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    // Vérifier l'ID de la formation prédéfinie
    const USER_ID = 2; // Remplacez par l'ID réel du userApp
    if (formationPredefinieId == null) {
      // Pas d'ID de formation prédéfinie, on ajoute la formation sans l'associer
      axios
        .post(`http://localhost:8081/api/formations/add/${USER_ID}`, formData) // On n'inclut pas l'ID de formation prédéfinie
        .then((response) => {
          console.log("Formation ajoutée:", response.data);
          setShowForm(false); // Masquer le formulaire après ajout
          setFormations([...formations, response.data]); // Ajouter la formation à la liste
        })
        .catch((error) => {
          if (error.response) {
            console.error("Erreur lors de l'ajout de la formation:", error.response.data);
          } else if (error.request) {
            console.error("Erreur de requête:", error.request);
          } else {
            console.error("Erreur:", error.message);
          }
        });
    } else {
      // Ajouter la formation avec l'ID de formation prédéfinie
      axios
        .post(
          `http://localhost:8081/api/formations/add/${USER_ID}/${formationPredefinieId}`,
          formData
        ) // Inclut l'ID de formation prédéfinie
        .then((response) => {
          console.log("Formation ajoutée:", response.data);
          setShowForm(false); // Masquer le formulaire après ajout
          setFormations([...formations, response.data]); // Ajouter la formation à la liste
        })
        .catch((error) => {
          if (error.response) {
            console.error("Erreur lors de l'ajout de la formation:", error.response.data);
          } else if (error.request) {
            console.error("Erreur de requête:", error.request);
          } else {
            console.error("Erreur:", error.message);
          }
        });
    }
  };
  // Utilisation de authorsTableData pour obtenir columns et rows
  const { columns, rows } = authorsTableData(formations, handleAddFormationClick);
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
                  Table des formations predefinies
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
                  style={{
                    backgroundColor: "#c62828",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedFormationId(null);
                    setFormationPredefinieId(null);
                    setShowForm(true); // Affiche le formulaire sans formation prédéfinie
                  }}
                >
                  Ajouter une formation sans l&apos;association à une formation prédéfinie
                </Button>
              </MDBox>
            </Card>
          </Grid>
        </Grid>

        {showForm && (
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
                      Planification d&rsquo;une formation
                    </MDTypography>
                  </MDBox>
                  <MDBox pt={3}>
                    <Grid container spacing={6}>
                      <Grid item xs={12}>
                        <Card>
                          <MDBox p={3}>
                            <h4 className="card-title mb-4">Ajouter les détails</h4>
                            <form onSubmit={handleAddFormationSubmit}>
                              <div className="mb-3 row">
                                <label
                                  htmlFor="formrow-firstname-input"
                                  className="col-md-2 col-form-label"
                                  style={{ fontSize: "14px" }} // Taille de police personnalisée
                                >
                                  Type de formation
                                </label>
                                <div className="col-md-5">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-firstname-input"
                                    name="type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="mb-3 row">
                                <label
                                  htmlFor="formrow-firstname-input"
                                  className="col-md-2 col-form-label"
                                  style={{ fontSize: "14px" }} // Taille de police personnalisée
                                >
                                  Responsable de formation
                                </label>
                                <div className="col-md-5">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-firstname-input"
                                    name="responsableFormation"
                                    value={responsableFormation}
                                    onChange={(e) => setResponsableFormation(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="mb-3 row">
                                <label
                                  htmlFor="formrow-firstname-input"
                                  className="col-md-2 col-form-label"
                                  style={{ fontSize: "14px" }} // Taille de police personnalisée
                                >
                                  Organisme de formation
                                </label>
                                <div className="col-md-5">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="formrow-firstname-input"
                                    name="organismeFormation"
                                    value={organismeFormation}
                                    onChange={(e) => setOrganismeFormation(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="mb-3 row">
                                <label
                                  htmlFor="formrow-firstname-input"
                                  className="col-md-2 col-form-label"
                                  style={{ fontSize: "14px" }} // Taille de police personnalisée
                                >
                                  Cout de formation
                                </label>
                                <div className="col-md-5">
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="formrow-firstname-input"
                                    name="cout"
                                    value={cout}
                                    onChange={(e) => setCout(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="mb-3 row">
                                <label
                                  htmlFor="formrow-firstname-input"
                                  className="col-md-2 col-form-label"
                                  style={{ fontSize: "14px" }} // Taille de police personnalisée
                                >
                                  Etat
                                </label>
                                <div className="col-md-5">
                                  <select
                                    className="form-control"
                                    id="etat"
                                    name="etat"
                                    value={etat}
                                    onChange={(e) => setEtat(e.target.value)}
                                  >
                                    <option value="">Choisir l&rsquo;état de formation</option>
                                    {etats.map((etatOption) => (
                                      <option key={etatOption} value={etatOption}>
                                        {etatOption}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="mb-3 row">
                                <label
                                  htmlFor="formrow-firstname-input"
                                  className="col-md-2 col-form-label"
                                  style={{ fontSize: "14px" }} // Taille de police personnalisée
                                >
                                  Date Debut
                                </label>
                                <div className="col-md-5">
                                  <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="formrow-firstname-input"
                                    name="dateDebut"
                                    value={dateDebut}
                                    onChange={(e) => setDateDebut(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="mb-3 row">
                                <label
                                  htmlFor="formrow-firstname-input"
                                  className="col-md-2 col-form-label"
                                  style={{ fontSize: "14px" }} // Taille de police personnalisée
                                >
                                  Date Fin
                                </label>
                                <div className="col-md-5">
                                  <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="formrow-firstname-input"
                                    name="dateFin"
                                    value={dateFin}
                                    onChange={(e) => setDateFin(e.target.value)}
                                  />
                                </div>
                              </div>
                              <div className="mb-3 row">
                                <label
                                  htmlFor="participants"
                                  className="col-md-2 col-form-label"
                                  style={{ fontSize: "14px" }} // Taille de police personnalisée
                                >
                                  Participants
                                </label>
                                <div className="col-md-5">
                                  <Select
                                    className="form-control"
                                    id="participants"
                                    multiple
                                    value={selectedUsers}
                                    onChange={(e) => setSelectedUsers(e.target.value)}
                                    renderValue={(selected) => {
                                      if (selected.length === 0) {
                                        return <em>Choisir les participants</em>;
                                      }
                                      return (
                                        <div>
                                          {users
                                            .filter((user) => selected.includes(user.idEnseignant))
                                            .map((user) => (
                                              <div key={user.idEnseignant}>
                                                {user.nomEnseignant}
                                              </div>
                                            ))}
                                        </div>
                                      );
                                    }}
                                  >
                                    {users.map((user) => (
                                      <MenuItem key={user.idEnseignant} value={user.idEnseignant}>
                                        <Checkbox
                                          checked={selectedUsers.includes(user.nomEnseignant)}
                                        />
                                        <ListItemText primary={user.nomEnseignant} />
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </div>
                              </div>
                              <div className="mt-4">
                                <button type="submit" className="btn btn-danger w-md">
                                  Enregistrer
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
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Formations;
