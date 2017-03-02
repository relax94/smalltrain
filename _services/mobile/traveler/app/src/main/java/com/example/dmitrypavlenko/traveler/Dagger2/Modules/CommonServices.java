package com.example.dmitrypavlenko.traveler.Dagger2.Modules;

import com.example.dmitrypavlenko.traveler.Services.FirebaseService;

import dagger.Module;
import dagger.Provides;

/**
 * Created by Dmitry Pavlenko on 02.03.2017.
 */

@Module
public class CommonServices {

    @Provides
    public FirebaseService provideFirebaseService(){
        return new FirebaseService();
    }

}
