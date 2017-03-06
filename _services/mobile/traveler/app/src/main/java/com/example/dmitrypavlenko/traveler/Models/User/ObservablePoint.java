package com.example.dmitrypavlenko.traveler.Models.User;

/**
 * Created by Dmitry Pavlenko on 26.02.2017.
 */

public class ObservablePoint {
    private float lat;
    private float lng;

    private ObservablePoint loc;

    public ObservablePoint() {
    }

    public float getLat() {
        return lat;
    }

    public void setLat(float lat) {
        this.lat = lat;
    }

    public float getLng() {
        return lng;
    }

    public void setLng(float lng) {
        this.lng = lng;
    }

    public ObservablePoint getLoc() {
        return loc;
    }

    public void setLoc(ObservablePoint loc) {
        this.loc = loc;
    }
}