package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.stage.services.IServiceSavoir;

@RestController
@AllArgsConstructor
public class SavoirRestController {
    private IServiceSavoir iServiceSavoir;
}
