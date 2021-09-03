package com.example.dashboard.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document

public class Widgets {

    @Id
    private String id;
    @NonNull
    @Indexed(unique = true)
    private String widgetname;
    @NonNull
    private String widgetdescription;
    @NonNull
    private String dataSource;
    @NonNull
    private String chartType;
    @NonNull
    private String  frequency;
    @NonNull
    private  String dashboardId;



    private  Integer cols=2;
    private  Integer  rows=2;
    private  Integer  x=1;
    private  Integer  y=1;

}
