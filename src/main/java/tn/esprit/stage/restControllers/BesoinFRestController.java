package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.stage.services.IServiceBesoinF;

@RestController
@AllArgsConstructor
public class BesoinFRestController {
    private IServiceBesoinF iServiceBesoinF;

}
