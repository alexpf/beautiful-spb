package ru.amc.makeathon.beautifulspb.database.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity(name = "issue")
@Getter
@Setter
public class Issue {

    @Id
    private Integer id;

    @NotNull
    private String category;

    private String subCategory;

    @NotNull
    private String name;

    @NotNull
    private String district;

    private String mo;

    private double latitude;

    private double longitude;

    private String raisedDate;

    private String lastUpdatedDate;

    private String status;

    private Integer statusId;
}
