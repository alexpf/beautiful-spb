package ru.amc.makeathon.beautifulspb.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.amc.makeathon.beautifulspb.database.model.Issue;
import ru.amc.makeathon.beautifulspb.database.repository.IssueRepository;
import ru.amc.makeathon.beautifulspb.web.dto.HealthcheckStatus;

import java.util.Collection;

@RestController
@RequestMapping("api")
public class MainController {

    private final IssueRepository issueRepository;

    @Autowired
    public MainController(IssueRepository issueRepository) {
        this.issueRepository = issueRepository;
    }

    @GetMapping("health")
    public HealthcheckStatus healthCheck() {
        return new HealthcheckStatus("OK");
    }

    @GetMapping("issue")
    public Collection<Issue> getIssues(@RequestParam("category") String category) {
        return issueRepository.findByCategory(category);
    }
}
