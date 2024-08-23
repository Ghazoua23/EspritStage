package tn.esprit.stage.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stage.repositories.EvaluationFormationRepository;

@Service
@AllArgsConstructor
public class EvaluationFImp implements IServiceEvaluationFormation{
    private EvaluationFormationRepository evaluationFormationRepository;
}
