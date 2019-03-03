package ru.amc.makeathon.beautifulspb.database.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import ru.amc.makeathon.beautifulspb.database.model.Issue;

import java.util.Collection;

public interface IssueRepository extends CrudRepository<Issue, Integer> {

    Collection<Issue> findByCategory(String category);

    @Query("select distinct i.district from issue i")
    Collection<String> findAllDistricts();

    @Query("select distinct i.category from issue i")
    Collection<String> findAllCategories();


}
