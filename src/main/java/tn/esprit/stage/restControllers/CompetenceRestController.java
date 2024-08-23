package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.stage.services.IServiceCompetence;

@RestController
@AllArgsConstructor
public class CompetenceRestController {
    private IServiceCompetence iServiceCompetence;
}
