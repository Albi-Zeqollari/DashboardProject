package com.example.dashboard.controllers;


import com.example.dashboard.models.Dashboard;
import com.example.dashboard.models.Widgets;
import com.example.dashboard.repositories.DashboardRepository;
import com.example.dashboard.repositories.WidgetsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin("http://localhost:4200")
@RestController
public class DashboardController {

    @Autowired
    DashboardRepository dashboardRepository;

    @Autowired
    WidgetsRepository widgetsRepository;



    @GetMapping("/dashboard")
    public List<Dashboard> getAllInfo(){

        return dashboardRepository.findAll();
    }

    @PostMapping("/dashboard")
    public Dashboard createDashboard(@RequestBody Dashboard dashboard){

        if(dashboard.getName().equals("")){
            return null;
        }
        else{
            return dashboardRepository.save(dashboard);
        }


    }

    @GetMapping("/dashboard/{id}")
    public ResponseEntity<Dashboard> getDashboardById(@PathVariable String id){

        Dashboard dashboard = dashboardRepository.findById(id).orElseThrow();

        return ResponseEntity.ok(dashboard);

    }

    @PutMapping("/dashboard/{id}")
    public ResponseEntity<Dashboard> updateDashboard(@PathVariable String id,@RequestBody Dashboard dashboard){


       Dashboard updatedDashboard = dashboardRepository.save(dashboard);

        return ResponseEntity.ok(updatedDashboard);
    }

    @DeleteMapping("/dashboard/{id}")
    public ResponseEntity<Map<String ,Boolean>> deleteDashboard(@PathVariable String id){

        Dashboard dashboard= dashboardRepository.findById(id).orElseThrow();

        List<Widgets> widgetsList = widgetsRepository.findByDashboardId(id);

        if(widgetsList.size() == 0){
            dashboardRepository.delete(dashboard);
        }else{
            dashboardRepository.save(dashboard);
        }

//        dashboardRepository.delete(dashboard);

        Map<String,Boolean> response = new HashMap<>();

        response.put("deleted",Boolean.TRUE);
        return  ResponseEntity.ok(response);
    }

}
