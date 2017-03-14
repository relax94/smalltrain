package com.example.dmitrypavlenko.traveler;

import android.bluetooth.BluetoothDevice;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.example.dmitrypavlenko.traveler.Application.TravelerApplication;
import com.example.dmitrypavlenko.traveler.Events.DeviceActionResultEvent;
import com.example.dmitrypavlenko.traveler.Events.ScanDevicesResultEvent;
import com.example.dmitrypavlenko.traveler.Interfaces.OnDatabaseDataMove;
import com.example.dmitrypavlenko.traveler.Listeners.BluetoothDevicesListener;
import com.example.dmitrypavlenko.traveler.Listeners.DeviceActionCallbackListener;
import com.example.dmitrypavlenko.traveler.Models.Dozor.DozorDevice;
import com.example.dmitrypavlenko.traveler.Models.Dozor.DozorResponse;
import com.example.dmitrypavlenko.traveler.Models.User.ObservablePoint;
import com.example.dmitrypavlenko.traveler.Models.User.User;
import com.example.dmitrypavlenko.traveler.Services.FirebaseService;
import com.example.dmitrypavlenko.traveler.Tools.Basic;
import com.example.dmitrypavlenko.traveler.Tools.Utils;
import com.google.android.gms.auth.api.Auth;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.auth.api.signin.GoogleSignInResult;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
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

import java.util.ArrayList;

import javax.inject.Inject;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class MainActivity extends AppCompatActivity implements GoogleApiClient.OnConnectionFailedListener {

    private final int RC_SIGN_IN = 123;
    private GoogleApiClient mGoogleApiClient;

    private MiBand miband;
    @BindView(R.id.connectBtn)
    Button connectBtn;
    @BindView(R.id.statusTextView)
    TextView statusTextView;
    private User userData;
    @Inject FirebaseService fs;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        TravelerApplication.getComponent().inject(this);
        ButterKnife.bind(this);
        this.miband = new MiBand(this);
        this.connectToMiBand();
        this.testGoogleSignInInit();

    }

    @OnClick(R.id.connectBtn)
    public void onConnectBtnClicked() {
        Toast.makeText(this, "On Connect clicked", Toast.LENGTH_SHORT).show();
    }


    private void connectToMiBand() {
        MiBand.startScan(new BluetoothDevicesListener());
    }

    @Subscribe
    public void onScanDevicesEventResult(ScanDevicesResultEvent scanDevicesResultEvent){
        if(scanDevicesResultEvent != null)
            connectDevice(scanDevicesResultEvent.getBluetoothDevice());
    }

    private void connectDevice(BluetoothDevice device) {
        miband.connect(device, new DeviceActionCallbackListener());
    }

    @Subscribe
    public void onActionDeviceResult(DeviceActionResultEvent deviceActionResultEvent){
        if(deviceActionResultEvent != null)
            fs.listen("users", User.class);
    }

    @Subscribe
    public void onDozorDataMove(DozorResponse dozorResponse) {
        this.calculateDistances(dozorResponse);
    }

    final ArrayList<ObservablePoint> candidates = new ArrayList<>();

    private void calculateDistances(DozorResponse dozorResponse) {
        candidates.clear();
        for (ObservablePoint observablePoint : this.userData.getObservables()) {
            for (DozorDevice device : dozorResponse.getData().get(0).getDvs()) {
                ObservablePoint devicePoint = device.getLoc();
                double distance = Utils.distanceBetweenXY(observablePoint, devicePoint);
                if (distance < 300 && !candidates.contains(devicePoint))
                    candidates.add(observablePoint);
            }
        }

        for(int i = 0; i < candidates.size(); i++)
            vibrateWhile(candidates.get(i).getDuration());
    }

    private void vibrateWhile(int restrictCount){
        for(int i = 0; i < restrictCount; i++){
            Basic.setTimeout(new Runnable() {
                public void run() {
                    miband.startVibration(VibrationMode.VIBRATION_WITH_LED);
                }
            }, i * 3000);
        }
    }

    @Subscribe
    public void onUserDataMove(User user) {
        this.userData = user;
        this.fs.listen("dozor", DozorResponse.class);
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

    private void testGoogleSignInInit(){
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestEmail()
                .build();
       this.mGoogleApiClient = new GoogleApiClient.Builder(this)
                .enableAutoManage(this /* FragmentActivity */, this /* OnConnectionFailedListener */)
                .addApi(Auth.GOOGLE_SIGN_IN_API, gso)
                .build();
    }

    private void signIn() {
        Intent signInIntent = Auth.GoogleSignInApi.getSignInIntent(mGoogleApiClient);
        startActivityForResult(signInIntent, RC_SIGN_IN);
    }

    @Override
    public void onConnectionFailed(@NonNull ConnectionResult connectionResult) {

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == RC_SIGN_IN) {
            GoogleSignInResult result = Auth.GoogleSignInApi.getSignInResultFromIntent(data);
            handleSignInResult(result);
        }
    }

    private void handleSignInResult(GoogleSignInResult result) {
        Log.d("GAUTH", "handleSignInResult:" + result.isSuccess());
        if (result.isSuccess()) {
            // Signed in successfully, show authenticated UI.
            GoogleSignInAccount acct = result.getSignInAccount();

        } else {

        }
    }
}
