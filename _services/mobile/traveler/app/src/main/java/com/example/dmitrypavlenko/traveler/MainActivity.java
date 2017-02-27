package com.example.dmitrypavlenko.traveler;

import android.bluetooth.BluetoothDevice;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.example.dmitrypavlenko.traveler.Interfaces.OnDatabaseDataMove;
import com.example.dmitrypavlenko.traveler.Models.Dozor.DozorResponse;
import com.example.dmitrypavlenko.traveler.Models.User.User;
import com.example.dmitrypavlenko.traveler.Services.FirebaseService;
import com.google.firebase.database.ChildEventListener;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.zhaoxiaodan.miband.ActionCallback;
import com.zhaoxiaodan.miband.MiBand;
import com.zhaoxiaodan.miband.model.VibrationMode;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;

import butterknife.BindView;
import butterknife.ButterKnife;

public class MainActivity extends AppCompatActivity {

    private MiBand miband;
    @BindView(R.id.connectBtn)
    Button connectBtn;
    @BindView(R.id.statusTextView)
    TextView statusTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        miband = new MiBand(this);
        ButterKnife.bind(this);
        this.connectToMiBand();

        FirebaseService fs = new FirebaseService();
        fs.listen("users", User.class);
        fs.listen("dozor", DozorResponse.class);

    }

    private void connectToMiBand() {
        final ScanCallback scanCallback = new ScanCallback() {
            @Override
            public void onScanResult(int callbackType, ScanResult result) {
                BluetoothDevice device = result.getDevice();
                connectDevice(device);
            }
        };
        MiBand.startScan(scanCallback);
    }

    private void connectDevice(BluetoothDevice device) {
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

    @Subscribe
    public void onDozorDataMove(DozorResponse dozorResponse) {

    }

    @Subscribe
    public void onUserDataMove(User user) {

    }

    @Override
    protected void onStart() {
        super.onStart();
        EventBus.getDefault().register(this);
    }

    @Override
    protected void onStop() {
        super.onStop();
        EventBus.getDefault().unregister(this);
    }
}
