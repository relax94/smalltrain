package com.example.dmitrypavlenko.traveler.Models.User;

import java.util.ArrayList;

/**
 * Created by Dmitry Pavlenko on 26.02.2017.
 */

public class User {

    public User() {
    }

    private int id;
    private boolean selecting;
    private ArrayList<ObservablePoint> observables;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isSelecting() {
        return selecting;
    }

    public void setSelecting(boolean selecting) {
        this.selecting = selecting;
    }

    public ArrayList<ObservablePoint> getObservables() {
        return observables;
    }

    public void setObservables(ArrayList<ObservablePoint> observables) {
        this.observables = observables;
    }
}
