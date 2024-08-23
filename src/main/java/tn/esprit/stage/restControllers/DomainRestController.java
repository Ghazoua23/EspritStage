package tn.esprit.stage.restControllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.stage.services.IServiceDomain;

@RestController
@AllArgsConstructor
public class DomainRestController {
    private IServiceDomain iServiceDomain;
}
