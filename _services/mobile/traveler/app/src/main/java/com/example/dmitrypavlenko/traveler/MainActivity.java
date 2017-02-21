package com.example.dmitrypavlenko.traveler;

import android.bluetooth.BluetoothDevice;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.zhaoxiaodan.miband.ActionCallback;
import com.zhaoxiaodan.miband.MiBand;
import com.zhaoxiaodan.miband.model.VibrationMode;

public class MainActivity extends AppCompatActivity {

    private MiBand miband;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
         miband = new MiBand(this);
        this.connectToMiBand();
    }

    private void connectToMiBand(){
        final ScanCallback scanCallback = new ScanCallback()
        {
            @Override
            public void onScanResult(int callbackType, ScanResult result)
            {
                BluetoothDevice device = result.getDevice();
                connectDevice(device);
            }
        };
        MiBand.startScan(scanCallback);
    }

    private void connectDevice(BluetoothDevice device){
        miband.connect(device, new ActionCallback() {
            @Override
            public void onSuccess(Object data) {
                miband.startVibration(VibrationMode.VIBRATION_WITH_LED);
            }

            @Override
            public void onFail(int errorCode, String msg) {

            }
        });

    }

    private void  readFromFirebase(){
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference myRef = database.getReference("user");
    }
}
