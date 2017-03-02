package com.example.dmitrypavlenko.traveler.Events;

/**
 * Created by Dmitry Pavlenko on 02.03.2017.
 */

public class DeviceActionResultEvent {

    private Object actionResult;
    private int errorCode;
    private String errorMessage;

    public DeviceActionResultEvent(int errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    public DeviceActionResultEvent() {
    }

    public DeviceActionResultEvent(Object actionResult) {
        this.actionResult = actionResult;
    }

    public Object getActionResult() {
        return actionResult;
    }

    public int getErrorCode() {
        return errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}
