package ru.amc.makeathon.beautifulspb.database.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity(name = "issues")
@Getter
@Setter
public class Issue {

    @Id
    private Integer id;

    @NotNull
    private String category;

    @Column(name = "sub_category")
    private String subCategory;

    @NotNull
    private String name;

    @NotNull
    private String district;

    private String mo;

    private double latitude;

    private double longitude;

    @Column(name = "raised_date")
    private String raisedDate;

    private String status;
}
