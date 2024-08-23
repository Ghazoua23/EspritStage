package tn.esprit.stage.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stage.repositories.EvaluationFormationRepository;
import tn.esprit.stage.repositories.EvaluationParticipantRepository;

@Service
@AllArgsConstructor
public class EvaluationPImp implements IServiceEvaluationParticipant{
    private EvaluationParticipantRepository evaluationParticipantRepository;
}
