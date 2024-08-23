package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.stage.services.IServiceEvaluationFormation;

@RestController
@AllArgsConstructor
public class EvaluationFRestController {
    private IServiceEvaluationFormation iServiceEvaluationFormation;
}
