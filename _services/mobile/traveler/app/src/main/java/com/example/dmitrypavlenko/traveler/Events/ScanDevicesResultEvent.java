package com.example.dmitrypavlenko.traveler.Events;

import android.bluetooth.BluetoothDevice;
import android.bluetooth.le.ScanResult;

/**
 * Created by Dmitry Pavlenko on 02.03.2017.
 */

public class ScanDevicesResultEvent {
    private ScanResult scanResult;
    private BluetoothDevice bluetoothDevice;
    private int errorCode;

    public ScanDevicesResultEvent(ScanResult scanResult, BluetoothDevice bluetoothDevice) {
        this.scanResult = scanResult;
        this.bluetoothDevice = bluetoothDevice;
    }

    public ScanDevicesResultEvent(int errorCode) {
        this.errorCode = errorCode;
    }

    public ScanResult getScanResult() {
        return scanResult;
    }

    public BluetoothDevice getBluetoothDevice() {
        return bluetoothDevice;
    }

    public int getErrorCode() {
        return errorCode;
    }
}
