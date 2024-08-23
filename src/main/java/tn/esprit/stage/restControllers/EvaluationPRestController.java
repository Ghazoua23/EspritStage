package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.stage.services.IServiceEvaluationParticipant;

@RestController
@AllArgsConstructor
public class EvaluationPRestController {
    public IServiceEvaluationParticipant iServiceEvaluationParticipant;
}
