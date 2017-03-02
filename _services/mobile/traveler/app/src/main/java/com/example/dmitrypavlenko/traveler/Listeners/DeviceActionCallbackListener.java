package com.example.dmitrypavlenko.traveler.Listeners;

import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;

import com.example.dmitrypavlenko.traveler.Events.DeviceActionResultEvent;
import com.zhaoxiaodan.miband.ActionCallback;

import org.greenrobot.eventbus.EventBus;

/**
 * Created by Dmitry Pavlenko on 02.03.2017.
 */

public class DeviceActionCallbackListener implements ActionCallback {
    public DeviceActionCallbackListener() {
    }


    @Override
    public void onSuccess(Object data) {
        EventBus.getDefault().post(new DeviceActionResultEvent(data));
    }

    @Override
    public void onFail(int errorCode, String msg) {
        EventBus.getDefault().post(new DeviceActionResultEvent(errorCode, msg));
    }
}
