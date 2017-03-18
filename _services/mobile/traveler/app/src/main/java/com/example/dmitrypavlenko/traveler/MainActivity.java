package com.example.dmitrypavlenko.traveler;

import android.bluetooth.BluetoothDevice;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.view.ActionMode;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.example.dmitrypavlenko.traveler.Adapter.MessagesAdapter;
import com.example.dmitrypavlenko.traveler.Application.TravelerApplication;
import com.example.dmitrypavlenko.traveler.Events.DeviceActionResultEvent;
import com.example.dmitrypavlenko.traveler.Events.ScanDevicesResultEvent;
import com.example.dmitrypavlenko.traveler.Helpers.DividerItemDecoration;
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
import java.util.List;

import javax.inject.Inject;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class MainActivity extends AppCompatActivity implements GoogleApiClient.OnConnectionFailedListener,
        SwipeRefreshLayout.OnRefreshListener, MessagesAdapter.MessageAdapterListener {

    private final int RC_SIGN_IN = 123;
    private GoogleApiClient mGoogleApiClient;

    private MiBand miband;
    private User userData;
    @Inject
    FirebaseService fs;

    private List<ObservablePoint> messages = new ArrayList<>();
    private RecyclerView recyclerView;
    private MessagesAdapter mAdapter;
    private SwipeRefreshLayout swipeRefreshLayout;
    // private ActionModeCallback actionModeCallback;
    private ActionMode actionMode;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        TravelerApplication.getComponent().inject(this);
        ButterKnife.bind(this);
        this.miband = new MiBand(this);
        this.initUI();
        this.testGoogleSignInInit();

    }

    private void initUI() {
        recyclerView = (RecyclerView) findViewById(R.id.recycler_view);
        swipeRefreshLayout = (SwipeRefreshLayout) findViewById(R.id.swipe_refresh_layout);
        swipeRefreshLayout.setOnRefreshListener(this);

        mAdapter = new MessagesAdapter(this, messages, this);
        RecyclerView.LayoutManager mLayoutManager = new LinearLayoutManager(getApplicationContext());
        recyclerView.setLayoutManager(mLayoutManager);
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.addItemDecoration(new DividerItemDecoration(this, LinearLayoutManager.VERTICAL));
        recyclerView.setAdapter(mAdapter);

        // actionModeCallback = new ActionModeCallback();

        // show loader and fetch messages
        swipeRefreshLayout.post(
                new Runnable() {
                    @Override
                    public void run() {
                        connectToMiBand();
                    }
                }
        );
    }

    private void connectToMiBand() {
        MiBand.startScan(new BluetoothDevicesListener());
    }

    @Subscribe
    public void onScanDevicesEventResult(ScanDevicesResultEvent scanDevicesResultEvent) {
        if (scanDevicesResultEvent != null)
            connectDevice(scanDevicesResultEvent.getBluetoothDevice());
    }

    private void connectDevice(BluetoothDevice device) {
        miband.connect(device, new DeviceActionCallbackListener());
    }

    @Subscribe
    public void onActionDeviceResult(DeviceActionResultEvent deviceActionResultEvent) {
        if (deviceActionResultEvent != null)
            fs.listen("users", User.class);
    }

    @Subscribe
    public void onDozorDataMove(DozorResponse dozorResponse) {
        this.calculateDistances(dozorResponse);
    }

    final ArrayList<ObservablePoint> candidates = new ArrayList<>();

    private void addToCandidates(ObservablePoint point){

    }


    private void calculateDistances(DozorResponse dozorResponse) {
        candidates.clear();
        for (ObservablePoint observablePoint : this.userData.getObservables()) {
            for (DozorDevice device : dozorResponse.getData().get(0).getDvs()) {
                ObservablePoint devicePoint = device.getLoc();
                double distance = Utils.distanceBetweenXY(observablePoint, devicePoint);
                if (distance < 300 && !candidates.contains(devicePoint)) {
                    observablePoint.setActive(true);
                    candidates.add(observablePoint);
                }
            }
        }

        if (candidates.size() > 0) {
            this.messages.clear();
            this.messages.addAll(this.userData.getObservables());
            this.mAdapter.notifyDataSetChanged();
            for (int i = 0; i < candidates.size(); i++) {
                final int candidateId = i;
                Basic.setTimeout(new Runnable() {
                    public void run() {
                        vibrateWhile(candidates.get(candidateId).getDuration());
                    }
                }, candidateId * 10000);
            }
        }
    }

    private void vibrateWhile(int restrictCount) {
        for (int i = 0; i < restrictCount; i++) {
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
        messages.clear();
        messages.addAll(user.getObservables());
        mAdapter.notifyDataSetChanged();
        swipeRefreshLayout.setRefreshing(false);
        this.fs.listen("dozor", DozorResponse.class);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_search) {
            Toast.makeText(getApplicationContext(), "Search...", Toast.LENGTH_SHORT).show();
            return true;
        }

        return super.onOptionsItemSelected(item);
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

    private void testGoogleSignInInit() {
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

    @Override
    public void onRefresh() {

    }

    @Override
    public void onIconClicked(int position) {

    }

    @Override
    public void onIconImportantClicked(int position) {

    }

    @Override
    public void onMessageRowClicked(int position) {

    }

    @Override
    public void onRowLongClicked(int position) {

    }
}
