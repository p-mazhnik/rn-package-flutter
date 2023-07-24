package com.reactnativeapp;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import com.reactlibrary.FlutterEngineHelper;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ReactNativeApp";
  }

  // react navigation requirement
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }

  @Override
  protected void onPostResume() {
    Log.d("com.reactnativeapp", "onPostResume");
    super.onPostResume();
    FlutterEngineHelper.handlePostResume(this);
  }

  @Override
  public void onTrimMemory(int level) {
    super.onTrimMemory(level);
    FlutterEngineHelper.handleTrimMemory(this, level);
  }

  @Override
  protected void onUserLeaveHint() {
    super.onUserLeaveHint();
    FlutterEngineHelper.handleUserLeaveHint(this);
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    FlutterEngineHelper.handleNewIntent(this, intent);
  }

  @Override
  public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    FlutterEngineHelper.handleRequestPermissionsResult(this, requestCode, permissions, grantResults);
  }

    /**
    * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
    * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
    * (aka React 18) with two boolean flags.
    */
    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
      return new DefaultReactActivityDelegate(
          this,
          getMainComponentName(),
          // If you opted-in for the New Architecture, we enable the Fabric Renderer.
          DefaultNewArchitectureEntryPoint.getFabricEnabled());
    }
}
