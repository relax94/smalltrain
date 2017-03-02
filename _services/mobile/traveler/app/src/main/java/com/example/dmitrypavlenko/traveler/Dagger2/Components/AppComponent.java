package com.example.dmitrypavlenko.traveler.Dagger2.Components;

import com.example.dmitrypavlenko.traveler.Dagger2.Modules.CommonServices;
import com.example.dmitrypavlenko.traveler.MainActivity;

import dagger.Component;

/**
 * Created by Dmitry Pavlenko on 02.03.2017.
 */

@Component(modules = {CommonServices.class})
public interface AppComponent {
    void inject(MainActivity activity);
}
