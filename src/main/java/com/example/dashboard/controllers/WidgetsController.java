package com.example.dashboard.controllers;

import com.example.dashboard.models.Dashboard;
import com.example.dashboard.models.Widgets;
import com.example.dashboard.repositories.DashboardRepository;
import com.example.dashboard.repositories.WidgetsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("http://localhost:4200")
@RestController
public class WidgetsController {

    @Autowired
    WidgetsRepository widgetsRepository;
    @Autowired
    Environment environment;
    @Autowired
    DashboardRepository dashboardRepository;


    @GetMapping("/freq")
    public void getFreq(){
        Widgets widgets = new Widgets();

        widgets.setFrequency(Objects.requireNonNull(environment.getProperty("widgets.frequency")));

        System.out.println(widgets.getFrequency());
    }

    @GetMapping("/widgets")
    public List<Widgets> getAllInfo() {

        return widgetsRepository.findAll();

    }

    @PostMapping("/widgets/{dashboardId}")
    public Widgets createWidgets(@RequestBody Widgets widgets,@PathVariable String dashboardId) {

        if(widgets.getWidgetname().equals("")){

            return null;
        }else{
            return  widgetsRepository.save(widgets);
        }
    }

    @PutMapping("/coordinates")
    public List<Widgets> saveCoordinates(@RequestBody List<Widgets> widgetModelList) {
        return widgetsRepository.saveAll(widgetModelList);
    }

    @GetMapping("/coordinates/{id}")
    public Widgets getCoordinates(@PathVariable String id) {

        Widgets widgets = widgetsRepository.findById(id).orElseThrow();

        return  widgets;

    }



    @GetMapping("/widgets/{id}")
    public ResponseEntity<Widgets> getWidgetsById(@PathVariable String id) {

        Widgets widgets = widgetsRepository.findById(id).orElseThrow();

        return ResponseEntity.ok(widgets);
    }



    @GetMapping("/widget/{dashboardId}")
    public ResponseEntity<List<Widgets>> getWidgetsByDashboardId(@PathVariable String dashboardId) {

       List<Widgets> widgetsList  = widgetsRepository.findByDashboardId(dashboardId);

        return ResponseEntity.ok(widgetsList);
    }

    @PutMapping("/widgets/{id}")
    public ResponseEntity<Widgets> updateWidgets(@PathVariable String id,@RequestBody Widgets widgets){

       Widgets updatedWidget = widgetsRepository.save(widgets);

        return ResponseEntity.ok(updatedWidget);
    }

    @DeleteMapping("/widgets/{id}")
    public ResponseEntity<Map<String ,Boolean>> deleteWidgets(@PathVariable String id){

        Widgets widgets = widgetsRepository.findById(id).orElseThrow();

        widgetsRepository.delete(widgets);

        Map<String,Boolean> response = new HashMap<>();

        response.put("deleted",Boolean.TRUE);
        return  ResponseEntity.ok(response);
    }

}
