package com.example.dmitrypavlenko.traveler.Models.Dozor;

import com.example.dmitrypavlenko.traveler.Models.User.ObservablePoint;

/**
 * Created by Dmitry Pavlenko on 26.02.2017.
 */

public class DozorDevice {
    private String gNb;
    private ObservablePoint loc;

    public DozorDevice() {
    }

    public String getgNb() {
        return gNb;
    }

    public void setgNb(String gNb) {
        this.gNb = gNb;
    }

    public ObservablePoint getLoc() {
        return loc;
    }

    public void setLoc(ObservablePoint loc) {
        this.loc = loc;
    }
}
