package ru.amc.makeathon.beautifulspb.database.repository;

import org.springframework.data.repository.CrudRepository;
import ru.amc.makeathon.beautifulspb.database.model.Issue;

import java.util.Collection;

public interface IssueRepository extends CrudRepository<Issue, Integer> {

    Collection<Issue> findByCategory(String category);
}
