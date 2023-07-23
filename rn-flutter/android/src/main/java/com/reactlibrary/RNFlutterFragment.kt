package com.reactlibrary

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.RCTEventEmitter
import io.flutter.embedding.android.FlutterFragment
import io.flutter.embedding.engine.FlutterEngine

class RNFlutterFragment(
    private val reactNativeViewId: Int,
    private val reactContext: ReactApplicationContext,
    private val initialClicks: Long?,
    private val initialText: String?,
    private val initialScreen: String?,
): FlutterFragment() {
    var flutterCounterApi: FlutterCounterApi? = null

    override fun getCachedEngineGroupId(): String {
        return FlutterEngineHelper.ENGINE_GROUP_ID
    }

    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        HostCounterApi.setUp(flutterEngine.dartExecutor, HostCounterApiHandler(reactNativeViewId))
        flutterCounterApi = FlutterCounterApi(flutterEngine.dartExecutor)
        if (initialClicks != null) {
            flutterCounterApi?.setClicks(initialClicks) {
                // We don't care about the callback
            }
        }
        if (initialText != null) {
            flutterCounterApi?.setText(initialText) {}
        }
        if (initialScreen != null) {
            flutterCounterApi?.setScreen(initialScreen) {}
        }
        super.configureFlutterEngine(flutterEngine)
    }

    override fun onDestroy() {
        Log.d("com.reactlibrary", "RNFlutterFragment onDestroy")
        super.onDestroy()
    }

    /** This subclass will be called by Pigeon when the corresponding
     * APIs are invoked on the Dart side.
     */
    inner class HostCounterApiHandler(
        private val reactNativeViewId: Int
    ): HostCounterApi {
        override fun setText(text: String) {
            val event = Arguments.createMap().apply {
                putString("text", text)
            }
            sendEventToReact(RNFlutterViewManager.COMMAND_TEXT, event)
        }

        override fun setScreen(screen: String) {
            val event = Arguments.createMap().apply {
                putString("screen", screen)
            }
            sendEventToReact(RNFlutterViewManager.COMMAND_SCREEN, event)
        }

        override fun setClicks(value: Long) {
            val event = Arguments.createMap().apply {
                putInt("value", value.toInt())
            }
            sendEventToReact(RNFlutterViewManager.COMMAND_CLICKS, event)
        }

        private fun sendEventToReact(eventName: String, data: WritableMap) {
            reactContext
                .getJSModule(RCTEventEmitter::class.java)
                ?.receiveEvent(reactNativeViewId, eventName, data)
        }
    }
}
