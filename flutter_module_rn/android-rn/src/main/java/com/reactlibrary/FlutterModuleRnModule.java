// FlutterModuleRnModule.java

package com.reactlibrary;

import android.app.Activity;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

import io.flutter.embedding.android.FlutterActivity;

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
    public void startFlutterActivity(String stringArgument, int numberArgument, Callback callback) {
        Activity currentActivity = reactContext.getCurrentActivity();
        // we can pass arguments to the Intent
        currentActivity.startActivity(
                FlutterActivity.createDefaultIntent(currentActivity)
        );
        callback.invoke("Received numberArgument: " + numberArgument + " stringArgument: " + stringArgument);
    }
}
