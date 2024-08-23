package tn.esprit.stage.services;

import tn.esprit.stage.entities.FormationPredefinie;

import java.util.List;

public interface IServiceFormationPred {

    public FormationPredefinie createFormationPredefinie(FormationPredefinie formationPredefinie, Integer phaseId);
    public FormationPredefinie getFormationPredefinieById(Integer id);
    public List<FormationPredefinie> getAllFormationPredefinie();
    public FormationPredefinie updateFormationPredefinie(Integer id, FormationPredefinie formationPredefinie);
    public void deleteFormationPredefinie(Integer id);
    public List<FormationPredefinie> getFormationsPredefiniesByPhase(Integer phaseId);
    public List<FormationPredefinie> getAllFormationsPredefiniesWithDetails();
}
