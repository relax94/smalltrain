package com.example.dmitrypavlenko.traveler.Application;


import android.app.Application;

import com.example.dmitrypavlenko.traveler.Dagger2.Components.AppComponent;
import com.example.dmitrypavlenko.traveler.Dagger2.Components.DaggerAppComponent;

/**
 * Created by Dmitry Pavlenko on 10.10.2016.
 */

public class TravelerApplication extends Application
{
   private static AppComponent component;

    @Override
    public void onCreate() {
        super.onCreate();
       component = DaggerAppComponent.create();
    }

    public static AppComponent getComponent(){
        return component;
    }
}
