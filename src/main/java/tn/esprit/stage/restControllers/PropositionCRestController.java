package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.stage.services.IServicePropositionC;

@RestController
@AllArgsConstructor
public class PropositionCRestController {
    private IServicePropositionC iServicePropositionC;
}
