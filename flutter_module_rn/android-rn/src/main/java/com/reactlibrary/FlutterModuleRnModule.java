// FlutterModuleRnModule.java

package com.reactlibrary;

import android.app.Activity;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import io.flutter.embedding.android.FlutterActivity;
import com.reactlibrary.FlutterModuleActivity;

public class FlutterModuleRnModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public FlutterModuleRnModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "FlutterModuleRn";
    }

    @ReactMethod
    public void startFlutterActivity(String eventName, String args, Callback callback) {
        Activity currentActivity = reactContext.getCurrentActivity();
        // we can pass arguments to the Intent
        currentActivity.startActivity(
                new FlutterActivity
                        .NewEngineIntentBuilder(FlutterModuleActivity.class)
                        .build(currentActivity)
                        .putExtra(FlutterModuleActivity.INITIAL_EVENT, eventName)
                        .putExtra(FlutterModuleActivity.INITIAL_ARGS, args)
        );
        callback.invoke("Received eventName: " + eventName + ", args: " + args);
    }

    @ReactMethod
    public void sendEvent(String eventName, String args) {
        Activity currentActivity = reactContext.getCurrentActivity();
        if (currentActivity instanceof FlutterModuleActivity) {
            ((FlutterModuleActivity) currentActivity).sendEventToFlutter(eventName, args);
        }
    }

    @ReactMethod
    public void addListener(String eventName) {
        // Keep: Required for RN built in Event Emitter Calls.
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        // Keep: Required for RN built in Event Emitter Calls.
    }
}
