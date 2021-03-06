package com.example.dmitrypavlenko.traveler.Tools;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Color;
import android.os.Handler;

import java.util.Timer;
import java.util.TimerTask;


/**
 * Created by Dmytro Pavlenko on 3/14/2017.
 */

public class Basic {

    // setTimeout, setInterval
    public interface TaskHandle {
        void invalidate();
    }

    public static TaskHandle setTimeout(final Runnable r, long delay) {
        final Handler h = new Handler();
        h.postDelayed(r, delay);
        return new TaskHandle() {
            @Override
            public void invalidate() {
                h.removeCallbacks(r);
            }
        };
    }

    public static TaskHandle setInterval(final Runnable r, long interval, long size) {
        final Timer t = new Timer();
        final Handler h = new Handler();
        t.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                h.post(r);
            }
        }, interval, interval);  // Unlike JavaScript, in Java the initial call is immediate, so we put interval instead.
        return new TaskHandle() {
            @Override
            public void invalidate() {
                t.cancel();
                t.purge();
            }
        };
    }

    public static int getRandomMaterialColor(Context context, String typeColor) {
        int returnColor = Color.GRAY;
        int arrayId = context.getResources().getIdentifier("mdcolor_" + typeColor, "array", context.getPackageName());

        if (arrayId != 0) {
            TypedArray colors = context.getResources().obtainTypedArray(arrayId);
            int index = (int) (Math.random() * colors.length());
            returnColor = colors.getColor(index, Color.GRAY);
            colors.recycle();
        }
        return returnColor;
    }
}
