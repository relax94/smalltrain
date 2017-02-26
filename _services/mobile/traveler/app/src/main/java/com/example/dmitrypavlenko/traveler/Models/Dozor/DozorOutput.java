package com.example.dmitrypavlenko.traveler.Models.Dozor;

import java.util.ArrayList;

/**
 * Created by Dmitry Pavlenko on 26.02.2017.
 */

public class DozorOutput {

    private ArrayList<DozorDevice> dvs;

    public DozorOutput() {
    }

    public ArrayList<DozorDevice> getDvs() {
        return dvs;
    }

    public void setDvs(ArrayList<DozorDevice> dvs) {
        this.dvs = dvs;
    }
}
