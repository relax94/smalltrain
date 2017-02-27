package com.example.dmitrypavlenko.traveler.Listeners;

import android.util.Log;

import com.example.dmitrypavlenko.traveler.Interfaces.OnDatabaseDataMove;
import com.example.dmitrypavlenko.traveler.Models.Dozor.DozorDevice;
import com.example.dmitrypavlenko.traveler.Models.Dozor.DozorResponse;
import com.example.dmitrypavlenko.traveler.Models.User.User;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.GenericTypeIndicator;
import com.google.firebase.database.ValueEventListener;

import org.greenrobot.eventbus.EventBus;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Dmitry Pavlenko on 26.02.2017.
 */

public class FirebaseListener<T> implements ValueEventListener {

    public static String LOG_TAG ="FIREBASE_LISTENER";
    private Class<T> clazz;

    public FirebaseListener( Class<T> clazz){
        this.clazz = clazz;
    }

    @Override
    public void onDataChange(DataSnapshot dataSnapshot) {
        T response = dataSnapshot.getChildren().iterator().next().getValue(this.clazz);// REWRITE TO FULL MODEL
        EventBus.getDefault().post(response);
    }

    @Override
    public void onCancelled(DatabaseError databaseError) {

    }
}
