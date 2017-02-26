package com.example.dmitrypavlenko.traveler.Models.Dozor;

import java.util.ArrayList;

/**
 * Created by Dmitry Pavlenko on 26.02.2017.
 */

public class DozorResponse {
    private ArrayList<DozorOutput> data;

    public DozorResponse() {
    }

    public ArrayList<DozorOutput> getData() {
        return data;
    }

    public void setData(ArrayList<DozorOutput> dvs) {
        this.data = dvs;
    }
}
