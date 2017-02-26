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

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Dmitry Pavlenko on 26.02.2017.
 */

public class FirebaseListener<T> implements ValueEventListener {

    public static String FL_TAG ="FIREBASE_LISTENER";
    private OnDatabaseDataMove onDatabaseDataMove;
    private GenericTypeIndicator<T> genericType;
    private Class<T> clazz;

    public FirebaseListener(OnDatabaseDataMove onDatabaseDataMove, Class<T> clazz){
        this.onDatabaseDataMove = onDatabaseDataMove;
        this.genericType = new GenericTypeIndicator<T>(){};
        this.clazz = clazz;
    }

    @Override
    public void onDataChange(DataSnapshot dataSnapshot) {
        T response = dataSnapshot.getValue(this.clazz);
        this.onDatabaseDataMove.onDatabaseDataMove(); // DEPRECATED (Put Event System)
    }

    @Override
    public void onCancelled(DatabaseError databaseError) {

    }
}
