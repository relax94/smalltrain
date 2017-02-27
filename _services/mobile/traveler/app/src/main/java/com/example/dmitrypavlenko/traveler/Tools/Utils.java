package com.example.dmitrypavlenko.traveler.Tools;

import com.example.dmitrypavlenko.traveler.Models.User.ObservablePoint;

/**
 * Created by Dmitry Pavlenko on 27.02.2017.
 */

public class Utils {

    public static double toRadians(float value){
        return value * Math.PI / 180;
    }

    public static double distanceBetweenXY(ObservablePoint point1, ObservablePoint point2){
        double R = 6371e3; // metres
        double  φ1 = toRadians(point1.getLat());
        double φ2 = toRadians(point2.getLat());
        double Δφ =toRadians (point2.getLat()-point1.getLat());
        double Δλ = toRadians(point2.getLng()-point1.getLng());

        double a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                        Math.sin(Δλ/2) * Math.sin(Δλ/2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        double d = R * c;

        // console.log(`Distance ${d}`);
        return d;
    }

}
