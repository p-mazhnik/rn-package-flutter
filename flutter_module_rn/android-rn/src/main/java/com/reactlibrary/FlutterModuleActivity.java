package com.reactlibrary;

import android.os.Bundle;

import androidx.annotation.NonNull;
import io.flutter.embedding.android.FlutterActivity;
import io.flutter.embedding.engine.FlutterEngine;
import io.flutter.plugin.common.MethodChannel;
import com.facebook.react.ReactApplication;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class FlutterModuleActivity extends FlutterActivity {
    private static final String CHANNEL = "pavel/flutter";

    public static final String INITIAL_EVENT = "INITIAL_EVENT";
    public static final String INITIAL_ARGS = "INITIAL_ARGS";

    // React Native event emitter. Uset to send events to the host React Native app
    private DeviceEventManagerModule.RCTDeviceEventEmitter reactNativeEventEmitter = null;

    // Flutter channel
    private MethodChannel channel = null;

    @Override
    public void configureFlutterEngine(@NonNull FlutterEngine flutterEngine) {
        super.configureFlutterEngine(flutterEngine);
        ReactApplication reactApplication = (ReactApplication) getApplication();
        ReactApplicationContext reactContext = (ReactApplicationContext) reactApplication
                .getReactNativeHost()
                .getReactInstanceManager()
                .getCurrentReactContext();
        this.reactNativeEventEmitter = reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class);

        this.channel = new MethodChannel(flutterEngine.getDartExecutor().getBinaryMessenger(), CHANNEL);
        channel.setMethodCallHandler(
                (call, result) -> {
                    // This method is invoked on the main thread.
                    String data = call.argument("data");
                    // pass events from Flutter channel to React Native
                    reactNativeEventEmitter.emit(call.method, data);
                    result.success(null);
                }
        );
    }

    @Override
    public void onFlutterUiDisplayed() {
        Bundle extras = this.getIntent().getExtras();
        String eventName = extras.getString(INITIAL_EVENT);
        String args = extras.getString(INITIAL_ARGS);
        sendEventToFlutter(eventName, args);
    }

    public void sendEventToFlutter(String eventName, String args) {
        channel.invokeMethod(eventName, args);
    }
}
