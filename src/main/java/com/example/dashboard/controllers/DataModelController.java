package com.example.dashboard.controllers;


import com.example.dashboard.models.DataModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

@RestController
public class DataModelController {

    @Autowired
    private SimpMessagingTemplate template;

    private DataModel dataModel = new DataModel();




    @GetMapping("/notify")
    @Scheduled(fixedRateString = "${widgets.frequency}")
    public void getData() {

        ArrayList<Double> arrayList = new ArrayList<Double>();
        ArrayList<Double> arrayList1 = new ArrayList<Double>();
        double Sum = 0;
        double Sum1=0;

        if(arrayList.size() <=10){

            arrayList.add(new Random().nextDouble() * 100);

        }else{
            return;
        }

        for(Double num : arrayList) {
            Sum += num;
        }
        double  Average = (Sum / arrayList.size());


        dataModel.setAverageGasPrice(Average);


        if(arrayList1.size() <= 10){

            arrayList1.add(new Random().nextDouble() * 100);

        }else{
            return;
        }
        for(Double num : arrayList1) {
            Sum1 += num;
        }
        double  Average1 = (Sum1 / arrayList1.size());

        dataModel.setAverageHotDays(Average1);




//         dataModel.setGasPrice(new Random().nextDouble()*100);
//        dataModel.setHotDays(new Random().nextDouble()*100);
//        dataModel.setNumberOfCars(new Random().nextDouble()*100);
//        dataModel.setRainyDays(new Random().nextDouble()*100);
//        dataModel.setNumberOfEmployees(new Random().nextDouble()*100);

        // Push notifications to front-end
        template.convertAndSend("/topic/notification", dataModel);
        System.out.println(dataModel.toString());

    }



}
