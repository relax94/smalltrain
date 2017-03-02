package com.example.dmitrypavlenko.traveler.Listeners;

import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;

import com.example.dmitrypavlenko.traveler.Events.ScanDevicesResultEvent;

import org.greenrobot.eventbus.EventBus;

/**
 * Created by Dmitry Pavlenko on 02.03.2017.
 */

public class BluetoothDevicesListener extends ScanCallback {

    public BluetoothDevicesListener() {
    }

    @Override
    public void onScanResult(int callbackType, ScanResult result) {
        EventBus.getDefault().post(new ScanDevicesResultEvent(result, result.getDevice()));
    }

    @Override
    public void onScanFailed(int errorCode) {
        EventBus.getDefault().post(new ScanDevicesResultEvent(errorCode));
    }
}
