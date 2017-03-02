package com.example.dmitrypavlenko.traveler.Dagger2.Modules;

import android.content.Context;

import com.example.dmitrypavlenko.traveler.Services.FirebaseService;
import com.google.android.gms.common.api.GoogleApiClient;
import com.zhaoxiaodan.miband.MiBand;

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

   /* @Provides
    public MiBand provideMibandWearableService(Context context){
        return new MiBand(context);
    }*/
}
