package com.example.dashboard.repositories;

import com.example.dashboard.models.Dashboard;
import com.example.dashboard.models.Widgets;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface WidgetsRepository extends MongoRepository<Widgets,String> {

    List<Widgets> findByDashboardId(String dashboardId);


}
