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

    @Query(value = "select * from issue i\n " +
            "where i.category = :category\n " +
            "and str_to_date(trim(i.raised_date), '%Y-%m-%d %H:%i') < str_to_date(:dateFrom, '%Y-%m-%d %H:%i')\n " +
            "and (i.status_id <> 4\n " +
            "or i.last_updated_date is null " +
            "or str_to_date(trim(i.last_updated_date), '%Y-%m-%d %H:%i') > str_to_date(:dateTo, '%Y-%m-%d %H:%i'))",
            nativeQuery = true)
    Collection<Issue> getByDateRange(String category, String dateFrom, String dateTo);
}
