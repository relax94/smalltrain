package com.example.dmitrypavlenko.traveler.Services;

import com.example.dmitrypavlenko.traveler.Interfaces.OnDatabaseDataMove;
import com.example.dmitrypavlenko.traveler.Listeners.FirebaseListener;
import com.example.dmitrypavlenko.traveler.Models.User.User;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

/**
 * Created by Dmitry Pavlenko on 26.02.2017.
 */

public class FirebaseService {

    private FirebaseDatabase database;

    public FirebaseService()
    {
        this.database = FirebaseDatabase.getInstance();
    }

    public <T> void listen(String childName, OnDatabaseDataMove callback, Class<T> clazz){
         database.getReference(childName).addValueEventListener(new FirebaseListener<>(callback, clazz));
    }

}
