// FlutterModuleRnPackage.java
package com.reactlibrary

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext

class FlutterModuleRnPackage : ReactPackage {
    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return emptyList()
    }

    override fun createViewManagers(
        reactContext: ReactApplicationContext,
    ) = listOf(RNFlutterViewManager(reactContext))
}
