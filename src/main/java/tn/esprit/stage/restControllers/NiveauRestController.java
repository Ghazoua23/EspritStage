package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.stage.services.IServiceNiveau;

@RestController
@AllArgsConstructor
public class NiveauRestController {
    public IServiceNiveau iServiceNiveau;
}
